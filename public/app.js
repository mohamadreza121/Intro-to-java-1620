import { createDesktop, desktopIcon, appNames } from './desktop.js';
import { courseModules, lessons, referenceEntries, exercises, mockTests, sourceNotes, corrections, documentation } from './course.js';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const token = $('meta[name="lab-token"]').content;
const main = $('#main');
const modal = $('#modal');
let S, route='home', routeVersion=0, activeFile='', saveTimer, noteTimer, toastTimer, saving=Promise.resolve(), noteSaving=Promise.resolve();
const drafts = new Map();
const collapsedFolders = new Set();
let desktopUI, liveSession=null, sendingInput=false, sampleInput="";
const icons = {
  home:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  learn:'<path d="M3 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H3zM21 4h-5a3 3 0 0 0-3 3v14a4 4 0 0 1 4-2h4z"/>',
  reference:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  practice:'<path d="m9 3-1 5-5 1 5 2 1 5 2-5 5-2-5-1zM17 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>',
  lab:'<rect x="2" y="3" width="20" height="17" rx="2"/><path d="m6 8 4 4-4 4m7 0h5"/>',
  mocks:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6m-6 4h6"/>',
  notes:'<path d="M13 3H4v18h16v-9M9 15l1-5L19 1l4 4-9 9z"/>',
  workspace:'<path d="M2 6h8l2 3h10v12H2zM2 6V3h7l3 3"/>',
  settings:'<path d="M12 3 9 5 6 4 4 7l1 3-2 2 2 3-1 3 3 2 3-1 2 2 3-2 3 1 2-3-1-3 2-2-2-3 1-3-3-2-3 1z"/><circle cx="12" cy="12" r="3"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.reference}</svg>`;
const nav = [['home','Overview'],['learn','Learning path'],['reference','Java reference'],['practice','Practice'],['lab','Code lab'],['mocks','Mock tests'],['notes','My notes'],['workspace','My files'],['settings','Settings']];
const modules = courseModules.map(m=>[m.title,m.description,m.sources.join(' / ')]);
let routeDetail='', referenceCategory='All', referenceQuery='', exerciseLevel='All', exerciseKind='All', exerciseQuery='', answerTimer, pendingInput='';
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr = esc;
function toast(text,error=false) { const el=$('#toast');el.textContent=text;el.className='show'+(error?' error':'');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.className='',5500); }
async function api(endpoint,body) {
  const res=await fetch('/api/'+endpoint,{method:body===undefined?'GET':'POST',headers:{'x-lab-token':token,...(body===undefined?{}:{'Content-Type':'application/json'})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const result=await res.json();if(!res.ok)throw new Error(result.error||'Request failed.');return result;
}
function showDialog(html) { $('#modal-content').innerHTML=html;modal.showModal();setTimeout(()=>$('#modal-content input')?.focus(),30); }
async function statePatch(patch) { await api('state',patch);Object.assign(S.state,patch); }
function enqueueSave() {
  clearTimeout(saveTimer);
  saving=saving.catch(()=>{}).then(async()=>{
    for(const [file,content] of [...drafts]) {
      await api('file',{path:file,content});
      if(drafts.get(file)===content)drafts.delete(file);
    }
    const label=$('#save-label');if(label)label.textContent=drafts.size?'Unsaved changes':'Saved to disk';
  });
  return saving;
}
async function flush() {
  await enqueueSave();
  clearTimeout(noteTimer);
  await noteSaving;
  if($('#notes-text')) {
    await statePatch({notes:$('#notes-text').value});
    if($('#notes-status'))$('#notes-status').textContent='Saved to disk';
  }
  if($('#lesson-answer')){clearTimeout(answerTimer);await statePatch({lessonAnswers:{...S.state.lessonAnswers,[$('#lesson-answer').dataset.lesson]:$('#lesson-answer').value}});}
}
function heading(eyebrow,title,desc,action='') {return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${action}</div>`;}
function theme() {document.body.classList.remove('theme-midnight','theme-oled');if(S.state.theme!=='graphite')document.body.classList.add('theme-'+S.state.theme);}
function fileCount(){return S.files.filter(f=>f.type==='file').length;}
function home() {
  const done=S.state.completed.filter(id=>lessons.some(l=>l.id===id)).length;
  const folders=[['learn','Course Files',lessons.length+' lessons · 8 modules'],['reference','Java Reference',referenceEntries.length+' commands & patterns'],['practice','Practice Folder',exercises.length+' coding challenges'],['mocks','Exam Center','3 mocks · Library project included'],['notes','Notepad','Your saved thoughts & explanations'],['lab','Command Prompt','Black / green · CMD color 0A']];
  return `<div class="computer-heading">${desktopIcon('home')}<div><h1>Reza’s study computer</h1><p>Introduction to Java · ITEC 1620</p></div><span>PERSONAL / LOCAL</span></div><h2 class="explorer-group-title"><span>Hard Disk Drives (2)</span></h2><div class="computer-drives"><a class="drive-card" href="#learn"><span class="drive-icon" aria-hidden="true"></span><div class="drive-details"><strong>Java 1620 (C:)</strong><div class="progress-track" role="progressbar" aria-label="Course progress" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${lessons.length}"><span style="width:${done/lessons.length*100}%"></span></div><p>${done} of ${lessons.length} lessons reviewed</p></div></a><a class="drive-card" href="#workspace"><span class="drive-icon" aria-hidden="true"></span><div class="drive-details"><strong>Personal Workspace (Local)</strong><p>${fileCount()} files saved on your computer<br>Code, documents & projects</p></div></a></div><h2 class="explorer-group-title"><span>Study folders (6)</span></h2><div class="computer-folders">${folders.map(([id,title,desc])=>`<a class="computer-folder" href="#${id}">${desktopIcon(id)}<div><strong>${title}</strong><p>${desc}</p></div></a>`).join('')}</div><div class="computer-details"><section class="system-info"><div><span>Computer name</span><strong>REZA-PC / Study workspace</strong></div><div><span>Java runtime</span><strong>${S.java.ready?'Connected':'Needs JDK setup'}</strong></div><div><span>Programs attempted</span><strong>${S.state.runs}</strong></div><div><span>Saved notes</span><strong>${S.state.notes?'Document saved':'Ready to write'}</strong></div><a class="text-link" href="#settings">View system properties →</a></section><section class="computer-feature"><span class="small-label">YOUR NEXT PROJECT</span><h2>The neighbourhood library</h2><p>Book objects. A working catalogue. Borrow, return and search. A complete system you build yourself.</p><a href="#mocks/library">${desktopIcon('mocks')} Open the 90-minute mock →</a></section></div>`;
}
function explorer() {
  return S.files.filter(f=>(f.type==='folder'||/\.(java|txt|md|json|csv)$/i.test(f.path))&&![...collapsedFolders].some(folder=>f.path.startsWith(folder+'/'))).map(f=>`<button class="file-entry ${f.path===activeFile?'selected':''}" style="padding-left:${11+f.path.split('/').length*9}px" data-file="${attr(f.path)}" data-kind="${f.type}" ${f.type==='folder'?`aria-expanded="${!collapsedFolders.has(f.path)}"`:''} title="${attr(f.path)}"><span class="file-icon">${f.type==='folder'?(collapsedFolders.has(f.path)?'›':'⌄'):'J'}</span><span>${esc(f.name)}</span></button>`).join('');
}
function lab() {
  const context=S.state.activeChallenge, task=challengeFor(context?.key);
  const taskNotice=task?`<div class="challenge-context"><div><span class="small-label">${context.solution?'SOLUTION COPY':'ACTIVE PRACTICE'}</span><strong>${esc(task.title)}</strong><a href="#${context.key.startsWith('mock:')?'mocks':'practice'}/${task.id}">Back to brief →</a></div><button class="btn ghost compact" id="check-code">Check sample tests</button></div>`:'';
  return heading('04 / THE CODE LAB','Command Prompt — Java Lab','Real Java. Your files. Room to try, break, fix and understand.',`<button class="btn ghost" data-action="new-file">+ New file</button>`)+`${!S.java.ready?'<div class="notice">Java needs a JDK 17 or newer. The editor and file saving work now; install your JDK and restart to enable Run.</div>':''}<div class="lab-top"><p><span class="small-label">LOCAL JAVA</span> · Files in the same folder compile together.</p><span class="pill green">Ctrl + Enter to run</span></div>${taskNotice}<section class="editor-layout"><aside class="explorer"><div class="explorer-head">EXPLORER <span class="explorer-actions"><button class="icon-btn" data-action="new-file" aria-label="Create file" title="Create file">+</button><button class="icon-btn" data-action="new-folder" aria-label="Create folder" title="Create folder">▱</button></span></div><div id="file-tree">${explorer()}</div><div class="workspace-hint">workspace/<br><br>Each project gets its own folder.<br>Run the file with your main method.</div></aside><div class="editor-main"><div class="editor-toolbar"><div class="file-tab" id="file-tab">${esc(activeFile||'Select a file')}</div><div class="toolbar-actions"><span class="save-label" id="save-label">Saved to disk</span><button class="btn ghost compact" id="save-code">Save</button><button class="btn ghost compact" id="stop-code" disabled>■ Stop</button><button class="btn primary compact" id="run-code">▷ Run</button></div></div><div class="editor-wrap"><pre class="line-numbers" id="line-numbers" aria-hidden="true">1</pre><textarea id="code" class="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Java source code" wrap="off" disabled></textarea></div><div class="editor-bottom"><span id="cursor-status">Ln 1, Col 1</span><span>UTF-8 · JAVA · 4 SPACES</span></div><div class="console-head"><span><b>OUTPUT</b> <span id="run-status" role="status">LOCAL CONSOLE</span></span><button class="icon-btn" id="clear-console" aria-label="Clear output" title="Clear output">⌫</button></div><pre class="console" id="console" role="log" aria-live="polite">&gt; Ready when you are.
&gt; Select a Java file and press Run.</pre><div class="stdin-row"><div class="stdin-caption"><label for="stdin">LIVE INPUT →</label><span>Enter sends · Shift+Enter adds a line · Empty Enter sends a blank line</span></div><div class="stdin-controls"><textarea id="stdin" spellcheck="false" autocomplete="off" maxlength="16000" aria-label="Program input" placeholder="Press Run, then type your answer here…" disabled></textarea><button class="btn ghost compact" id="sample-input" disabled>Use sample</button><button class="btn primary compact" id="send-input" disabled>Send ↵</button></div></div></div></section>`;
}
function notes() {
  return `<h1 class="sr-only">Java Notes — Notepad</h1><section class="notepad-surface"><div class="notes-bar"><span>Java Notes.txt</span><span id="notes-status">Saved to disk</span></div><textarea class="notes-area" id="notes-text" aria-label="Personal Java notes" spellcheck="false" placeholder="Your notebook is open.\n\nWrite an explanation, save a useful idea, or keep a list of mistakes you’ve learned to spot.">${esc(S.state.notes)}</textarea></section>`;
}
function workspace() {
  return heading('07 / YOUR WORKSPACE','Everything you’re working on.','Java files, project folders and lecture documents. Saved on your computer.',`<div style="display:flex;gap:8px"><button class="btn ghost" data-action="new-folder">+ Folder</button><button class="btn primary" id="upload-btn">↑ Import files</button><input type="file" id="upload" multiple hidden></div>`)+`<div class="notice">Files are stored in <code>${esc(S.workspace)}</code>. Import a lecture document or create a Java project. Your personal files and notes are excluded from Git.</div><div class="panel file-list-scroll"><table class="file-table"><thead><tr><th>NAME / PATH</th><th>TYPE</th><th style="text-align:right">ACTIONS</th></tr></thead><tbody>${S.files.map(f=>`<tr><td><button class="file-name" data-file="${attr(f.path)}" data-kind="${f.type}">${f.type==='folder'?'▱':'↳'} ${esc(f.path)}</button></td><td><span class="pill">${f.type==='folder'?'Folder':esc(f.name.split('.').pop().toUpperCase())}</span></td><td class="actions">${f.type==='file'?`<button class="icon-btn" data-download="${attr(f.path)}" aria-label="Download ${attr(f.name)}" title="Download">↓</button>`:''}<button class="icon-btn" data-rename="${attr(f.path)}" aria-label="Rename ${attr(f.name)}" title="Rename">✎</button><button class="icon-btn" data-trash="${attr(f.path)}" aria-label="Move ${attr(f.name)} to trash" title="Move to local trash">×</button></td></tr>`).join('')}</tbody></table></div><div style="margin-top:20px"><button class="btn ghost" data-action="new-file">+ Create Java file</button></div>`;
}
function settings() {
  return heading('08 / MAKE IT YOURS','Your lab. Your machine.','Local by design, with files you can open outside the app.')+`<div class="settings-grid"><div><section class="panel settings-section"><h2>Workspace location</h2><p>The app saves relative to its own folder. To use your chosen location, put the app directly here:</p><div class="path-block">C:\\Users\\mrhei\\OneDrive\\Desktop\\york courses\\1620\\1620 - redo</div><p>Current app folder:</p><div class="path-block">${esc(S.root)}</div><div class="setting-row"><div><strong>Practice files & imported documents</strong><p><code>workspace/</code></p></div><a class="text-link" href="#workspace">View files →</a></div><div class="setting-row"><div><strong>Notes, timer & activity</strong><p><code>.1620/state.json</code></p></div><button class="btn ghost compact" id="export-progress">Export copy ↓</button></div><div class="setting-row"><div><strong>Local trash</strong><p><code>.1620/trash/</code> · Remove from the app, keep a disk copy.</p></div></div></section><section class="panel settings-section"><h2>Appearance</h2><p>Graphite glass. Monochrome surfaces. Code uses CMD color 0A: #00FF00 on #000000.</p><div class="setting-row"><strong>Theme</strong><div class="theme-swatches">${['graphite','midnight','oled'].map(t=>`<button class="swatch ${S.state.theme===t?'selected':''}" data-theme="${t}" aria-label="${t} theme" aria-pressed="${S.state.theme===t}" title="${t}"></button>`).join('')}</div></div></section></div><div><section class="panel settings-section"><h2>Java runtime</h2><span class="pill ${S.java.ready?'green':''}">${S.java.ready?'Connected':'Needs setup'}</span><div class="path-block">${esc(S.java.version||'Java not detected.')}</div><p>Install a JDK 17 or newer to compile and run Java. Restart the app after installation. No npm dependencies are needed.</p></section><section class="panel settings-section"><h2>Keyboard shortcuts</h2><div class="setting-row"><strong>Save</strong><kbd>Ctrl S</kbd></div><div class="setting-row"><strong>Run Java</strong><kbd>Ctrl Enter</kbd></div><div class="setting-row"><strong>Search workspace</strong><kbd>Ctrl K</kbd></div><div class="setting-row"><strong>Indent in editor</strong><kbd>Tab</kbd></div></section><section class="panel settings-section"><h2>Desktop build 0.3</h2><p>${lessons.length} lessons, ${referenceEntries.length} reference entries, ${exercises.length} practice tasks and ${mockTests.length} original mocks. All examples and solutions are runnable.</p><p><a class="text-link" href="#sources">Lecture alignment & corrections →</a></p></section></div></div>`;
}
const views={home,learn,reference,practice,lab,mocks,notes,workspace,settings,sources};
async function render() {
  const current=++routeVersion;
  try { await flush(); } catch(e){toast('Save failed: '+e.message,true);return;}
  if(current!==routeVersion)return;
  [route,routeDetail='']=location.hash.slice(1).split('/');route ||= 'home';if(!views[route])route='home';
  $('#sidebar').classList.remove('open');
  $('#crumb').textContent=appNames[route]||'Sources & corrections';
  $('#nav').innerHTML=nav.map(([id,title])=>`<a class="nav-link ${route===id?'active':''}" ${route===id?'aria-current="page"':''} href="#${id}"><span class="nav-icon">${desktopIcon(id)}</span>${appNames[id]}${id==='lab'?'<span class="nav-tag">&gt;_</span>':''}</a>`).join('');
  main.innerHTML=views[route]();theme();bindCommon();bindStudy();desktopUI?.navigate(route,routeDetail);
  if(route==='lab') {
    const f=S.files.find(x=>x.path===S.state.lastFile&&/\.(java|txt|md|json|csv)$/i.test(x.path))||S.files.find(x=>x.path.endsWith('.java'));
    if(f)await openFile(f.path);else $('#console').textContent='Create a Java file to get started.';
    $('#save-code').onclick=()=>enqueueSave().then(()=>toast('Saved to disk.')).catch(fail);
    $('#run-code').onclick=run;
    if($('#check-code'))$('#check-code').onclick=checkSamples;
    sampleInput=pendingInput || (S.state.activeChallenge?.path===f?.path ? challengeFor(S.state.activeChallenge.key)?.tests?.[0]?.stdin||'' : '');pendingInput='';
    $('#send-input').onclick=sendInput;
    $('#stop-code').onclick=()=>stopRun().catch(fail);
    $('#stdin').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.ctrlKey&&!e.metaKey&&!e.isComposing){e.preventDefault();sendInput();}};
    $('#sample-input').onclick=()=>{$('#stdin').value=sampleInput.replace(/\r?\n$/,'');$('#stdin').focus();};
    $('#clear-console').onclick=()=>{if(liveSession){liveSession.clearOffset=liveSession.output.length;paintRun();}else{$('#console').textContent='> Console cleared.';$('#console').classList.remove('error');}};
    if(liveSession)paintRun();
  }
  if(route==='notes')$('#notes-text').oninput=()=>{
    $('#notes-status').textContent='Saving…';clearTimeout(noteTimer);
    const value=$('#notes-text').value;
    noteTimer=setTimeout(()=>{noteSaving=noteSaving.catch(()=>{}).then(()=>statePatch({notes:value}));noteSaving.then(()=>{if($('#notes-status'))$('#notes-status').textContent='Saved to disk';}).catch(fail);},600);
  };
  if(route==='mocks'&&$('#timer-toggle')) {$('#timer-toggle').onclick=toggleTimer;$('#timer-reset').onclick=resetTimer;updateClock();}
  if(route==='workspace') {$('#upload-btn').onclick=()=>$('#upload').click();$('#upload').onchange=upload;}
  if(route==='settings') {
    $$('[data-theme]').forEach(b=>b.onclick=async()=>{try{await statePatch({theme:b.dataset.theme});theme();$$('[data-theme]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b);});}catch(e){fail(e);}});
    $('#export-progress').onclick=()=>downloadBlob('1620-progress.json',JSON.stringify(S.state,null,2));
  }
}
function fail(e){toast(e.message||String(e),true);}
function bindCommon() {
  $$('[data-action]').forEach(b=>b.onclick=()=>createDialog(b.dataset.action));
  $$('[data-module]').forEach(b=>b.onclick=e=>{e.preventDefault();moduleDialog(Number(b.dataset.module));});
  $$('[data-file]').forEach(b=>b.onclick=async()=>{
    try {
      if(b.dataset.kind==='folder'){
        if(route==='lab'){
          if(collapsedFolders.has(b.dataset.file))collapsedFolders.delete(b.dataset.file);else collapsedFolders.add(b.dataset.file);
          $('#file-tree').innerHTML=explorer();bindCommon();
        }else createDialog('new-file',b.dataset.file+'/Main.java');
        return;
      }
      if(!/\.(java|txt|md|json|csv)$/i.test(b.dataset.file))return downloadFile(b.dataset.file);
      if(route==='lab')await openFile(b.dataset.file);else {await statePatch({lastFile:b.dataset.file});location.hash='lab';}
    } catch(e){fail(e);}
  });
  $$('[data-download]').forEach(b=>b.onclick=()=>downloadFile(b.dataset.download).catch(fail));
  $$('[data-rename]').forEach(b=>b.onclick=()=>renameDialog(b.dataset.rename));
  $$('[data-trash]').forEach(b=>b.onclick=()=>trashDialog(b.dataset.trash));

}
function moduleDialog(i) {
  const group=lessons.filter(l=>l.module===courseModules[i].id);
  showDialog(`<span class="eyebrow">MODULE ${String(i+1).padStart(2,'0')}</span><h2>${esc(courseModules[i].title)}</h2><div class="related-links">${group.map(l=>`<a href="#learn/${l.id}" data-close-modal>${esc(l.title)} <span>→</span></a>`).join('')}</div>`);
  $$('[data-close-modal]').forEach(a=>a.onclick=()=>modal.close());
}
async function openFile(file) {
  if(desktopUI)desktopUI.show();
  await enqueueSave();
  const {content}=await api('file?path='+encodeURIComponent(file));
  activeFile=file;await statePatch({lastFile:file});
  const check=$('#check-code');if(check)check.disabled=file!==S.state.activeChallenge?.path || !!liveSession&&liveSession.phase!=='finished';
  const editor=$('#code');if(!editor)return;
  editor.disabled=false;editor.value=content;$('#file-tab').textContent=file;
  $('#file-tree').innerHTML=explorer();bindCommon();updateLines();
  $('#save-label').textContent='Saved to disk';
  editor.oninput=()=>{drafts.set(activeFile,editor.value);$('#save-label').textContent='Saving…';updateLines();clearTimeout(saveTimer);saveTimer=setTimeout(()=>enqueueSave().catch(fail),650);};
  editor.onkeydown=e=>{
    if(e.key==='Tab'){e.preventDefault();const a=editor.selectionStart,b=editor.selectionEnd;editor.setRangeText('    ',a,b,'end');editor.dispatchEvent(new Event('input'));}
  };
  editor.onscroll=()=>{$('#line-numbers').scrollTop=editor.scrollTop;};editor.onclick=updateCursor;editor.onkeyup=updateCursor;
}
function updateLines(){const el=$('#code');if(!el)return;$('#line-numbers').textContent=Array.from({length:el.value.split('\n').length},(_,i)=>i+1).join('\n');updateCursor();}
function updateCursor(){const e=$('#code');if(!e)return;const before=e.value.slice(0,e.selectionStart),lines=before.split('\n');$('#cursor-status').textContent=`Ln ${lines.length}, Col ${lines.at(-1).length+1}`;}
function paintRun() {
  const session=liveSession, consoleEl=$('#console');if(!session||route!=='lab'||!consoleEl)return;
  const active=session.phase!=='finished', accepting=session.phase==='running'&&!session.stopped;
  const wasDisabled=$('#stdin').disabled;
  $('#run-code').disabled=active;$('#run-code').textContent=active?'Running…':'▷ Run';
  $('#stop-code').disabled=!active||session.stopped;
  $('#send-input').disabled=!accepting||sendingInput;$('#stdin').disabled=!accepting;
  $('#sample-input').disabled=!accepting||!sampleInput;
  if($('#check-code'))$('#check-code').disabled=active||activeFile!==S.state.activeChallenge?.path;
  $('#run-status').textContent=session.phase==='compiling'?'COMPILING…':active?(session.stopped?'STOPPING…':'RUNNING · LIVE INPUT OPEN'):'FINISHED';
  $('#stdin').placeholder=accepting?'Type an answer, or press Enter for a blank line…':'Press Run, then type your answer here…';
  const footer=active?'':`\n\n> ${session.stage==='compile'?'Compile':'Process'} exit ${session.code} · ${((Date.now()-session.startedAt)/1000).toFixed(2)}s`;
  const content=`> ${session.file}\n\n${session.output.slice(session.clearOffset||0)}${footer}`;
  if(consoleEl.textContent!==content){
    const follow=consoleEl.scrollHeight-consoleEl.scrollTop-consoleEl.clientHeight<40;
    consoleEl.textContent=content;if(follow)consoleEl.scrollTop=consoleEl.scrollHeight;
  }
  consoleEl.classList.toggle('error',!active&&session.code!==0);
  if(wasDisabled&&accepting)$('#stdin').focus();
}
async function pollRun(session) {
  let failures=0;
  while(liveSession===session&&session.phase!=='finished') {
    try {
      const update=await api('live?id='+session.id+'&cursor='+session.cursor);
      session.output+=update.output;Object.assign(session,{...update,output:session.output});failures=0;
      if(update.phase==='finished'){S.state.runs=update.runs;S.state.recentRuns=update.recentRuns;}
      paintRun();
    }catch(e){
      if(++failures>=4){await api('live/stop',{id:session.id}).catch(()=>{});session.output+='\n> Connection lost: '+e.message;session.phase='finished';session.code=-1;paintRun();break;}
    }
    if(session.phase!=='finished')await new Promise(resolve=>setTimeout(resolve,150));
  }
}
async function run() {
  const btn=$('#run-code');if(!btn||btn.disabled)return;
  if(!activeFile.endsWith('.java'))return toast('Select a Java file with a main method.',true);
  btn.disabled=true;btn.textContent='Compiling…';
  $('#console').classList.remove('error');$('#console').textContent='> Saving and compiling with your local JDK…';
  try {
    await enqueueSave();const file=activeFile, startedAt=Date.now();
    const result=await api('live/start',{path:file});
    liveSession={...result,file,startedAt,clearOffset:0};$('#stdin').value='';paintRun();
    void pollRun(liveSession);
  }catch(e){$('#console').textContent='> '+e.message;$('#console').classList.add('error');btn.disabled=false;btn.textContent='▷ Run';}
}
async function sendInput() {
  const session=liveSession, input=$('#stdin');
  if(!session||session.phase!=='running'||session.stopped||sendingInput||!input)return;
  const value=input.value;sendingInput=true;paintRun();
  try {await api('live/input',{id:session.id,input:value});input.value='';}
  catch(e){fail(e);}
  finally{sendingInput=false;paintRun();if(!input.disabled)input.focus();}
}
async function stopRun() {
  if(!liveSession||liveSession.phase==='finished')return;
  await api('live/stop',{id:liveSession.id});liveSession.stopped=true;paintRun();
}

function createDialog(kind,defaultPath) {
  const folder=kind==='new-folder';showDialog(`<h2>${folder?'A place for your next project.':'Start with a new file.'}</h2><p>Paths are relative to <code>workspace/</code>. Use a separate folder for each Java project.</p><form id="create-form" class="dialog-form"><div class="field"><label for="new-path">${folder?'Folder path':'File path'}</label><input id="new-path" required value="${attr(defaultPath||(folder?'projects/my-project':'projects/my-project/Main.java'))}" autocomplete="off"></div><p class="field-hint">${folder?'Folders are created on disk.':'Java filenames must match the public class name. A starter main method is added automatically.'}</p><div class="dialog-actions"><button type="button" class="btn ghost" id="cancel">Cancel</button><button class="btn primary">Create ${folder?'folder':'file'}</button></div></form>`);
  $('#cancel').onclick=()=>modal.close();
  $('#create-form').onsubmit=async e=>{
    e.preventDefault();const file=$('#new-path').value.trim();
    try {
      await flush();const cls=file.split('/').at(-1).replace(/\.java$/,'');
      if(!folder&&file.endsWith('.java')&&!/^[A-Za-z_$][\w$]*$/.test(cls))throw new Error('Use a Java class name, such as Main.java.');
      const content=file.endsWith('.java')?`public class ${cls} {\n    public static void main(String[] args) {\n        // Your code goes here.\n    }\n}\n`:'';
      const r=await api(folder?'folder':'file',{path:file,content,create:true});S.files=r.files;modal.close();toast(folder?'Folder created on disk.':'File created on disk.');
      if(!folder&&/\.(java|txt|md|json|csv)$/i.test(file)){await statePatch({lastFile:file});if(location.hash==='#lab')await render();else location.hash='lab';}else await render();
    }catch(e){fail(e);}
  };
}
function renameDialog(file) {
  showDialog(`<h2>Rename or move.</h2><p>Enter the new workspace path. Renaming a Java file does not rename its class in the source code.</p><form id="rename-form"><div class="field"><label for="rename-path">New path</label><input id="rename-path" required value="${attr(file)}"></div><div class="dialog-actions"><button class="btn primary">Save new path</button></div></form>`);
  $('#rename-form').onsubmit=async e=>{e.preventDefault();try{await flush();const to=$('#rename-path').value.trim();const r=await api('rename',{path:file,to});S.files=r.files;if(S.state.lastFile===file||S.state.lastFile.startsWith(file+'/'))await statePatch({lastFile:to+S.state.lastFile.slice(file.length)});modal.close();await render();toast('Renamed on disk.');}catch(e){fail(e);}};
}
function trashDialog(file) {
  showDialog(`<h2>Move to local trash?</h2><p><code>${esc(file)}</code> will be removed from your workspace. A copy stays in <code>.1620/trash/</code>, including all files inside a folder.</p><div class="dialog-actions"><button class="btn ghost" id="cancel-trash">Cancel</button><button class="btn primary" id="confirm-trash">Move to trash</button></div>`);
  $('#cancel-trash').onclick=()=>modal.close();$('#confirm-trash').onclick=async()=>{try{await flush();S.files=(await api('trash',{path:file})).files;modal.close();await render();toast('Moved to .1620/trash/ on disk.');}catch(e){fail(e);}};
}
async function upload(e) {
  const files=[...e.target.files];if(!files.length)return;
  let imported=0;
  try {
    for(const file of files) {
      if(file.size>20_000_000)throw new Error(file.name+' exceeds the 20 MB limit.');
      const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=reject;reader.readAsDataURL(file);});
      S.files=(await api('file',{path:'lectures/'+file.name,base64,create:true})).files;imported++;
    }
    toast(`${imported} file${imported===1?'':'s'} imported to workspace/lectures/.`);
  }catch(e){toast(`${imported} imported. ${e.message}`,true);}finally{await render();}
}
async function downloadFile(file) {
  const r=await fetch('/api/file?path='+encodeURIComponent(file)+'&download=1',{headers:{'x-lab-token':token}});
  if(!r.ok){const d=await r.json();throw new Error(d.error);}const blob=await r.blob();downloadBlob(file.split('/').at(-1),blob);
}
function downloadBlob(name,content) {const blob=content instanceof Blob?content:new Blob([content],{type:name.endsWith('.txt')?'text/plain;charset=utf-8':'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function completedForModule(id) {return lessons.filter(l=>l.module===id&&S.state.completed.includes(l.id)).length;}
function codeFiles(files) {
  return `<div class="code-files">${Object.entries(files).map(([name,source],i)=>`<details class="code-file" ${i===0?'open':''}><summary><span class="mono">${esc(name)}</span><span>View code</span></summary><button class="copy-code" data-copy-code aria-label="Copy ${attr(name)}">Copy</button><pre class="study-code"><code>${esc(source)}</code></pre></details>`).join('')}</div>`;
}
function sampleCases(task) {
  return `<div class="sample-cases">${task.tests.map((t,i)=>`<details class="sample-case" ${i===0?'open':''}><summary>${esc(t.name)} <span class="muted small">Input → expected output</span></summary><div class="sample-columns"><div><span class="small-label">STANDARD INPUT</span><pre>${esc(t.stdin||'(no input)')}</pre></div><div><span class="small-label">EXPECTED OUTPUT</span><pre>${esc(t.expected)}</pre></div></div></details>`).join('')}</div>`;
}
function learn() {
  const lesson=lessons.find(x=>x.id===routeDetail);
  if(lesson)return lessonView(lesson);
  const completed=S.state.completed.filter(id=>lessons.some(l=>l.id===id)).length;
  const saved=lessons.filter(l=>(S.state.bookmarked||[]).includes(l.id));
  return heading('01 / UNDERSTAND','Your learning path.',`${lessons.length} short lessons. Read the idea, run the example, then explain it yourself.`,`<span class="pill green">${completed} / ${lessons.length} completed</span>`)+
  `${saved.length?`<details class="panel lesson-section"><summary class="text-link">★ Saved lessons (${saved.length})</summary><div class="related-links">${saved.map(l=>`<a href="#learn/${l.id}">${esc(l.title)} <span>Open →</span></a>`).join('')}</div></details>`:''}<div class="notice">Built around your lecture decks and Week1–Week10 examples. The topic groups reorganize the material for practice; lesson source labels show where each idea comes from.</div><div class="grid-3">${courseModules.map((m,i)=>{
    const group=lessons.filter(l=>l.module===m.id),done=completedForModule(m.id),next=group.find(l=>!S.state.completed.includes(l.id))||group[0];
    return `<article class="panel topic-card"><div class="topic-top"><span class="mono">MODULE ${String(i+1).padStart(2,'0')}</span><span class="pill ${done===group.length?'green':''}">${done} / ${group.length} read</span></div><h2>${esc(m.title)}</h2><p>${esc(m.description)}</p><div class="progress-track" role="progressbar" aria-label="${attr(m.title)} completion" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${group.length}"><span style="width:${done/group.length*100}%"></span></div><ul class="lesson-list">${group.map(l=>`<li><a href="#learn/${l.id}"><span class="lesson-dot ${S.state.completed.includes(l.id)?'done':''}">${S.state.completed.includes(l.id)?'✓':''}</span>${esc(l.title)}</a></li>`).join('')}</ul><a class="text-link" href="#learn/${next.id}">${done?'Continue module':'Begin module'} →</a></article>`;
  }).join('')}</div>`;
}
function lessonView(l) {
  const group=lessons.filter(x=>x.module===l.module),module=courseModules.find(m=>m.id===l.module),index=lessons.indexOf(l),done=S.state.completed.includes(l.id),star=(S.state.bookmarked||[]).includes(l.id);
  const related=exercises.filter(x=>x.module===l.module).slice(0,3);
  return `<div class="study-back"><a class="text-link" href="#learn">← All modules</a><span class="muted small">${l.number} / ${lessons.length} lessons</span></div>`+
  heading(esc(module.title).toUpperCase(),esc(l.title),esc(l.summary),`<button class="btn ghost compact" data-bookmark="${l.id}" aria-pressed="${star}">${star?'★ Saved':'☆ Save lesson'}</button>`)+
  `<div class="reading-layout"><aside class="reading-toc panel"><span class="small-label">IN THIS MODULE</span>${group.map(x=>`<a href="#learn/${x.id}" class="toc-link ${x===l?'current':''}">${S.state.completed.includes(x.id)?'✓':'·'} ${esc(x.title)}</a>`).join('')}<p class="field-hint">Source group<br>${l.sources.map(esc).join('<br>')}</p></aside><article class="lesson-body"><section class="panel lesson-section"><span class="small-label">THE IDEA</span>${l.points.map(p=>`<p>${esc(p)}</p>`).join('')}</section><section class="lesson-section no-border"><div class="section-header"><h2>See it in code</h2><button class="btn primary compact" data-open-bundle="lesson:${l.id}">Open example in lab ↗</button></div>${codeFiles(l.files)}${l.stdin?`<div class="example-input"><span class="small-label">STANDARD INPUT</span><pre>${esc(l.stdin)}</pre></div>`:''}<div class="example-output"><span class="small-label">EXPECTED OUTPUT</span><pre>${esc(l.output)}</pre></div></section><section class="panel lesson-section"><h2>Follow the execution</h2><ol class="walkthrough">${l.walkthrough.map(p=>`<li>${esc(p)}</li>`).join('')}</ol>${l.trace?`<div class="trace-scroll"><table class="trace-table"><thead><tr>${l.trace.columns.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${l.trace.rows.map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</section><section class="panel lesson-section caution"><h2>Common mistakes</h2><ul>${l.pitfalls.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></section><section class="panel lesson-section"><h2>Try one change</h2><p>${esc(l.tryIt)}</p><button class="btn ghost compact" data-open-bundle="lesson:${l.id}">Open your example copy →</button></section><section class="panel lesson-section"><span class="small-label">EXPLAIN IT YOURSELF</span><h2 style="margin-top:12px">${esc(l.check.question)}</h2><label class="field-hint" for="lesson-answer">Your answer (autosaved)</label><textarea id="lesson-answer" class="answer-area" data-lesson="${l.id}" placeholder="Write the reason, not only the result.">${esc(S.state.lessonAnswers?.[l.id]||'')}</textarea><details class="reveal"><summary>Reveal the explanation</summary><p>${esc(l.check.answer)}</p></details></section>${related.length?`<section class="panel lesson-section"><h2>Practise this module</h2><div class="related-links">${related.map(e=>`<a href="#practice/${e.id}">${esc(e.title)} <span>${e.level} →</span></a>`).join('')}</div></section>`:''}<div class="lesson-actions"><button class="btn ${done?'ghost':'primary'}" data-complete="${l.id}">${done?'✓ Completed · mark unread':'Mark lesson completed'}</button>${lessons[index+1]?`<a class="btn ghost" href="#learn/${lessons[index+1].id}">Next lesson →</a>`:'<a class="btn ghost" href="#mocks">Try a mock test →</a>'}</div><p class="field-hint source-foot">Original explanation and examples, aligned to ${l.sources.map(esc).join(', ')}. Completion records your own review.</p></article></div>`;
}
function referenceCards() {
  const q=referenceQuery.toLowerCase();
  const entries=referenceEntries.filter(r=>(referenceCategory==='All'||r.category===referenceCategory)&&`${r.name} ${r.description} ${r.snippet} ${r.gotcha}`.toLowerCase().includes(q));
  return `<div class="reference-count">${entries.length} matching entries</div><div class="reference-grid">${entries.map(r=>`<article class="panel reference-card"><span class="small-label">${esc(r.category)}</span><h2 class="mono">${esc(r.name)}</h2><p>${esc(r.description)}</p><pre class="study-code"><code>${esc(r.snippet)}</code></pre><div class="reference-output"><span>RESULT</span><pre>${esc(r.output)}</pre></div><p class="gotcha">${esc(r.gotcha)}</p><button class="text-link icon-btn" data-open-bundle="reference:${r.id}">Try it in lab →</button></article>`).join('')||'<section class="panel empty"><h2>No matching commands.</h2><p>Try a shorter term or choose All categories.</p></section>'}</div>`;
}
function reference() {
  const cats=['All',...new Set(referenceEntries.map(r=>r.category))];
  return heading('02 / LOOK IT UP','Less searching. More coding.',`${referenceEntries.length} concise entries with syntax, examples, expected results and the mistakes to avoid.`)+`<div class="study-search"><label class="field" for="reference-search"><span class="small-label">SEARCH COMMANDS & PATTERNS</span><input id="reference-search" type="search" value="${attr(referenceQuery)}" placeholder="Try Math.round, substring, Scanner or arrays"></label></div><div class="filterbar">${cats.map(c=>`<button class="chip ${referenceCategory===c?'active':''}" data-reference-filter="${attr(c)}">${esc(c)}</button>`).join('')}</div><div id="reference-results">${referenceCards()}</div>`;
}
function exerciseCards() {
  const q=exerciseQuery.toLowerCase();
  const entries=exercises.filter(e=>(exerciseLevel==='All'||e.level===exerciseLevel)&&(exerciseKind==='All'||e.kind===exerciseKind)&&`${e.title} ${e.prompt} ${e.module}`.toLowerCase().includes(q));
  return `<div class="reference-count">${entries.length} matching tasks · checks compare sample output, not every possible solution</div><div class="grid-3">${entries.map(e=>{
    const check=S.state.checks?.['exercise:'+e.id],passed=check&&check.passed===check.total;
    return `<article class="panel topic-card"><div class="topic-top"><span class="pill ${passed?'green':''}">${passed?'✓ Sample tests passed':e.level}</span><span class="small-label">${e.kind==='debug'?'DEBUG':'CODE'}</span></div><h2>${esc(e.title)}</h2><p>${esc(e.prompt)}</p><span class="muted small">${esc(courseModules.find(m=>m.id===e.module).title)}</span><a class="text-link" href="#practice/${e.id}">${check?'Continue practice':'Read the challenge'} →</a></article>`;
  }).join('')||'<section class="panel empty"><h2>No matching tasks.</h2><p>Try another filter.</p></section>'}</div>`;
}
function practice() {
  const exercise=exercises.find(e=>e.id===routeDetail);if(exercise)return exerciseView(exercise);
  return heading('03 / GET HANDS-ON','Think it. Write it. Run it.',`${exercises.length} coding and debugging challenges. Hints and solutions stay closed until you want them.`)+`<div class="practice-filters"><label class="field"><span class="small-label">FIND A TASK</span><input type="search" id="exercise-search" value="${attr(exerciseQuery)}" placeholder="Search a topic or scenario"></label><label class="field"><span class="small-label">DIFFICULTY</span><select id="exercise-level">${['All','Easy','Intermediate','Advanced'].map(v=>`<option ${exerciseLevel===v?'selected':''}>${v}</option>`).join('')}</select></label><label class="field"><span class="small-label">TYPE</span><select id="exercise-kind"><option value="All">All tasks</option><option value="code" ${exerciseKind==='code'?'selected':''}>Write code</option><option value="debug" ${exerciseKind==='debug'?'selected':''}>Debug code</option></select></label></div><div id="exercise-results">${exerciseCards()}</div>`;
}
function solutionSection(task,key) {
  return `<details class="panel solution-section"><summary>Reveal the worked solution <span class="muted small">Try the problem first</span></summary><div class="solution-inner"><p>${esc(task.explanation)}</p>${codeFiles(task.solution)}<button class="btn ghost compact" data-open-solution="${key}">Open a separate solution copy ↗</button><p class="field-hint">Your working files are preserved. The solution opens in a different folder.</p></div></details>`;
}
function exerciseView(e) {
  const result=S.state.checks?.['exercise:'+e.id];
  return `<div class="study-back"><a class="text-link" href="#practice">← All practice</a><span class="pill">${e.kind==='debug'?'Debugging drill':e.level}</span></div>`+heading('PRACTICE / '+esc(e.module.toUpperCase()),esc(e.title),esc(e.prompt),`<button class="btn primary" data-open-bundle="exercise:${e.id}">${e.kind==='debug'?'Open faulty code':'Open starter / saved work'} ↗</button>`)+`<div class="task-layout"><div><section class="panel lesson-section"><h2>The task</h2><ol class="requirements">${e.requirements.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><p class="field-hint">Use the exact output format shown. Sample checks ignore surrounding whitespace and normalize line endings; extra prompts still count as extra output.</p></section><section class="lesson-section no-border"><h2 style="margin-bottom:16px">Sample cases</h2>${sampleCases(e)}</section>${solutionSection(e,'exercise:'+e.id)}</div><aside><section class="panel lesson-section"><span class="small-label">YOUR PROGRESS</span><h2 style="margin-top:12px">${result?result.passed+' / '+result.total+' sample tests passed':'Ready for a first attempt.'}</h2><p>Open the task in the lab, write your code, then use Check sample tests. Test additional cases yourself.</p><button class="btn primary compact" data-open-bundle="exercise:${e.id}">Continue in code lab →</button></section><section class="panel lesson-section"><h2>Need a nudge?</h2>${e.hints.map((h,i)=>`<details class="reveal"><summary>Hint ${i+1}</summary><p>${esc(h)}</p></details>`).join('')}</section></aside></div>`;
}
function currentMock(){return mockTests.find(m=>m.id===routeDetail);}
function mocks() {
  const task=currentMock();
  if(!task)return heading('05 / PUT IT TOGETHER','Make the pieces work together.','Three original mock tests covering calculations, arrays and a complete object-based library system.')+`<div class="notice">Practice mocks aligned to your materials. The questions are original, not official York exam papers. Timers are optional, sample tests check console behaviour, and rubrics support your own review.</div><div class="grid-3">${mockTests.map((m,i)=>`<section class="panel topic-card"><div class="topic-top"><span class="mono">MOCK 0${i+1}</span><span class="pill">${m.minutes} min</span></div><h2>${esc(m.title)}</h2><p>${esc(m.summary)}</p><span class="muted small">100-point self-review rubric · ${m.tests.length} sample cases</span><a class="text-link" href="#mocks/${m.id}">Open the mock →</a></section>`).join('')}</div>`;
  const review=S.state.mockReview?.[task.id]||[],points=task.rubric.reduce((sum,r,i)=>sum+(review.includes(i)?r.points:0),0);
  return `<div class="study-back"><a class="text-link" href="#mocks">← All mock tests</a><span class="pill">${task.minutes} minute practice</span></div>`+heading('MOCK TEST / '+task.id.toUpperCase(),esc(task.title),esc(task.summary),`<button class="btn primary" data-open-bundle="mock:${task.id}">Open starter / saved work ↗</button>`)+`<div class="task-layout"><div><section class="panel lesson-section"><h2>The brief</h2><ol class="requirements">${task.requirements.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></section><section class="lesson-section no-border"><h2 style="margin-bottom:16px">Sample cases</h2>${sampleCases(task)}</section><section class="panel lesson-section"><h2>Hints, one at a time</h2>${task.hints.map((h,i)=>`<details class="reveal"><summary>Hint ${i+1}</summary><p>${esc(h)}</p></details>`).join('')}</section>${solutionSection(task,'mock:'+task.id)}</div><aside><section class="panel lesson-section"><span class="small-label">PRACTICE TIMER</span><div class="mock-timer" id="mock-clock">${task.minutes}:00</div><p class="field-hint">Time and pause state are saved on disk. The timer keeps counting while the app is closed; it displays the remaining time on return.</p><div class="timer-controls" style="margin-top:18px"><button class="btn primary compact" id="timer-toggle">Start timer</button><button class="btn ghost compact" id="timer-reset">Reset</button></div><p id="timer-state" class="field-hint" style="margin-top:14px"></p></section><section class="panel lesson-section"><span class="small-label">SELF-REVIEW / NOT AN OFFICIAL GRADE</span><h2 id="rubric-score" style="margin-top:12px">${points} / 100 reviewed points</h2><p>After testing your code, check the requirements you can explain and demonstrate. These checks record your own assessment.</p><div class="rubric">${task.rubric.map((r,i)=>`<label><input type="checkbox" data-rubric="${i}" ${review.includes(i)?'checked':''}><span>${esc(r.label)}</span><b>${r.points}</b></label>`).join('')}</div></section></aside></div>`;
}
function challengeFor(key) {
  if(!key)return null;const [type,id]=key.split(':');return (type==='mock'?mockTests:type==='exercise'?exercises:type==='reference'?referenceEntries:lessons).find(x=>x.id===id);
}
async function openBundle(key,solution=false) {
  const item=challengeFor(key);if(!item)return;
  try {
    await flush();const [type,id]=key.split(':');
    const folder=solution?`solutions/${type}/${id}`:type==='lesson'?`examples/${id}`:type==='reference'?`reference/${id}`:type==='exercise'?`practice/${id}`:`mocks/${id}`;
    const files=solution?item.solution:item.files;if(!files)throw new Error('No solution bundle for this entry.');
    for(const [name,content]of Object.entries(files)){
      const file=folder+'/'+name;
      if(!S.files.some(f=>f.path===file)){
        try {S.files=(await api('file',{path:file,content,create:true})).files;}
        catch(e){if(!e.message.includes('already exists'))throw e;S.files=(await api('bootstrap')).files;}
      }
    }
    const challenge=(type==='exercise'||type==='mock')?{key,path:folder+'/Main.java',solution}:null;
    await statePatch({lastFile:folder+'/Main.java',activeChallenge:challenge});
    for(const f of [...collapsedFolders])if(folder.startsWith(f))collapsedFolders.delete(f);
    pendingInput=item.tests?.[0]?.stdin??item.stdin??'';
    if(location.hash==='#lab')await render();else location.hash='lab';
    if($('#stdin')){sampleInput=pendingInput;pendingInput='';if(liveSession)paintRun();}
    toast(solution?'Opened a separate solution copy.':'Opened your saved copy. Existing work preserved.');
  }catch(e){fail(e);}
}
async function checkSamples() {
  const context=S.state.activeChallenge,item=challengeFor(context?.key),btn=$('#check-code');if(!item||!btn||btn.disabled)return;
  const consoleEl=$('#console');btn.disabled=true;$('#run-code').disabled=true;consoleEl.classList.remove('error');consoleEl.textContent='> Saving, compiling and checking sample cases…';
  try {
    await enqueueSave();
    const result=await api('check',{path:activeFile,challenge:context.key});
    S.state.checks ||= {};S.state.checks[context.key]={file:activeFile,passed:result.passed,total:result.total,time:result.time};
    consoleEl.textContent=result.compiled?`> ${result.passed} / ${result.total} sample tests passed\n\n`+result.cases.map(c=>`${c.passed?'PASS':'FAIL'} · ${c.name}\nInput:\n${c.stdin||'(no input)'}\nExpected:\n${c.expected}\nActual (exit ${c.exitCode}):\n${c.actual||'(no output)'}\n`).join('\n'):`> Compilation failed\n\n${result.compileOutput}`;
    consoleEl.classList.toggle('error',result.passed!==result.total);toast(`${result.passed} / ${result.total} sample tests passed. These checks are not exhaustive.`);
  }catch(e){consoleEl.textContent='> '+e.message;consoleEl.classList.add('error');}
  finally{btn.disabled=false;$('#run-code').disabled=false;}
}
function bindStudy() {
  $$('[data-copy-code]').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.closest('details').querySelector('code').textContent);toast('Code copied.');}catch(e){toast('Select the code and use Ctrl+C to copy.',true);}});
  $$('[data-open-bundle]').forEach(b=>b.onclick=()=>openBundle(b.dataset.openBundle));
  $$('[data-open-solution]').forEach(b=>b.onclick=()=>openBundle(b.dataset.openSolution,true));
  $$('[data-complete]').forEach(b=>b.onclick=async()=>{try{const id=b.dataset.complete,completed=S.state.completed.includes(id)?S.state.completed.filter(x=>x!==id):[...S.state.completed,id];await statePatch({completed});await render();}catch(e){fail(e);}});
  $$('[data-bookmark]').forEach(b=>b.onclick=async()=>{try{const id=b.dataset.bookmark,bookmarked=S.state.bookmarked||[];await statePatch({bookmarked:bookmarked.includes(id)?bookmarked.filter(x=>x!==id):[...bookmarked,id]});b.textContent=S.state.bookmarked.includes(id)?'★ Saved':'☆ Save lesson';b.setAttribute('aria-pressed',S.state.bookmarked.includes(id));}catch(e){fail(e);}});
  if($('#lesson-answer'))$('#lesson-answer').oninput=()=>{clearTimeout(answerTimer);const id=$('#lesson-answer').dataset.lesson,value=$('#lesson-answer').value;answerTimer=setTimeout(()=>statePatch({lessonAnswers:{...S.state.lessonAnswers,[id]:value}}).catch(fail),600);};
  if($('#reference-search'))$('#reference-search').oninput=()=>{referenceQuery=$('#reference-search').value;$('#reference-results').innerHTML=referenceCards();bindStudy();};
  $$('[data-reference-filter]').forEach(b=>b.onclick=()=>{referenceCategory=b.dataset.referenceFilter;$$('[data-reference-filter]').forEach(x=>x.classList.toggle('active',x===b));$('#reference-results').innerHTML=referenceCards();bindStudy();});
  if($('#exercise-search'))$('#exercise-search').oninput=()=>{exerciseQuery=$('#exercise-search').value;$('#exercise-results').innerHTML=exerciseCards();};
  if($('#exercise-level'))$('#exercise-level').onchange=()=>{exerciseLevel=$('#exercise-level').value;$('#exercise-results').innerHTML=exerciseCards();};
  if($('#exercise-kind'))$('#exercise-kind').onchange=()=>{exerciseKind=$('#exercise-kind').value;$('#exercise-results').innerHTML=exerciseCards();};
  $$('[data-rubric]').forEach(b=>b.onchange=async()=>{try{const m=currentMock(),values=$$('[data-rubric]').filter(x=>x.checked).map(x=>Number(x.dataset.rubric));await statePatch({mockReview:{...S.state.mockReview,[m.id]:values}});$('#rubric-score').textContent=m.rubric.reduce((sum,r,i)=>sum+(values.includes(i)?r.points:0),0)+' / 100 reviewed points';}catch(e){fail(e);}});
  if($('#check-code'))$('#check-code').onclick=checkSamples;
}

function sources() {
  return heading('COURSE / SOURCE ALIGNMENT','Built around your lectures.','Original explanations and examples, with the lecture topics mapped below.')+`<section class="panel lesson-section"><h2>Coverage map</h2><p>The eight learning modules reorganize the lecture sequence so related ideas stay together. Original slide decks and weekly source files are not redistributed in this public repository.</p><div class="trace-scroll"><table class="trace-table"><thead><tr><th>Source group</th><th>Covered topics</th></tr></thead><tbody>${sourceNotes.map(s=>`<tr><td>${esc(s.source)}</td><td>${esc(s.topics)}</td></tr>`).join('')}</tbody></table></div></section><section class="panel lesson-section"><h2>Corrections to watch for</h2><p>Older slides and some weekly examples contain typos or simplified wording. The lessons use the corrected rules.</p>${corrections.map(c=>`<div class="source-correction"><span class="small-label">${esc(c.source)}</span><p>${esc(c.text)}</p></div>`).join('')}</section><section class="panel lesson-section"><h2>Official Java documentation</h2><div class="related-links">${documentation.map(d=>`<a href="${attr(d.url)}" target="_blank" rel="noopener noreferrer">${esc(d.title)} <span>↗</span></a>`).join('')}</div></section><section class="panel lesson-section"><h2>Assignment design checklist</h2><p>Your uploaded A1 asks you to design your own formula-based calculation with user input, a Random value and a Math method. Use the lessons to practise those skills, and write your own assignment. The app provides original learning exercises rather than a completed A1 submission.</p><p>Mock questions are original practice, not official past papers. Automatic checks compare sample output. Use the rubrics to review design and write your own additional tests.</p></section>`;
}
function timerMatches() {const m=currentMock();return !m||!S.state.mock||((S.state.mock.id||'library')===m.id);}
function remaining() {
  const m=currentMock(),record=timerMatches()?S.state.mock:null;
  if(!record)return (m?.minutes||90)*60;
  return record.status==='running'?Math.max(0,Math.ceil((record.endsAt-Date.now())/1000)):record.remaining;
}
async function toggleTimer() {
  try {
    const task=currentMock();if(!task)return;
    if(!timerMatches()){
      showDialog(`<h2>Start the timer for this mock?</h2><p>Your saved timer belongs to another mock. Starting ${esc(task.title)} will replace that timer. Your code stays saved.</p><div class="dialog-actions"><button class="btn primary" id="switch-timer">Start ${task.minutes}-minute timer</button></div>`);
      $('#switch-timer').onclick=async()=>{try{await statePatch({mock:{id:task.id,status:'running',endsAt:Date.now()+task.minutes*60000,remaining:task.minutes*60}});modal.close();updateClock();}catch(e){fail(e);}};
      return;
    }
    if(S.state.mock?.status==='running')await statePatch({mock:{id:task.id,status:'paused',remaining:remaining()}});
    else if(remaining()>0){const seconds=remaining();await statePatch({mock:{id:task.id,status:'running',endsAt:Date.now()+seconds*1000,remaining:seconds}});}
    else return toast('Reset the timer to start another session.');
    updateClock();
  }catch(e){fail(e);}
}
function resetTimer() {
  const task=currentMock();if(!task)return;
  showDialog(`<h2>Reset this practice timer?</h2><p>The timer will return to ${task.minutes} minutes. Your code and self-review checklist stay saved.</p><div class="dialog-actions"><button class="btn primary" id="reset-confirm">Reset timer</button></div>`);
  $('#reset-confirm').onclick=async()=>{try{await statePatch({mock:{id:task.id,status:'paused',remaining:task.minutes*60}});modal.close();updateClock();}catch(e){fail(e);}};
}
function updateClock() {
  if(!S)return;
  const seconds=remaining(),record=timerMatches()?S.state.mock:null;
  if($('#mock-clock')){
    $('#mock-clock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
    $('#timer-toggle').textContent=!timerMatches()?'Start this mock':record?.status==='running'?'Pause':record?.status==='paused'?'Resume':'Start timer';
    $('#timer-state').textContent=!timerMatches()?'A timer for another mock is saved.':record?.status==='running'?'Running · your remaining time is saved.':record?.status==='paused'?'Paused.':seconds===0?'Session finished · review your work.':'Ready when you are.';
  }
  const active=S.state.mock;
  if(active?.status==='running'&&active.endsAt<=Date.now()){
    S.state.mock={id:active.id||'library',status:'finished',remaining:0};statePatch({mock:S.state.mock}).catch(fail);toast('Practice timer finished. Your code is saved.');
  }
}

function searchDialog(){showDialog('<h2>Find your next step.</h2><div class="field"><label for="search-input">Lessons, reference commands, practice and saved files</label><input id="search-input" placeholder="Try loops, code lab or Main.java" autocomplete="off"></div><div class="search-results" id="search-results"></div>');const search=()=>{const q=$('#search-input').value.toLowerCase();const entries=[...nav.map(([id,title])=>({title,detail:'Study space',route:id})),...modules.map((m,i)=>({title:m[0],detail:'Module · '+m[1],module:i})),...lessons.map(x=>({title:x.title,detail:'Lesson · '+x.summary,route:'learn/'+x.id})),...referenceEntries.map(x=>({title:x.name,detail:'Reference · '+x.description,reference:x.id})),...exercises.map(x=>({title:x.title,detail:'Practice · '+x.prompt,route:'practice/'+x.id})),...mockTests.map(x=>({title:x.title,detail:'Mock test · '+x.summary,route:'mocks/'+x.id})),...S.files.filter(x=>x.type==='file').map(x=>({title:x.name,detail:x.path,file:x.path}))].filter(x=>(x.title+' '+x.detail).toLowerCase().includes(q)).slice(0,18);$('#search-results').innerHTML=entries.length?entries.map((x,i)=>`<button class="search-result" data-result="${i}">${esc(x.title)}<small>${esc(x.detail)}</small></button>`).join(''):'<p>No matches. Try another word.</p>';$$('[data-result]').forEach(b=>b.onclick=async()=>{const x=entries[Number(b.dataset.result)];modal.close();if(x.module!==undefined)return moduleDialog(x.module);if(x.reference){referenceCategory='All';referenceQuery=referenceEntries.find(r=>r.id===x.reference).name;if(location.hash==='#reference')return render();location.hash='reference';return;}if(x.file){try{if(!/\.(java|txt|md|json|csv)$/i.test(x.file))return await downloadFile(x.file);await statePatch({lastFile:x.file});if(route==='lab')return await openFile(x.file);location.hash='lab';}catch(e){fail(e);}}else location.hash=x.route;});};$('#search-input').oninput=search;search();}
$('#open-search').onclick=()=>S&&searchDialog();$('#menu').onclick=()=>$('#sidebar').classList.toggle('open');
window.addEventListener('hashchange',()=>S&&render().catch(fail));
window.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey))return;if(e.key.toLowerCase()==='k'){e.preventDefault();if(S){if(modal.open)modal.close();searchDialog();}}if(e.key.toLowerCase()==='s'){e.preventDefault();if(S)flush().then(()=>toast('Saved to disk.')).catch(fail);}if(e.key==='Enter'&&route==='lab'&&!modal.open){e.preventDefault();run();}});
window.addEventListener('beforeunload',e=>{if(drafts.size||$('#notes-text')?.value!==undefined&&$('#notes-text').value!==S?.state.notes||$('#lesson-answer')&&$('#lesson-answer').value!==(S?.state.lessonAnswers?.[$('#lesson-answer').dataset.lesson]||'')){e.preventDefault();e.returnValue='';}});
setInterval(updateClock,1000);
async function desktopAction(action) {
  try {
    if(action==='save'){await flush();toast('All changes saved to disk.');}
    else if(action==='new-file'||action==='new-folder')createDialog(action);
    else if(action==='search')searchDialog();
    else if(action==='run'){if(route!=='lab')location.hash='lab';else await run();}
    else if(action==='check'){if($('#check-code')&&!$('#check-code').disabled)await checkSamples();else toast('Open a practice task in Command Prompt first.');}
    else if(action==='export-notes'){await flush();downloadBlob('Java Notes.txt',$('#notes-text')?.value??S.state.notes);}
    else if(action==='select-notes'){$('#notes-text')?.focus();$('#notes-text')?.select();}
    else if(action==='help')showDialog('<h2>Welcome to your Java desktop.</h2><p>Open an application from a desktop shortcut, the Start menu or the taskbar. Drag a title bar to move its window. Use the bottom-right corner to resize.</p><p>My Computer holds your course overview. Course Files contains all 50 lessons. Notepad saves your notes. Command Prompt compiles and runs real Java using your local JDK.</p><p><kbd>Ctrl S</kbd> Save · <kbd>Ctrl K</kbd> Search · <kbd>Ctrl Enter</kbd> Run Java · <kbd>Ctrl Esc</kbd> Start menu</p>');
  }catch(e){fail(e);}
}
try {S=await api('bootstrap');if(S.live)liveSession={...S.live,clearOffset:0};desktopUI=createDesktop({getState:()=>S,statePatch,onLaunch:hash=>{desktopUI?.show();if(location.hash!==hash)location.hash=hash;},onAction:desktopAction,flush,toast});await render();if(liveSession)void pollRun(liveSession);$('#footer-status').textContent='Saved on this computer';}
catch(e){main.innerHTML=`<section class="panel empty"><h1>Let’s reconnect.</h1><p>${esc(e.message)} Start the app with START.cmd, then refresh this page.</p><button class="btn primary" id="retry">Try again</button></section>`;$('#retry').onclick=()=>location.reload();}
