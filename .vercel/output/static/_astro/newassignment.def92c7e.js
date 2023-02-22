import{S as fe,i as he,s as be,e as k,t as H,a as N,c as v,b as w,d as Y,f,g as O,h as _,U as ge,k as X,l as u,m as j,X as le,n as S,p as re,I as ae,r as ue,D as _e,v as pe,Y as me}from"./index.3dc72b5f.js";import{s as K}from"./backend.8041d45b.js";import"./browser-ponyfill.4cff7876.js";import"./_commonjsHelpers.725317a4.js";function oe(l,e,t){const a=l.slice();return a[18]=e[t],a}function se(l,e,t){const a=l.slice();return a[21]=e[t],a[22]=e,a[23]=t,a}function ne(l){let e;return{c(){e=k("div"),this.h()},l(t){e=v(t,"DIV",{class:!0});var a=w(e);a.forEach(f),this.h()},h(){_(e,"class","flex flex-row w-96 sm:w-1/2 bg-gray-700 rounded-t-lg items-center h-10")},m(t,a){X(t,e,a)},d(t){t&&f(e)}}}function ce(l){let e;return{c(){e=k("div"),this.h()},l(t){e=v(t,"DIV",{class:!0});var a=w(e);a.forEach(f),this.h()},h(){_(e,"class","w-96 sm:w-1/2 bg-gray-700 rounded-t-lg items-center h-10")},m(t,a){X(t,e,a)},d(t){t&&f(e)}}}function de(l){let e,t,a,d,g,c,p,T,n,P,h=l[21].is_code==!1&&ne(),i=l[21].is_code==!0&&ce();function E(){l[12].call(d,l[22],l[23])}function R(){return l[13](l[21])}return{c(){e=k("div"),h&&h.c(),t=N(),i&&i.c(),a=N(),d=k("textarea"),c=N(),p=k("button"),T=H("Remove"),this.h()},l(b){e=v(b,"DIV",{class:!0});var m=w(e);h&&h.l(m),t=O(m),i&&i.l(m),a=O(m),d=v(m,"TEXTAREA",{rows:!0,placeholder:!0,class:!0,id:!0}),w(d).forEach(f),m.forEach(f),c=O(b),p=v(b,"BUTTON",{class:!0});var V=w(p);T=Y(V,"Remove"),V.forEach(f),this.h()},h(){_(d,"rows","6"),_(d,"placeholder","Contents (This text editor uses Markdown. Please use the markdown syntax.)"),_(d,"class","block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-b-lg outline-none"),_(d,"id",g="content"+l[21].number),_(e,"class","flex flex-col pt-7 w-full place-items-center"),_(p,"class","block p-2.5 w-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-7")},m(b,m){X(b,e,m),h&&h.m(e,null),u(e,t),i&&i.m(e,null),u(e,a),u(e,d),j(d,l[21].text),X(b,c,m),X(b,p,m),u(p,T),n||(P=[S(d,"input",E),S(p,"click",R)],n=!0)},p(b,m){l=b,l[21].is_code==!1?h||(h=ne(),h.c(),h.m(e,t)):h&&(h.d(1),h=null),l[21].is_code==!0?i||(i=ce(),i.c(),i.m(e,a)):i&&(i.d(1),i=null),m&2&&g!==(g="content"+l[21].number)&&_(d,"id",g),m&2&&j(d,l[21].text)},d(b){b&&f(e),h&&h.d(),i&&i.d(),b&&f(c),b&&f(p),n=!1,ue(P)}}}function ie(l){let e,t=l[18].title+"",a,d;return{c(){e=k("option"),a=H(t),this.h()},l(g){e=v(g,"OPTION",{});var c=w(e);a=Y(c,t),c.forEach(f),this.h()},h(){e.__value=d=l[18].id,e.value=e.__value},m(g,c){X(g,e,c),u(e,a)},p(g,c){c&4&&t!==(t=g[18].title+"")&&pe(a,t),c&4&&d!==(d=g[18].id)&&(e.__value=d,e.value=e.__value)},d(g){g&&f(e)}}}function ke(l){let e,t,a,d,g,c,p,T,n,P,h,i,E,R,b,m,V,M,z,F,o,C,U,G,A=l[1],y=[];for(let s=0;s<A.length;s+=1)y[s]=de(se(l,A,s));let L=l[2],x=[];for(let s=0;s<L.length;s+=1)x[s]=ie(oe(l,L,s));return{c(){e=k("main"),t=k("div"),a=k("div"),d=k("h1"),g=H("New Docs"),c=N(),p=k("textarea"),T=N(),n=k("textarea"),P=N();for(let s=0;s<y.length;s+=1)y[s].c();h=N(),i=k("div"),E=k("select");for(let s=0;s<x.length;s+=1)x[s].c();R=N(),b=k("button"),m=H("Text"),V=N(),M=k("button"),z=H("Code"),F=N(),o=k("button"),C=H("Push"),this.h()},l(s){e=v(s,"MAIN",{});var D=w(e);t=v(D,"DIV",{class:!0});var r=w(t);a=v(r,"DIV",{class:!0});var I=w(a);d=v(I,"H1",{});var W=w(d);g=Y(W,"New Docs"),W.forEach(f),c=O(I),p=v(I,"TEXTAREA",{rows:!0,placeholder:!0,class:!0}),w(p).forEach(f),T=O(I),n=v(I,"TEXTAREA",{rows:!0,placeholder:!0,class:!0}),w(n).forEach(f),I.forEach(f),P=O(r);for(let B=0;B<y.length;B+=1)y[B].l(r);h=O(r),i=v(r,"DIV",{class:!0});var q=w(i);E=v(q,"SELECT",{class:!0});var Z=w(E);for(let B=0;B<x.length;B+=1)x[B].l(Z);Z.forEach(f),R=O(q),b=v(q,"BUTTON",{class:!0});var $=w(b);m=Y($,"Text"),$.forEach(f),V=O(q),M=v(q,"BUTTON",{class:!0});var ee=w(M);z=Y(ee,"Code"),ee.forEach(f),q.forEach(f),F=O(r),o=v(r,"BUTTON",{class:!0});var te=w(o);C=Y(te,"Push"),te.forEach(f),r.forEach(f),D.forEach(f),this.h()},h(){_(p,"rows","1"),_(p,"placeholder","Title"),_(p,"class","block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"),_(n,"rows","1"),_(n,"placeholder","Description"),_(n,"class","block p-2.5 w-96 sm:w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"),_(a,"class","flex flex-col gap-7 w-full place-items-center"),_(E,"class","block p-2.5 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"),l[0].lang===void 0&&ge(()=>l[14].call(E)),_(b,"class","block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700"),_(M,"class","block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700"),_(i,"class","flex flex-row gap-6 pt-6"),o.disabled=l[3],_(o,"class","block p-2.5 w-20 text-sm rounded-lg bg-blue-700 border-blue-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-800 disabled:hover:bg-gray-700 mt-7"),_(t,"class","flex flex-col place-items-center w-screen text-white pl-0 sm:pl-20 ")},m(s,D){X(s,e,D),u(e,t),u(t,a),u(a,d),u(d,g),u(a,c),u(a,p),j(p,l[0].title),u(a,T),u(a,n),j(n,l[0].description),u(t,P);for(let r=0;r<y.length;r+=1)y[r].m(t,null);u(t,h),u(t,i),u(i,E);for(let r=0;r<x.length;r+=1)x[r].m(E,null);le(E,l[0].lang),u(i,R),u(i,b),u(b,m),u(i,V),u(i,M),u(M,z),u(t,F),u(t,o),u(o,C),U||(G=[S(p,"input",l[10]),S(n,"input",l[11]),S(E,"change",l[14]),S(b,"click",l[5]),S(M,"click",l[7]),S(o,"click",l[15])],U=!0)},p(s,[D]){if(D&5&&j(p,s[0].title),D&5&&j(n,s[0].description),D&66){A=s[1];let r;for(r=0;r<A.length;r+=1){const I=se(s,A,r);y[r]?y[r].p(I,D):(y[r]=de(I),y[r].c(),y[r].m(t,h))}for(;r<y.length;r+=1)y[r].d(1);y.length=A.length}if(D&4){L=s[2];let r;for(r=0;r<L.length;r+=1){const I=oe(s,L,r);x[r]?x[r].p(I,D):(x[r]=ie(I),x[r].c(),x[r].m(E,null))}for(;r<x.length;r+=1)x[r].d(1);x.length=L.length}D&5&&le(E,s[0].lang),D&8&&(o.disabled=s[3])},i:re,o:re,d(s){s&&f(e),ae(y,s),ae(x,s),U=!1,ue(G)}}}let Q=0;function J(l){return Math.floor(Math.random()*Math.floor(l))}function ve(l,e,t){let a,{user:d}=e,g=new Date().toISOString(),c={title:"",description:"",lang:0,id:J(1e4),created_at:g,user_id:d.id},p={id:J(1e4),created_at:g,number:Q,text:"",connect:c.id,is_code:!1},T=[];_e(async()=>{const{data:o,error:C}=await K.from("Language").select("*");C?console.log(C):t(2,T=o)});let n=[];const P=()=>t(1,n=[...n,{text:"",id:J(1e4),created_at:g,number:Q,is_code:!1}]);function h(o){n.splice(o,1),t(1,n=[...n])}const i=()=>{t(1,n=[...n,{text:"",id:J(1e4),created_at:g,number:Q,is_code:!0}])};console.log(n);async function E(){await Promise.all(n.map(async o=>{await K.from("Contents").insert([{text:o.text,number:n.indexOf(o),connect:c.id,id:o.id,created_at:o.created_at,is_code:o.is_code}]).then(({data:C,error:U})=>{console.log(c.id),console.log(o.connect),console.log(n),console.log(U)})}))}async function R(o,C){K.from("Documentation").insert([{title:o.title,description:o.description,lang:o.lang,id:o.id,created_at:o.created_at,user_id:o.user_id}]).then(({data:U,error:G})=>{console.log(U),console.log(G),E(),console.log(n)}),setTimeout(()=>{window.location.href="/docs/"+o.id},1500)}function b(){c.title=this.value,t(0,c),t(2,T)}function m(){c.description=this.value,t(0,c),t(2,T)}function V(o,C){o[C].text=this.value,t(1,n)}const M=o=>h(n.indexOf(o));function z(){c.lang=me(this),t(0,c),t(2,T)}const F=()=>R(c);return l.$$set=o=>{"user"in o&&t(9,d=o.user)},l.$$.update=()=>{l.$$.dirty&3&&t(3,a=!c.title||!c.description||!c.lang||!n.length||n.some(o=>!o.text))},[c,n,T,a,p,P,h,i,R,d,b,m,V,M,z,F]}class Te extends fe{constructor(e){super(),he(this,e,ve,ke,be,{user:9})}}export{Te as default};
