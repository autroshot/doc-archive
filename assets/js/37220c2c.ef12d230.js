"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[8352],{4137:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=d(a),k=r,N=m["".concat(s,".").concat(k)]||m[k]||c[k]||l;return a?n.createElement(N,o(o({ref:t},p),{},{components:a})):n.createElement(N,o({ref:t},p))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var d=2;d<l;d++)o[d]=a[d];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},831:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var n=a(7462),r=(a(7294),a(4137));const l={sidebar_position:8},o="\uc5ed\ucc38\uc870 \uc0ac\uc6a9\ud558\uae30",i={unversionedId:"miscellaneous/regular-expression/using-backreferences",id:"miscellaneous/regular-expression/using-backreferences",title:"\uc5ed\ucc38\uc870 \uc0ac\uc6a9\ud558\uae30",description:"\uc5ed\ucc38\uc870\ub85c \ucc3e\uae30",source:"@site/docs/miscellaneous/regular-expression/using-backreferences.md",sourceDirName:"miscellaneous/regular-expression",slug:"/miscellaneous/regular-expression/using-backreferences",permalink:"/docs-repository/docs/miscellaneous/regular-expression/using-backreferences",draft:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"regularExpressionSidebar",previous:{title:"\ud558\uc704 \ud45c\ud604\uc2dd \uc0ac\uc6a9\ud558\uae30",permalink:"/docs-repository/docs/miscellaneous/regular-expression/using-subexpressions"},next:{title:"\uc804\ubc29\ud0d0\uc0c9\uacfc \ud6c4\ubc29\ud0d0\uc0c9",permalink:"/docs-repository/docs/miscellaneous/regular-expression/looking-ahead-and-behind"}},s={},d=[{value:"\uc5ed\ucc38\uc870\ub85c \ucc3e\uae30",id:"\uc5ed\ucc38\uc870\ub85c-\ucc3e\uae30",level:2},{value:"\uce58\ud658 \uc791\uc5c5 \uc218\ud589\ud558\uae30",id:"\uce58\ud658-\uc791\uc5c5-\uc218\ud589\ud558\uae30",level:2},{value:"\ub300\uc18c\ubb38\uc790 \ubcc0\ud658\ud558\uae30",id:"\ub300\uc18c\ubb38\uc790-\ubcc0\ud658\ud558\uae30",level:2}],p={toc:d};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\uc5ed\ucc38\uc870-\uc0ac\uc6a9\ud558\uae30"},"\uc5ed\ucc38\uc870 \uc0ac\uc6a9\ud558\uae30"),(0,r.kt)("h2",{id:"\uc5ed\ucc38\uc870\ub85c-\ucc3e\uae30"},"\uc5ed\ucc38\uc870\ub85c \ucc3e\uae30"),(0,r.kt)("p",null,"\uc5ed\ucc38\uc870(backreferences)\ub294 \uc55e\uc5d0 \ub098\uc628 \ud45c\ud604\uc744 \uc5ed\uc73c\ub85c \uac00\ub9ac\ud0b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc5ed\ucc38\uc870\ub97c \ubcc0\uc218\ub77c\uace0 \uc0dd\uac01\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc: "),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"[ ]+(\\w+)[ ]+\\1"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"[ ]+(\\w+)[ ]+\\1")))))),(0,r.kt)("p",null,"\uc608\uc2dc\uc758 ",(0,r.kt)("inlineCode",{parentName:"p"},"\\1"),"\uc740 \uccab \ubc88\uc9f8 \ud558\uc704 \ud45c\ud604\uc2dd\uc744 \ucc38\uc870\ud558\uba70, \uc774\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"(\\w+)"),"\uc744 \ucc38\uc870\ud55c\ub2e4\ub294 \uac83\uc744 \uc758\ubbf8\ud569\ub2c8\ub2e4."),(0,r.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\uc5ed\ucc38\uc870 \uad6c\ubb38\uc740 \uc815\uaddc \ud45c\ud604\uc2dd \uad6c\ud604\uc5d0 \ub530\ub77c \ud06c\uac8c \ub2e4\ub985\ub2c8\ub2e4."),(0,r.kt)("p",{parentName:"admonition"},"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"\\"),"\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4.")),(0,r.kt)("p",null,"\ub2e4\uc74c \uc815\uaddc \ud45c\ud604\uc2dd\uc740 \uc5ed\ucc38\uc870\ub97c \uc774\uc6a9\ud574 \uc9dd\uc774 \ub9de\ub294 \ud5e4\ub354 \ud0dc\uadf8\ub9cc \ucc3e\uc2b5\ub2c8\ub2e4."),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"<[hH]([1-6])>/*?<\\/[hH]\\1>"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"<[hH]([1-6])>/*?<\\/[hH]\\1>")))))),(0,r.kt)("p",null,"\uc77c\uce58\ud558\ub294 \ubd80\ubd84\uc744 \ucc38\uc870\ud558\ub294 \uc22b\uc790\ub294 \uc8fc\ub85c 1\ubd80\ud130 \uc2dc\uc791\ud569\ub2c8\ub2e4. \ub9ce\uc740 \uad6c\ud604\uc5d0\uc11c 0\ubc88\uc9f8 \ucc38\uc870\ub294 \ud45c\ud604\uc2dd \uc804\uccb4\ub97c \uac00\ub9ac\ud0b5\ub2c8\ub2e4."),(0,r.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\uc77c\ubd80 \uc815\uaddc \ud45c\ud604\uc2dd \uad6c\ud604\uc740 '\uc774\ub984 \ubd99\uc5ec \uc800\uc7a5\ud558\uae30' \uae30\ub2a5\uc744 \uc9c0\uc6d0\ud569\ub2c8\ub2e4. \uac01 \ud558\uc704 \ud45c\ud604\uc2dd\uc5d0 \uace0\uc720\ud55c \uc774\ub984\uc744 \uc904 \uc218 \uc788\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("h2",{id:"\uce58\ud658-\uc791\uc5c5-\uc218\ud589\ud558\uae30"},"\uce58\ud658 \uc791\uc5c5 \uc218\ud589\ud558\uae30"),(0,r.kt)("p",null,"\uc774\uba54\uc77c \uc8fc\uc18c\uc5d0 \ub9c1\ud06c\ub97c \uac78\uace0 \uc2f6\ub2e4\uba74 \ub2e4\uc74c\uacfc \uac19\uc774 \uc815\uaddc \ud45c\ud604\uc2dd\uc744 \ud65c\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\ubb38:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Hello, ben@forta.com is my email address."))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"Hello, ben@forta.com is my email address.")))))),(0,r.kt)("p",null,"\uc815\uaddc \ud45c\ud604\uc2dd:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"(\\w+[\\w.]*@[\\w.]+\\.\\w+)"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"(\\w+[\\w.]*@[\\w.]+\\.\\w+)")))))),(0,r.kt)("p",null,"\uce58\ud658:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},'<a href="mailto:$1">$1<\\a>'))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},'<a href="mailto:$1">$1<\\a>')))))),(0,r.kt)("p",null,"\uacb0\uacfc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"Hello, <"),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"a"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"href"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},'"mailto:ben@forta.com"'),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},">ben@forta.com<\\a> is my email address.</"),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"a"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},">"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"Hello, "),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"<a"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#8FBCBB"}},"href"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"="),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},'"'),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"mailto:ben@forta.com"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},'"'),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},">"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"ben@forta.com"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"<"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"\\a> is my email address."),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"</a>")))))),(0,r.kt)("p",null,"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"$"),"\ub85c \uc5ed\ucc38\uc870\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc\uc5d0\uc11c \ud655\uc778\ud560 \uc218 \uc788\ub4ef\uc774 \ub3d9\uc77c\ud55c \uc5ed\ucc38\uc870\ub97c \uc5ec\ub7ec \ubc88 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\ub300\uc18c\ubb38\uc790-\ubcc0\ud658\ud558\uae30"},"\ub300\uc18c\ubb38\uc790 \ubcc0\ud658\ud558\uae30"),(0,r.kt)("p",null,"\uc77c\ubd80 \uc815\uaddc \ud45c\ud604\uc2dd \uad6c\ud604\uc5d0\uc11c\ub294 \ub2e4\uc74c \uba54\ud0c0 \ubb38\uc790\ub97c \uc9c0\uc6d0\ud569\ub2c8\ub2e4."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\uba54\ud0c0 \ubb38\uc790"),(0,r.kt)("th",{parentName:"tr",align:null},"\uc124\uba85"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\E")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\L"),"\uc774\ub098 ",(0,r.kt)("inlineCode",{parentName:"td"},"\\U")," \ubcc0\ud658\uc744 \ub05d\ub0c4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\l")),(0,r.kt)("td",{parentName:"tr",align:null},"\ub2e4\uc74c\uc5d0 \uc624\ub294 \uae00\uc790\ub97c \uc18c\ubb38\uc790\ub85c \ubcc0\ud658")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\L")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\E"),"\ub97c \ub9cc\ub0a0 \ub54c\uae4c\uc9c0 \ubaa8\ub4e0 \ubb38\uc790\ub97c \uc18c\ubb38\uc790\ub85c \ubcc0\ud658")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\u")),(0,r.kt)("td",{parentName:"tr",align:null},"\ub2e4\uc74c\uc5d0 \uc624\ub294 \uae00\uc790\ub97c \ub300\ubb38\uc790\ub85c \ubcc0\ud658")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\U")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"\\E"),"\ub97c \ub9cc\ub0a0 \ub54c\uae4c\uc9c0 \ubaa8\ub4e0 \ubb38\uc790\ub97c \ub300\ubb38\uc790\ub85c \ubcc0\ud658")))))}c.isMDXComponent=!0}}]);