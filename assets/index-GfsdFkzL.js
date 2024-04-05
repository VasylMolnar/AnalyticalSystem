(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function d(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(r){if(r.ep)return;r.ep=!0;const n=d(r);fetch(r.href,n)}})();let l=0,s=0;const b={G1:[.1,.2,.3,.4],G2:[.2,.3,.1,.4],G3:[.4,.1,.3,.2]},w=()=>{l++,s=s+=1;const t=document.getElementById("criteriaTable"),e=document.createElement("tr");e.innerHTML=`
        <td  class='rowSpan'>G${l}</td>
        <td>K${s}</td>
        <td><input type="number" name="G${l}_K${s}_C2"></td>
        <td><input type="number" name="G${l}_K${s}_C3"></td>
        <td><input type="number" name="G${l}_K${s}_C11"></td>
        <td><input type="number" name="G${l}_K${s}_C1209"></td>
    `,t.appendChild(e)},C=()=>{s++;const t=document.getElementById("criteriaTable"),e=document.createElement("tr");e.innerHTML=`
          <td></td>
          <td>K${s}</td>
          <td><input type="number" name="G${l}_K${s}_C2"></td>
          <td><input type="number" name="G${l}_K${s}_C3"></td>
          <td><input type="number" name="G${l}_K${s}_C11"></td>
          <td><input type="number" name="G${l}_K${s}_C1209"></td>
      `,t.appendChild(e)},M=t=>b[t]||[],L=(t,e)=>{let d=0;for(let c=0;c<t.length;c++)d+=t[c]*e[c];return d},y=(t,e)=>t<12?1/2+1/2*Math.cos((t-12)/108*Math.PI):t>=12&&t<=120?t:0,$=(t,e)=>t<12?1/3+1/3*Math.cos((t-12)/108*Math.PI):t>=12&&t<=120?t:0,G=(t,e)=>t<=0?0:t>0&&t<=15?Math.pow(t,2)/450:t>15&&t<30?1-Math.pow(30-t,2)/450:1,E=t=>t.reduce((d,c)=>d+c,0)/t.length,T=t=>{const e=document.getElementById("fuzzyTable");e.innerHTML="",e.innerHTML=`
                    <tr>
                    <th>Група критеріїв</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C11</th>
                    <th>C1209</th>
                    </tr>
        `;for(const d in t){const c=t[d];for(const r in c){const n=c[r],i=document.createElement("tr");i.innerHTML=`
                              <td>${d}</td>
                              <td>${n[0]}</td>
                              <td>${n[1]}</td>
                              <td>${n[2]}</td>
                              <td>${n[3]}</td>
                            `,e.appendChild(i)}}},K=t=>{t.preventDefault();const e={},c=new FormData(t.target).entries();for(const[n,i]of c){const[u,o]=n.split("_");if(!o)return;e[u]?e[u][o]?e[u][o]=[...e[u][o],i]:e[u]={...e[u],[o]:[i]}:e[u]={[o]:[i]}}const r={};for(const n in e)if(e.hasOwnProperty(n)){const i=e[n];r[n]={};for(const u in i)if(i.hasOwnProperty(u)){const o=i[u].map(Number),_=M(n),a=L(o,_);let m,p,f,h;if(n==="G2")m=$(a+2,o.length+11),p=$(a+3,o.length+23),f=$(a+.4,o.length+3),h=$(a+3.2,o.length+39);else if(n==="G3"){const g=E(o);m=G(g+1,o.length+1),p=G(g+2,o.length+41),f=G(g+3,o.length+2),h=G(g+4,o.length+24)}else m=y(a+.2,o.length+12),p=y(a+3,o.length+2),f=y(a+12,o.length+3),h=y(a+2,o.length+23);r[n][u]=[m,p,f,h]}}T(r)};document.getElementById("addTr").addEventListener("click",w);document.getElementById("addTd").addEventListener("click",C);document.getElementById("criteriaForm").addEventListener("submit",K);
