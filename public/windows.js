// Two independent study windows share files on disk, while keeping their editors separate.
export function createWindowManager({primary,getPrimaryId,launchPrimary,flushPrimary,restorePrimary,getState,persist,drawTasks,toast,icon,names}) {
  const $=s=>document.querySelector(s);
  let secondary=null, primaryOpen=false, focused='primary', tiled=false, primarySide=getState().state.desktop?.primarySide||'left', order=6, resizing=false;
  const titleFor=id=>(names[id]||'Study')+(id==='notes'?' — Java Notes':' — 1620');
  function save(){persist({layout:tiled?'side-by-side':'floating',primarySide,secondary:secondary?{route:secondary.route,visible:!secondary.el.hidden,geometry:bounds(secondary.el),maximized:secondary.el.classList.contains('maximized')}:null});}
  function bounds(el){return {x:parseFloat(el.style.left)||0,y:parseFloat(el.style.top)||0,width:parseFloat(el.style.width)||600,height:parseFloat(el.style.height)||600};}
  function focus(which){focused=which;const el=which==='primary'?primary:secondary?.el;if(!el)return;el.style.zIndex=String(++order);primary.classList.toggle('inactive-window',which!=='primary');secondary?.el.classList.toggle('inactive-window',which!=='secondary');drawTasks();}
  function showPrimary(){primaryOpen=true;primary.hidden=false;$('#desktop-hint').hidden=true;focus('primary');}
  function showSecondary(){if(!secondary)return;secondary.el.hidden=false;$('#desktop-hint').hidden=true;focus('secondary');}
  async function flushSecondary(){if(secondary?.frame.contentWindow?.java1620Pane)await secondary.frame.contentWindow.java1620Pane.flush();}
  function updateSecondary(){
    if(!secondary)return;
    secondary.id=secondary.route.slice(1).split('/')[0]||'home';
    secondary.el.dataset.app=secondary.id;
    secondary.el.querySelector('.secondary-title').textContent=titleFor(secondary.id);
    secondary.el.querySelector('.secondary-icon').innerHTML=icon(secondary.id);
    secondary.frame.title=(names[secondary.id]||'Study')+' window';drawTasks();
  }
  function mountSecondary(route){
    const el=document.createElement('section');el.id='second-window';el.className='shell aero-window secondary-window';el.setAttribute('aria-label','Second study window');
    el.innerHTML=`<div class="window-titlebar secondary-titlebar"><div class="window-title"><span class="secondary-icon"></span><span class="secondary-title"></span></div><div class="window-controls"><button data-window="left" aria-label="Snap second window left" title="Snap left">◧</button><button data-window="right" aria-label="Snap second window right" title="Snap right">◨</button><button data-window="minimize" aria-label="Minimize second window" title="Minimize">−</button><button data-window="maximize" aria-label="Maximize second window" title="Maximize"><span class="maximize-glyph"></span></button><button class="window-close" data-window="close" aria-label="Close second window" title="Close">×</button></div></div><iframe class="study-pane" title="Second study window"></iframe><footer class="window-status"><span>Local workspace · Autosaved</span><span class="secondary-resize resize-grip" aria-hidden="true">◢</span></footer>`;
    document.body.append(el);const frame=el.querySelector('iframe');secondary={el,frame,route,id:''};
    Object.assign(el.style,{left:Math.max(8,innerWidth/2)+'px',top:'35px',width:Math.max(340,innerWidth/2-16)+'px',height:Math.max(360,innerHeight-105)+'px'});
    updateSecondary();frame.src='/?pane=1'+route;
    el.addEventListener('pointerdown',()=>focus('secondary'));
    el.querySelectorAll('[data-window]').forEach(b=>b.onclick=()=>{
      const action=b.dataset.window;
      if(action==='close')closeSecondary().catch(e=>toast(e.message,true));
      else if(action==='minimize'){el.hidden=true;drawTasks();save();}
      else if(action==='maximize'){primary.classList.remove('tiled-window');el.classList.remove('tiled-window');el.classList.toggle('maximized');b.setAttribute('aria-label',el.classList.contains('maximized')?'Restore second window':'Maximize second window');tiled=false;save();}
      else snap('secondary',action);
    });
    el.querySelector('.secondary-titlebar').ondblclick=e=>{if(!e.target.closest('button'))el.querySelector('[data-window="maximize"]').click();};
    let drag;
    for(const handle of [el.querySelector('.secondary-titlebar'),el.querySelector('.secondary-resize')]){
      handle.onpointerdown=e=>{if(e.button!==0||e.target.closest('button'))return;e.preventDefault();tiled=false;primary.classList.remove('tiled-window');el.classList.remove('tiled-window','maximized');drag={...bounds(el),px:e.clientX,py:e.clientY,resize:handle.classList.contains('secondary-resize')};handle.setPointerCapture(e.pointerId);el.classList.add('moving');};
      handle.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.px,dy=e.clientY-drag.py;const width=drag.resize?Math.min(Math.max(320,drag.width+dx),innerWidth-12):drag.width,height=drag.resize?Math.min(Math.max(300,drag.height+dy),innerHeight-60):drag.height;Object.assign(el.style,{width:width+'px',height:height+'px',left:Math.max(4,Math.min(drag.x+(drag.resize?0:dx),innerWidth-width-4))+'px',top:Math.max(0,Math.min(drag.y+(drag.resize?0:dy),innerHeight-85))+'px'});};
      const end=e=>{if(!drag)return;const resize=drag.resize;drag=null;el.classList.remove('moving');if(!resize&&e.clientX<18)snap('secondary','left');else if(!resize&&e.clientX>innerWidth-18)snap('secondary','right');else save();};
      handle.onpointerup=end;handle.onpointercancel=()=>{drag=null;el.classList.remove('moving');save();};
    }
  }
  async function closeSecondary(){await flushSecondary();secondary?.el.remove();secondary=null;tiled=false;drawTasks();save();}
  async function replaceSecondary(route){await flushSecondary();secondary.route=route;updateSecondary();secondary.frame.src='/?pane=1'+route;showSecondary();save();}
  function arrange(side=primarySide){
    primarySide=side;
    restorePrimary();primary.classList.remove('maximized');secondary?.el.classList.remove('maximized');
    const horizontal=innerWidth>=820,gap=6,usableHeight=innerHeight-54;
    const width=horizontal?(innerWidth-gap*3)/2:innerWidth-gap*2;
    const height=horizontal?usableHeight:(usableHeight-gap*3)/2;
    const put=(el,left)=>{const x=(horizontal?(left?gap:width+gap*2):gap)+'px',y=(horizontal?gap:(left?gap:height+gap*2))+'px';Object.assign(el.style,{left:x,top:y,width:width+'px',height:height+'px'});for(const [key,value]of Object.entries({left:x,top:y,width:width+'px',height:height+'px'}))el.style.setProperty('--tile-'+key,value);};
    put(primary,primarySide==='left');if(secondary)put(secondary.el,primarySide!=='left');
    tiled=true;primary.classList.add('tiled-window');secondary?.el.classList.add('tiled-window');save();drawTasks();
  }
  function snap(which,side){if(secondary&&primaryOpen){arrange(which==='primary'?side:side==='left'?'right':'left');return;}const el=which==='primary'?primary:secondary?.el;if(!el)return;primary.classList.remove('tiled-window');secondary?.el.classList.remove('tiled-window');if(which==='primary')restorePrimary();el.classList.remove('maximized');Object.assign(el.style,{left:side==='left'?'6px':(innerWidth/2+3)+'px',top:'6px',width:(innerWidth/2-9)+'px',height:(innerHeight-60)+'px'});tiled=false;save();}
  async function launch(id,beside=false){
    const hash='#'+id;
    if(secondary?.id===id){showSecondary();if(beside)arrange();return;}
    if(primaryOpen&&getPrimaryId()===id){showPrimary();if(beside&&secondary)arrange();return;}
    if(!primaryOpen||primary.hidden&&!secondary){showPrimary();launchPrimary(hash);return;}
    if(!secondary){mountSecondary(hash);showSecondary();arrange();return;}
    if(beside||focused==='secondary'){await replaceSecondary(hash);if(beside)arrange();}
    else{await flushPrimary();showPrimary();launchPrimary(hash);}
  }
  primary.addEventListener('pointerdown',()=>focus('primary'));
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==secondary?.frame.contentWindow)return;
    if(e.data?.type==='pane-focus')focus('secondary');
    if(e.data?.type==='pane-navigation'){secondary.route=e.data.hash;updateSecondary();save();}
    if(e.data?.type==='pane-beside'){
      const id=e.data.id;
      if(!Object.hasOwn(names,id))return;
      (async()=>{await flushPrimary();showPrimary();if(getPrimaryId()!==id)launchPrimary('#'+id);arrange();})().catch(e=>toast(e.message,true));
    }
    if(e.data?.type==='pane-snap')snap('secondary',e.data.side);
  });
  document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();snap(focused,e.key==='ArrowLeft'?'left':'right');}});
  window.addEventListener('resize',()=>{clearTimeout(resizing);resizing=setTimeout(()=>{if(tiled)arrange();},80);});
  const saved=getState().state.desktop;
  if(saved?.secondary?.route&&/^#(home|learn|reference|practice|lab|mocks|notes|workspace|settings|sources)(\/[^\s]*)?$/.test(saved.secondary.route)){
    mountSecondary(saved.secondary.route);secondary.el.hidden=saved.secondary.visible===false;
    if(saved.layout==='side-by-side')arrange();else if(saved.secondary.geometry){const b=saved.secondary.geometry;Object.assign(secondary.el.style,{left:Math.max(4,Math.min(b.x,innerWidth-340))+'px',top:Math.max(0,Math.min(b.y,innerHeight-100))+'px',width:Math.max(320,Math.min(b.width,innerWidth-12))+'px',height:Math.max(300,Math.min(b.height,innerHeight-60))+'px'});}
    if(saved.secondary.maximized)secondary.el.classList.add('maximized');
  }
  return {
    launch:(id,beside=false)=>launch(id,beside).catch(e=>toast(e.message,true)),
    openBeside:id=>launch(id,true).catch(e=>toast(e.message,true)),snap,arrange,
    isTiled:()=>tiled,
    untile:()=>{tiled=false;primary.classList.remove('tiled-window');secondary?.el.classList.remove('tiled-window');},
    primaryNavigated:()=>{primaryOpen=true;focus('primary');},
    showPrimary,
    closePrimary:async()=>{await flushPrimary();primaryOpen=false;primary.hidden=true;drawTasks();},
    primaryMinimized:()=>drawTasks(),
    tasks:()=>[...(primaryOpen?[{id:getPrimaryId(),pane:'primary',visible:!primary.hidden}]:[]),...(secondary?[{id:secondary.id,pane:'secondary',visible:!secondary.el.hidden}]:[])],
    selected:()=>focused,
    taskClick:id=>{if(secondary?.id===id){if(focused==='secondary'&&!secondary.el.hidden){secondary.el.hidden=true;drawTasks();}else showSecondary();}else if(primaryOpen&&getPrimaryId()===id){if(focused==='primary'&&!primary.hidden){primary.hidden=true;drawTasks();}else showPrimary();}else launch(id).catch(e=>toast(e.message,true));},
    showDesktop:()=>{const visible=!primary.hidden||secondary&&!secondary.el.hidden;primary.hidden=!!visible||!primaryOpen;if(secondary)secondary.el.hidden=!!visible;$('#desktop-hint').hidden=!visible;drawTasks();},
    flushAll:async()=>{await flushPrimary();await flushSecondary();}
  };
}

export function createEmbeddedDesktop({onLaunch,onAction,flush}) {
  const $=s=>document.querySelector(s),win=$('#app-window');
  const post=data=>parent.postMessage(data,location.origin);
  document.addEventListener('pointerdown',()=>post({type:'pane-focus'}));
  document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();post({type:'pane-snap',side:e.key==='ArrowLeft'?'left':'right'});}});
  return {show:()=>{win.hidden=false;},openBeside:id=>post({type:'pane-beside',id}),flushAll:flush,navigate(root,detail=''){
    win.dataset.app=root;win.hidden=false;
    $('#app-menubar').innerHTML=`<button data-pane-action="save">Save</button><button data-pane-action="${root==='notes'?'export-notes':'new-file'}">${root==='notes'?'Export notes':'New class'}</button>${root==='lab'?'<button data-pane-action="run">Run Java</button>':''}<button data-pane-action="help">Help</button><span class="menu-route">${root==='notes'?'NOTEPAD':'1620 · LOCAL'}</span>`;
    document.querySelectorAll('[data-pane-action]').forEach(b=>b.onclick=()=>onAction(b.dataset.paneAction));
    post({type:'pane-navigation',hash:'#'+root+(detail?'/'+detail:'')});
  }};
}
