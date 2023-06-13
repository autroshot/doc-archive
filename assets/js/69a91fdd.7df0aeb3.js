"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[2671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(l,".").concat(h)]||d[h]||s[h]||i;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,o[1]=p;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},62616:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>h,frontMatter:()=>p,metadata:()=>c,toc:()=>s});n(67294);var a=n(3905);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const p={sidebar_position:2},l="REST API",c={unversionedId:"miscellaneous/nextauthjs/basic/rest-api",id:"miscellaneous/nextauthjs/basic/rest-api",title:"REST API",description:"\ub125\uc2a4\ud2b8\uc778\uc99d\uc740 \ub125\uc2a4\ud2b8\uc778\uc99d \ud074\ub77c\uc774\uc5b8\ud2b8\uc5d0\uc11c \uc0ac\uc6a9\ud558\ub294 REST API\ub97c \ub178\ucd9c\ud569\ub2c8\ub2e4.",source:"@site/docs/miscellaneous/nextauthjs/basic/rest-api.md",sourceDirName:"miscellaneous/nextauthjs/basic",slug:"/miscellaneous/nextauthjs/basic/rest-api",permalink:"/doc-archive/docs/miscellaneous/nextauthjs/basic/rest-api",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"nextAuthJsSidebar",previous:{title:"\ud074\ub77c\uc774\uc5b8\ud2b8 API",permalink:"/doc-archive/docs/miscellaneous/nextauthjs/basic/client-api"},next:{title:"\ucd08\uae30\ud654",permalink:"/doc-archive/docs/miscellaneous/nextauthjs/configuration/initialization"}},u={},s=[{value:"GET <code>/api/auth/signin</code>",id:"get-apiauthsignin",level:2},{value:"POST <code>/api/auth/signin/:provider</code>",id:"post-apiauthsigninprovider",level:2},{value:"GET/POST <code>/api/auth/callback/:provider</code>",id:"getpost-apiauthcallbackprovider",level:2},{value:"GET <code>/api/auth/signout</code>",id:"get-apiauthsignout",level:2},{value:"POST <code>/api/auth/signout</code>",id:"post-apiauthsignout",level:2},{value:"GET <code>/api/auth/session</code>",id:"get-apiauthsession",level:2},{value:"GET <code>/api/auth/csrf</code>",id:"get-apiauthcsrf",level:2},{value:"GET <code>/api/auth/providers</code>",id:"get-apiauthproviders",level:2}],d={toc:s};function h(e){var{components:t}=e,n=o(e,["components"]);return(0,a.kt)("wrapper",i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){r(e,t,n[t])}))}return e}({},d,n),{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"rest-api"},"REST API"),(0,a.kt)("p",null,"\ub125\uc2a4\ud2b8\uc778\uc99d\uc740 \ub125\uc2a4\ud2b8\uc778\uc99d \ud074\ub77c\uc774\uc5b8\ud2b8\uc5d0\uc11c \uc0ac\uc6a9\ud558\ub294 REST API\ub97c \ub178\ucd9c\ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"get-apiauthsignin"},"GET ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/signin")),(0,a.kt)("p",null,"\ub0b4\uc7a5\ub41c \ube44\ube0c\ub79c\ub4dc \ub85c\uadf8\uc778 \ud398\uc774\uc9c0\ub97c \ud45c\uc2dc\ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"post-apiauthsigninprovider"},"POST ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/signin/:provider")),(0,a.kt)("p",null,"\uc81c\uacf5\uc790\ubcc4 \ub85c\uadf8\uc778 \ud750\ub984\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"POST \uc81c\ucd9c\uc5d0\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/auth/csrf"),"\uc758 CSRF \ud1a0\ud070\uc774 \ud544\uc694\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"OAuth \uc81c\uacf5\uc790\uc758 \uacbd\uc6b0, \uc774 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub97c \ud638\ucd9c\ud558\uba74 ID \uc81c\uacf5\uc790\uc5d0 \ub300\ud55c \uad8c\ud55c \ubd80\uc5ec \uc694\uccad\uc774 \uc2dc\uc791\ub429\ub2c8\ub2e4. ",(0,a.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1"},"OAuth \uba85\uc138\uc11c"),"\uc5d0\uc11c \uc790\uc138\ud55c \ub0b4\uc6a9\uc744 \ud655\uc778\ud558\uc138\uc694."),(0,a.kt)("p",null,"\uc774\uba54\uc77c \uc81c\uacf5\uc790\ub97c \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0, \uc774 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub97c \ud638\ucd9c\ud558\uba74 \uc0ac\uc6a9\uc790\uc758 \uc774\uba54\uc77c \uc8fc\uc18c\ub85c \ub85c\uadf8\uc778 URL\uc774 \uc804\uc1a1\ub429\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"signIn")," \uba54\uc11c\ub4dc\uc5d0\uc11c\ub3c4 \uc774 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub97c \ub0b4\ubd80\uc801\uc73c\ub85c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"getpost-apiauthcallbackprovider"},"GET/POST ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/callback/:provider")),(0,a.kt)("p",null,"\ub85c\uadf8\uc778\ud558\ub294 \ub3d9\uc548 OAuth \uc11c\ube44\uc2a4\uc758 \ubc18\ud658 \uc694\uccad\uc744 \ucc98\ub9ac\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'checks: ["state"]')," \uc635\uc158\uc744 \uc9c0\uc6d0\ud558\ub294 OAuth 2.0 \uc81c\uacf5\uc790\uc758 \uacbd\uc6b0 \ub85c\uadf8\uc778 \ud750\ub984\uc774 \uc2dc\uc791\ub420 \ub54c \uc0dd\uc131\ub41c \uac83\uacfc \ube44\uad50\ud558\uc5ec \uc0c1\ud0dc \ub9e4\uac1c\ubcc0\uc218\ub97c \ud655\uc778\ud569\ub2c8\ub2e4. \uc774\ub294 \ub85c\uadf8\uc778 \ub3d9\uc548 ",(0,a.kt)("inlineCode",{parentName:"p"},"POST")," \ubc0f ",(0,a.kt)("inlineCode",{parentName:"p"},"GET")," \ud638\ucd9c\uc5d0\uc11c \ubaa8\ub450 \uc77c\uce58\ud574\uc57c \ud558\ub294 CSRF \ud1a0\ud070\uc758 \ud574\uc2dc\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2"},"OAuth \uba85\uc138\uc11c"),"\uc5d0\uc11c \uc790\uc138\ud55c \ub0b4\uc6a9\uc744 \ud655\uc778\ud558\uc138\uc694."),(0,a.kt)("h2",{id:"get-apiauthsignout"},"GET ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/signout")),(0,a.kt)("p",null,"\ub0b4\uc7a5\ub41c \ube44\ube0c\ub79c\ub4dc \ub85c\uadf8\uc544\uc6c3 \ud398\uc774\uc9c0\ub97c \ud45c\uc2dc\ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"post-apiauthsignout"},"POST ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/signout")),(0,a.kt)("p",null,"\uc0ac\uc6a9\uc790 \ub85c\uadf8\uc544\uc6c3 \ucc98\ub9ac\ud569\ub2c8\ub2e4. \uc774\ub294 \uc545\uc758\uc801\uc778 \ub9c1\ud06c\uac00 \ub3d9\uc758 \uc5c6\uc774 \uc0ac\uc6a9\uc790\ub97c \ub85c\uadf8\uc544\uc6c3\uc2dc\ud0a4\ub294 \uac83\uc744 \ubc29\uc9c0\ud558\uae30 \uc704\ud55c ",(0,a.kt)("inlineCode",{parentName:"p"},"POST")," \uc81c\ucd9c\uc785\ub2c8\ub2e4. ",(0,a.kt)("a",{parentName:"p",href:"https://next-auth.js.org/configuration/options#session"},"\uc138\uc158\uc744 \uc800\uc7a5"),"\ud560 \ub54c \uc120\ud0dd\ud55c \ud750\ub984\uc5d0 \ub530\ub77c \uc0ac\uc6a9\uc790 \uc138\uc158\uc774 \ucfe0\ud0a4\ub098 \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c \ubb34\ud6a8\ud654 \ub610\ub294 \uc81c\uac70\ub429\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"POST")," \uc81c\ucd9c\uc5d0\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/auth/csrf"),"\uc758 CSRF \ud1a0\ud070\uc774 \ud544\uc694\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"signOut")," \uba54\uc11c\ub4dc\uc5d0\uc11c\ub3c4 \uc774 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\ub97c \ub0b4\ubd80\uc801\uc73c\ub85c \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"get-apiauthsession"},"GET ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/session")),(0,a.kt)("p",null,"\ud074\ub77c\uc774\uc5b8\ud2b8\uc5d0 \uc548\uc804\ud55c \uc138\uc158 \uac1d\uccb4\ub97c \ubc18\ud658\ud558\uac70\ub098 \uc138\uc158\uc774 \uc5c6\ub294 \uacbd\uc6b0 \ube48 \uac1d\uccb4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ubc18\ud658\ub418\ub294 \uc138\uc158 \uac1d\uccb4\uc758 \ub0b4\uc6a9\uc740 ",(0,a.kt)("a",{parentName:"p",href:"https://next-auth.js.org/configuration/callbacks#session-callback"},(0,a.kt)("inlineCode",{parentName:"a"},"session")," \ucf5c\ubc31"),"\uc73c\ub85c \uc124\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"get-apiauthcsrf"},"GET ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/csrf")),(0,a.kt)("p",null,"CSRF \ud1a0\ud070\uc744 \ud3ec\ud568\ub41c \uac1d\uccb4\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4. \ub125\uc2a4\ud2b8\uc778\uc99d\uc5d0\uc11c CSRF \ubcf4\ud638\ub294 \ubaa8\ub4e0 \uc778\uc99d \uacbd\ub85c\uc5d0 \uc788\uc2b5\ub2c8\ub2e4. \uc11c\uba85\ub41c HttpOnly, \ud638\uc2a4\ud2b8 \uc804\uc6a9 \ucfe0\ud0a4\ub97c \uc0ac\uc6a9\ud558\ub294 '\uc774\uc911 \uc81c\ucd9c \ucfe0\ud0a4 \ubc29\uc2dd'\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\uc774 \uc5d4\ub4dc\ud3ec\uc778\ud2b8\uc5d0\uc11c \ubc18\ud658\ub41c CSRF \ud1a0\ud070\uc740 \ubaa8\ub4e0 API \uc5d4\ub4dc\ud3ec\uc778\ud2b8\uc5d0 \ub300\ud55c \ubaa8\ub4e0 ",(0,a.kt)("inlineCode",{parentName:"p"},"POST")," \uc81c\ucd9c\uc5d0 ",(0,a.kt)("inlineCode",{parentName:"p"},"csrfToken"),"\uc774\ub77c\ub294 \uc591\uc2dd \ubcc0\uc218\ub85c \uc804\ub2ec\ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4."),(0,a.kt)("h2",{id:"get-apiauthproviders"},"GET ",(0,a.kt)("inlineCode",{parentName:"h2"},"/api/auth/providers")),(0,a.kt)("p",null,"\uc124\uc815\ub41c OAuth \uc11c\ube44\uc2a4 \ubaa9\ub85d\uacfc \uac01 \uc11c\ube44\uc2a4\uc758 \uc138\ubd80 \uc815\ubcf4(\uc608: \ub85c\uadf8\uc778 \ubc0f \ucf5c\ubc31 URL)\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."),(0,a.kt)("p",null,"\ucee4\uc2a4\ud140 \uac00\uc785 \ud398\uc774\uc9c0\ub97c \ub3d9\uc801\uc73c\ub85c \uc0dd\uc131\ud558\uace0 \uac01 OAuth \uc81c\uacf5\uc790\uc758 \ucf5c\ubc31 URL\uc744 \ud655\uc778\ud560 \ub54c \uc720\uc6a9\ud569\ub2c8\ub2e4."),(0,a.kt)("admonition",{title:"\ucc38\uace0",type:"note"},(0,a.kt)("p",{parentName:"admonition"},"\uae30\ubcf8 \uacbd\ub85c\ub294 ",(0,a.kt)("inlineCode",{parentName:"p"},"/api/auth"),"\uc774\uba70 ",(0,a.kt)("inlineCode",{parentName:"p"},"NEXTAUTH_URL"),"\uc5d0\uc11c \ucee4\uc2a4\ud140 \uacbd\ub85c\ub97c \uc9c0\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,a.kt)("p",{parentName:"admonition"},"\uc608\uc2dc:"),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"NEXTAUTH_URL=https://example.com/myapp/api/authentication")),(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"/api/auth/signin")," \u2192 ",(0,a.kt)("inlineCode",{parentName:"p"},"/myapp/api/authentication/signin"))))}h.isMDXComponent=!0}}]);