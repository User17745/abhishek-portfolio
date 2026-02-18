import{j as t}from"./jsx-runtime.D_zvdyIk.js";function r({measurementId:a}){return a?t.jsxs(t.Fragment,{children:[t.jsx("script",{async:!0,src:`https://www.googletagmanager.com/gtag/js?id=${a}`}),t.jsx("script",{dangerouslySetInnerHTML:{__html:`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${a}', {
              page_path: window.location.pathname,
            });
          `}})]}):null}export{r as default};
