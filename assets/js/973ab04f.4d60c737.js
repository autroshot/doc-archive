"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[651],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>y});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),i=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=i(a),y=r,v=m["".concat(p,".").concat(y)]||m[y]||d[y]||o;return a?n.createElement(v,s(s({ref:t},c),{},{components:a})):n.createElement(v,s({ref:t},c))}));function y(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,s=new Array(o);s[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var i=2;i<o;i++)s[i]=a[i];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},65867:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>p,default:()=>y,frontMatter:()=>l,metadata:()=>i,toc:()=>d});a(67294);var n=a(3905);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}const l={sidebar_position:7},p="\ubcc0\ud615\uc5d0 \uc758\ud55c \ubb34\ud6a8\ud654",i={unversionedId:"miscellaneous/tanstack-query/guides-and-concepts/invalidations-from-mutations",id:"miscellaneous/tanstack-query/guides-and-concepts/invalidations-from-mutations",title:"\ubcc0\ud615\uc5d0 \uc758\ud55c \ubb34\ud6a8\ud654",description:"\uc9c8\uc758 \ubb34\ud6a8\ud654\ub294 \uc804\ud22c\uc758 \uc808\ubc18\uc5d0 \ubd88\uacfc\ud569\ub2c8\ub2e4. \ub098\uba38\uc9c0 \uc808\ubc18\uc740 \ubb34\ud6a8\ud654\ud560 \uc2dc\uae30\ub97c \uc544\ub294 \uac83\uc785\ub2c8\ub2e4. \uc77c\ubc18\uc801\uc73c\ub85c \uc571\uc5d0\uc11c \ubcc0\ud615\uc774 \uc131\uacf5\ud588\uc744 \ub54c, \ubcc0\ud615\uc73c\ub85c \uc778\ud55c \uc0c8\ub85c\uc6b4 \ubcc0\uacbd \uc0ac\ud56d\uc744 \ucc98\ub9ac\ud558\ub294 \ubb34\ud6a8\ud654 \ubc0f \ub2e4\uc2dc \uac00\uc838\uc624\uae30 \uad00\ub828 \uc9c8\uc758\uac00 \uc571\uc5d0 \uc788\uc744 \uac00\ub2a5\uc131\uc774 \ub9e4\uc6b0 \ub192\uc2b5\ub2c8\ub2e4.",source:"@site/docs/miscellaneous/tanstack-query/guides-and-concepts/invalidations-from-mutations.md",sourceDirName:"miscellaneous/tanstack-query/guides-and-concepts",slug:"/miscellaneous/tanstack-query/guides-and-concepts/invalidations-from-mutations",permalink:"/doc-archive/docs/miscellaneous/tanstack-query/guides-and-concepts/invalidations-from-mutations",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tanstackQuerySidebar",previous:{title:"\uc9c8\uc758 \ubb34\ud6a8\ud654",permalink:"/doc-archive/docs/miscellaneous/tanstack-query/guides-and-concepts/query-invalidation"},next:{title:"\ubcc0\ud615 \uc751\ub2f5\uc5d0 \uc758\ud55c \uac31\uc2e0",permalink:"/doc-archive/docs/miscellaneous/tanstack-query/guides-and-concepts/updates-from-mutation-responses"}},c={},d=[],m={toc:d};function y(e){var{components:t}=e,a=s(e,["components"]);return(0,n.kt)("wrapper",o(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),n.forEach((function(t){r(e,t,a[t])}))}return e}({},m,a),{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\ubcc0\ud615\uc5d0-\uc758\ud55c-\ubb34\ud6a8\ud654"},"\ubcc0\ud615\uc5d0 \uc758\ud55c \ubb34\ud6a8\ud654"),(0,n.kt)("p",null,"\uc9c8\uc758 \ubb34\ud6a8\ud654\ub294 \uc804\ud22c\uc758 \uc808\ubc18\uc5d0 \ubd88\uacfc\ud569\ub2c8\ub2e4. \ub098\uba38\uc9c0 \uc808\ubc18\uc740 \ubb34\ud6a8\ud654\ud560 ",(0,n.kt)("strong",{parentName:"p"},"\uc2dc\uae30"),"\ub97c \uc544\ub294 \uac83\uc785\ub2c8\ub2e4. \uc77c\ubc18\uc801\uc73c\ub85c \uc571\uc5d0\uc11c \ubcc0\ud615\uc774 \uc131\uacf5\ud588\uc744 \ub54c, \ubcc0\ud615\uc73c\ub85c \uc778\ud55c \uc0c8\ub85c\uc6b4 \ubcc0\uacbd \uc0ac\ud56d\uc744 \ucc98\ub9ac\ud558\ub294 \ubb34\ud6a8\ud654 \ubc0f \ub2e4\uc2dc \uac00\uc838\uc624\uae30 \uad00\ub828 \uc9c8\uc758\uac00 \uc571\uc5d0 \uc788\uc744 \uac00\ub2a5\uc131\uc774 \ub9e4\uc6b0 \ub192\uc2b5\ub2c8\ub2e4."),(0,n.kt)("p",null,"\uc608\ub97c \ub4e4\uc5b4 \uc0c8\ub85c\uc6b4 \ud560 \uc77c\uc744 \uac8c\uc2dc\ud558\ub294 \ubcc0\ud615\uc774 \uc788\ub2e4\uace0 \uac00\uc815\ud574 \ubcf4\uaca0\uc2b5\ub2c8\ub2e4."),(0,n.kt)("div",{className:"shiki-twoslash-fragment"},(0,n.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"tsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"mutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"({ mutationFn"),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," postTodo })"))))),(0,n.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"tsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"mutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"mutationFn"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"postTodo"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")))))),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"postTodo")," \ubcc0\ud615\uc774 \uc131\uacf5\ud558\uba74, \ubaa8\ub4e0 ",(0,n.kt)("inlineCode",{parentName:"p"},"todos")," \uc9c8\uc758\ub97c \ubb34\ud6a8\ud654\ud558\uace0 \uc0c8\ub85c\uc6b4 \ud560 \uc77c \ud56d\ubaa9\uc744 \ud45c\uc2dc\ud558\uae30 \uc704\ud574 \ub2e4\uc2dc \uac00\uc838\uc624\ub294 \uac83\uc744 \uc6d0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc774\ub54c, ",(0,n.kt)("inlineCode",{parentName:"p"},"useMutation"),"\uc758 ",(0,n.kt)("inlineCode",{parentName:"p"},"onSuccess")," \uc635\uc158\uacfc ",(0,n.kt)("inlineCode",{parentName:"p"},"client"),"\uc758 ",(0,n.kt)("inlineCode",{parentName:"p"},"invalidateQueries")," \ud568\uc218\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,n.kt)("div",{className:"shiki-twoslash-fragment"},(0,n.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"tsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," { useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#212121"}},","),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," useQueryClient } "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'@tanstack/react-query'")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"useQueryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"()")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// \uc774 \ubcc0\ud615\uc774 \uc131\uacf5\ud558\uba74 todos \ub610\ub294 reminders \uc9c8\uc758 \ud0a4\uac00 \uc788\ub294 \ubaa8\ub4e0 \uc9c8\uc758\ub97c \ubb34\ud6a8\ud654\ud569\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"mutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"({")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  mutationFn"),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," addTodo"),(0,n.kt)("span",{parentName:"div",style:{color:"#212121"}},",")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"onSuccess"),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," () "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"=>"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," {")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".invalidateQueries"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"({ queryKey"),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," ["),(0,n.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'todos'"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"] })")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},".invalidateQueries"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"({ queryKey"),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," ["),(0,n.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'reminders'"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"] })")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  }"),(0,n.kt)("span",{parentName:"div",style:{color:"#212121"}},",")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"})"))))),(0,n.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"tsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},","),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"useQueryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"@tanstack/react-query"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"useQueryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"()")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// \uc774 \ubcc0\ud615\uc774 \uc131\uacf5\ud558\uba74 todos \ub610\ub294 reminders \uc9c8\uc758 \ud0a4\uac00 \uc788\ub294 \ubaa8\ub4e0 \uc9c8\uc758\ub97c \ubb34\ud6a8\ud654\ud569\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"const"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"mutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"="),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"useMutation"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"mutationFn"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"addTodo"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},",")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"onSuccess"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"()"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"=>"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"invalidateQueries"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"queryKey"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," ["),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"todos"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"] "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"queryClient"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"."),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"invalidateQueries"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"("),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"queryKey"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},":"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," ["),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"reminders"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"] "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"},")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},")")))))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/doc-archive/docs/miscellaneous/tanstack-query/guides-and-concepts/mutations"},(0,n.kt)("inlineCode",{parentName:"a"},"useMutation")," \ud6c5"),"\uc758 \ucf5c\ubc31\uc5d0\uc11c \ubb34\ud6a8\ud654\ud558\ub294 \uac83\ub3c4 \uac00\ub2a5\ud569\ub2c8\ub2e4."))}y.isMDXComponent=!0}}]);