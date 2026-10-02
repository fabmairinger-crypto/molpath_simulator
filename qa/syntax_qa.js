const fs=require('fs'),path=require('path'),vm=require('vm');
const root=process.argv[2]||'work/candidate';let all=0,errors=[];
for(const entry of fs.readdirSync(root,{recursive:true})){
  if(!entry.endsWith('.js'))continue;
  try{new vm.Script(fs.readFileSync(path.join(root,entry),'utf8'),{filename:entry});all++;}
  catch(e){errors.push(e.stack.split('\n').slice(0,5).join('\n'));}
}
const s=fs.readFileSync(root+'/index.html','utf8');let i=0;
for(const m of s.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/g)){
  if(/\bsrc\s*=/.test(m[1]))continue;
  try{new vm.Script(m[2],{filename:'index:inline:'+i});all++;}
  catch(e){errors.push(e.stack.split('\n').slice(0,5).join('\n'));}i++;
}
console.log(JSON.stringify({syntaxChecks:all,errors},null,2));
const out=process.argv[3]||path.join(path.dirname(path.resolve(root)),path.basename(root)+'_syntax_qa.json');
fs.writeFileSync(out,JSON.stringify({syntaxChecks:all,errors},null,2));
if(errors.length)process.exitCode=1;
