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
  for(const asset of ['desktop.js','aero.css','icons.svg'])assert.equal((await fetch(base+'/'+asset)).status,200);
  const wallpaper=await fetch(base+'/wallpaper.jpg');assert.equal(wallpaper.headers.get('content-type'),'image/jpeg');
  const bytes=new Uint8Array(await wallpaper.arrayBuffer());assert.equal(bytes[0],255);assert.equal(bytes[1],216);
  const desktop={geometry:{x:150,y:70,width:1000,height:700},maximized:false,compact:true,wordWrap:false};
  await api('state',{desktop});await stop();await start();const b=await api('bootstrap');
  assert.deepEqual(b.state.desktop,desktop);assert.equal(b.state.notes,'A saved insight');assert.equal(b.state.checks['mock:library'].passed,3);
});
