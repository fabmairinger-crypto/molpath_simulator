from pathlib import Path
import sys
base=Path(sys.argv[1])
out=Path(sys.argv[2] if len(sys.argv)>2 else "molpath_simulator_v2_2_4b_i18n_blocks01_03_integration_test.html")
patch=Path(__file__).with_name("v224b_i18n_blocks01_03_patch.js").read_text(encoding="utf-8").rstrip("\n")
html=base.read_text(encoding="utf-8")
old="function tr(s,lang){if(!s||lang==='de')return s; const d=DICT[lang]||{}; return d[s]||s;}"
new="function tr(s,lang,node){if(!s||lang==='de')return s; const d=DICT[lang]||{}; try{if(window.MolPathI18nResolve){const v=window.MolPathI18nResolve(s,lang,node,d);if(v!==undefined&&v!==null)return v;}}catch(_e){} return d[s]||s;}"
if html.count(old)!=1: raise SystemExit("Base translator signature not found exactly once")
html=html.replace(old,new,1)
html=html.replace("node.nodeValue=lead+tr(trimmed,lang)+trail;","node.nodeValue=lead+tr(trimmed,lang,node)+trail;",1)
html=html.replace("el.setAttribute(a,tr(orig,lang));","el.setAttribute(a,tr(orig,lang,el));",1)
pos=html.rfind("</body></html>")
if pos<0: raise SystemExit("Closing body/html marker missing")
tag="\n<script id=\"v224b-i18n-blocks01-03-integration\">\n"+patch+"\n</script>\n"
html=html[:pos]+tag+html[pos:]
out.write_text(html,encoding="utf-8")
print(out)
