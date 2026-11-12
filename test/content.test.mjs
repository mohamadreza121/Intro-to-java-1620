import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { courseModules, lessons, referenceEntries, exercises, mockTests } from '../public/course.js';

const java = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME,'bin',process.platform === 'win32'?'java.exe':'java') : 'java';
const normalize = s => s.replace(/\r\n/g,'\n').trim();
test('all original lessons, reference examples and solutions compile and match their stated outputs', {timeout:180000}, async()=>{
  for(const list of [lessons,referenceEntries,exercises,mockTests])assert.equal(new Set(list.map(x=>x.id)).size,list.length,'IDs must be unique');
  assert.equal(courseModules.length,8);
  for(const lesson of lessons)assert.ok(courseModules.some(m=>m.id===lesson.module));
  const cases=[
    ...lessons.map(x=>({id:'lesson/'+x.id,files:x.files,tests:[{stdin:x.stdin||'',expected:x.output}]})),
    ...referenceEntries.map(x=>({id:'reference/'+x.id,files:x.files,tests:[{stdin:'',expected:x.output}]})),
    ...exercises.map(x=>({id:'exercise/'+x.id,files:x.solution,tests:x.tests})),
    ...mockTests.map(x=>({id:'mock/'+x.id,files:x.solution,tests:x.tests}))
  ];
  const root=await fs.mkdtemp(path.join(tmpdir(),'java1620-content-'));
  try {
    const sources=[];
    for(const [i,item] of cases.entries()) {
      item.packageName='sample'+i;
      const dir=path.join(root,item.packageName);await fs.mkdir(dir);
      for(const [name,source]of Object.entries(item.files)){
        assert.ok(name.endsWith('.java'));
        const file=path.join(dir,name);await fs.writeFile(file,'package '+item.packageName+';\n'+source);sources.push(file);
      }
    }
    const argFile=path.join(root,'sources.txt');await fs.writeFile(argFile,sources.map(p=>'"'+p.replaceAll('\\','/')+'"').join('\n'));
    const classes=path.join(root,'classes');await fs.mkdir(classes);
    const compile=spawnSync(java,['-m','jdk.compiler/com.sun.tools.javac.Main','-encoding','UTF-8','-d',classes,'@'+argFile],{encoding:'utf8',timeout:60000,maxBuffer:2_000_000});
    assert.equal(compile.status,0,'Content compilation failed:\n'+compile.stderr+'\n'+compile.stdout);
    let runs=0;
    for(const item of cases)for(const sample of item.tests){
      const result=spawnSync(java,['-Xmx128m','-cp',classes,item.packageName+'.Main'],{encoding:'utf8',input:sample.stdin,timeout:6000});
      assert.equal(result.status,0,item.id+' failed: '+result.stderr);
      assert.equal(normalize(result.stdout),normalize(sample.expected),item.id+' output differs for '+JSON.stringify(sample.stdin));runs++;
    }
    console.log(`Verified ${cases.length} Java bundles and ${runs} output checks.`);
  }finally{await fs.rm(root,{recursive:true,force:true});}
});
