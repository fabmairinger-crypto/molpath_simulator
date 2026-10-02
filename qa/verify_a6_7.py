from pathlib import Path
import argparse,json,hashlib
p=argparse.ArgumentParser(description="Verify the A6.6 base or A6.7 payload and unchanged canonical dependencies.")
p.add_argument('phase',choices=['before','after']);p.add_argument('build',type=Path);a=p.parse_args()
m=json.loads((Path(__file__).resolve().parent.parent/'MANIFEST_RC2_A6_7.json').read_text(encoding='utf-8'))
items=[(x['path'],x['base_sha256'] if a.phase=='before' else x['sha256']) for x in m['payload']]+[(x['path'],x['sha256']) for x in m['required_unchanged_inputs']]
bad=[]
for name,expected in items:
 f=a.build/name;actual=hashlib.sha256(f.read_bytes()).hexdigest() if f.is_file() else 'MISSING'
 if actual!=expected:bad.append({'path':name,'expected':expected,'actual':actual})
print(json.dumps({'phase':a.phase,'checked':len(items),'status':'PASS' if not bad else 'FAIL','mismatches':bad},ensure_ascii=False,indent=2))
raise SystemExit(bool(bad))
