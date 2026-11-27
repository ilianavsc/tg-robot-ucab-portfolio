import sys,subprocess,json,re
pdf,md=sys.argv[1:3]
n=int(re.search(r"Pages:\s+(\d+)",subprocess.run(["pdfinfo",pdf],capture_output=True,text=True).stdout).group(1))
pag=[]
for i in range(1,n+1):
    t=subprocess.run(["pdftotext","-f",str(i),"-l",str(i),"-layout",pdf,"-"],capture_output=True,text=True).stdout
    lines=[l.strip() for l in t.splitlines() if l.strip()]
    foot=lines[-1] if lines else ""
    pag.append((foot, re.sub(r"\s+"," "," ".join(lines))))
src=open(md).read()
claves=[m.group(2) for m in re.finditer(r"^(#{1,3}) (.*)$",src,re.M)]+["Bibliografía"]
claves+=["Tabla %s."%m.group(1) for m in re.finditer(r"^\*\*Tabla (\d+)\.\*\*",src,re.M)]
res={}
# empezar a buscar tras el índice: primera página cuyo pie es "1" (arábigo)
inicio=next(i for i,(f,_) in enumerate(pag) if f=="1")
for c in claves:
    patron=re.sub(r"\s+"," ",c)
    for f,t in pag[inicio:]:
        busc = patron if not c.startswith("Tabla") else patron+" "
        if busc in t and not ("Índice" in t and f in ("i","ii","iii","iv")):
            res[c]=f; break
    else: res[c]="?"
print(json.dumps(res,ensure_ascii=False,indent=0)); print("paginas:",[f for f,_ in pag])
json.dump(res,open("paginas.json","w"),ensure_ascii=False)
