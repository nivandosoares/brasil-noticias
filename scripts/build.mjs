import {readFile,writeFile,mkdir} from 'node:fs/promises';
const html=await readFile('app/boletim.html','utf8');
await writeFile('worker/ui.js','export const UI_HTML='+JSON.stringify(html)+';\n');
await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
const modules=await Promise.all(['sources.js','policy.js','ui.js','index.js'].map(f=>readFile('worker/'+f,'utf8')));
const bundled=modules.map((s,i)=>s.replace(/^import .*?;\n/gm,'').replace(/export (const|function) /g,'$1 ')).join('\n');
await writeFile('dist/server/index.js',bundled);
await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json').catch(()=>readFile('.openai/hosting.example.json')));
console.log('Worker independente e recurso inline preparados. Nenhuma página de site.');
