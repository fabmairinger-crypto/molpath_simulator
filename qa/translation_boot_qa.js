const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const run=__dirname,changes=JSON.parse(fs.readFileSync(path.join(run,'changes.json'),'utf8')),checks=[];
function execute(row,boot,readyState){const calls=[];const n=row.name.match(/v240z(\d+)/)[1];const ctx=vm.createContext({document:{readyState},window:{MolPathI18n:{applyNow(){calls.push('apply')}}},renderCasePicker(){calls.push('picker')},renderKpi(){calls.push('kpi')},render(){calls.push('render')}});ctx['v240z'+n+'Merge']=()=>calls.push('merge');ctx['v240z'+n+'Stamp']=()=>calls.push('stamp');vm.runInContext(boot+'\n'+row.name+'();',ctx);return calls;}
for(const row of changes.changes){
 const before=execute(row,row.old_boot,'loading'),after=execute(row,row.new_boot,'loading');assert.deepStrictEqual(after,before.filter(x=>!['picker','kpi','render'].includes(x)));checks.push({name:row.name+' parser merge/stamps/apply order unchanged',pass:true});
 for(const state of ['interactive','complete']){assert.deepStrictEqual(execute(row,row.new_boot,state),execute(row,row.old_boot,state));checks.push({name:row.name+' complete late-load behavior preserved '+state,pass:true});}
}
const hotfix=fs.readFileSync(path.join(run,'candidate/i18n/legacy/legacy_v240z10a_res_t4_hotfix.js'),'utf8');assert(hotfix.includes("if(typeof render==='function')render();"));assert(hotfix.includes("document.addEventListener('DOMContentLoaded',v240z10aBoot,{once:true})"));checks.push({name:'final T4 hotfix owns unchanged full render and listener',pass:true});
const result={status:'PASS',total:checks.length,passed:checks.length,checks};fs.writeFileSync(path.join(run,'translation_boot_qa.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,total:result.total}));
