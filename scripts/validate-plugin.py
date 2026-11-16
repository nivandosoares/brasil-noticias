from pathlib import Path
from urllib.parse import urlparse
import json,zipfile,sys
base=Path('plugin');m=json.loads((base/'plugin.json').read_text());o=m['extensions']['com.openai'];i=o['interface']
assert m['$schema']=='https://agent-plugins.org/schemas/1.0.0/plugin.schema.json'
assert not m.get('apps') and not o.get('apps') and not (base/'.app.json').exists()
assert len(i['displayName'])<=30 and len(i['shortDescription'])<=30
assert i['category']=='Other'
assert len(o['review']['test_cases']['positive'])==5 and len(o['review']['test_cases']['negative'])==3
assert o['review']['commerce'] is False and o['publication']['countries']==['BR']
for k in ['websiteURL','supportURL','privacyPolicyURL','termsOfServiceURL']:
 assert urlparse(i[k]).scheme=='https' and len(i[k])<=1024
for k in ['logo','composerIcon']:assert (base/i[k]).is_file()
for c in o['review']['test_cases']['positive']:assert all(isinstance(c[k],str) and c[k].strip() for k in ['description','prompt','tools_triggered','expected_behavior'])
for c in o['review']['test_cases']['negative']:assert all(isinstance(c[k],str) and c[k].strip() for k in ['description','prompt'])
if len(sys.argv)>1:
 target=Path(sys.argv[1]);target.parent.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
  for p in sorted(base.rglob('*')):
   if p.is_file():z.write(p,p.relative_to(base))
 with zipfile.ZipFile(target) as z:
  assert '.app.json' not in z.namelist();assert z.testzip() is None
 print('ZIP candidato validado:',target)
print('Pacote válido estruturalmente; gravação, identidade e revisão pública ainda pendentes.')
