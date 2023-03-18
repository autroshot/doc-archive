"use strict";(self.webpackChunkdocs_translation=self.webpackChunkdocs_translation||[]).push([[7674],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=l(n),d=a,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||c;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,i=new Array(c);i[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var l=2;l<c;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},265:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>E,contentTitle:()=>j,default:()=>N,frontMatter:()=>x,metadata:()=>k,toc:()=>w});var r=n(7462),a=n(7294),c=n(4137),i=n(6010),o=n(8259),s=n(3699),l=n(2735),u=n(7325);const m="cardContainer_fWXF",p="cardTitle_rnsV",d="cardDescription_PWke";function f(e){let{href:t,children:n}=e;return a.createElement(s.Z,{href:t,className:(0,i.Z)("card padding--lg",m)},n)}function y(e){let{href:t,icon:n,title:r,description:c}=e;return a.createElement(f,{href:t},a.createElement("h2",{className:(0,i.Z)("text--truncate",p),title:r},n," ",r),c&&a.createElement("p",{className:(0,i.Z)("text--truncate",d),title:c},c))}function g(e){let{item:t}=e;const n=(0,o.Wl)(t);return n?a.createElement(y,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,u.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function b(e){let{item:t}=e;const n=(0,l.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,o.xz)(t.docId??void 0);return a.createElement(y,{href:t.href,icon:n,title:t.label,description:null==r?void 0:r.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return a.createElement(b,{item:t});case"category":return a.createElement(g,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function v(e){let{className:t}=e;const n=(0,o.jA)();return a.createElement(O,{items:n.items,className:t})}function O(e){const{items:t,className:n}=e;if(!t)return a.createElement(v,e);const r=(0,o.MN)(t);return a.createElement("section",{className:(0,i.Z)("row",n)},r.map(((e,t)=>a.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},a.createElement(h,{item:e})))))}const x={},j="\uac1c\uc694",k={unversionedId:"next-js/documentation/basic-features/data-fetching/index",id:"next-js/documentation/basic-features/data-fetching/index",title:"\uac1c\uc694",description:"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc720\uc2a4 \ucf00\uc774\uc2a4\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20\ub97c \uac31\uc2e0\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4.",source:"@site/docs/next-js/documentation/basic-features/data-fetching/index.md",sourceDirName:"next-js/documentation/basic-features/data-fetching",slug:"/next-js/documentation/basic-features/data-fetching/",permalink:"/docs-repository/docs/next-js/documentation/basic-features/data-fetching/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"nextJsSidebar",previous:{title:"\ud398\uc774\uc9c0",permalink:"/docs-repository/docs/next-js/documentation/basic-features/pages"},next:{title:"getServerSideProps",permalink:"/docs-repository/docs/next-js/documentation/basic-features/data-fetching/get-server-side-props"}},E={},w=[],S={toc:w};function N(e){let{components:t,...n}=e;return(0,c.kt)("wrapper",(0,r.Z)({},S,n,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"\uac1c\uc694"},"\uac1c\uc694"),(0,c.kt)("p",null,"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc720\uc2a4 \ucf00\uc774\uc2a4\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20\ub97c \uac31\uc2e0\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4."),(0,c.kt)("p",null,"\uac01 \ubb38\uc11c\uc5d0 \ud574\ub2f9\ud558\ub294 \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub294 \ub2e4\uc74c\uacfc \uac19\uc2b5\ub2c8\ub2e4."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"getServerSideProps - SSR (\uc11c\ubc84 \uce21 \ub80c\ub354\ub9c1)"),(0,c.kt)("li",{parentName:"ul"},"getStaticPaths - \ub3d9\uc801 \ub77c\uc6b0\ud305"),(0,c.kt)("li",{parentName:"ul"},"getStaticProps - SSG (\uc815\uc801 \uc0ac\uc774\ud2b8 \uc0dd\uc131)"),(0,c.kt)("li",{parentName:"ul"},"\uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131 - ISR"),(0,c.kt)("li",{parentName:"ul"},"\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 - CSR (\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 \ub80c\ub354\ub9c1)")),(0,c.kt)(O,{mdxType:"DocCardList"}))}N.isMDXComponent=!0}}]);