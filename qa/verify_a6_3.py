"""Check the 24 payload files against their pre-apply or post-apply hashes."""
from pathlib import Path
import argparse,json,hashlib

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('phase',choices=['before','after'])
parser.add_argument('build',type=Path,help='Root of the full MolPath build containing index.html')
args=parser.parse_args()
manifest_path=Path(__file__).resolve().parent.parent/'MANIFEST_RC2_A6_3.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
field='base_sha256' if args.phase=='before' else 'sha256'
bad=[]
for item in manifest['payload']:
    p=args.build/item['path']
    actual=hashlib.sha256(p.read_bytes()).hexdigest() if p.is_file() else 'MISSING'
    if actual!=item[field]:bad.append({'path':item['path'],'actual':actual,'expected':item[field]})
print(json.dumps({'phase':args.phase,'build':str(args.build.resolve()),'checked':len(manifest['payload']),'status':'PASS' if not bad else 'FAIL','mismatches':bad},ensure_ascii=False,indent=2))
raise SystemExit(bool(bad))
