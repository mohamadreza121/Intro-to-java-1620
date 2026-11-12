import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { exercises, mockTests } from './public/course.js';

const APP = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.env.JAVA1620_HOME || APP);
const WORK = path.join(ROOT, 'workspace');
const DATA = path.join(ROOT, '.1620');
const PREVIEW = process.argv.includes('--preview');
const portArgument = process.argv.indexOf('--port');
const PORT = Number(process.env.PORT || (portArgument >= 0 ? process.argv[portArgument + 1] : PREVIEW ? 3000 : 1620));
const TOKEN = randomBytes(32).toString('hex');
const JAVA = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', process.platform === 'win32' ? 'java.exe' : 'java') : 'java';
const HELLO = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Your next chapter starts here.");\n        System.out.println("Hello, Reza!");\n    }\n}\n';
let state = { notes: '', runs: 0, completed: [], lastFile: 'playground/Main.java', theme: 'graphite', recentRuns: [], mock: null, checks: {}, bookmarked: [], activeChallenge: null, mockReview: {}, lessonAnswers: {} };
let writeQueue = Promise.resolve();
let running = false;
const sessions = new Map();
process.on('exit', () => { for (const session of sessions.values()) session.child?.kill(); });
process.once('SIGTERM', () => process.exit(0));
process.once('SIGINT', () => process.exit(0));
await fs.mkdir(WORK, { recursive: true });
await fs.mkdir(DATA, { recursive: true });
try { state = { ...state, ...JSON.parse(await fs.readFile(path.join(DATA, 'state.json'), 'utf8')) }; }
catch (e) { if (e.code !== 'ENOENT') throw new Error('Cannot read .1620/state.json. Your existing data has been left untouched: ' + e.message); }
await fs.mkdir(path.join(WORK, 'playground'), { recursive: true });
await fs.writeFile(path.join(WORK, 'playground', 'Main.java'), HELLO, { flag: 'wx' }).catch(e => { if (e.code !== 'EEXIST') throw e; });

function persist() {
  const snapshot = JSON.stringify(state, null, 2);
  writeQueue = writeQueue.catch(() => {}).then(async () => {
    const tmp = path.join(DATA, 'state.tmp');
    await fs.writeFile(tmp, snapshot);
    await fs.rename(tmp, path.join(DATA, 'state.json'));
  });
  return writeQueue;
}

async function safePath(name) {
  if (typeof name !== 'string' || !name || name.length > 500 || name.includes('\\') || name.includes(':') || name.split('/').some(x => !x || x === '.' || x === '..' || /[<>"|?*\x00-\x1f]/.test(x) || /[. ]$/.test(x) || /^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(x))) throw new Error('Use a relative path such as playground/Main.java.');
  const target = path.resolve(WORK, name);
  if (!target.startsWith(WORK + path.sep)) throw new Error('Path must stay inside workspace.');
  let part = WORK;
  for (const segment of name.split('/')) {
    part = path.join(part, segment);
    try { if ((await fs.lstat(part)).isSymbolicLink()) throw new Error('Linked folders are not supported.'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
  }
  return target;
}
async function tree(dir = WORK, prefix = '') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let out = [];
  for (const entry of entries.sort((a,b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))) {
    if (entry.isSymbolicLink() || entry.name.startsWith('.')) continue;
    const name = prefix + entry.name;
    out.push({ path: name, name: entry.name, type: entry.isDirectory() ? 'folder' : 'file' });
    if (entry.isDirectory()) out.push(...await tree(path.join(dir, entry.name), name + '/'));
  }
  return out;
}
function execute(args, cwd, input = '', timeout = 15000, onSpawn) {
  return new Promise(resolve => {
    let output = '', done = false, timedOut = false, truncated = false;
    const child = spawn(JAVA, args, { cwd, windowsHide: true, shell: false });
    const timer = setTimeout(() => { timedOut = true; child.kill(); }, timeout);
    const append = chunk => {
      if (output.length >= 180000) { truncated = true; child.kill(); return; }
      output += chunk.toString();
    };
    child.stdout.on('data', append); child.stderr.on('data', append);
    child.stdin.on('error', () => {});
    child.on('error', err => finish(-1, err.code === 'ENOENT' ? 'Java was not found. Install a JDK 17 or newer, then restart the app.' : err.message));
    child.on('close', code => finish(code ?? -1));
    onSpawn?.(child);
    function finish(code, error = '') {
      if (done) return; done = true; clearTimeout(timer);
      resolve({ code, output: output + (error ? '\n' + error : '') + (timedOut ? `\nStopped: ${timeout / 1000}-second limit reached.` : '') + (truncated ? '\nStopped: output limit reached.' : ''), timedOut });
    }
    child.stdin.end(input);
  });
}
function sessionView(session, cursor = 0) {
  return { id:session.id, file:session.file, startedAt:session.startedAt, phase:session.phase, output:session.output.slice(cursor), cursor:session.output.length,
    stage:session.stage, code:session.code, stopped:session.stopped, timedOut:session.timedOut,
    ...(session.phase === 'finished' ? { runs:state.runs, recentRuns:state.recentRuns } : {}) };
}
async function liveRun(session, selected) {
  const build = path.join(DATA,'build',session.id);
  let timer;
  const append = chunk => {
    const text = String(chunk);
    if (session.output.length + text.length > 180000) {
      if (!session.truncated) {
        session.truncated = true;
        session.output += '\nStopped: output limit reached.\n';
        session.child?.kill();
      }
      return;
    }
    session.output += text;
  };
  try {
    await fs.mkdir(build,{recursive:true});
    const cwd = path.dirname(selected), source = await fs.readFile(selected,'utf8');
    const packageName = source.match(/^\s*package\s+([\w.]+)\s*;/m)?.[1];
    const sources = (await fs.readdir(cwd)).filter(x=>x.endsWith('.java')).map(x=>'./'+x);
    const compile = await execute(['-m','jdk.compiler/com.sun.tools.javac.Main','-encoding','UTF-8','-d',build,...sources],cwd,'',15000,child=>{
      session.child=child;
      if (session.stopped) child.kill();
    });
    session.child=null;
    append(compile.output);
    session.code=compile.code; session.timedOut=compile.timedOut;
    if (compile.code === 0 && !session.stopped) {
      session.stage='run'; session.phase='running';
      const className = path.basename(selected,'.java');
      await new Promise(resolve=>{
        const child=spawn(JAVA,['-Xmx128m','-cp',build,packageName ? packageName+'.'+className : className],{cwd,windowsHide:true,shell:false});
        session.child=child;
        child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
        child.stdout.on('data',append); child.stderr.on('data',append);
        child.stdin.on('error',()=>{});
        child.on('error',e=>{append('\n'+e.message);session.code=-1;});
        child.on('close',code=>{session.code=code ?? -1;resolve();});
        // Interactive programs can wait for answers; Stop is always available.
        timer=setTimeout(()=>{session.timedOut=true;append('\nStopped: 10-minute session limit reached.\n');child.kill();},600000);
      });
    }
    if (session.stopped) { session.code=-1; append('\n> Stopped by you.\n'); }
  } catch(e) { session.code=-1; append('\n'+e.message); }
  finally {
    clearTimeout(timer); session.child=null;
    state.runs++; state.recentRuns.unshift({file:session.file,time:new Date().toISOString(),code:session.code,stage:session.stage});
    state.recentRuns=state.recentRuns.slice(0,20);
    try { await persist(); await fs.rm(build,{recursive:true,force:true}); }
    catch(e) { append('\nCould not finish saving run history: '+e.message); }
    running=false; session.phase='finished';
  }
}
const runtime = await execute(['-version'], ROOT);
const compiler = await execute(['-m', 'jdk.compiler/com.sun.tools.javac.Main', '-version'], ROOT);
const ready = runtime.code === 0 && compiler.code === 0;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.json':'application/json', '.jpg':'image/jpeg' };
const json = (res, status, body) => { res.writeHead(status, { 'Content-Type':'application/json', 'Cache-Control':'no-store' }); res.end(JSON.stringify(body)); };
async function readBody(req) {
  let body = ''; for await (const data of req) { body += data; if (body.length > 30_000_000) throw new Error('File too large. Maximum upload is 20 MB.'); }
  return body ? JSON.parse(body) : {};
}
const server = http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'self'; base-uri 'self'");
  try {
    const url = new URL(req.url, 'http://localhost');
    if (!PREVIEW && !['127.0.0.1', 'localhost', '[::1]'].includes(new URL('http://' + req.headers.host).hostname)) return json(res, 403, { error: 'Local host only.' });
    if (url.pathname.startsWith('/api/')) {
      if (req.headers['x-lab-token'] !== TOKEN || (req.headers['sec-fetch-site'] && !['same-origin','none'].includes(req.headers['sec-fetch-site']))) return json(res, 403, { error:'Open the lab from its local address.' });
      if (req.method === 'GET' && url.pathname === '/api/bootstrap') return json(res, 200, { state, files: await tree(), root:ROOT, workspace:WORK, java:{ ready, version:runtime.output.trim(), compiler:compiler.output.trim() }, live:[...sessions.values()].find(x=>x.phase!=='finished') ? sessionView([...sessions.values()].find(x=>x.phase!=='finished')) : null, phase:'course' });
      if (req.method === 'GET' && url.pathname === '/api/live') {
        const session=sessions.get(url.searchParams.get('id'));
        if (!session) return json(res,404,{error:'This run is no longer available. Press Run to start again.'});
        const cursor=Number(url.searchParams.get('cursor') || 0);
        if (!Number.isInteger(cursor) || cursor<0 || cursor>session.output.length) throw new Error('Invalid output cursor.');
        return json(res,200,sessionView(session,cursor));
      }
      if (req.method === 'GET' && url.pathname === '/api/file') {
        const target = await safePath(url.searchParams.get('path'));
        const stat = await fs.stat(target);
        if (stat.size > 20_000_000) throw new Error('File is too large to open.');
        if (url.searchParams.has('download')) {
          res.setHeader('Content-Type', 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(target))}`);
          return res.end(await fs.readFile(target));
        }
        if (!/\.(java|txt|md|json|csv)$/i.test(target)) throw new Error('Download this document to view it.');
        return json(res, 200, { content:await fs.readFile(target, 'utf8') });
      }
      if (req.method !== 'POST') return json(res, 404, { error:'Unknown endpoint.' });
      const body = await readBody(req);
      if (url.pathname === '/api/live/input' || url.pathname === '/api/live/stop') {
        const session=sessions.get(body.id);
        if (!session) return json(res,404,{error:'This run is no longer available.'});
        if (url.pathname.endsWith('/stop')) {
          if (session.phase !== 'finished') { session.stopped=true; session.child?.kill(); }
        } else {
          if (session.phase !== 'running' || session.stopped || !session.child?.stdin.writable) return json(res,409,{error:'The program is not accepting input.'});
          if (typeof body.input !== 'string' || body.input.length>16000) throw new Error('Send at most 16,000 characters at once.');
          const input=body.input.endsWith('\n') ? body.input : body.input+'\n';
          if (session.output.length+input.length>180000) throw new Error('Console output limit reached. Stop and run again.');
          session.output+=input; // Echo exactly what was typed, including a blank line.
          session.child.stdin.write(input);
        }
        return json(res,200,{ok:true});
      }
      if (url.pathname === '/api/live/start') {
        if (running) return json(res,409,{error:'A program is already running. Stop it before starting another.'});
        if (!ready) throw new Error('Install a JDK 17 or newer and restart the app to run Java.');
        const selected=await safePath(body.path);
        if (!/^[A-Za-z_$][\w$]*\.java$/.test(path.basename(selected))) throw new Error('Select a Java file with a valid class name.');
        await fs.access(selected);
        if (running) return json(res,409,{error:'A program is already running.'});
        for (const [id,old] of sessions) if (old.phase==='finished' && sessions.size>=10) sessions.delete(id);
        const session={id:randomUUID(),file:body.path,startedAt:Date.now(),phase:'compiling',stage:'compile',output:'',code:null,stopped:false,timedOut:false,child:null};
        running=true; sessions.set(session.id,session);
        void liveRun(session,selected);
        return json(res,200,sessionView(session));
      }
      if (url.pathname === '/api/state') {
        for (const key of ['notes','completed','lastFile','theme','mock','bookmarked','activeChallenge','mockReview','lessonAnswers','desktop']) if (Object.hasOwn(body,key)) state[key] = body[key];
        await persist(); return json(res,200,{ state });
      }
      if (url.pathname === '/api/file') {
        const target = await safePath(body.path);
        const bytes = body.base64 ? Buffer.from(body.base64, 'base64') : String(body.content ?? '');
        if (Buffer.byteLength(bytes) > 20_000_000) throw new Error('Maximum file size is 20 MB.');
        await fs.mkdir(path.dirname(target), { recursive:true });
        await fs.writeFile(target, bytes, { flag:body.create ? 'wx' : 'w' });
        return json(res,200,{ files:await tree() });
      }
      if (url.pathname === '/api/folder') {
        await fs.mkdir(await safePath(body.path), { recursive:true }); return json(res,200,{ files:await tree() });
      }
      if (url.pathname === '/api/rename') {
        const from = await safePath(body.path), to = await safePath(body.to);
        try { await fs.stat(to); throw new Error('A file or folder already uses that name.'); } catch(e) { if(e.code !== 'ENOENT') throw e; }
        await fs.mkdir(path.dirname(to), {recursive:true}); await fs.rename(from,to);
        return json(res,200,{ files:await tree() });
      }
      if (url.pathname === '/api/trash') {
        const from = await safePath(body.path);
        await fs.mkdir(path.join(DATA,'trash'),{recursive:true});
        await fs.rename(from,path.join(DATA,'trash',Date.now()+'-'+path.basename(from)));
        return json(res,200,{ files:await tree() });
      }
      if (url.pathname === '/api/run' || url.pathname === '/api/check') {
        if (running) return json(res,409,{error:'A program is already running. Try again when it finishes.'});
        if (!ready) return json(res,400,{error:'Install a JDK 17 or newer and restart the app to run Java.'});
        const checking = url.pathname === '/api/check';
        const challenge = checking ? (String(body.challenge).startsWith('mock:') ? mockTests : exercises).find(x => (String(body.challenge).startsWith('mock:') ? 'mock:' : 'exercise:') + x.id === body.challenge) : null;
        if (checking && !challenge) throw new Error('Unknown practice task.');
        const selected = await safePath(body.path);
        if (!selected.endsWith('.java')) throw new Error('Select a .java file to run.');
        const className = path.basename(selected,'.java');
        if (!/^[A-Za-z_$][\w$]*$/.test(className)) throw new Error('Use a valid Java class name for the filename.');
        const source = await fs.readFile(selected, 'utf8');
        const packageName = source.match(/^\s*package\s+([\w.]+)\s*;/m)?.[1];
        if (packageName && !/^[\w.]+$/.test(packageName)) throw new Error('Invalid package name.');
        if (running) return json(res,409,{error:'A program is already running.'});
        running = true;
        const build = path.join(DATA,'build',randomUUID());
        try {
          await fs.mkdir(build,{recursive:true});
          const cwd = path.dirname(selected);
          const sources = (await fs.readdir(cwd)).filter(x=>x.endsWith('.java')).map(x=>'./'+x);
          const compile = await execute(['-m','jdk.compiler/com.sun.tools.javac.Main','-encoding','UTF-8','-d',build,...sources],cwd);
          const command = ['-Xmx128m','-cp',build,packageName ? packageName+'.'+className : className];
          if (checking) {
            const normalize = text => text.replace(/\r\n/g, '\n').trim();
            const cases = [];
            if (compile.code === 0) {
              for (const sample of challenge.tests) {
                const actual = await execute(command,cwd,sample.stdin,4000);
                cases.push({ name:sample.name, stdin:sample.stdin, expected:sample.expected, actual:actual.output, exitCode:actual.code, passed:actual.code === 0 && normalize(actual.output) === normalize(sample.expected) });
              }
            }
            const result = { challenge:body.challenge, file:body.path, passed:cases.filter(x=>x.passed).length, total:challenge.tests.length, cases, compileOutput:compile.output, compiled:compile.code === 0, time:new Date().toISOString() };
            state.checks ||= {}; state.checks[body.challenge] = { file:body.path, passed:result.passed, total:result.total, time:result.time };
            await persist();
            return json(res,200,result);
          }
          const result = compile.code === 0 ? await execute(command,cwd,String(body.stdin || ''),15000) : compile;
          state.runs++; state.recentRuns.unshift({ file:body.path, time:new Date().toISOString(), code:result.code, stage:compile.code === 0 ? 'run' : 'compile' });
          state.recentRuns = state.recentRuns.slice(0,20); await persist();
          return json(res,200,{...result, stage:compile.code === 0 ? 'run' : 'compile', runs:state.runs, recentRuns:state.recentRuns});
        } finally { running=false; await fs.rm(build,{recursive:true,force:true}); }
      }
      return json(res,404,{error:'Unknown endpoint.'});
    }
    if (req.method !== 'GET') return json(res,405,{error:'Method not allowed.'});
    const asset = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    if (!['index.html','app.js','style.css','favicon.svg','course.js','aero.css','desktop.js','icons.svg','wallpaper.jpg'].includes(asset)) return json(res,404,{error:'Not found.'});
    let bytes = await fs.readFile(path.join(APP,'public',asset));
    if (asset === 'index.html') bytes = bytes.toString().replace('__LAB_TOKEN__',TOKEN);
    res.setHeader('Content-Type',mime[path.extname(asset)] || 'text/plain'); res.setHeader('Cache-Control','no-store'); res.end(bytes);
  } catch(e) { json(res, e.code === 'ENOENT' ? 404 : 400, {error:e.code === 'EEXIST' ? 'That name already exists.' : e.message}); }
});
server.listen(PORT, PREVIEW ? '0.0.0.0' : '127.0.0.1', () => {
  console.log(`1620 Java Lab: http://127.0.0.1:${server.address().port}\nFiles and progress: ${ROOT}\nJava: ${ready ? 'ready' : 'install JDK 17+ and restart'}`);
});
