import{r as s,R as A}from"./index.DJ4e78gH.js";import{j as v}from"./jsx-runtime.D_zvdyIk.js";import{a as S,c as V}from"./utils.CiB0LXSo.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=(...e)=>e.filter((t,n,i)=>!!t&&t.trim()!==""&&i.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,i)=>i?i.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=e=>{const t=N(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=s.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:r="",children:o,iconNode:u,...l},d)=>s.createElement("svg",{ref:d,...k,width:t,height:t,stroke:e,strokeWidth:i?Number(n)*24/Number(t):n,className:w("lucide",r),...!o&&!P(l)&&{"aria-hidden":"true"},...l},[...u.map(([a,c])=>s.createElement(a,c)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=(e,t)=>{const n=s.forwardRef(({className:i,...r},o)=>s.createElement($,{ref:o,iconNode:t,className:w(`lucide-${_(b(e))}`,`lucide-${e}`,i),...r}));return n.displayName=b(e),n};function h(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function L(...e){return t=>{let n=!1;const i=e.map(r=>{const o=h(r,t);return!n&&typeof o=="function"&&(n=!0),o});if(n)return()=>{for(let r=0;r<i.length;r++){const o=i[r];typeof o=="function"?o():h(e[r],null)}}}}var O=Symbol.for("react.lazy"),m=A[" use ".trim().toString()];function W(e){return typeof e=="object"&&e!==null&&"then"in e}function E(e){return e!=null&&typeof e=="object"&&"$$typeof"in e&&e.$$typeof===O&&"_payload"in e&&W(e._payload)}function B(e){const t=T(e),n=s.forwardRef((i,r)=>{let{children:o,...u}=i;E(o)&&typeof m=="function"&&(o=m(o._payload));const l=s.Children.toArray(o),d=l.find(z);if(d){const a=d.props.children,c=l.map(f=>f===d?s.Children.count(a)>1?s.Children.only(null):s.isValidElement(a)?a.props.children:null:f);return v.jsx(t,{...u,ref:r,children:s.isValidElement(a)?s.cloneElement(a,void 0,c):null})}return v.jsx(t,{...u,ref:r,children:o})});return n.displayName=`${e}.Slot`,n}var I=B("Slot");function T(e){const t=s.forwardRef((n,i)=>{let{children:r,...o}=n;if(E(r)&&typeof m=="function"&&(r=m(r._payload)),s.isValidElement(r)){const u=U(r),l=D(o,r.props);return r.type!==s.Fragment&&(l.ref=i?L(i,u):u),s.cloneElement(r,l)}return s.Children.count(r)>1?s.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Z=Symbol("radix.slottable");function z(e){return s.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Z}function D(e,t){const n={...t};for(const i in t){const r=e[i],o=t[i];/^on[A-Z]/.test(i)?r&&o?n[i]=(...l)=>{const d=o(...l);return r(...l),d}:r&&(n[i]=r):i==="style"?n[i]={...r,...o}:i==="className"&&(n[i]=[r,o].filter(Boolean).join(" "))}return{...e,...n}}function U(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}const C=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,x=S,F=(e,t)=>n=>{var i;if(t?.variants==null)return x(e,n?.class,n?.className);const{variants:r,defaultVariants:o}=t,u=Object.keys(r).map(a=>{const c=n?.[a],f=o?.[a];if(c===null)return null;const p=C(c)||C(f);return r[a][p]}),l=n&&Object.entries(n).reduce((a,c)=>{let[f,p]=c;return p===void 0||(a[f]=p),a},{}),d=t==null||(i=t.compoundVariants)===null||i===void 0?void 0:i.reduce((a,c)=>{let{class:f,className:p,...j}=c;return Object.entries(j).every(R=>{let[g,y]=R;return Array.isArray(y)?y.includes({...o,...l}[g]):{...o,...l}[g]===y})?[...a,f,p]:a},[]);return x(e,u,d,n?.class,n?.className)},H=F("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),K=s.forwardRef(({className:e,variant:t,size:n,asChild:i=!1,...r},o)=>{const u=i?I:"button";return v.jsx(u,{className:V(H({variant:t,size:n,className:e})),ref:o,...r})});K.displayName="Button";export{K as B,F as a,J as c};
