import { createWindowManager, createEmbeddedDesktop } from './windows.js';
export const appNames = {home:'My Computer',learn:'Course Files',reference:'Java Reference',practice:'Practice Folder',lab:'Command Prompt',mocks:'Exam Center',notes:'Notepad',workspace:'Documents',settings:'Control Panel',sources:'Sources & Corrections'};
const descriptions = {home:'Overview & study progress',learn:'50 lessons in eight modules',reference:'Commands, syntax & examples',practice:'Coding & debugging challenges',lab:'Write, compile and run Java',mocks:'Three complete practice exams',notes:'Your personal Java notebook',workspace:'Your files, saved locally',settings:'Workspace & appearance'};
export const desktopIcon = (id,cls='') => `<svg class="os-icon ${cls}" viewBox="0 0 64 64" aria-hidden="true"><use href="/icons.svg#${Object.hasOwn(appNames,id)&&id!=='sources'?id:'settings'}"></use></svg>`;

export function createDesktop({getState,statePatch,onLaunch,onAction,flush,toast}) {
  if(new URLSearchParams(location.search).has('pane'))return createEmbeddedDesktop({onLaunch,onAction,flush});
  const $=s=>document.querySelector(s), win=$('#app-window');
  let windowManager;
  const appIds=Object.keys(descriptions), openApps=new Map(), pinned=['home','learn','lab','notes'];
  let current='home',maximized=false,drag=null,geometryTimer,history=[],historyIndex=-1,goingBack=false;
  const prefs=()=>getState().state.desktop||{};
  const persist=patch=>statePatch({desktop:{...prefs(),...patch}}).catch(e=>toast(e.message,true));
  const encode=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const visible=()=>!win.hidden;
  function hideMenus(){for(const id of ['start-menu','desktop-popup','calendar-flyout'])$('#'+id).hidden=true;$('#start-button').setAttribute('aria-expanded','false');}
  function show(){win.hidden=false;$('#desktop-hint').hidden=true;drawTasks();}
  function minimize(){win.hidden=true;$('#desktop-hint').hidden=false;hideMenus();drawTasks();}
  async function close(){try{if(windowManager)await windowManager.closePrimary();else{await flush();openApps.delete(current);minimize();}drawTasks();}catch(e){toast(e.message,true);}}
  function launch(id){hideMenus();if(windowManager)return windowManager.launch(id);const hash=openApps.get(id)||'#'+id;openApps.set(id,hash);current=id;show();onLaunch(hash);}
  function drawTasks(){
    const tasks=windowManager?.tasks()||[],ids=[...new Set([...pinned,...(windowManager?tasks.map(t=>t.id):openApps.keys())])];
    $('#taskbar-apps').innerHTML=ids.map(id=>`<button class="taskbar-app ${(windowManager?tasks.some(t=>t.id===id):openApps.has(id))?'running':''} ${(windowManager?tasks.some(t=>t.id===id&&t.visible&&t.pane===windowManager.selected()):current===id&&visible())?'selected':''}" data-task="${id}" aria-label="${encode(appNames[id]||id)}" title="${encode(appNames[id]||id)}">${desktopIcon(id)}<span>${encode(appNames[id]||id)}</span></button>`).join('');
    document.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>{if(windowManager)windowManager.taskClick(b.dataset.task);else if(current===b.dataset.task&&visible())minimize();else launch(b.dataset.task);});
  }
  function setGeometry(geometry){
    const margin=innerWidth<760?8:20, maxW=Math.max(280,innerWidth-margin*2), maxH=Math.max(280,innerHeight-75);
    const width=Math.min(Math.max(Math.min(620,maxW),geometry.width||1020),maxW);
    const height=Math.min(Math.max(340,geometry.height||660),maxH);
    const x=Math.max(margin,Math.min(geometry.x??Math.max(160,(innerWidth-width)/2+50),innerWidth-width-margin));
    const y=Math.max(8,Math.min(geometry.y??64,innerHeight-height-60));
    Object.assign(win.style,{left:x+'px',top:y+'px',width:width+'px',height:height+'px'});
  }
  function bounds(){return {x:parseFloat(win.style.left),y:parseFloat(win.style.top),width:parseFloat(win.style.width),height:parseFloat(win.style.height)};}
  function saveGeometry(){if(!maximized)persist({geometry:bounds()});}
  function maximize(){windowManager?.untile();maximized=!maximized;win.classList.toggle('maximized',maximized);$('#window-maximize').setAttribute('aria-label',maximized?'Restore window':'Maximize window');$('#window-maximize').title=maximized?'Restore':'Maximize';persist({maximized});}
  function popup(button,items){
    const menu=$('#desktop-popup'),rect=button.getBoundingClientRect();hideMenus();menu.innerHTML=items.map((item,i)=>`<button data-popup-item="${i}">${encode(item[0])}${item[2]?`<kbd>${encode(item[2])}</kbd>`:''}</button>`).join('');menu.hidden=false;
    menu.style.left=Math.min(rect.left,innerWidth-240)+'px';menu.style.top=Math.min(rect.bottom+3,innerHeight-items.length*34-65)+'px';
    menu.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{hideMenus();items[i][1]();});
  }
  function refresh(){
    $('#window-title').textContent=current==='notes'?'Java Notes — Notepad':current==='lab'?'Command Prompt — Java Lab':(appNames[current]||'1620')+' — 1620';
    $('#window-app-icon').innerHTML=desktopIcon(current);
    win.dataset.app=current;document.body.dataset.app=current;
    $('#window-status-text').textContent=current==='lab'?'CMD 0A · Java source · UTF-8':current==='notes'?'Plain text document · Autosaved':current==='home'?getState().files.filter(f=>f.type==='file').length+' saved files · Local computer':descriptions[current]||'Course source alignment';
    const menubar=$('#app-menubar');
    const menus=current==='notes'?['File','Edit','Format','View','Help']:current==='lab'?['File','Run','View','Help']:['Organize','View','Tools','Help'];
    menubar.innerHTML=menus.map(name=>`<button data-app-menu="${name}">${name}</button>`).join('')+`<span class="menu-route">${current==='lab'?'BLACK / BRIGHT GREEN':current==='notes'?'NOTEPAD': '1620 • LOCAL'}</span>`;
    menubar.querySelectorAll('[data-app-menu]').forEach(button=>button.onclick=()=>{
      const name=button.dataset.appMenu;
      const items=name==='File'?[
        ['Save',()=>onAction('save'),'Ctrl+S'],
        [current==='notes'?'Export notes as .txt':'New Java file',()=>onAction(current==='notes'?'export-notes':'new-file')],
        ['Close window',close]
      ]:name==='Organize'?[
        ['New Java file',()=>onAction('new-file')],['New folder',()=>onAction('new-folder')],['Open Documents',()=>launch('workspace')]
      ]:name==='Edit'?[
        ['Select all',()=>onAction('select-notes'),'Ctrl+A'],['Save changes',()=>onAction('save'),'Ctrl+S']
      ]:name==='Format'?[
        [prefs().wordWrap===false?'Enable word wrap':'Disable word wrap',()=>{const wrap=prefs().wordWrap===false;persist({wordWrap:wrap});win.classList.toggle('notes-nowrap',!wrap);}]
      ]:name==='Run'?[
        ['Run Java',()=>onAction('run'),'Ctrl+Enter'],['Check sample tests',()=>onAction('check')]
      ]:name==='View'?[
        [maximized?'Restore window':'Maximize window',maximize],['Snap left',()=>windowManager?.snap('primary','left'),'Ctrl+Alt+←'],['Snap right',()=>windowManager?.snap('primary','right'),'Ctrl+Alt+→'],['Open Notepad beside this',()=>windowManager?.openBeside('notes')],['Show desktop',()=>windowManager?.showDesktop()],
        [prefs().compact?'Comfortable spacing':'Compact spacing',()=>{const compact=!prefs().compact;persist({compact});win.classList.toggle('compact-content',compact);}]
      ]:name==='Tools'?[
        ['Search the course',()=>onAction('search'),'Ctrl+K'],['Control Panel',()=>launch('settings')],['Sources & corrections',()=>onLaunch('#sources')]
      ]:[['About this desktop',()=>onAction('help')],['Keyboard shortcuts',()=>onAction('help')]];
      popup(button,items);
    });
    drawTasks();
  }
  function navigate(root,detail=''){
    current=root;const hash='#'+root+(detail?'/'+detail:'');
    if(goingBack)goingBack=false;else if(history[historyIndex]!==hash){history=history.slice(0,historyIndex+1);history.push(hash);historyIndex=history.length-1;}
    $('#desktop-back').disabled=historyIndex<=0;$('#desktop-forward').disabled=historyIndex>=history.length-1;
    openApps.set(root,hash);show();windowManager?.primaryNavigated();hideMenus();refresh();$('#window-scroll').scrollTop=0;
  }
  function drawStart(query=''){
    const ids=appIds.filter(id=>(appNames[id]+' '+descriptions[id]).toLowerCase().includes(query.toLowerCase()));
    $('#start-apps').innerHTML=ids.map(id=>`<button class="start-app" data-start-app="${id}">${desktopIcon(id)}<span>${appNames[id]}<small>${descriptions[id]}</small></span></button>`).join('')||'<p class="start-empty">No matching applications.</p>';
    document.querySelectorAll('[data-start-app]').forEach(b=>b.onclick=()=>launch(b.dataset.startApp));
  }
  function toggleStart(){const open=$('#start-menu').hidden;hideMenus();$('#start-menu').hidden=!open;$('#start-button').setAttribute('aria-expanded',String(open));if(open){$('#start-search').value='';drawStart();$('#start-search').focus();}}
  $('#desktop-icons').innerHTML=appIds.map(id=>`<button class="desktop-shortcut" data-launch="${id}" title="${descriptions[id]}" aria-label="Open ${appNames[id]}">${desktopIcon(id)}<span>${appNames[id]}</span></button>`).join('');
  document.querySelectorAll('[data-launch]').forEach(b=>b.onclick=()=>launch(b.dataset.launch));
  $('#start-search').oninput=e=>drawStart(e.target.value);
  $('#start-button').onclick=toggleStart;
  $('#save-and-close').onclick=close;
  $('#start-help').onclick=()=>{hideMenus();onAction('help');};
  $('#window-minimize').onclick=minimize;$('#window-close').onclick=close;$('#window-maximize').onclick=maximize;
  $('#show-desktop').onclick=()=>{if(windowManager)return windowManager.showDesktop();if(visible())minimize();else if(openApps.has(current))show();else if(openApps.size)launch([...openApps.keys()].at(-1));};
  $('#desktop-back').onclick=()=>{if(historyIndex>0){historyIndex--;goingBack=true;onLaunch(history[historyIndex]);}};
  $('#desktop-forward').onclick=()=>{if(historyIndex<history.length-1){historyIndex++;goingBack=true;onLaunch(history[historyIndex]);}};
  $('#window-titlebar').ondblclick=e=>{if(!e.target.closest('button'))maximize();};
  function startDrag(e,resize=false){
    if(e.button!==0||maximized||(!resize&&e.target.closest('button')))return;
    e.preventDefault();windowManager?.untile();drag={x:e.clientX,y:e.clientY,...bounds(),resize};
    drag.startX=drag.x;drag.startY=drag.y;drag.pointerX=e.clientX;drag.pointerY=e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);win.classList.add('moving');
  }
  function move(e){if(!drag)return;const dx=e.clientX-drag.pointerX,dy=e.clientY-drag.pointerY;setGeometry(drag.resize?{...drag,width:drag.width+dx,height:drag.height+dy}:{...drag,x:drag.x+dx,y:drag.y+dy});}
  function end(e){if(!drag)return;const resize=drag.resize;drag=null;if(!resize&&e?.clientX<18)windowManager?.snap('primary','left');else if(!resize&&e?.clientX>innerWidth-18)windowManager?.snap('primary','right');win.classList.remove('moving');saveGeometry();}
  const title=$('#window-titlebar'),grip=$('.resize-grip');title.onpointerdown=e=>startDrag(e);grip.onpointerdown=e=>startDrag(e,true);
  for(const el of [title,grip]){el.onpointermove=move;el.onpointerup=end;el.onpointercancel=end;}
  document.addEventListener('click',e=>{if(!e.target.closest('#start-menu,#start-button,#desktop-popup,#app-menubar,#taskbar-clock,#calendar-flyout'))hideMenus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hideMenus();if(e.ctrlKey&&e.key==='Escape'){e.preventDefault();toggleStart();}});
  document.addEventListener('contextmenu',e=>{
    if(e.target.closest('#app-window,dialog,#taskbar-apps,#start-menu'))return;
    e.preventDefault();popup({getBoundingClientRect:()=>({left:e.clientX,bottom:e.clientY})},[['Open My Computer',()=>launch('home')],['Show desktop',minimize],['New Java file',()=>onAction('new-file')],['New folder',()=>onAction('new-folder')],['Personalize',()=>launch('settings')]]);
  });
  function updateClock(){const now=new Date();$('#taskbar-clock').innerHTML=`<time>${now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</time><span>${now.toLocaleDateString([], {month:'2-digit',day:'2-digit',year:'numeric'})}</span>`;}
  updateClock();setInterval(updateClock,15000);
  $('#taskbar-clock').onclick=()=>{
    const flyout=$('#calendar-flyout'),open=flyout.hidden;hideMenus();if(!open)return;
    const now=new Date(),year=now.getFullYear(),month=now.getMonth(),first=new Date(year,month,1).getDay(),days=new Date(year,month+1,0).getDate();
    flyout.innerHTML=`<div class="calendar-today">${now.toLocaleDateString([], {weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div><strong>${now.toLocaleDateString([], {month:'long',year:'numeric'})}</strong><div class="calendar-grid">${['S','M','T','W','T','F','S'].map(x=>'<b>'+x+'</b>').join('')}${'<span></span>'.repeat(first)}${Array.from({length:days},(_,i)=>`<span class="${i+1===now.getDate()?'today':''}">${i+1}</span>`).join('')}</div><p>Your computer’s local date & time</p>`;flyout.hidden=false;
  };
  window.addEventListener('resize',()=>{if(!maximized&&!windowManager?.isTiled()){setGeometry(bounds());clearTimeout(geometryTimer);geometryTimer=setTimeout(saveGeometry,400);}});
  setGeometry(prefs().geometry||{width:Math.min(1060,innerWidth-200),height:Math.min(730,innerHeight-160)});
  maximized=!!prefs().maximized;win.classList.toggle('maximized',maximized);$('#window-maximize').setAttribute('aria-label',maximized?'Restore window':'Maximize window');$('#window-maximize').title=maximized?'Restore':'Maximize';win.classList.toggle('compact-content',!!prefs().compact);win.classList.toggle('notes-nowrap',prefs().wordWrap===false);
  windowManager=createWindowManager({primary:win,getPrimaryId:()=>current,launchPrimary:onLaunch,flushPrimary:flush,restorePrimary:()=>{if(maximized)maximize();},getState,persist,drawTasks,toast,icon:desktopIcon,names:appNames});
  $('#window-snap-left').onclick=()=>windowManager.snap('primary','left');$('#window-snap-right').onclick=()=>windowManager.snap('primary','right');
  return {navigate,refresh,show,minimize,maximize,close,launch,openBeside:windowManager.openBeside,flushAll:windowManager.flushAll};
}
