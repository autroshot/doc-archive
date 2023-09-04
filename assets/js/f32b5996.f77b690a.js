"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[1404],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(67294);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,c=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(r),d=c,m=p["".concat(l,".").concat(d)]||p[d]||f[d]||o;return r?n.createElement(m,a(a({ref:t},u),{},{components:r})):n.createElement(m,a({ref:t},u))}));function m(e,t){var r=arguments,c=t&&t.mdxType;if("string"==typeof e||c){var o=r.length,a=new Array(o);a[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:c,a[1]=i;for(var s=2;s<o;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},19573:(e,t,r)=>{r.d(t,{Z:()=>y});var n=r(67294),c=r(86010),o=r(30562),a=r(61596),i=r(85606),l=r(27692);const s={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function u({href:e,children:t}){return n.createElement(a.Z,{href:e,className:(0,c.Z)("card padding--lg",s.cardContainer)},t)}function p({href:e,icon:t,title:r,description:o}){return n.createElement(u,{href:e},n.createElement("h2",{className:(0,c.Z)("text--truncate",s.cardTitle),title:r},t," ",r),o&&n.createElement("p",{className:(0,c.Z)("text--truncate",s.cardDescription),title:o},o))}function f({item:e}){const t=(0,o.Wl)(e);return t?n.createElement(p,{href:t,icon:"\ud83d\uddc3\ufe0f",title:e.label,description:null!==(r=e.description)&&void 0!==r?r:(0,l.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e.items.length})}):null;var r}function d({item:e}){var t;const r=(0,i.Z)(e.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17";var c;const a=(0,o.xz)(null!==(c=e.docId)&&void 0!==c?c:void 0);var l;return n.createElement(p,{href:e.href,icon:r,title:e.label,description:null!==(l=e.description)&&void 0!==l?l:null===(t=a)||void 0===t?void 0:t.description})}function m({item:e}){switch(e.type){case"link":return n.createElement(d,{item:e});case"category":return n.createElement(f,{item:e});default:throw new Error(`unknown item type ${JSON.stringify(e)}`)}}function b({className:e}){const t=(0,o.jA)();return n.createElement(y,{items:t.items,className:e})}function y(e){const{items:t,className:r}=e;if(!t)return n.createElement(b,e);const a=(0,o.MN)(t);return n.createElement("section",{className:(0,c.Z)("row",r)},a.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(m,{item:e})))))}},38987:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>b,frontMatter:()=>l,metadata:()=>u,toc:()=>f});r(67294);var n=r(3905),c=r(19573);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function i(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}const l={},s="\uac1c\uc694",u={unversionedId:"nextjs/documentation/basic-features/data-fetching/index",id:"nextjs/documentation/basic-features/data-fetching/index",title:"\uac1c\uc694",description:"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc0ac\uc6a9 \uc0ac\ub840\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20\ub97c \uac31\uc2e0\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4.",source:"@site/docs/nextjs/documentation/basic-features/data-fetching/index.md",sourceDirName:"nextjs/documentation/basic-features/data-fetching",slug:"/nextjs/documentation/basic-features/data-fetching/",permalink:"/doc-archive/docs/nextjs/documentation/basic-features/data-fetching/",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"nextJsSidebar",previous:{title:"\ud398\uc774\uc9c0",permalink:"/doc-archive/docs/nextjs/documentation/basic-features/pages"},next:{title:"getServerSideProps",permalink:"/doc-archive/docs/nextjs/documentation/basic-features/data-fetching/get-server-side-props"}},p={},f=[],d={toc:f},m="wrapper";function b(e){var{components:t}=e,r=i(e,["components"]);return(0,n.kt)(m,a(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}({},d,r),{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\uac1c\uc694"},"\uac1c\uc694"),(0,n.kt)("p",null,"\ub125\uc2a4\ud2b8\uc5d0\uc11c \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub97c \uc0ac\uc6a9\ud558\uba74 \uc571\uc758 \uc0ac\uc6a9 \uc0ac\ub840\uc5d0 \ub530\ub77c \ub2e4\uc591\ud55c \ubc29\uc2dd\uc73c\ub85c \ucf58\ud150\uce20\ub97c \ub80c\ub354\ub9c1\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc5ec\uae30\uc5d0\ub294 SSR\uc774\ub098 \uc815\uc801 \uc0dd\uc131\uc744 \uc0ac\uc6a9\ud55c \uc0ac\uc804 \ub80c\ub354\ub9c1, \uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131\uc73c\ub85c \ub7f0\ud0c0\uc784\uc5d0 \ucf58\ud150\uce20\ub97c \uac31\uc2e0\ud558\uac70\ub098 \uc0dd\uc131\ud558\uae30\uac00 \ud3ec\ud568\ub429\ub2c8\ub2e4."),(0,n.kt)("p",null,"\uac01 \ubb38\uc11c\uc5d0 \ud574\ub2f9\ud558\ub294 \ub370\uc774\ud130 \uac00\uc838\uc624\uae30\ub294 \ub2e4\uc74c\uacfc \uac19\uc2b5\ub2c8\ub2e4."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"getServerSideProps - SSR (\uc11c\ubc84 \uce21 \ub80c\ub354\ub9c1)"),(0,n.kt)("li",{parentName:"ul"},"getStaticPaths - \ub3d9\uc801 \ub77c\uc6b0\ud305"),(0,n.kt)("li",{parentName:"ul"},"getStaticProps - SSG (\uc815\uc801 \uc0ac\uc774\ud2b8 \uc0dd\uc131)"),(0,n.kt)("li",{parentName:"ul"},"\uc99d\ubd84\ud615 \uc815\uc801 \uc7ac\uc0dd\uc131 - ISR"),(0,n.kt)("li",{parentName:"ul"},"\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 - CSR (\ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 \ub80c\ub354\ub9c1)")),(0,n.kt)(c.Z,{mdxType:"DocCardList"}))}b.isMDXComponent=!0}}]);