"use strict";(self.webpackChunkdocs_translation=self.webpackChunkdocs_translation||[]).push([[4519],{4137:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),d=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=d(a),k=r,N=c["".concat(s,".").concat(k)]||c[k]||m[k]||i;return a?n.createElement(N,l(l({ref:t},p),{},{components:a})):n.createElement(N,l({ref:t},p))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var d=2;d<i;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},9548:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=a(7462),r=(a(7294),a(4137));const i={sidebar_position:5},l="\ubc18\ubcf5 \ucc3e\uae30",o={unversionedId:"miscellaneous/regular-expression/repeating-matches",id:"miscellaneous/regular-expression/repeating-matches",title:"\ubc18\ubcf5 \ucc3e\uae30",description:"\ud558\ub098 \uc774\uc0c1\uc758 \ubb38\uc790 \ucc3e\uae30",source:"@site/docs/miscellaneous/regular-expression/repeating-matches.md",sourceDirName:"miscellaneous/regular-expression",slug:"/miscellaneous/regular-expression/repeating-matches",permalink:"/docs-repository/docs/miscellaneous/regular-expression/repeating-matches",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"regularExpressionSidebar",previous:{title:"\uba54\ud0c0 \ubb38\uc790 \uc0ac\uc6a9\ud558\uae30",permalink:"/docs-repository/docs/miscellaneous/regular-expression/using-metacharacters"},next:{title:"\uc704\uce58 \ucc3e\uae30",permalink:"/docs-repository/docs/miscellaneous/regular-expression/position-matching"}},s={},d=[{value:"\ud558\ub098 \uc774\uc0c1\uc758 \ubb38\uc790 \ucc3e\uae30",id:"\ud558\ub098-\uc774\uc0c1\uc758-\ubb38\uc790-\ucc3e\uae30",level:2},{value:"\ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098 \uc774\uc0c1 \uc5f0\uc18d\ud558\ub294 \ubb38\uc790 \ucc3e\uae30",id:"\ubb38\uc790\uac00-\uc5c6\uac70\ub098-\ud558\ub098-\uc774\uc0c1-\uc5f0\uc18d\ud558\ub294-\ubb38\uc790-\ucc3e\uae30",level:2},{value:"\ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098\uc778 \ubb38\uc790 \ucc3e\uae30",id:"\ubb38\uc790\uac00-\uc5c6\uac70\ub098-\ud558\ub098\uc778-\ubb38\uc790-\ucc3e\uae30",level:2},{value:"\uad6c\uac04 \uc9c0\uc815\ud558\uae30",id:"\uad6c\uac04-\uc9c0\uc815\ud558\uae30",level:2},{value:"\uacfc\ud558\uac8c \uc77c\uce58\ud558\ub294 \uc0c1\ud669 \ubc29\uc9c0\ud558\uae30",id:"\uacfc\ud558\uac8c-\uc77c\uce58\ud558\ub294-\uc0c1\ud669-\ubc29\uc9c0\ud558\uae30",level:2}],p={toc:d};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\ubc18\ubcf5-\ucc3e\uae30"},"\ubc18\ubcf5 \ucc3e\uae30"),(0,r.kt)("h2",{id:"\ud558\ub098-\uc774\uc0c1\uc758-\ubb38\uc790-\ucc3e\uae30"},"\ud558\ub098 \uc774\uc0c1\uc758 \ubb38\uc790 \ucc3e\uae30"),(0,r.kt)("p",null,"\ub354\ud558\uae30 ",(0,r.kt)("inlineCode",{parentName:"p"},"+"),"\ub294 \ud558\ub098 \uc774\uc0c1\uc758 \ubb38\uc790\ub97c \ucc3e\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ubb38\uc790 \uc9d1\ud569\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"p"},"+"),"\ub97c \uc0ac\uc6a9\ud560 \ub54c\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"+"),"\ub97c \uc9d1\ud569 \ubc14\uae65\uc5d0 \ub450\uc5b4\uc57c \ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\u274c ",(0,r.kt)("inlineCode",{parentName:"p"},"[0-9+]")," - \uc22b\uc790 0\ubd80\ud130 9\uc640 \ubb38\uc790 \ub354\ud558\uae30\ub97c \uc9d1\ud569\uc73c\ub85c \uc815\uc758\ud55c \uac83"),(0,r.kt)("p",null,"\u2714\ufe0f ",(0,r.kt)("inlineCode",{parentName:"p"},"[0-9]+")," - \uc758\ub3c4\uc5d0 \ub9de\ub294 \uac83"),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"\uc774\uba54\uc77c \uc8fc\uc18c"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc774\uba54\uc77c \uc8fc\uc18c"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"\\w+@\\w+\\.\\w+"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"\uc774\uba54\uc77c \uc8fc\uc18c"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc774\uba54\uc77c \uc8fc\uc18c"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"\\w+@\\w+\\.\\w+")))))),(0,r.kt)("h2",{id:"\ubb38\uc790\uac00-\uc5c6\uac70\ub098-\ud558\ub098-\uc774\uc0c1-\uc5f0\uc18d\ud558\ub294-\ubb38\uc790-\ucc3e\uae30"},"\ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098 \uc774\uc0c1 \uc5f0\uc18d\ud558\ub294 \ubb38\uc790 \ucc3e\uae30"),(0,r.kt)("p",null,"\ubcc4\ud45c ",(0,r.kt)("inlineCode",{parentName:"p"},"*"),"\ub294 \ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098 \uc774\uc0c1 \uc5f0\uc18d\ud558\ub294 \ubb38\uc790\ub97c \ucc3e\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"*"),"\ub294 \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uac00 \uc788\ub294 \uacbd\uc6b0\uc5d0 \uc77c\uce58\uc2dc\ud0a4\ub294 \uc120\ud0dd\uc801 \uba54\ud0c0 \ubb38\uc790\ub85c \uc0dd\uac01\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"\uc774\uba54\uc77c \uc8fc\uc18c"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc774\uba54\uc77c \uc8fc\uc18c"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"\\w+[\\w.]*@[\\w.]+\\.\\w+"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"\uc774\uba54\uc77c \uc8fc\uc18c"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc774\uba54\uc77c \uc8fc\uc18c"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"\\w+[\\w.]*@[\\w.]+\\.\\w+")))))),(0,r.kt)("h2",{id:"\ubb38\uc790\uac00-\uc5c6\uac70\ub098-\ud558\ub098\uc778-\ubb38\uc790-\ucc3e\uae30"},"\ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098\uc778 \ubb38\uc790 \ucc3e\uae30"),(0,r.kt)("p",null,"\ubb3c\uc74c\ud45c ",(0,r.kt)("inlineCode",{parentName:"p"},"?"),"\ub294 \ubb38\uc790\uac00 \uc5c6\uac70\ub098 \ud558\ub098\uc778 \ubb38\uc790\ub97c \ucc3e\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"URL"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"URL"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"https?:\\/\\/[\\w.\\/]+"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"URL"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"URL"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"https?:\\/\\/[\\w.\\/]+")))))),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"\uc720\ub2c9\uc2a4 \ud658\uacbd\uc5d0\uc11c \ube48 \uc904"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc720\ub2c9\uc2a4 \ud658\uacbd\uc5d0\uc11c \ube48 \uc904"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"[\\r]?\\n[\\r]?\\n"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"\uc720\ub2c9\uc2a4 \ud658\uacbd\uc5d0\uc11c \ube48 \uc904"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\uc720\ub2c9\uc2a4 \ud658\uacbd\uc5d0\uc11c \ube48 \uc904"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"[\\r]?\\n[\\r]?\\n")))))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"[\\r]?"),"\uc740 ",(0,r.kt)("inlineCode",{parentName:"p"},"\\r?"),"\uacfc \uac19\uc740 \uae30\ub2a5\uc744 \ud558\uc9c0\ub9cc \ub4a4\uc5d0 \ub098\uc624\ub294 \uba54\ud0c0 \ubb38\uc790\uac00 \uc5b4\ub514\uc5d0 \uc801\uc6a9\ub418\ub294\uc9c0 \ud655\uc2e4\ud558\uac8c \ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ud558\uae30\ub3c4 \ud569\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\uad6c\uac04-\uc9c0\uc815\ud558\uae30"},"\uad6c\uac04 \uc9c0\uc815\ud558\uae30"),(0,r.kt)("p",null,"\ubb38\uc790\uac00 \uc77c\uce58\ud558\ub294 \uc218\ub97c \uc815\ud655\ud788 \uc815\ud558\ub824\uba74 \uc911\uad04\ud638 ",(0,r.kt)("inlineCode",{parentName:"p"},"{}"),"\ub97c \uc0ac\uc6a9\ud574 ",(0,r.kt)("strong",{parentName:"p"},"\uad6c\uac04(interval)"),"\uc744 \ud45c\ud604\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"RGB \uac12"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"RGB \uac12"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"[A-Fa-f0-9]{6}"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"RGB \uac12"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"RGB \uac12"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"[A-Fa-f0-9]{6}")))))),(0,r.kt)("p",null,"\uad6c\uac04\uc5d0 \ub450 \uac1c\uc758 \uc22b\uc790\ub97c \ub123\uc73c\uba74 \uc77c\uce58 \ud69f\uc218\uc758 \ubc94\uc704\ub97c \uc9c0\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc989 \uc77c\uce58 \ud69f\uc218\uc758 \ucd5c\uc19f\uac12\uacfc \ucd5c\ub313\uac12\uc744 \uc9c0\uc815\ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light with-title",style:{backgroundColor:"#ffffff",color:"#24292eff"},title:"\ub0a0\uc9dc"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\ub0a0\uc9dc"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"\\d{1,2}[-\\/]\\d{1,2}[-\\/]\\d{2,4}"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord with-title",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"},title:"\ub0a0\uc9dc"},(0,r.kt)("div",{parentName:"pre",className:"code-title"},"\ub0a0\uc9dc"),(0,r.kt)("div",{parentName:"pre",className:"language-id"},"html"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"\\d{1,2}[-\\/]\\d{1,2}[-\\/]\\d{2,4}")))))),(0,r.kt)("p",null,"\uad6c\uac04\uc740 0\ubd80\ud130 \uc2dc\uc791\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. ",(0,r.kt)("inlineCode",{parentName:"p"},"?"),"\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"{0,1}"),"\uacfc \ub3d9\uc77c\ud55c \uae30\ub2a5\uc744 \ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ucd5c\uc19f\uac12\ub9cc \uc9c0\uc815\ud558\ub294 \uac83\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4. ",(0,r.kt)("inlineCode",{parentName:"p"},"{3,}"),"\uacfc \uac19\uc774 \uc791\uc131\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. ",(0,r.kt)("inlineCode",{parentName:"p"},"+"),"\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"{1,}"),"\uacfc \ub3d9\uc77c\ud55c \uae30\ub2a5\uc744 \ud569\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc608\uc2dc:"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"\\d+: \\$\\d{3,}\\.\\d{2}"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"\\d+: \\$\\d{3,}\\.\\d{2}")))))),(0,r.kt)("h2",{id:"\uacfc\ud558\uac8c-\uc77c\uce58\ud558\ub294-\uc0c1\ud669-\ubc29\uc9c0\ud558\uae30"},"\uacfc\ud558\uac8c \uc77c\uce58\ud558\ub294 \uc0c1\ud669 \ubc29\uc9c0\ud558\uae30"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\ud0d0\uc695\uc801 \uc218\ub7c9\uc790"),(0,r.kt)("th",{parentName:"tr",align:null},"\uac8c\uc73c\ub978 \uc218\ub7c9\uc790"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"*")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"*?"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"+")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"+?"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"{n,}")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"{n,}?"))))),(0,r.kt)("p",null,"\ub2e4\uc74c \uc608\uc2dc\uc5d0\uc11c\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"<b>"),"\ub85c \ub458\ub7ec\uc2f8\uc778 \ud14d\uc2a4\ud2b8\ub97c \uc77c\uce58\uc2dc\ud0a4\uace0\uc790 \ud569\ub2c8\ub2e4."),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"living in <b>AK</b> and <b>HI</b>."))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"undefined"}},"living in <b>AK</b> and <b>HI</b>.")))))),(0,r.kt)("p",null,"\ud0d0\uc695\uc801(greedy) \uc218\ub7c9\uc790\ub97c \uc774\uc6a9\ud574 \uc815\uaddc \ud45c\ud604\uc2dd\uc744 \uc791\uc131\ud558\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"<[Bb]>.*<\\/[Bb]>"),"\uc774\uba70 \uadf8 \uacb0\uacfc\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"<b>AK</b> and <b>HI</b>"),"\uc785\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ub300\uc2e0 \uac8c\uc73c\ub978(lazy) \uc218\ub7c9\uc790\ub97c \uc774\uc6a9\ud574 \uc815\uaddc \ud45c\ud604\uc2dd\uc744 \uc791\uc131\ud558\uba74 ",(0,r.kt)("inlineCode",{parentName:"p"},"<[Bb]>.*?<\\/[Bb]>"),"\uc774\uba70 \uadf8 \uacb0\uacfc\ub294 ",(0,r.kt)("inlineCode",{parentName:"p"},"<b>AK</b>"),"\uacfc ",(0,r.kt)("inlineCode",{parentName:"p"},"<b>HI</b>"),"\ub85c \uc6d0\ud558\ub294 \uacb0\uacfc\ub97c \uc5bb\uc2b5\ub2c8\ub2e4."))}m.isMDXComponent=!0}}]);