"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[2374],{4137:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>N});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),i=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=i(a),N=r,k=d["".concat(p,".").concat(N)]||d[N]||m[N]||l;return a?n.createElement(k,o(o({ref:t},c),{},{components:a})):n.createElement(k,o({ref:t},c))}));function N(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var i=2;i<l;i++)o[i]=a[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},1097:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>s,toc:()=>i});var n=a(7462),r=(a(7294),a(4137));const l={sidebar_position:4},o="\uc2dc\uac04 \uc81c\ud55c",s={unversionedId:"test/cypress/core-concepts/introduction/timeouts",id:"test/cypress/core-concepts/introduction/timeouts",title:"\uc2dc\uac04 \uc81c\ud55c",description:"\ub300\ubd80\ubd84\uc758 \uba85\ub839\uc774 \uc5b4\ub5a4 \ubc29\uc2dd\uc73c\ub85c\ub4e0 \uc2dc\uac04 \uc81c\ud55c\uc5d0 \ub3c4\ub2ec\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",source:"@site/docs/test/cypress/core-concepts/introduction/timeouts.md",sourceDirName:"test/cypress/core-concepts/introduction",slug:"/test/cypress/core-concepts/introduction/timeouts",permalink:"/doc-archive/docs/test/cypress/core-concepts/introduction/timeouts",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"cypressSidebar",previous:{title:"\ub2e8\uc5b8",permalink:"/doc-archive/docs/test/cypress/core-concepts/introduction/assertions"},next:{title:"\ud14c\uc2a4\ud2b8 \uc720\ud615",permalink:"/doc-archive/docs/test/cypress/core-concepts/testing-types"}},p={},i=[{value:"\uc2dc\uac04 \uc81c\ud55c \uc801\uc6a9\ud558\uae30",id:"\uc2dc\uac04-\uc81c\ud55c-\uc801\uc6a9\ud558\uae30",level:2},{value:"\uc608\uc2dc #1: \uae30\ubcf8 \ub2e8\uc5b8",id:"\uc608\uc2dc-1-\uae30\ubcf8-\ub2e8\uc5b8",level:3},{value:"\uc608\uc2dc #2: \ucd94\uac00 \ub2e8\uc5b8",id:"\uc608\uc2dc-2-\ucd94\uac00-\ub2e8\uc5b8",level:3},{value:"\uc608\uc2dc #3: \uc2dc\uac04 \uc81c\ud55c \uc218\uc815\ud558\uae30",id:"\uc608\uc2dc-3-\uc2dc\uac04-\uc81c\ud55c-\uc218\uc815\ud558\uae30",level:3},{value:"\uae30\ubcf8\uac12",id:"\uae30\ubcf8\uac12",level:2}],c={toc:i};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\uc2dc\uac04-\uc81c\ud55c"},"\uc2dc\uac04 \uc81c\ud55c"),(0,r.kt)("p",null,"\ub300\ubd80\ubd84\uc758 \uba85\ub839\uc774 \uc5b4\ub5a4 \ubc29\uc2dd\uc73c\ub85c\ub4e0 \uc2dc\uac04 \uc81c\ud55c\uc5d0 \ub3c4\ub2ec\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uae30\ubcf8 \ub2e8\uc5b8\uc774\ub4e0 \uc9c1\uc811 \ucd94\uac00\ud55c \ub2e8\uc5b8\uc774\ub4e0, \ubaa8\ub450 \ub2e8\uc5b8\uc740 \ub3d9\uc77c\ud55c \uc2dc\uac04 \uc81c\ud55c \uac12\uc744 \uacf5\uc720\ud569\ub2c8\ub2e4."),(0,r.kt)("h2",{id:"\uc2dc\uac04-\uc81c\ud55c-\uc801\uc6a9\ud558\uae30"},"\uc2dc\uac04 \uc81c\ud55c \uc801\uc6a9\ud558\uae30"),(0,r.kt)("p",null,"\uba85\ub839\uc758 \uc2dc\uac04 \uc81c\ud55c\uc744 \uc218\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc774 \uc2dc\uac04 \uc81c\ud55c\uc740 \uae30\ubcf8 \ub2e8\uc5b8\uacfc, \ucd94\uac00\ud55c \ud2b9\uc815 \ub2e8\uc5b8 \ubaa8\ub450\uc5d0 \uc601\ud5a5\uc744 \uc90d\ub2c8\ub2e4."),(0,r.kt)("p",null,"\ub2e8\uc5b8\uc740 \uc774\uc804 \uba85\ub839\uc758 \uc870\uac74\uc744 \uc124\uba85\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\ubbc0\ub85c ",(0,r.kt)("inlineCode",{parentName:"p"},"timeout"),"\uc758 \uc218\uc815\uc740 \ub2e8\uc5b8\uc774 \uc544\ub2c8\ub77c \uc774\uc804 \uba85\ub839\uc5d0 \uc801\uc6a9\ub429\ub2c8\ub2e4."),(0,r.kt)("h3",{id:"\uc608\uc2dc-1-\uae30\ubcf8-\ub2e8\uc5b8"},"\uc608\uc2dc #1: \uae30\ubcf8 \ub2e8\uc5b8"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// '.get()'\uc5d0\ub294 \ud574\ub2f9 \uc694\uc18c\uac00 \uc874\uc7ac\ud55c\ub2e4\ub294 \uae30\ubcf8 \ub2e8\uc5b8\uc774 \uc788\uc73c\ubbc0\ub85c")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \uc2dc\uac04 \uc81c\ud55c\uc5d0 \ub3c4\ub2ec\ud558\uace0 \uc2e4\ud328\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".get"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'.mobile-nav'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},");"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// '.get()'\uc5d0\ub294 \ud574\ub2f9 \uc694\uc18c\uac00 \uc874\uc7ac\ud55c\ub2e4\ub294 \uae30\ubcf8 \ub2e8\uc5b8\uc774 \uc788\uc73c\ubbc0\ub85c")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \uc2dc\uac04 \uc81c\ud55c\uc5d0 \ub3c4\ub2ec\ud558\uace0 \uc2e4\ud328\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"get"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},".mobile-nav"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")))))),(0,r.kt)("p",null,"\uc0ac\uc774\ud504\ub7ec\uc2a4 \ub0b4\ubd80\uc5d0\uc11c\ub294 \ub2e4\uc74c\uacfc \uac19\uc774 \uc791\ub3d9\ud569\ub2c8\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".mobile-nav")," \uc694\uc18c\uc5d0 \ub300\ud55c \ucffc\ub9ac"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uac00 DOM\uc5d0 \uc874\uc7ac\ud560 \ub54c\uae4c\uc9c0 \ucd5c\ub300 4\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728")),(0,r.kt)("h3",{id:"\uc608\uc2dc-2-\ucd94\uac00-\ub2e8\uc5b8"},"\uc608\uc2dc #2: \ucd94\uac00 \ub2e8\uc5b8"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \ud14c\uc2a4\ud2b8\uc5d0 \ub450 \uac1c\uc758 \ub2e8\uc5b8\uc744 \ucd94\uac00\ud588\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".get"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'.mobile-nav'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".should"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'be.visible'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".and"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'contain'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'Home'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},");"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \ud14c\uc2a4\ud2b8\uc5d0 \ub450 \uac1c\uc758 \ub2e8\uc5b8\uc744 \ucd94\uac00\ud588\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"get"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},".mobile-nav"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"should"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"be.visible"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"and"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"contain"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"Home"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")))))),(0,r.kt)("p",null,"\uc0ac\uc774\ud504\ub7ec\uc2a4 \ub0b4\ubd80\uc5d0\uc11c\ub294 \ub2e4\uc74c\uacfc \uac19\uc774 \uc791\ub3d9\ud569\ub2c8\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".mobile-nav")," \uc694\uc18c\uc5d0 \ub300\ud55c \ucffc\ub9ac"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uac00 DOM\uc5d0 \uc874\uc7ac\ud560 \ub54c\uae4c\uc9c0 \ucd5c\ub300 4\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uac00 \ubcf4\uc77c \ub54c\uae4c\uc9c0 \ucd5c\ub300 4\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"li"},"Home"),"\uc774\ub77c\ub294 \ud14d\uc2a4\ud2b8\uac00 \ud3ec\ud568\ub420 \ub54c\uae4c\uc9c0 \ucd5c\ub300 4\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728")),(0,r.kt)("p",null,"\uc0ac\uc774\ud504\ub7ec\uc2a4\uac00 \ubaa8\ub4e0 \ub2e8\uc5b8\uc774 \ud1b5\uacfc\ud560 \ub54c\uae4c\uc9c0 \uae30\ub2e4\ub9ac\ub294 \ucd1d \uc2dc\uac04\uc740 ",(0,r.kt)("inlineCode",{parentName:"p"},"cy.get()"),"\uc758 \uc2dc\uac04 \uc81c\ud55c\uc778 4\ucd08\uc785\ub2c8\ub2e4."),(0,r.kt)("p",null,"\uc2dc\uac04 \uc81c\ud55c\uc740 \uba85\ub839\ubcc4\ub85c \uc218\uc815\ud560 \uc218 \uc788\uc73c\uba70 \uc774\ub294 \ubaa8\ub4e0 \uae30\ubcf8 \ub2e8\uc5b8\uacfc \ud574\ub2f9 \uba85\ub839 \uc774\ud6c4\uc5d0 \uc5f0\uacb0\ub41c \ubaa8\ub4e0 \ub2e8\uc5b8\uc5d0 \uc601\ud5a5\uc744 \ubbf8\uce69\ub2c8\ub2e4."),(0,r.kt)("h3",{id:"\uc608\uc2dc-3-\uc2dc\uac04-\uc81c\ud55c-\uc218\uc815\ud558\uae30"},"\uc608\uc2dc #3: \uc2dc\uac04 \uc81c\ud55c \uc218\uc815\ud558\uae30"),(0,r.kt)("div",{className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \uae30\ubcf8 \ub2e8\uc5b8\uacfc \ucd94\uac00 \ub2e8\uc5b8 \ubaa8\ub450\uc5d0 \uc601\ud5a5\uc744 \uc8fc\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \uc2dc\uac04 \uc81c\ud55c\uc744 \uc218\uc815\ud588\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".get"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'.mobile-nav'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," { timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"10000"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," })")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".should"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'be.visible'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},")")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".and"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'contain'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'Home'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},");"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \uae30\ubcf8 \ub2e8\uc5b8\uacfc \ucd94\uac00 \ub2e8\uc5b8 \ubaa8\ub450\uc5d0 \uc601\ud5a5\uc744 \uc8fc\ub294")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \uc2dc\uac04 \uc81c\ud55c\uc744 \uc218\uc815\ud588\uc2b5\ub2c8\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"get"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},".mobile-nav"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#B48EAD"}},"10000"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"should"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"be.visible"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"and"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"contain"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"Home"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")))))),(0,r.kt)("p",null,"\uc0ac\uc774\ud504\ub7ec\uc2a4 \ub0b4\ubd80\uc5d0\uc11c\ub294 \ub2e4\uc74c\uacfc \uac19\uc774 \uc791\ub3d9\ud569\ub2c8\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},".mobile-nav")," \uc694\uc18c\uc5d0 \ub300\ud55c \ucffc\ub9ac"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uac00 DOM\uc5d0 \uc874\uc7ac\ud560 \ub54c\uae4c\uc9c0 \ucd5c\ub300 10\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uac00 \ubcf4\uc77c \ub54c\uae4c\uc9c0 \ucd5c\ub300 10\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728"),(0,r.kt)("li",{parentName:"ul"},"\u2728 \uadf8\ub9ac\uace0 \uc694\uc18c\uc5d0 ",(0,r.kt)("inlineCode",{parentName:"li"},"Home"),"\uc774\ub77c\ub294 \ud14d\uc2a4\ud2b8\uac00 \ud3ec\ud568\ub420 \ub54c\uae4c\uc9c0 \ucd5c\ub300 10\ucd08\ub97c \uae30\ub2e4\ub9bc \u2728")),(0,r.kt)("p",null,"\uc2dc\uac04 \uc81c\ud55c\uc740 \ubaa8\ub4e0 \ub2e8\uc5b8\uc73c\ub85c \ud758\ub7ec\uac14\uace0 \uc774\uc81c \uc0ac\uc774\ud504\ub7ec\uc2a4\ub294 \ubaa8\ub4e0 \ub2e8\uc5b8\uc774 \ud1b5\uacfc\ud560 \ub54c\uae4c\uc9c0 \ucd1d 10\ucd08 \ub3d9\uc548 \uae30\ub2e4\ub9bd\ub2c8\ub2e4."),(0,r.kt)("admonition",{type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"\ub2e8\uc5b8 \ub0b4\ubd80\uc5d0\uc11c \uc2dc\uac04 \uc81c\ud55c\uc744 \ubcc0\uacbd\ud558\uc9c0 \uc54a\uc544\uc57c \ud569\ub2c8\ub2e4. ",(0,r.kt)("inlineCode",{parentName:"p"},"timeout")," \ub9e4\uac1c\ubcc0\uc218\ub294 \ud56d\uc0c1 \uba85\ub839 \ub0b4\ubd80\uc5d0 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4."),(0,r.kt)("div",{parentName:"admonition",className:"shiki-twoslash-fragment"},(0,r.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \u274c \uc791\ub3d9\ud558\uc9c0 \uc54a\ub294\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".get"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'.selector'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".should"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'be.visible'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," { timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"1000"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," });")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \u2714\ufe0f \uc62c\ubc14\ub978 \ubc29\ubc95")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".get"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'.selector'"),(0,r.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," { timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"1000"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," })"),(0,r.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".should"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'be.visible'"),(0,r.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},");"))))),(0,r.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,r.kt)("div",{parentName:"pre",className:"language-id"},"js"),(0,r.kt)("div",{parentName:"pre",className:"code-container"},(0,r.kt)("code",{parentName:"div"},(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \u274c \uc791\ub3d9\ud558\uc9c0 \uc54a\ub294\ub2e4.")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"get"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},".selector"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"should"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"be.visible"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#B48EAD"}},"1000"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \u2714\ufe0f \uc62c\ubc14\ub978 \ubc29\ubc95")),(0,r.kt)("div",{parentName:"code",className:"line"},(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"cy"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"get"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},".selector"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"timeout"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#B48EAD"}},"1000"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,r.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"should"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"be.visible"),(0,r.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,r.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")"),(0,r.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")))))),(0,r.kt)("p",{parentName:"admonition"},"\ub2e8\uc5b8\ubfd0\ub9cc \uc544\ub2c8\ub77c \ub2e8\uc5b8\uc774 \ucca8\ubd80\ub41c \uba85\ub839\uc744 \uc7ac\uc2dc\ub3c4\ud55c\ub2e4\ub294 \uac83\uc744 \uae30\uc5b5\ud574\uc57c \ud569\ub2c8\ub2e4.")),(0,r.kt)("h2",{id:"\uae30\ubcf8\uac12"},"\uae30\ubcf8\uac12"),(0,r.kt)("p",null,"\uc0ac\uc774\ud504\ub7ec\uc2a4\ub294 \uba85\ub839 \uc720\ud615\uc5d0 \ub530\ub77c \uba87 \uac00\uc9c0 \ub2e4\ub978 \uc2dc\uac04 \uc81c\ud55c \uac12\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4. \ud2b9\uc815 \uc791\uc5c5\uc758 \uc608\uc0c1 \uc18c\uc694 \uc2dc\uac04\uc744 \uae30\uc900\uc73c\ub85c \uae30\ubcf8 \uc2dc\uac04 \uc81c\ud55c \uac12\uc744 \uc124\uc815\ud588\uc2b5\ub2c8\ub2e4."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.cypress.io/api/commands/visit"},(0,r.kt)("inlineCode",{parentName:"a"},"cy.visit()"))," - \uc6d0\uaca9 \ud398\uc774\uc9c0\ub97c \ub85c\ub4dc\ud558\uace0 \ubaa8\ub4e0 \uc678\ubd80 \uc790\uc6d0\uc774 \ub85c\ub4dc \ub2e8\uacc4\ub97c \uc644\ub8cc\ud560 \ub54c\uae4c\uc9c0 \uc774\ud589\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uc2dc\uac04\uc774 \uc624\ub798 \uac78\ub9b4 \uc218 \uc788\uc73c\ubbc0\ub85c \uae30\ubcf8 \uc2dc\uac04 \uc81c\ud55c\uc740 ",(0,r.kt)("inlineCode",{parentName:"li"},"60000ms"),"\ub85c \uc124\uc815\ub429\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.cypress.io/api/commands/exec"},(0,r.kt)("inlineCode",{parentName:"a"},"cy.exec()"))," - \ub370\uc774\ud130\ubca0\uc774\uc2a4 \uc2dc\ub529\uacfc \uac19\uc740 \uc2dc\uc2a4\ud15c \uba85\ub839\uc744 \uc2e4\ud589\ud569\ub2c8\ub2e4. \uc774\uac83\uc740 \uc7a0\uc7ac\uc801\uc73c\ub85c \uc624\ub79c \uc2dc\uac04\uc774 \uac78\ub9b4 \uac83\uc73c\ub85c \uc608\uc0c1\ub418\uba70 \uae30\ubcf8 \uc2dc\uac04 \uc81c\ud55c\uc740 ",(0,r.kt)("inlineCode",{parentName:"li"},"60000ms"),"\ub85c \uc124\uc815\ub429\ub2c8\ub2e4."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.cypress.io/api/commands/wait"},(0,r.kt)("inlineCode",{parentName:"a"},"cy.wait()"))," - \ub450 \uac1c\uc758 \ub2e4\ub978 \uc2dc\uac04 \uc81c\ud55c\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4. \ub77c\uc6b0\ud305 \ubcc4\uce6d\uc744 \uae30\ub2e4\ub9b4 \ub54c\ub294 ",(0,r.kt)("inlineCode",{parentName:"li"},"5000ms")," \ub3d9\uc548 \uc77c\uce58\ud558\ub294 \uc694\uccad\uc744 \uae30\ub2e4\ub9ac\uba70, \uadf8\ub7ec\uace0 \ub098\uc11c \ucd94\uac00\ub85c \uc11c\ubc84\uc758 \uc751\ub2f5\uc744 ",(0,r.kt)("inlineCode",{parentName:"li"},"30000ms")," \ub3d9\uc548 \uae30\ub2e4\ub9bd\ub2c8\ub2e4. \uc571\uc774 \uc77c\uce58\ud558\ub294 \uc694\uccad\uc744 \ube60\ub974\uac8c \ub9cc\ub4e4 \uac83\uc73c\ub85c \uc608\uc0c1\ud558\uace0, \uc11c\ubc84\uc758 \uc751\ub2f5\uc740 \uc7a0\uc7ac\uc801\uc73c\ub85c \ud6e8\uc52c \ub354 \uc624\ub798 \uac78\ub9b4 \uac83\uc73c\ub85c \uc608\uc0c1\ud569\ub2c8\ub2e4.")),(0,r.kt)("p",null,"DOM \uae30\ubc18 \uba85\ub839\uc744 \ud3ec\ud568\ud55c \ub300\ubd80\ubd84\uc758 \uba85\ub839\uc740 \uae30\ubcf8\uc801\uc73c\ub85c ",(0,r.kt)("inlineCode",{parentName:"p"},"4000ms")," \ud6c4\uc5d0 \uc2dc\uac04 \uc81c\ud55c\uc5d0 \ub3c4\ub2ec\ud569\ub2c8\ub2e4."))}m.isMDXComponent=!0}}]);