import{S as V,i as A,s as B,e as g,a as C,t as j,c as v,b as y,g as E,d as z,f as b,h as I,k as N,l as m,n as D,p as T,I as q,D as w,m as k,r as F}from"./index.3dc72b5f.js";import{s as U}from"./backend.8041d45b.js";import"./browser-ponyfill.4cff7876.js";import"./_commonjsHelpers.725317a4.js";function S(l,t,e){const s=l.slice();return s[9]=t[e],s[10]=t,s[11]=e,s}function P(l,t,e){const s=l.slice();return s[12]=t[e],s[13]=t,s[14]=e,s}function M(l){let t,e,s,u,h,c;function p(){l[4].call(e,l[13],l[14])}function d(){l[5].call(u,l[13],l[14])}return{c(){t=g("div"),e=g("input"),s=C(),u=g("input"),this.h()},l(r){t=v(r,"DIV",{class:!0});var o=y(t);e=v(o,"INPUT",{type:!0}),s=E(o),u=v(o,"INPUT",{type:!0}),o.forEach(b),this.h()},h(){I(e,"type","text"),I(u,"type","text"),I(t,"class","text-black")},m(r,o){N(r,t,o),m(t,e),k(e,l[12].title),m(t,s),m(t,u),k(u,l[12].description),h||(c=[D(e,"input",p),D(u,"input",d)],h=!0)},p(r,o){l=r,o&2&&e.value!==l[12].title&&k(e,l[12].title),o&2&&u.value!==l[12].description&&k(u,l[12].description)},d(r){r&&b(t),h=!1,F(c)}}}function O(l){let t,e,s,u;function h(){l[6].call(e,l[10],l[11])}return{c(){t=g("div"),e=g("input"),this.h()},l(c){t=v(c,"DIV",{class:!0});var p=y(t);e=v(p,"INPUT",{type:!0}),p.forEach(b),this.h()},h(){I(e,"type","text"),I(t,"class","text-black")},m(c,p){N(c,t,p),m(t,e),k(e,l[9].text),s||(u=D(e,"input",h),s=!0)},p(c,p){l=c,p&1&&e.value!==l[9].text&&k(e,l[9].text)},d(c){c&&b(t),s=!1,u()}}}function G(l){let t,e,s,u,h,c,p,d=l[1],r=[];for(let i=0;i<d.length;i+=1)r[i]=M(P(l,d,i));let o=l[0],a=[];for(let i=0;i<o.length;i+=1)a[i]=O(S(l,o,i));return{c(){t=g("main");for(let i=0;i<r.length;i+=1)r[i].c();e=C();for(let i=0;i<a.length;i+=1)a[i].c();s=C(),u=g("button"),h=j("Update"),this.h()},l(i){t=v(i,"MAIN",{class:!0});var f=y(t);for(let _=0;_<r.length;_+=1)r[_].l(f);e=E(f);for(let _=0;_<a.length;_+=1)a[_].l(f);s=E(f),u=v(f,"BUTTON",{});var n=y(u);h=z(n,"Update"),n.forEach(b),f.forEach(b),this.h()},h(){I(t,"class","text-white")},m(i,f){N(i,t,f);for(let n=0;n<r.length;n+=1)r[n].m(t,null);m(t,e);for(let n=0;n<a.length;n+=1)a[n].m(t,null);m(t,s),m(t,u),m(u,h),c||(p=D(u,"click",l[2]),c=!0)},p(i,[f]){if(f&2){d=i[1];let n;for(n=0;n<d.length;n+=1){const _=P(i,d,n);r[n]?r[n].p(_,f):(r[n]=M(_),r[n].c(),r[n].m(t,e))}for(;n<r.length;n+=1)r[n].d(1);r.length=d.length}if(f&1){o=i[0];let n;for(n=0;n<o.length;n+=1){const _=S(i,o,n);a[n]?a[n].p(_,f):(a[n]=O(_),a[n].c(),a[n].m(t,s))}for(;n<a.length;n+=1)a[n].d(1);a.length=o.length}},i:T,o:T,d(i){i&&b(t),q(r,i),q(a,i),c=!1,p()}}}function H(l,t,e){let{pid:s=0}=t;new Date().toISOString();let u=[];w(async()=>{const{data:o,error:a}=await U.from("Contents").select("*").eq("connect",s).order("number",{ascending:!0});a?console.log(a):e(0,u=o)});let h=[];w(async()=>{const{data:o,error:a}=await U.from("Documentation").select("*").eq("id",s);a?console.log(a):e(1,h=o)});function c(){U.from("Contents").update(u).eq("connect",s),console.log(u),console.log(h)}function p(o,a){o[a].title=this.value,e(1,h)}function d(o,a){o[a].description=this.value,e(1,h)}function r(o,a){o[a].text=this.value,e(0,u)}return l.$$set=o=>{"pid"in o&&e(3,s=o.pid)},[u,h,c,s,p,d,r]}class R extends V{constructor(t){super(),A(this,t,H,G,B,{pid:3})}}export{R as default};
