import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DJ4e78gH.js";import{c as m,B as h}from"./button.mTApM3jn.js";import"./utils.CiB0LXSo.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],i=m("moon",l);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],g=m("sun",d);function y(){const[o,a]=c.useState("light");c.useEffect(()=>{const e=localStorage.getItem("theme"),r=window.matchMedia("(prefers-color-scheme: dark)").matches,s=e||(r?"dark":"light");a(s),document.documentElement.classList.toggle("dark",s==="dark")},[]);const n=()=>{const e=o==="light"?"dark":"light";a(e),localStorage.setItem("theme",e),document.documentElement.classList.toggle("dark",e==="dark")};return t.jsx(h,{variant:"ghost",size:"icon",onClick:n,"aria-label":"Toggle theme",children:o==="light"?t.jsx(i,{className:"h-5 w-5"}):t.jsx(g,{className:"h-5 w-5"})})}export{y as default};
