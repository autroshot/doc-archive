"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[1666],{4137:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>N});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function l(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=n.createContext({}),i=function(e){var a=n.useContext(p),t=a;return e&&(t="function"==typeof e?e(a):s(s({},a),e)),t},c=function(e){var a=i(e.components);return n.createElement(p.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},m=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=i(t),N=r,v=m["".concat(p,".").concat(N)]||m[N]||d[N]||o;return t?n.createElement(v,s(s({ref:a},c),{},{components:t})):n.createElement(v,s({ref:a},c))}));function N(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var l={};for(var p in a)hasOwnProperty.call(a,p)&&(l[p]=a[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var i=2;i<o;i++)s[i]=t[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3682:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>i});var n=t(7462),r=(t(7294),t(4137));const o={sidebar_position:5},s="\uc120\ud0dd\uc801 \uc5f0\uc1c4",l={unversionedId:"javascript/cheat-sheets/optional-chaining",id:"javascript/cheat-sheets/optional-chaining",title:"\uc120\ud0dd\uc801 \uc5f0\uc1c4",description:"\uc120\ud0dd\uc801 \uc5f0\uc1c4(optional chaining) ?.\ub97c \uc0ac\uc6a9\ud558\uba74 \uc911\uac04 \ud504\ub85c\ud37c\ud2f0\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \uacbd\uc6b0\uc5d0\ub3c4 \uc911\ucca9\ub41c \uac1d\uccb4\uc758 \ud504\ub85c\ud37c\ud2f0\uc5d0 \uc548\uc804\ud558\uac8c \uc811\uadfc\ud560 \uc218 \uc788\ub2e4.",source:"@site/docs/javascript/cheat-sheets/optional-chaining.md",sourceDirName:"javascript/cheat-sheets",slug:"/javascript/cheat-sheets/optional-chaining",permalink:"/docs-repository/docs/javascript/cheat-sheets/optional-chaining",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"javascriptSidebar",previous:{title:"\uba85\uc2dc\uc801 \ud615 \ubcc0\ud658",permalink:"/docs-repository/docs/javascript/cheat-sheets/explicit-type-conversion"},next:{title:"\ub110 \uac19\uc740 \uac12 \ubcd1\ud569 \uc5f0\uc0b0\uc790",permalink:"/docs-repository/docs/javascript/cheat-sheets/nullish-coalescing-operator"}},p={},i=[],c={toc:i};function d(e){let{components:a,...t}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\uc120\ud0dd\uc801-\uc5f0\uc1c4"},"\uc120\ud0dd\uc801 \uc5f0\uc1c4"),(0,r.kt)("p",null,"\uc120\ud0dd\uc801 \uc5f0\uc1c4(optional chaining) ",(0,r.kt)("inlineCode",{parentName:"p"},"?."),"\ub97c \uc0ac\uc6a9\ud558\uba74 \uc911\uac04 \ud504\ub85c\ud37c\ud2f0\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \uacbd\uc6b0\uc5d0\ub3c4 \uc911\ucca9\ub41c \uac1d\uccb4\uc758 \ud504\ub85c\ud37c\ud2f0\uc5d0 \uc548\uc804\ud558\uac8c \uc811\uadfc\ud560 \uc218 \uc788\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"?."),"\ub294 \uc67c\ucabd\uc5d0 \uc788\ub294 \ud3c9\uac00 \ub300\uc0c1\uc774 ",(0,r.kt)("inlineCode",{parentName:"p"},"null")," \ub610\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined"),"\uc774\uba74 \ud3c9\uac00\ub97c \uba48\ucd94\uace0 ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined"),"\ub97c \ubc18\ud658\ud55c\ub2e4."),(0,r.kt)("p",null,"\uad6c\ubb38:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"obj?.prop")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"obj?.[expr]")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"arr?.[index]")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"func?.(args)"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"obj?.prop")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"obj?.[expr]")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"arr?.[index]")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"func?.(args)")))))),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"const"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," {")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  name"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'Alice'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},",")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  cat"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," {")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"    name"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'Dinah'")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  }")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"};")),(0,r.kt)("div",{parentName:"code",className:"line"}),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"console"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".log"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"dog"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"?.name); "),(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// undefined")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"console"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".log"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".nonExistentMethod?."),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"()); "),(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// undefined"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"const"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"name"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"Alice"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},",")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"cat"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"    "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"name"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"Dinah"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")),(0,r.kt)("div",{parentName:"code",className:"line"}),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"console"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"log"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"dog"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"?."),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"name"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// undefined")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"console"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"log"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"user"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"nonExistentMethod"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"?."),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"())"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// undefined")))))))}d.isMDXComponent=!0}}]);