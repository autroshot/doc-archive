"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[8548],{4137:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(a),k=r,N=m["".concat(l,".").concat(k)]||m[k]||d[k]||s;return a?n.createElement(N,o(o({ref:t},p),{},{components:a})):n.createElement(N,o({ref:t},p))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,o=new Array(s);o[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<s;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1526:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var n=a(7462),r=(a(7294),a(4137));const s={sidebar_position:1},o="\uc124\uce58",i={unversionedId:"miscellaneous/tanstack-query/getting-started/installation",id:"miscellaneous/tanstack-query/getting-started/installation",title:"\uc124\uce58",description:"NPM\uc744 \uc0ac\uc6a9\ud558\uac70\ub098, unpkg.com\uc744 \ud1b5\ud574 \uc624\ub798\ub41c ``\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub9ac\uc561\ud2b8 \ucffc\ub9ac\ub97c \uc124\uce58\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",source:"@site/docs/miscellaneous/tanstack-query/getting-started/installation.md",sourceDirName:"miscellaneous/tanstack-query/getting-started",slug:"/miscellaneous/tanstack-query/getting-started/installation",permalink:"/docs-repository/docs/miscellaneous/tanstack-query/getting-started/installation",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tanstackQuerySidebar",previous:{title:"\uac1c\uc694",permalink:"/docs-repository/docs/miscellaneous/tanstack-query/"},next:{title:"\ube60\ub978 \uc2dc\uc791",permalink:"/docs-repository/docs/miscellaneous/tanstack-query/getting-started/quick-start"}},l={},c=[{value:"NPM",id:"npm",level:3},{value:"CDN",id:"cdn",level:3},{value:"\uc694\uad6c \uc0ac\ud56d",id:"\uc694\uad6c-\uc0ac\ud56d",level:3}],p={toc:c};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\uc124\uce58"},"\uc124\uce58"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://npmjs.com"},"NPM"),"\uc744 \uc0ac\uc6a9\ud558\uac70\ub098, ",(0,r.kt)("a",{parentName:"p",href:"https://unpkg.com"},"unpkg.com"),"\uc744 \ud1b5\ud574 \uc624\ub798\ub41c ",(0,r.kt)("inlineCode",{parentName:"p"},"<script>"),"\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub9ac\uc561\ud2b8 \ucffc\ub9ac\ub97c \uc124\uce58\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("h3",{id:"npm"},"NPM"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"$ npm i @tanstack/react-query")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"# \ub610\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"$ pnpm add @tanstack/react-query")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"# \ub610\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"$ yarn add @tanstack/react-query"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"$ npm i @tanstack/react-query")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"# \ub610\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"$ pnpm add @tanstack/react-query")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"# \ub610\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"$ yarn add @tanstack/react-query")))))),(0,r.kt)("p",null,"\ub9ac\uc561\ud2b8 \ucffc\ub9ac\ub294 \ub9ac\uc561\ud2b8 v16.8+\uc640 \ud638\ud658\ub418\uba70 \ub9ac\uc561\ud2b8DOM \ubc0f \ub9ac\uc561\ud2b8 \ub124\uc774\ud2f0\ube0c\uc640 \ud568\uaed8 \uc791\ub3d9\ud569\ub2c8\ub2e4."),(0,r.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\ub2e4\uc6b4\ub85c\ub4dc\ud558\uae30 \uc804\uc5d0 \ub354 \uc54c\uc544\ubcf4\uace0 \uc2f6\ub098\uc694? ",(0,r.kt)("a",{parentName:"p",href:"https://tanstack.com/query/v4/docs/react/examples/react/simple"},"simple"),"\uc774\ub098 ",(0,r.kt)("a",{parentName:"p",href:"https://tanstack.com/query/v4/docs/react/examples/react/basic"},"basic")," \uc608\uc2dc\ub97c \uc0b4\ud3b4\ubcf4\uc138\uc694!")),(0,r.kt)("h3",{id:"cdn"},"CDN"),(0,r.kt)("p",null,"\ubaa8\ub4c8 \ubc88\ub4e4\ub7ec\ub098 \ud328\ud0a4\uc9c0 \uad00\ub9ac\uc790\ub97c \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub294 \uacbd\uc6b0, ",(0,r.kt)("a",{parentName:"p",href:"https://unpkg.com"},"unpkg.com")," CDN\uc5d0\uc11c \ud638\uc2a4\ud305\ub418\ub294 \uae00\ub85c\ubc8c(UMD) \ube4c\ub4dc\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. HTML \ud30c\uc77c \ud558\ub2e8\uc5d0 \ub2e4\uc74c\uc758 ",(0,r.kt)("inlineCode",{parentName:"p"},"<script>")," \ud0dc\uadf8\ub97c \ucd94\uac00\ud558\uae30\ub9cc \ud558\uba74 \ub429\ub2c8\ub2e4."),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"<"),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"script"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"src"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},'"https://unpkg.com/@tanstack/react-query@4/build/umd/index.production.js"'),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"></"),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"script"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},">"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"<script"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#8FBCBB"}},"src"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},'"'),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"https://unpkg.com/@tanstack/react-query@4/build/umd/index.production.js"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},'"'),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"><\/script>")))))),(0,r.kt)("p",null,"\uc774\uc81c ",(0,r.kt)("inlineCode",{parentName:"p"},"window.ReactQuery")," \uac1d\uccb4 \ubc0f \ud574\ub2f9 \ub0b4\ubcf4\ub0b4\uae30\uc5d0 \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\uc774 \uc124\uce58\uc640 \uc0ac\uc6a9\ubc95\uc740 \ud398\uc774\uc9c0\uc5d0 ",(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/cdn-links.html"},"\ub9ac\uc561\ud2b8 CDN \uc2a4\ud06c\ub9bd\ud2b8 \ubc88\ub4e4"),"\uc744 \ud544\uc694\ub85c \ud569\ub2c8\ub2e4.")),(0,r.kt)("h3",{id:"\uc694\uad6c-\uc0ac\ud56d"},"\uc694\uad6c \uc0ac\ud56d"),(0,r.kt)("p",null,"\ub9ac\uc561\ud2b8 \ucffc\ub9ac\ub294 \ucd5c\uc2e0 \ube0c\ub77c\uc6b0\uc800\uc5d0 \ucd5c\uc801\ud654\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc74c \ube0c\ub77c\uc6b0\uc800\uc640 \ud638\ud658\ub429\ub2c8\ub2e4."),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Chrome >= 73")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Firefox >= 78")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Edge >= 79")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Safari >= 12.0")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"iOS >= 12.0")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"opera >= 53"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Chrome >= 73")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Firefox >= 78")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Edge >= 79")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Safari >= 12.0")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"iOS >= 12.0")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"opera >= 53")))))),(0,r.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\ud658\uacbd\uc5d0 \ub530\ub77c \ud3f4\ub9ac\ud544\uc744 \ucd94\uac00\ud574\uc57c \ud560 \uc218\ub3c4 \uc788\uc2b5\ub2c8\ub2e4. \uc624\ub798\ub41c \ube0c\ub77c\uc6b0\uc800\ub97c \uc9c0\uc6d0\ud558\ub824\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"node_modules"),"\uc5d0\uc11c \uc9c1\uc811 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \ud2b8\ub79c\uc2a4\ud30c\uc77c\ud574\uc57c \ud569\ub2c8\ub2e4.")))}d.isMDXComponent=!0}}]);