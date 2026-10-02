import argparse,json,hashlib
from pathlib import Path
p=argparse.ArgumentParser(description='Verify A6.10 runtime payload and known dependencies before/after integration.')
p.add_argument('phase',choices=['before','after']);p.add_argument('build',type=Path);args=p.parse_args()
manifest=json.loads((Path(__file__).resolve().parents[1]/'MANIFEST_RC2_A6_10.json').read_text())
items=[(x['path'],x['base_sha256'] if args.phase=='before' else x['sha256']) for x in manifest['payload']]
items.extend((x['path'],x['sha256']) for x in manifest['required_unchanged_inputs']);failed=[]
for name,expected in items:
 path=args.build/name;actual=hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None
 ok=actual==expected
 print(('PASS ' if ok else 'FAIL ')+name+(' (expected absent)' if expected is None else ''))
 if not ok:failed.append({'path':name,'expected_sha256':expected,'actual_sha256':actual})
print(json.dumps({'phase':args.phase,'passed':len(items)-len(failed),'total':len(items),'failed':failed},indent=2))
raise SystemExit(bool(failed))
