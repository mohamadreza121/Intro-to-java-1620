const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const token = $('meta[name="lab-token"]').content;
const main = $('#main');
const modal = $('#modal');
let S, route='home', routeVersion=0, activeFile='', saveTimer, noteTimer, toastTimer, saving=Promise.resolve(), noteSaving=Promise.resolve();
const drafts = new Map();
const collapsedFolders = new Set();
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
const modules = [
  ['Java foundations','Program structure, output & your first run','Introduction'],
  ['Data & expressions','Variables, types, operators & casting','DataExpressions'],
  ['Working with objects','Strings, Scanner, Math & Random','UsingObjects'],
  ['Making decisions','Boolean logic, if / else & switch','Conditionals'],
  ['Loops that make sense','while, do / while, for & nested loops','Repetitions'],
  ['Methods & decomposition','Parameters, return values & scope','Classes / weekly examples'],
  ['Building your own classes','Fields, constructors & object behaviour','Classes'],
  ['Arrays & object-oriented design','Collections of data & connected objects','OODesign / weekly examples']
];
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
}
function heading(eyebrow,title,desc,action='') {return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${action}</div>`;}
function theme() {document.body.classList.remove('theme-midnight','theme-oled');if(S.state.theme!=='graphite')document.body.classList.add('theme-'+S.state.theme);}
function fileCount(){return S.files.filter(f=>f.type==='file').length;}
function home() {
  return `${heading('YOUR STUDY SPACE','Welcome back, Reza.','A little less memorising. A lot more making sense.',`<span class="date-tag">${new Intl.DateTimeFormat('en-CA',{month:'short',day:'numeric',year:'numeric'}).format(new Date())}</span>`)}
    <section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span> INTRODUCTION TO JAVA / 1620</div><h1>Don’t just read Java.<br><em>Make it click.</em></h1><p>Your lectures, distilled. Your code, hands-on.<br>One space to learn, experiment and get exam-ready.</p><div class="hero-actions"><a href="#lab" class="btn primary">Open code lab <span>↗</span></a><a href="#learn" class="text-link">Explore the path <span>→</span></a></div></div><div class="hero-art"><div class="terminal-preview"><div class="terminal-title"><i></i><i></i><i></i><span>Main.java</span></div><pre><span class="comment">// Small steps. Real understanding.</span>
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Reza!");
    }
}

<span class="comment">&gt; Your next chapter starts here.</span><span aria-hidden="true"> ▋</span></pre><div class="terminal-foot"><span>JAVA / YOUR LOCAL MACHINE</span><span>● READY TO WRITE</span></div></div></div></section>
    <div class="stats"><div class="stat"><span class="stat-icon">${icon('learn')}</span><div><strong>00</strong><p>Lessons loaded</p></div></div><div class="stat"><span class="stat-icon">${icon('lab')}</span><div><strong>${String(S.state.runs).padStart(2,'0')}</strong><p>Programs attempted</p></div></div><div class="stat"><span class="stat-icon">${icon('workspace')}</span><div><strong>${String(fileCount()).padStart(2,'0')}</strong><p>Files in your workspace</p></div></div><div class="stat"><span class="stat-icon">${icon('settings')}</span><div><strong class="stat-word">${S.java.ready?'Connected':'Set up Java'}</strong><p>${S.java.ready?'Local Java runtime':'JDK 17+ required'}</p></div></div></div>
    <div class="dashboard-grid"><section><div class="section-header"><div><h2><span class="section-index">01 /</span>Your learning path</h2><p>From your first line to your own objects.</p></div><a href="#learn" class="text-link">View all →</a></div><div class="panel">${modules.slice(0,4).map((m,i)=>`<a class="path-row" href="#learn" data-module="${i}"><span class="path-number">0${i+1}</span><div class="path-copy"><h3>${m[0]}</h3><p>${m[1]}</p></div><span class="pill">Coming next</span><span class="path-arrow">↗</span></a>`).join('')}</div></section>
    <section><div class="section-header"><div><h2><span class="section-index">02 /</span>Build something real</h2><p>One scenario. Everything comes together.</p></div></div><div class="panel mock-card"><span class="small-label">FEATURED MOCK / PREVIEW</span><div class="mock-art">▤</div><h3>The neighbourhood library.</h3><p>Build a tiny library system. Add books, borrow a title, return it, and keep track of what’s available.</p><div class="mock-tags"><span>Classes & objects</span><span>Arrays</span><span>Menu loops</span></div><a href="#mocks" class="text-link">Explore the scenario <span>↗</span></a></div></section></div>
    <div class="bottom-strip"><span class="live-dot"></span> Local workspace <code>/ workspace</code><span>Template ready. Course content comes next.</span></div>`;
}
function learn() {
  return heading('01 / UNDERSTAND','Your learning path.','The course structure is ready. Short explanations and modern examples come next.')+`<div class="notice">Template preview · These are planned topic groups. Lecture-by-lecture explanations, examples and exercises will be added after your approval.</div><div class="grid-3">${modules.map((m,i)=>`<article class="panel topic-card"><div class="topic-top"><span class="mono">MODULE ${String(i+1).padStart(2,'0')}</span><span class="pill">Content pending</span></div><h2>${m[0]}</h2><p>${m[1]}</p><button class="text-link icon-btn" data-module="${i}">View module plan →</button></article>`).join('')}</div>`;
}
function reference() {
  const cats=['All','Input & output','Strings','Math & Random','Control flow','Objects'];
  return heading('02 / LOOK IT UP','Less searching. More coding.','A quick reference for the syntax, methods and patterns you actually use.')+`<div class="filterbar">${cats.map((c,i)=>`<button class="chip ${i===0?'active':''}" data-filter="${attr(c)}">${c}</button>`).join('')}</div><section class="panel empty"><div class="empty-icon">&lt; / &gt;</div><h2 id="reference-title">Your Java reference is taking shape.</h2><p id="reference-copy">Searchable commands, syntax, tiny examples and common mistakes will live here. The full reference is reserved for the content phase.</p><a href="#lab" class="btn primary">Try the working code lab ↗</a></section>`;
}
function practice() {
  return heading('03 / GET HANDS-ON','Think it. Write it. Run it.','A home for small challenges, debugging drills and bigger builds.')+`<div class="grid-3">${[['01','Quick reps','Focused exercises for one idea at a time.','Content pending'],['02','Find the bug','Trace the code. Explain the error. Fix it.','Content pending'],['03','Build a system','Connect the concepts in a realistic scenario.','Library mock preview']].map(x=>`<section class="panel topic-card"><div class="topic-top"><span class="mono">${x[0]}</span><span class="pill">${x[3]}</span></div><h2>${x[1]}</h2><p>${x[2]}</p><a href="${x[0]==='03'?'#mocks':'#lab'}" class="text-link">${x[0]==='03'?'See the scenario':'Open free practice'} →</a></section>`).join('')}</div><section class="panel empty" style="margin-top:20px"><div class="empty-icon">$_</div><h2>Your playground is already live.</h2><p>Create your own Java files, supply input and run them against your local JDK. All your practice is saved to your workspace.</p><a href="#lab" class="btn primary">Start coding ↗</a></section>`;
}
function explorer() {
  return S.files.filter(f=>(f.type==='folder'||/\.(java|txt|md|json|csv)$/i.test(f.path))&&![...collapsedFolders].some(folder=>f.path.startsWith(folder+'/'))).map(f=>`<button class="file-entry ${f.path===activeFile?'selected':''}" style="padding-left:${11+f.path.split('/').length*9}px" data-file="${attr(f.path)}" data-kind="${f.type}" ${f.type==='folder'?`aria-expanded="${!collapsedFolders.has(f.path)}"`:''} title="${attr(f.path)}"><span class="file-icon">${f.type==='folder'?(collapsedFolders.has(f.path)?'›':'⌄'):'J'}</span><span>${esc(f.name)}</span></button>`).join('');
}
function lab() {
  return heading('04 / THE CODE LAB','Where it starts to click.','Real Java. Your files. Room to try, break, fix and understand.',`<button class="btn ghost" data-action="new-file">+ New file</button>`)+`${!S.java.ready?'<div class="notice">Java needs a JDK 17 or newer. The editor and file saving work now; install your JDK and restart to enable Run.</div>':''}<div class="lab-top"><p><span class="small-label">LOCAL JAVA</span> · Files in the same folder compile together.</p><span class="pill green">Ctrl + Enter to run</span></div><section class="editor-layout"><aside class="explorer"><div class="explorer-head">EXPLORER <span class="explorer-actions"><button class="icon-btn" data-action="new-file" aria-label="Create file" title="Create file">+</button><button class="icon-btn" data-action="new-folder" aria-label="Create folder" title="Create folder">▱</button></span></div><div id="file-tree">${explorer()}</div><div class="workspace-hint">workspace/<br><br>Each project gets its own folder.<br>Run the file with your main method.</div></aside><div class="editor-main"><div class="editor-toolbar"><div class="file-tab" id="file-tab">${esc(activeFile||'Select a file')}</div><div class="toolbar-actions"><span class="save-label" id="save-label">Saved to disk</span><button class="btn ghost compact" id="save-code">Save</button><button class="btn primary compact" id="run-code">▷ Run</button></div></div><div class="editor-wrap"><pre class="line-numbers" id="line-numbers" aria-hidden="true">1</pre><textarea id="code" class="code-editor" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Java source code" wrap="off" disabled></textarea></div><div class="editor-bottom"><span id="cursor-status">Ln 1, Col 1</span><span>UTF-8 · JAVA · 4 SPACES</span></div><div class="console-head"><span><b>OUTPUT</b> LOCAL CONSOLE</span><button class="icon-btn" id="clear-console" aria-label="Clear output" title="Clear output">⌫</button></div><pre class="console" id="console" role="log" aria-live="polite">&gt; Ready when you are.
&gt; Select a Java file and press Run.</pre><div class="stdin-row"><label for="stdin">STANDARD INPUT →</label><textarea id="stdin" spellcheck="false" aria-label="Program input" placeholder="Scanner input goes here, one answer per line. Supplied before Run."></textarea></div></div></section>`;
}
function mocks() {
  return heading('05 / PUT IT TOGETHER','The neighbourhood library.','A realistic mock-test scenario. Build a system, one decision at a time.')+`<div class="notice purple">Mock-test preview · The scenario shell, project files and timer work. Detailed questions, test cases, hints and solutions come in the content phase.</div><div class="mock-detail"><section class="panel brief"><span class="small-label">MOCK 01 / PROJECT BRIEF</span><h2>A small library. A complete system.</h2><p>You’re writing a console app for a neighbourhood library. Staff need to see the catalogue and manage loans without losing track of books.</p><ol><li>Model a book with a title, author and availability.</li><li>Keep a collection of books and display the catalogue.</li><li>Borrow and return a book, updating its availability.</li><li>Use a repeating menu and handle invalid choices.</li></ol><div class="mock-tags"><span>Classes</span><span>Constructors</span><span>Arrays</span><span>Scanner</span><span>Loops</span></div><button class="btn primary" id="library-project">Open starter project ↗</button><p class="small">Creates <code>mocks/library/Main.java</code> and <code>Book.java</code> with TODOs. Your existing files are preserved.</p></section><section class="panel panel-pad"><span class="small-label">PRACTICE TIMER</span><div class="mock-timer" id="mock-clock">60:00</div><p class="field-hint">An optional timer for focused practice. Your session survives a restart. This preview is self-guided and ungraded.</p><div class="timer-controls" style="margin-top:22px"><button class="btn primary compact" id="timer-toggle">Start timer</button><button class="btn ghost compact" id="timer-reset">Reset</button></div><div class="saved-runs"><span class="small-label">SESSION STATUS</span><p id="timer-state" class="field-hint" style="margin-top:12px">Not started</p></div></section></div>`;
}
function notes() {
  return heading('06 / YOUR OWN WORDS','Keep the “oh, I get it” moments.','A scratchpad for explanations, mistakes worth remembering and ideas to try.')+`<section class="panel"><div class="notes-bar"><span>MY JAVA NOTEBOOK / plain text</span><span id="notes-status">Saved to disk</span></div><textarea class="notes-area" id="notes-text" aria-label="Personal Java notes" placeholder="What made sense today?\n\nTry explaining a concept in your own words.\nOr keep a list of the mistakes you’ve learned to spot.">${esc(S.state.notes)}</textarea></section><p class="field-hint" style="margin-top:14px">Autosaved to <code>.1620/state.json</code> alongside your app. Ctrl + S saves immediately.</p>`;
}
function workspace() {
  return heading('07 / YOUR WORKSPACE','Everything you’re working on.','Java files, project folders and lecture documents. Saved on your computer.',`<div style="display:flex;gap:8px"><button class="btn ghost" data-action="new-folder">+ Folder</button><button class="btn primary" id="upload-btn">↑ Import files</button><input type="file" id="upload" multiple hidden></div>`)+`<div class="notice">Files are stored in <code>${esc(S.workspace)}</code>. Import a lecture document or create a Java project. Your personal files and notes are excluded from Git.</div><div class="panel file-list-scroll"><table class="file-table"><thead><tr><th>NAME / PATH</th><th>TYPE</th><th style="text-align:right">ACTIONS</th></tr></thead><tbody>${S.files.map(f=>`<tr><td><button class="file-name" data-file="${attr(f.path)}" data-kind="${f.type}">${f.type==='folder'?'▱':'↳'} ${esc(f.path)}</button></td><td><span class="pill">${f.type==='folder'?'Folder':esc(f.name.split('.').pop().toUpperCase())}</span></td><td class="actions">${f.type==='file'?`<button class="icon-btn" data-download="${attr(f.path)}" aria-label="Download ${attr(f.name)}" title="Download">↓</button>`:''}<button class="icon-btn" data-rename="${attr(f.path)}" aria-label="Rename ${attr(f.name)}" title="Rename">✎</button><button class="icon-btn" data-trash="${attr(f.path)}" aria-label="Move ${attr(f.name)} to trash" title="Move to local trash">×</button></td></tr>`).join('')}</tbody></table></div><div style="margin-top:20px"><button class="btn ghost" data-action="new-file">+ Create Java file</button></div>`;
}
function settings() {
  return heading('08 / MAKE IT YOURS','Your lab. Your machine.','Local by design, with files you can open outside the app.')+`<div class="settings-grid"><div><section class="panel settings-section"><h2>Workspace location</h2><p>The app saves relative to its own folder. To use your chosen location, put the app directly here:</p><div class="path-block">C:\\Users\\mrhei\\OneDrive\\Desktop\\york courses\\1620\\1620 - redo</div><p>Current app folder:</p><div class="path-block">${esc(S.root)}</div><div class="setting-row"><div><strong>Practice files & imported documents</strong><p><code>workspace/</code></p></div><a class="text-link" href="#workspace">View files →</a></div><div class="setting-row"><div><strong>Notes, timer & activity</strong><p><code>.1620/state.json</code></p></div><button class="btn ghost compact" id="export-progress">Export copy ↓</button></div><div class="setting-row"><div><strong>Local trash</strong><p><code>.1620/trash/</code> · Remove from the app, keep a disk copy.</p></div></div></section><section class="panel settings-section"><h2>Appearance</h2><p>Pick your dark. Code always stays terminal green.</p><div class="setting-row"><strong>Theme</strong><div class="theme-swatches">${['graphite','midnight','oled'].map(t=>`<button class="swatch ${S.state.theme===t?'selected':''}" data-theme="${t}" aria-label="${t} theme" aria-pressed="${S.state.theme===t}" title="${t}"></button>`).join('')}</div></div></section></div><div><section class="panel settings-section"><h2>Java runtime</h2><span class="pill ${S.java.ready?'green':''}">${S.java.ready?'Connected':'Needs setup'}</span><div class="path-block">${esc(S.java.version||'Java not detected.')}</div><p>Install a JDK 17 or newer to compile and run Java. Restart the app after installation. No npm dependencies are needed.</p></section><section class="panel settings-section"><h2>Keyboard shortcuts</h2><div class="setting-row"><strong>Save</strong><kbd>Ctrl S</kbd></div><div class="setting-row"><strong>Run Java</strong><kbd>Ctrl Enter</kbd></div><div class="setting-row"><strong>Search workspace</strong><kbd>Ctrl K</kbd></div><div class="setting-row"><strong>Indent in editor</strong><kbd>Tab</kbd></div></section><section class="panel settings-section"><h2>Template build 0.1</h2><p>Ready: local files, the editor, Java execution, notes, themes and the mock-test shell.</p><p>Next: lecture explanations, a full command reference, worked examples, practice questions and complete mock tests.</p></section></div></div>`;
}
const views={home,learn,reference,practice,lab,mocks,notes,workspace,settings};
async function render() {
  const current=++routeVersion;
  try { await flush(); } catch(e){toast('Save failed: '+e.message,true);return;}
  if(current!==routeVersion)return;
  route=location.hash.slice(1)||'home';if(!views[route])route='home';
  $('#sidebar').classList.remove('open');
  $('#crumb').textContent=nav.find(x=>x[0]===route)[1];
  $('#nav').innerHTML=nav.map(([id,title])=>`<a class="nav-link ${route===id?'active':''}" ${route===id?'aria-current="page"':''} href="#${id}"><span class="nav-icon">${icon(id)}</span>${title}${id==='lab'?'<span class="nav-tag">&gt;_</span>':''}</a>`).join('');
  main.innerHTML=views[route]();theme();bindCommon();
  if(route==='lab') {
    const f=S.files.find(x=>x.path===S.state.lastFile&&/\.(java|txt|md|json|csv)$/i.test(x.path))||S.files.find(x=>x.path.endsWith('.java'));
    if(f)await openFile(f.path);else $('#console').textContent='Create a Java file to get started.';
    $('#save-code').onclick=()=>enqueueSave().then(()=>toast('Saved to disk.')).catch(fail);
    $('#run-code').onclick=run;
    $('#clear-console').onclick=()=>{$('#console').textContent='> Console cleared.';$('#console').classList.remove('error');};
  }
  if(route==='notes')$('#notes-text').oninput=()=>{
    $('#notes-status').textContent='Saving…';clearTimeout(noteTimer);
    const value=$('#notes-text').value;
    noteTimer=setTimeout(()=>{noteSaving=noteSaving.catch(()=>{}).then(()=>statePatch({notes:value}));noteSaving.then(()=>{if($('#notes-status'))$('#notes-status').textContent='Saved to disk';}).catch(fail);},600);
  };
  if(route==='mocks') {$('#library-project').onclick=libraryProject;$('#timer-toggle').onclick=toggleTimer;$('#timer-reset').onclick=resetTimer;updateClock();}
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
  $$('[data-filter]').forEach(b=>b.onclick=()=>{$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));$('#reference-title').textContent=b.dataset.filter==='All'?'Your Java reference is taking shape.':b.dataset.filter+' reference';$('#reference-copy').textContent='This section is ready for commands, concise examples and common mistakes. Entries will be added in the content phase.';});
}
function moduleDialog(i) {
  const m=modules[i];showDialog(`<span class="eyebrow">MODULE ${String(i+1).padStart(2,'0')} / PLANNED</span><h2>${m[0]}</h2><p>${m[1]}.</p><div class="notice">Lecture explanation → modern worked example → try it yourself → check your understanding.</div><p>Source group: ${m[2]}. The precise lecture mapping and the lesson text will be filled in during the content phase.</p><div class="dialog-actions"><button class="btn primary" id="module-lab">Open free practice ↗</button></div>`);$('#module-lab').onclick=()=>{modal.close();location.hash='lab';};
}
async function openFile(file) {
  await enqueueSave();
  const {content}=await api('file?path='+encodeURIComponent(file));
  activeFile=file;await statePatch({lastFile:file});
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
async function run() {
  const btn=$('#run-code'),consoleEl=$('#console');if(!btn||btn.disabled)return;
  if(!activeFile.endsWith('.java'))return toast('Select a Java file with a main method.',true);
  btn.disabled=true;btn.textContent='Running…';consoleEl.classList.remove('error');consoleEl.textContent='> Saving and compiling with your local JDK…';
  try {
    await enqueueSave();const start=performance.now();const r=await api('run',{path:activeFile,stdin:$('#stdin').value});
    consoleEl.textContent=`> ${r.stage==='compile'?'Compilation failed':activeFile}\n\n${r.output||'(No output)'}\n\n> ${r.stage==='compile'?'Compile':'Process'} exit ${r.code} · ${((performance.now()-start)/1000).toFixed(2)}s`;
    consoleEl.classList.toggle('error',r.code!==0);S.state.runs=r.runs;S.state.recentRuns=r.recentRuns;
  } catch(e){consoleEl.textContent='> '+e.message;consoleEl.classList.add('error');}
  finally{btn.disabled=false;btn.textContent='▷ Run';}
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
function downloadBlob(name,content) {const blob=content instanceof Blob?content:new Blob([content],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function libraryProject() {
  try {
    const files={
      'mocks/library/Main.java':'public class Main {\n    public static void main(String[] args) {\n        // TODO: Create a catalogue of Book objects.\n        // TODO: Build a repeating menu for staff.\n        // TODO: List, borrow and return books.\n    }\n}\n',
      'mocks/library/Book.java':'public class Book {\n    // TODO: Add title, author and availability fields.\n    // TODO: Write a constructor.\n    // TODO: Add methods to borrow and return a book.\n}\n'
    };
    for(const [file,content]of Object.entries(files))if(!S.files.some(f=>f.path===file))S.files=(await api('file',{path:file,content,create:true})).files;
    await statePatch({lastFile:'mocks/library/Main.java'});location.hash='lab';toast('Library starter opened. Existing work preserved.');
  }catch(e){fail(e);}
}
function remaining(){const m=S.state.mock;return !m?3600:m.status==='running'?Math.max(0,Math.ceil((m.endsAt-Date.now())/1000)):m.remaining;}
async function toggleTimer(){try{const m=S.state.mock;if(m?.status==='running')await statePatch({mock:{status:'paused',remaining:remaining()}});else if(remaining()>0)await statePatch({mock:{status:'running',endsAt:Date.now()+remaining()*1000,remaining:remaining()}});else return toast('Reset the timer to start again.');updateClock();}catch(e){fail(e);}}
function resetTimer(){showDialog('<h2>Reset the practice timer?</h2><p>This resets the timer to 60 minutes. Your Java files stay saved.</p><div class="dialog-actions"><button class="btn primary" id="reset-confirm">Reset to 60:00</button></div>');$('#reset-confirm').onclick=async()=>{try{await statePatch({mock:null});modal.close();updateClock();}catch(e){fail(e);}};}
function updateClock(){if(!S)return;const seconds=remaining();if($('#mock-clock')){$('#mock-clock').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');$('#timer-toggle').textContent=S.state.mock?.status==='running'?'Pause':S.state.mock?.status==='paused'?'Resume':'Start timer';$('#timer-state').textContent=S.state.mock?.status==='running'?'In progress · finish one idea at a time.':S.state.mock?.status==='paused'?'Paused · your remaining time is saved.':seconds===0?'Session finished · review your work.':'Ready when you are.';}if(seconds===0&&S.state.mock?.status==='running'){S.state.mock={status:'finished',remaining:0};statePatch({mock:S.state.mock}).catch(fail);toast('Practice timer finished. Your code is saved.');}}
function searchDialog(){showDialog('<h2>Find your next step.</h2><div class="field"><label for="search-input">Pages, planned topics and saved files</label><input id="search-input" placeholder="Try loops, code lab or Main.java" autocomplete="off"></div><div class="search-results" id="search-results"></div>');const search=()=>{const q=$('#search-input').value.toLowerCase();const entries=[...nav.map(([id,title])=>({title,detail:'Study space',route:id})),...modules.map((m,i)=>({title:m[0],detail:'Planned module · '+m[1],module:i})),...S.files.filter(x=>x.type==='file').map(x=>({title:x.name,detail:x.path,file:x.path}))].filter(x=>(x.title+' '+x.detail).toLowerCase().includes(q)).slice(0,18);$('#search-results').innerHTML=entries.length?entries.map((x,i)=>`<button class="search-result" data-result="${i}">${esc(x.title)}<small>${esc(x.detail)}</small></button>`).join(''):'<p>No matches. Try another word.</p>';$$('[data-result]').forEach(b=>b.onclick=async()=>{const x=entries[Number(b.dataset.result)];modal.close();if(x.module!==undefined)return moduleDialog(x.module);if(x.file){try{if(!/\.(java|txt|md|json|csv)$/i.test(x.file))return await downloadFile(x.file);await statePatch({lastFile:x.file});if(route==='lab')return await openFile(x.file);location.hash='lab';}catch(e){fail(e);}}else location.hash=x.route;});};$('#search-input').oninput=search;search();}
$('#open-search').onclick=()=>S&&searchDialog();$('#menu').onclick=()=>$('#sidebar').classList.toggle('open');
window.addEventListener('hashchange',()=>S&&render().catch(fail));
window.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey))return;if(e.key.toLowerCase()==='k'){e.preventDefault();if(S){if(modal.open)modal.close();searchDialog();}}if(e.key.toLowerCase()==='s'){e.preventDefault();if(S)flush().then(()=>toast('Saved to disk.')).catch(fail);}if(e.key==='Enter'&&route==='lab'&&!modal.open){e.preventDefault();run();}});
window.addEventListener('beforeunload',e=>{if(drafts.size||$('#notes-text')?.value!==undefined&&$('#notes-text').value!==S?.state.notes){e.preventDefault();e.returnValue='';}});
setInterval(updateClock,1000);
try {S=await api('bootstrap');await render();$('#footer-status').textContent='LOCAL / SAVED ON YOUR COMPUTER';}
catch(e){main.innerHTML=`<section class="panel empty"><h1>Let’s reconnect.</h1><p>${esc(e.message)} Start the app with START.cmd, then refresh this page.</p><button class="btn primary" id="retry">Try again</button></section>`;$('#retry').onclick=()=>location.reload();}
