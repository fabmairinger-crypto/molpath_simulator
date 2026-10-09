const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const run=__dirname,changes=JSON.parse(fs.readFileSync(path.join(run,'changes.json'),'utf8')),checks=[];
for(const row of changes.changes)for(const readyState of ['loading','interactive','complete'])for(const isActive of [false,true]){
 const events=[],timers=[],calls=[];const ctx=vm.createContext({document:{readyState},active(){calls.push('active');return isActive},styles(){calls.push('styles')},applyCaseLogic(){calls.push('logic')},applyCasePresentation(){calls.push('presentation')},stamp(){calls.push('stamp')},render(){calls.push('render')},setTimeout(fn,ms){timers.push({fn,ms})},console:{error(){throw new Error('boot error')}}});
 vm.runInContext(row.new_boot+'\nboot();',ctx);
 const rendering=readyState!=='loading'||isActive;assert.strictEqual(calls.filter(x=>x==='render').length,rendering?1:0);assert.strictEqual(calls.filter(x=>x==='styles').length,1);assert.strictEqual(calls.filter(x=>x==='stamp').length,1);assert.strictEqual(timers.length,1);assert.strictEqual(timers[0].ms,100);
 if(row.old_boot.includes('applyCaseLogic()'))assert(calls.includes('logic'));if(row.old_boot.includes('applyCasePresentation()'))assert(calls.includes('presentation'));
 checks.push({name:row.path+' '+readyState+' active='+isActive+' initialization/render contract',pass:true});
}
const result={status:'PASS',total:checks.length,passed:checks.length,checks};fs.writeFileSync(path.join(run,'boot_guard_qa.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,total:result.total}));
