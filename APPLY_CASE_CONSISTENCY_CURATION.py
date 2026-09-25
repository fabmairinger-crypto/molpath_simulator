#!/usr/bin/env python3
from pathlib import Path
import hashlib, shutil, sys

PATCH_ROOT = Path(__file__).resolve().parent
PATCH_V3 = PATCH_ROOT / 'v3'
EXPECTED_OVAR_SHA = '54813a0c38e44c4035e314eef0cffb6e6041a62c77aeb641e97b7d75d9ab3421'
PATCHED_OVAR_SHA = 'bd6701b1f2d7cd8e3df27ae855a73c5e033af822e1235fab5b8349ca5a3b6f68'
NEW_SCRIPT = 'v260rc1_case_consistency_curation_i18n.js'
OVAR_SCRIPT = 'v240z18_ovar002_flagship.js'
ANCHOR = '<script src="v250b_signature_taxonomy_freeze.js"></script>'
INCLUDE = '<!-- v2.6.0-rc1 case-consistency curation; keep Signature Taxonomy Freeze last -->\n<script src="'+NEW_SCRIPT+'"></script>\n'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    if len(sys.argv) != 2:
        raise SystemExit('Usage: python APPLY_CASE_CONSISTENCY_CURATION.py /path/to/current/v3')
    target = Path(sys.argv[1]).resolve()
    index = target / 'index.html'
    ovar = target / OVAR_SCRIPT
    if not index.exists() or not ovar.exists():
        raise SystemExit('Target must be the current v3 directory containing index.html and '+OVAR_SCRIPT)
    html = index.read_text(encoding='utf-8')
    if NEW_SCRIPT not in html and ANCHOR not in html:
        raise SystemExit('Safety stop: signature-freeze anchor not found; index.html was not modified.')
    ovar_sha = sha(ovar)
    if ovar_sha not in {EXPECTED_OVAR_SHA, PATCHED_OVAR_SHA}:
        raise SystemExit('Safety stop: '+OVAR_SCRIPT+' has an unexpected SHA256 ('+ovar_sha+'). Merge the small OVAR completion change manually; no files were changed.')
    # Preflight passed: now mutate.
    shutil.copy2(PATCH_V3 / NEW_SCRIPT, target / NEW_SCRIPT)
    if ovar_sha != PATCHED_OVAR_SHA:
        shutil.copy2(PATCH_V3 / OVAR_SCRIPT, ovar)
    if NEW_SCRIPT not in html:
        html = html.replace(ANCHOR, INCLUDE + ANCHOR, 1)
        index.write_text(html, encoding='utf-8')
    print('Applied safely.')
    print('  OVAR wrapper:', sha(ovar))
    print('  New runtime patch:', sha(target / NEW_SCRIPT))
    print('  Signature taxonomy freeze remains last:', html.find(NEW_SCRIPT) < html.find('v250b_signature_taxonomy_freeze.js'))

if __name__ == '__main__':
    main()
