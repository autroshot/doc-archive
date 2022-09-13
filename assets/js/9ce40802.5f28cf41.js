"use strict";(self.webpackChunkdocs_translation=self.webpackChunkdocs_translation||[]).push([[7431],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,c=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=s(r),d=o,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||c;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=r.length,i=new Array(c);i[0]=m;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var s=2;s<c;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3486:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>E,contentTitle:()=>k,default:()=>N,frontMatter:()=>j,metadata:()=>x,toc:()=>w});var n=r(7462),o=r(7294),c=r(3905),i=r(6010),a=r(2802),l=r(9960),s=r(3919),u=r(5999);const p="cardContainer_fWXF",m="cardTitle_rnsV",d="cardDescription_PWke";function f(e){let{href:t,children:r}=e;return o.createElement(l.Z,{href:t,className:(0,i.Z)("card padding--lg",p)},r)}function y(e){let{href:t,icon:r,title:n,description:c}=e;return o.createElement(f,{href:t},o.createElement("h2",{className:(0,i.Z)("text--truncate",m),title:n},r," ",n),c&&o.createElement("p",{className:(0,i.Z)("text--truncate",d),title:c},c))}function g(e){let{item:t}=e;const r=(0,a.Wl)(t);return r?o.createElement(y,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,u.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function b(e){let{item:t}=e;const r=(0,s.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",n=(0,a.xz)(t.docId??void 0);return o.createElement(y,{href:t.href,icon:r,title:t.label,description:null==n?void 0:n.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return o.createElement(b,{item:t});case"category":return o.createElement(g,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function v(e){let{className:t}=e;const r=(0,a.jA)();return o.createElement(O,{items:r.items,className:t})}function O(e){const{items:t,className:r}=e;if(!t)return o.createElement(v,e);const n=(0,a.MN)(t);return o.createElement("section",{className:(0,i.Z)("row",r)},n.map(((e,t)=>o.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},o.createElement(h,{item:e})))))}const j={},k="\uac1c\uc694",x={unversionedId:"next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/intro",id:"next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/intro",title:"\uac1c\uc694",description:"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc720\uc2a4 \ucf00\uc774\uc2a4\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20 \uc5c5\ub370\uc774\ud2b8\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4.",source:"@site/docs/next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/intro.md",sourceDirName:"next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30",slug:"/next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/intro",permalink:"/docs-repository/docs/next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/intro",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"nextJsSidebar",previous:{title:"\ud398\uc774\uc9c0",permalink:"/docs-repository/docs/next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ud398\uc774\uc9c0"},next:{title:"getServerSideProps",permalink:"/docs-repository/docs/next-js/\ubb38\uc11c/\uae30\ubcf8-\uae30\ub2a5/\ub370\uc774\ud130-\uac00\uc838\uc624\uae30/get-server-side-props"}},E={},w=[],S={toc:w};function N(e){let{components:t,...r}=e;return(0,c.kt)("wrapper",(0,n.Z)({},S,r,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"\uac1c\uc694"},"\uac1c\uc694"),(0,c.kt)("p",null,"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc720\uc2a4 \ucf00\uc774\uc2a4\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20 \uc5c5\ub370\uc774\ud2b8\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4."),(0,c.kt)("p",null,"\uac01 \ubb38\uc11c\uc5d0 \ud574\ub2f9\ud558\ub294 \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub294 \ub2e4\uc74c\uacfc \uac19\uc2b5\ub2c8\ub2e4."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"getServerSideProps - SSR (\uc11c\ubc84 \uce21 \ub80c\ub354\ub9c1)"),(0,c.kt)("li",{parentName:"ul"},"getStaticPaths - \ub3d9\uc801 \ub77c\uc6b0\ud305"),(0,c.kt)("li",{parentName:"ul"},"getStaticProps - SSG (\uc815\uc801 \uc0ac\uc774\ud2b8 \uc0dd\uc131)"),(0,c.kt)("li",{parentName:"ul"},"\uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131 - ISR"),(0,c.kt)("li",{parentName:"ul"},"\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 - CSR (\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 \ub80c\ub354\ub9c1)")),(0,c.kt)(O,{mdxType:"DocCardList"}))}N.isMDXComponent=!0}}]);