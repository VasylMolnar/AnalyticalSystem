(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function c(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=c(r);fetch(r.href,n)}})();let l=3,d=26;const L={G1:[.1,.2,.3,.4],G2:[.2,.3,.1,.4],G3:[.4,.1,.3,.2]},T={G1:Math.floor(Math.random()*10)+1,G2:Math.floor(Math.random()*10)+1-10,G3:Math.floor(Math.random()*10)+4},C=Object.values(T).reduce((t,e)=>t+e,0),F=Object.fromEntries(Object.entries(T).map(([t,e])=>[t,e/C])),_=()=>{l++,d=d+=1;const t=document.getElementById("criteriaTable"),e=document.createElement("tr");e.innerHTML=`
        <td  class='rowSpan'>G${l}</td>
        <td>K${d}</td>
        <td><input type="number" name="G${l}_K${d}_C2"></td>
        <td><input type="number" name="G${l}_K${d}_C3"></td>
        <td><input type="number" name="G${l}_K${d}_C11"></td>
        <td><input type="number" name="G${l}_K${d}_C1209"></td>
    `,t.appendChild(e)},B=()=>{d++;const t=document.getElementById("criteriaTable"),e=document.createElement("tr");e.innerHTML=`
          <td></td>
          <td>K${d}</td>
          <td><input type="number" name="G${l}_K${d}_C2"></td>
          <td><input type="number" name="G${l}_K${d}_C3"></td>
          <td><input type="number" name="G${l}_K${d}_C11"></td>
          <td><input type="number" name="G${l}_K${d}_C1209"></td>
      `,t.appendChild(e)},I=t=>L[t]||[],K=(t,e)=>{let c=0;for(let s=0;s<t.length;s++)c+=t[s]*e[s];return c},b=(t,e)=>t<12?1/2+1/2*Math.cos((t-12)/108*Math.PI):t>=12&&t<=120?t:0,$=(t,e)=>t<12?1/3+1/3*Math.cos((t-12)/108*Math.PI):t>=12&&t<=120?t:0,M=(t,e)=>t<=0?0:t>0&&t<=15?Math.pow(t,2)/450:t>15&&t<30?1-Math.pow(30-t,2)/450:1,v=t=>t.reduce((c,s)=>c+s,0)/t.length,H=t=>{const e=document.getElementById("fuzzyTable");e.innerHTML="",e.innerHTML=`
                    <tr>
                    <th>Група критеріїв</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C11</th>
                    <th>C1209</th>
                    </tr>
        `;for(const c in t){const s=t[c];for(const r in s){const n=s[r],i=document.createElement("tr");i.innerHTML=`
                              <td>${c}</td>
                              <td>${n[0].toFixed(3)}</td>
                              <td>${n[1].toFixed(3)}</td>
                              <td>${n[2].toFixed(3)}</td>
                              <td>${n[3].toFixed(3)}</td>
                            `,e.appendChild(i)}}},O=()=>{const t=F,e=document.getElementById("factors");e.innerHTML="",e.innerHTML=`
                    <tr>
                    <th>B1 = ${(t.G1+Math.floor(Math.random()*5)).toFixed(3)}</th>
                    <th>B2 = ${t.G2.toFixed(3)}</th>
                    <th>B3 = ${(t.G3+Math.floor(Math.random()*5)).toFixed(3)}</th>
                    </tr>
        `},P={S1:["чоловік","жінка","чоловік","жінка"],S2:["15-24","25-34","35-44","45-54"],S3:["Вища освіта (бакалавр, магістр)","Вища освіта (бакалавр, магістр)","Вища освіта (бакалавр, магістр)","Базова освіта"]},x=()=>{const t=document.getElementById("demographicTable");for(const[e,c]of Object.entries(P)){const s=document.createElement("tr");s.innerHTML=`
      <td>${e}</td>
      ${c.map(r=>`<td>${r}</td>`).join("")}
    `,t.appendChild(s)}},A={"0.77;0.89":"рівень знань громадян щодо персоналізованого контенту в екосистемі цифрових медіа – вище середнього","0.89;1":"високий рівень знань громадян щодо персоналізованого контенту в екосистемі цифрових медіа","0.65;0.77":"середній рівень знань громадян щодо персоналізованого контенту в екосистемі цифрових медіа","0.54;0.65":"низький рівень знань громадян щодо персоналізованого контенту в екосистемі цифрових медіа","0;0.54":"дуже низький рівень знань громадян щодо персоналізованого контенту в екосистемі цифрових медіа"},j=()=>{const t=document.getElementById("linguisticAssessmentTable");for(const[e,c]of Object.entries(A)){const s=document.createElement("tr");s.innerHTML=`
      <td>${e}</td>
      <td>${c}</td>
    `,t.appendChild(s)}},z=t=>{t.preventDefault();const e={},s=new FormData(t.target).entries();for(const[n,i]of s){const[a,o]=n.split("_");if(!o)return;e[a]?e[a][o]?e[a][o]=[...e[a][o],i]:e[a]={...e[a],[o]:[i]}:e[a]={[o]:[i]}}const r={};for(const n in e)if(e.hasOwnProperty(n)){const i=e[n];r[n]={};for(const a in i)if(i.hasOwnProperty(a)){const o=i[a].map(Number),w=I(n),u=K(o,w);let h,f,p,g;const m=Math.floor(Math.random()*20)+1;if(n==="G2")h=$(u+2,o.length+m+1),f=$(u+3,o.length+m),p=$(u+.4,o.length+3),g=$(u+3.2,o.length+m);else if(n==="G3"){const y=v(o);h=M(y+1,o.length+1),f=M(y+2,o.length+m+2),p=M(y+3,o.length+2),g=M(y+4,o.length+m+1)}else h=b(u+.2,o.length+m-1),f=b(u+3,o.length+m-10),p=b(u+12,o.length+3),g=b(u+2,o.length+m+5);r[n][a]=[h,f,p,g]}}H(r),O(),x(),j()};document.getElementById("addTr").addEventListener("click",_);document.getElementById("addTd").addEventListener("click",B);document.getElementById("criteriaForm").addEventListener("submit",z);const G=document.getElementById("criteriaForm"),E=document.getElementById("submitButton");G.addEventListener("input",function(){const t=G.querySelectorAll("input");let e=!0;t.forEach(c=>{c.value.trim()||(e=!1)}),e?E.removeAttribute("disabled"):E.setAttribute("disabled","disabled")});
