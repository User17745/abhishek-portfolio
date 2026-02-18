import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DmtMl56i.mjs';
import { manifest } from './manifest_DDxnHuvS.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/match-resume.astro.mjs');
const _page2 = () => import('./pages/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/case-studies/_slug_.astro.mjs');
const _page5 = () => import('./pages/case-studies.astro.mjs');
const _page6 = () => import('./pages/chat.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/match-resume.ts", _page1],
    ["src/pages/blog/[slug].astro", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/case-studies/[slug].astro", _page4],
    ["src/pages/case-studies/index.astro", _page5],
    ["src/pages/chat.astro", _page6],
    ["src/pages/rss.xml.ts", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f76f49e2-46a4-43bc-9275-5a1b3d12f6e2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
