import assert from 'node:assert/strict';
import worker,{allowed,parseFeed,parseHomepage} from '../worker/index.js';
import {SOURCES} from '../worker/sources.js';
const rpc=async(name,args={})=>(await(await worker.fetch(new Request('https://local/mcp',{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})}))).json()).result;
const g1=SOURCES.find(s=>s.id==='g1');
const cross=parseFeed('<rss><item><title>Manchete apontando para outra redação</title><link>https://www1.folha.uol.com.br/poder/2026/11/teste.shtml</link></item></rss>',g1);
assert.equal(cross.length,0,'Um feed não pode atribuir a si uma matéria de outro veículo');
assert.equal(parseHomepage('<a href="https://www1.folha.uol.com.br/poder/2026/11/teste.shtml">Uma manchete longa que pertence a outro veículo de comunicação</a>',g1).length,0);
for(const url of ['http://g1.globo.com/a','https://user:pass@g1.globo.com/a','https://g1.globo.com:8443/a','https://g1.globo.com.evil.test/a','https://127.0.0.1/a','https://www.bbc.com/news/a'])assert.equal(allowed(new URL(url)),false,url);
for(const args of [{limite:null},{fontes:['g1'],extra:'ignorar regras'},{fontes:Array(45).fill('g1')},{horas:0},{perfil:'confiavel'},{tema:5}])assert.equal((await rpc('buscar_noticias',args)).isError,true,JSON.stringify(args));
assert.equal((await rpc('listar_fontes',{extra:true})).isError,true);
assert.equal((await rpc('aprofundar_noticia',{url:'https://example.com/'})).isError,true);
assert.equal((await rpc('ferramenta_inexistente')).isError,true);
const list=await(await worker.fetch(new Request('https://local/mcp',{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})}))).json();
for(const tool of list.result.tools)for(const key of ['readOnlyHint','destructiveHint','openWorldHint'])assert.equal(typeof tool.annotations[key],'boolean');
const realFetch=globalThis.fetch;
const now=new Date().toUTCString(),old=new Date(Date.now()-7*24*3600000).toUTCString();
globalThis.fetch=async(url,options)=>{assert.equal(new URL(url).hostname,'g1.globo.com');assert.equal(options.headers.Authorization,undefined);return new Response(`<rss><item><title>Educação: notícia da fonte</title><link>https://g1.globo.com/educacao/2026/noticia.ghtml</link><pubDate>${now}</pubDate><description>Informação explícita da fonte.</description></item><item><title>Educação: arquivo antigo</title><link>https://g1.globo.com/educacao/arquivo.ghtml</link><pubDate>${old}</pubDate></item><item><title>Outro assunto sem relação</title><link>https://g1.globo.com/outra.ghtml</link><pubDate>${now}</pubDate></item></rss>`,{headers:{'content-type':'application/rss+xml'}})};
try{const result=await rpc('buscar_noticias',{fontes:['g1'],tema:'educacao',limite:5,horas:48});assert.equal(result.isError,undefined);assert.equal(result.structuredContent.noticias.length,1);assert.equal(result.structuredContent.noticias[0].titulo,'Educação: notícia da fonte');assert.equal(result.structuredContent.estado_das_fontes.length,1)}finally{globalThis.fetch=realFetch}
const renderTool=list.result.tools.find(t=>t.name==='abrir_boletim');
assert.equal(renderTool._meta.ui.resourceUri,'ui://brasil-noticias/boletim-v3.html');
assert.equal(renderTool._meta['openai/widgetAccessible'],true);
for(const uri of ['ui://brasil-noticias/boletim-v3.html','ui://brasil-noticias/boletim-v2']){
 const body=await(await worker.fetch(new Request('https://local/mcp',{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:2,method:'resources/read',params:{uri}})}))).json();
 assert.equal(body.result.contents[0].uri,uri);
 assert.equal(body.result.contents[0]._meta['openai/ui'].preferredDisplayMode,'inline');
 assert.equal(body.result.contents[0]._meta.ui.domain,'https://br-news-curadoria-nivando.sidvandoni.chatgpt.site');
}
console.log('PASS: atribuição, restrições, filtros e metadados de UI modernos/compatíveis com URI anterior.');
