import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exercises, mockTests } from '../public/course.js';
const APP=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let root, child, base, token;
async function start(){
  child=spawn(process.execPath,['server.mjs'],{cwd:APP,env:{...process.env,PORT:'0',JAVA1620_HOME:root},stdio:['ignore','pipe','pipe']});
  await new Promise((resolve,reject)=>{let out='';const timer=setTimeout(()=>reject(new Error('Server startup timeout: '+out)),15000);child.on('error',reject);child.stderr.on('data',x=>out+=x);child.stdout.on('data',x=>{out+=x;const m=out.match(/http:\/\/127\.0\.0\.1:\d+/);if(m){base=m[0];clearTimeout(timer);resolve();}});child.on('exit',code=>{clearTimeout(timer);reject(new Error('Server exited '+code+': '+out));});});
  token=(await (await fetch(base)).text()).match(/name="lab-token" content="([^"]+)"/)[1];
}
async function stop(){if(child&&child.exitCode===null){const done=new Promise(resolve=>child.once('exit',resolve));child.kill();await done;}}
async function api(endpoint,body){const res=await fetch(base+'/api/'+endpoint,{method:body===undefined?'GET':'POST',headers:{'x-lab-token':token,'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});return {status:res.status,...await res.json()};}
before(async()=>{root=await mkdtemp(path.join(tmpdir(),'java1620-'));await start();});
after(async()=>{await stop();await rm(root,{recursive:true,force:true});});
test('starter is real Java and API requires a session token',async()=>{
  assert.equal((await fetch(base+'/api/bootstrap')).status,403);
  const b=await api('bootstrap');assert.equal(b.java.ready,true);assert.equal(b.root,root);
  const r=await api('run',{path:'playground/Main.java'});assert.equal(r.code,0);assert.match(r.output,/Hello, Reza!/);
});
test('multi-file project compiles with Scanner input',async()=>{
  await api('file',{path:'projects/input/Main.java',create:true,content:'import java.util.Scanner; public class Main { public static void main(String[] args) { Scanner s=new Scanner(System.in); Book b=new Book(s.nextLine()); System.out.println(b.title); s.close(); } }'});
  await api('file',{path:'projects/input/Book.java',create:true,content:'public class Book { String title; Book(String title) { this.title=title; } }'});
  const r=await api('run',{path:'projects/input/Main.java',stdin:'A modern Java book\n'});assert.equal(r.code,0);assert.equal(r.output.trim(),'A modern Java book');
});
test('compiler and runtime errors are returned distinctly',async()=>{
  await api('file',{path:'errors/Main.java',content:'public class Main { bad syntax }'});
  const bad=await api('run',{path:'errors/Main.java'});assert.equal(bad.stage,'compile');assert.notEqual(bad.code,0);assert.match(bad.output,/error/);
  await api('file',{path:'errors/Main.java',content:'public class Main { public static void main(String[] a) { throw new RuntimeException("practice failure"); } }'});
  const runtime=await api('run',{path:'errors/Main.java'});assert.equal(runtime.stage,'run');assert.notEqual(runtime.code,0);assert.match(runtime.output,/practice failure/);
});
test('create, rename, binary import, trash and path protection',async()=>{
  assert.equal((await api('folder',{path:'scratch/nested'})).status,200);
  await api('file',{path:'scratch/nested/note.txt',content:'persist me',create:true});
  assert.equal((await api('file',{path:'scratch/nested/note.txt',content:'overwrite',create:true})).status,400);
  await api('rename',{path:'scratch/nested/note.txt',to:'scratch/note.txt'});
  assert.equal((await api('file?path=scratch/note.txt')).content,'persist me');
  await api('file',{path:'lectures/sample.pdf',base64:Buffer.from('%PDF-test').toString('base64'),create:true});
  const doc=await fetch(base+'/api/file?path=lectures/sample.pdf&download=1',{headers:{'x-lab-token':token}});assert.equal(await doc.text(),'%PDF-test');
  await api('trash',{path:'scratch/note.txt'});assert.equal((await api('file?path=scratch/note.txt')).status,404);
  assert.equal((await readdir(path.join(root,'.1620','trash'))).length,1);
  for(const bad of ['../escape.txt','C:\\escape.txt','a/../../x','/root.txt','a/CON.txt'])assert.equal((await api('file',{path:bad,content:'x'})).status,400);
});
test('notes, theme, timer, run history and edited code survive restart',async()=>{
  await api('state',{notes:'A saved insight',theme:'midnight',mock:{status:'paused',remaining:120}});
  await api('file',{path:'playground/Main.java',content:'public class Main { public static void main(String[] a) { System.out.println("saved version"); } }'});
  const disk=JSON.parse(await readFile(path.join(root,'.1620','state.json'),'utf8'));assert.equal(disk.notes,'A saved insight');
  await stop();await start();const b=await api('bootstrap');assert.equal(b.state.notes,'A saved insight');assert.equal(b.state.theme,'midnight');assert.equal(b.state.mock.remaining,120);assert.equal(b.state.runs,4);
  assert.match((await api('file?path=playground%2FMain.java')).content,/saved version/);
});
test('a program cannot hang the runner indefinitely',async()=>{
  await api('file',{path:'timeout/Main.java',content:'public class Main { public static void main(String[] a) { while(true) {} } }'});
  const r=await api('run',{path:'timeout/Main.java'});assert.equal(r.timedOut,true);assert.notEqual(r.code,0);assert.match(r.output,/15-second limit/);
});
test('sample checker distinguishes wrong output, compiler errors and correct solutions',async()=>{
  const task=exercises.find(x=>x.id==='multiples');
  await api('file',{path:'checks/Main.java',content:'public class Main { public static void main(String[] a) { System.out.println("wrong"); } }'});
  const wrong=await api('check',{path:'checks/Main.java',challenge:'exercise:multiples'});
  assert.equal(wrong.compiled,true);assert.equal(wrong.passed,0);assert.equal(wrong.total,3);assert.equal(wrong.cases[0].passed,false);
  await api('file',{path:'checks/Main.java',content:'public class Main { broken }'});
  const broken=await api('check',{path:'checks/Main.java',challenge:'exercise:multiples'});
  assert.equal(broken.compiled,false);assert.equal(broken.passed,0);assert.match(broken.compileOutput,/error/);
  await api('file',{path:'checks/Main.java',content:task.solution['Main.java']});
  const correct=await api('check',{path:'checks/Main.java',challenge:'exercise:multiples'});
  assert.equal(correct.passed,correct.total);assert.equal(correct.passed,3);
  assert.equal((await api('check',{path:'checks/Main.java',challenge:'unknown'})).status,400);
});
test('library mock sample tests run with separate classes and persist course progress',async()=>{
  const task=mockTests.find(x=>x.id==='library');
  for(const [name,content]of Object.entries(task.solution))await api('file',{path:'library-check/'+name,content});
  const result=await api('check',{path:'library-check/Main.java',challenge:'mock:library'});
  assert.equal(result.passed,3);assert.equal(result.total,3);
  await api('state',{completed:['division-remainder'],bookmarked:['boolean-ranges'],lessonAnswers:{'division-remainder':'Seven is the remainder.'},mockReview:{library:[0,1]},activeChallenge:{key:'mock:library',path:'library-check/Main.java'}});
  await stop();await start();const b=await api('bootstrap');
  assert.deepEqual(b.state.completed,['division-remainder']);assert.equal(b.state.checks['mock:library'].passed,3);assert.equal(b.state.lessonAnswers['division-remainder'],'Seven is the remainder.');
  assert.deepEqual(b.state.mockReview.library,[0,1]);assert.equal(b.state.notes,'A saved insight');
  const source=await fetch(base+'/course.js');assert.equal(source.status,200);assert.match(await source.text(),/courseModules/);
});
test('desktop assets are served locally and window preferences preserve existing state',async()=>{
  for(const asset of ['desktop.js','windows.js','aero.css','icons.svg'])assert.equal((await fetch(base+'/'+asset)).status,200);
  const wallpaper=await fetch(base+'/wallpaper.jpg');assert.equal(wallpaper.headers.get('content-type'),'image/jpeg');
  const bytes=new Uint8Array(await wallpaper.arrayBuffer());assert.equal(bytes[0],255);assert.equal(bytes[1],216);
  const desktop={geometry:{x:150,y:70,width:1000,height:700},maximized:false,compact:true,wordWrap:false};
  await api('state',{desktop});await stop();await start();const b=await api('bootstrap');
  assert.deepEqual(b.state.desktop,desktop);assert.equal(b.state.notes,'A saved insight');assert.equal(b.state.checks['mock:library'].passed,3);
});

async function waitForLive(id, predicate) {
  const deadline=Date.now()+10000;
  while(Date.now()<deadline){
    const session=await api('live?id='+id);
    assert.equal(session.status,200);
    if(predicate(session))return session;
    await new Promise(resolve=>setTimeout(resolve,50));
  }
  throw new Error('Live run did not reach the expected state.');
}
test('live Scanner prompts arrive before input and accept repeated blank lines',async()=>{
  await api('file',{path:'live/Main.java',content:`import java.util.Scanner;
public class Main { public static void main(String[] args) {
  Scanner scan=new Scanner(System.in);System.out.print("Enter your name: ");
  String name=scan.nextLine();while(name.isEmpty()) {
    System.out.print("Cannot leave it empty; try again: ");name=scan.nextLine();
  }
  System.out.println("Name: "+name);scan.close();
} }`});
  const before=(await api('bootstrap')).state.runs;
  const run=await api('live/start',{path:'live/Main.java'});assert.equal(run.status,200);
  const prompted=await waitForLive(run.id,s=>s.output==='Enter your name: ');
  assert.equal(prompted.phase,'running');assert.equal(prompted.code,0);
  // Waiting for the student must not hit the old 15-second batch timeout.
  await new Promise(resolve=>setTimeout(resolve,15500));
  assert.equal((await api('live?id='+run.id)).phase,'running');
  assert.equal((await api('live/start',{path:'playground/Main.java'})).status,409);
  assert.equal((await api('check',{path:'checks/Main.java',challenge:'exercise:multiples'})).status,409);
  assert.equal((await api('live/input',{id:run.id,input:''})).status,200);
  await waitForLive(run.id,s=>s.output.includes('Cannot leave it empty; try again: '));
  assert.equal((await api('live/input',{id:run.id,input:''})).status,200);
  await waitForLive(run.id,s=>s.output.split('Cannot leave it empty; try again: ').length===3);
  const reconnected=(await api('bootstrap')).live;assert.equal(reconnected.id,run.id);assert.equal(reconnected.phase,'running');
  await api('live/input',{id:run.id,input:'Reza'});
  const done=await waitForLive(run.id,s=>s.phase==='finished');
  assert.equal(done.code,0);assert.equal(done.runs,before+1);
  assert.equal(done.output,'Enter your name: \nCannot leave it empty; try again: \nCannot leave it empty; try again: Reza\nName: Reza\n');
  assert.doesNotMatch(done.output,/NoSuchElementException/);
  const tail=await api('live?id='+run.id+'&cursor='+prompted.cursor);assert.equal(tail.output,done.output.slice(prompted.cursor));
  assert.equal((await api('live/input',{id:run.id,input:'too late'})).status,409);
});
test('live Stop cancels waiting programs and the runner can start again',async()=>{
  const run=await api('live/start',{path:'live/Main.java'});
  await waitForLive(run.id,s=>s.output.includes('Enter your name: '));
  assert.equal((await api('live/stop',{id:run.id})).status,200);
  const stopped=await waitForLive(run.id,s=>s.phase==='finished');assert.equal(stopped.stopped,true);assert.notEqual(stopped.code,0);assert.match(stopped.output,/Stopped by you/);
  const next=await api('live/start',{path:'playground/Main.java'});
  const done=await waitForLive(next.id,s=>s.phase==='finished');assert.equal(done.code,0);assert.match(done.output,/saved version/);
});
test('live compile errors and immediate Stop release the runner and clean builds',async()=>{
  await api('file',{path:'live-broken/Main.java',content:'public class Main { invalid syntax }'});
  const broken=await api('live/start',{path:'live-broken/Main.java'});
  const failed=await waitForLive(broken.id,s=>s.phase==='finished');assert.equal(failed.stage,'compile');assert.notEqual(failed.code,0);assert.match(failed.output,/error/);
  const cancel=await api('live/start',{path:'live/Main.java'});await api('live/stop',{id:cancel.id});
  assert.equal((await waitForLive(cancel.id,s=>s.phase==='finished')).stopped,true);
  assert.deepEqual(await readdir(path.join(root,'.1620','build')),[]);
  assert.equal((await api('live/start',{path:'../escape.java'})).status,400);
  assert.equal((await api('live/input',{id:'missing',input:''})).status,404);
});

test('Main calls static and instance methods from saved sibling classes during a live run',async()=>{
  await api('file',{path:'methods/Main.java',content:'public class Main { public static void main(String[] args) { System.out.println(Functions.triple(7)); System.out.println(new Greeter().greet("Reza")); } }'});
  await api('file',{path:'methods/Functions.java',content:'public class Functions { public static int triple(int n) { return n * 3; } }'});
  await api('file',{path:'methods/Greeter.java',content:'public class Greeter { public String greet(String name) { return "Hello, " + name; } }'});
  const run=await api('live/start',{path:'methods/Main.java'});
  const done=await waitForLive(run.id,s=>s.phase==='finished');assert.equal(done.code,0);assert.equal(done.output,'21\nHello, Reza\n');
  await api('file',{path:'methods/Functions.java',content:'public class Functions { public static int triple(int n) { return n * 3 + 1; } }'});
  const edited=await api('live/start',{path:'methods/Main.java'});
  assert.equal((await waitForLive(edited.id,s=>s.phase==='finished')).output,'22\nHello, Reza\n');
});
test('source tabs and a second window arrangement survive a server restart',async()=>{
  const editorTabs=['methods/Main.java','methods/Functions.java','methods/Greeter.java'];
  const desktop={geometry:{x:6,y:6,width:680,height:800},layout:'side-by-side',secondary:{route:'#notes',visible:true,geometry:{x:692,y:6,width:680,height:800},maximized:false}};
  await api('state',{editorTabs,desktop});await stop();await start();
  const b=await api('bootstrap');assert.deepEqual(b.state.editorTabs,editorTabs);assert.deepEqual(b.state.desktop,desktop);assert.equal(b.state.notes,'A saved insight');
  const embedded=await fetch(base+'/?pane=1');assert.equal(embedded.status,200);assert.match(await embedded.text(),/lab-token/);
});
