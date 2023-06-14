"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[9514,723],{19019:(e,t,n)=>{n.r(t),n.d(t,{default:()=>we});var r=n(67294),a=n(86010),o=n(83355),l=n(77560),c=n(49549),i=n(30562),s=n(34801),d=n(88957),u=n(27972),m=n(27692),b=n(8241),p=n(58140);const f={backToTopButton:"backToTopButton_sjWU",backToTopButtonShow:"backToTopButtonShow_xfvO"};function h(){const{shown:e,scrollToTop:t}=function({threshold:e}){const[t,n]=(0,r.useState)(!1),a=(0,r.useRef)(!1),{startScroll:o,cancelScroll:l}=(0,b.Ct)();return(0,b.RF)((({scrollY:t},r)=>{var o;const c=null===(o=r)||void 0===o?void 0:o.scrollY;c&&(a.current?a.current=!1:t>=c?(l(),n(!1)):t<e?n(!1):t+window.innerHeight<document.documentElement.scrollHeight&&n(!0))})),(0,p.S)((e=>{e.location.hash&&(a.current=!0,n(!1))})),{shown:t,scrollToTop:()=>o(0)}}({threshold:300});return r.createElement("button",{"aria-label":(0,m.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,a.Z)("clean-btn",l.k.common.backToTopButton,f.backToTopButton,e&&f.backToTopButtonShow),type:"button",onClick:t})}var v=n(97062),g=n(16550),E=n(64767),y=n(66757),k=n(56549);function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function S(e){return r.createElement("svg",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){O(e,t,n[t])}))}return e}({width:"20",height:"20","aria-hidden":"true"},e),r.createElement("g",{fill:"#7a7a7a"},r.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),r.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}const _={collapseSidebarButton:"collapseSidebarButton_PEFL",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_kv0_"};function C({onClick:e}){return r.createElement("button",{type:"button",title:(0,m.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,a.Z)("button button--secondary button--outline",_.collapseSidebarButton),onClick:e},r.createElement(S,{className:_.collapseSidebarButtonIcon}))}var I=n(3784),w=n(9480);const P=Symbol("EmptyContext"),x=r.createContext(P);function j({children:e}){const[t,n]=(0,r.useState)(null),a=(0,r.useMemo)((()=>({expandedItem:t,setExpandedItem:n})),[t]);return r.createElement(x.Provider,{value:a},e)}var N=n(99863),T=n(7266),B=n(61596),Z=n(90980);function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function M({categoryLabel:e,onClick:t}){return r.createElement("button",{"aria-label":(0,m.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:e}),type:"button",className:"clean-btn menu__caret",onClick:t})}function F(e){var{item:t,onItemClick:n,activePath:o,level:c,index:s}=e,d=A(e,["item","onItemClick","activePath","level","index"]);const{items:u,label:m,collapsible:b,className:p,href:f}=t,{docs:{sidebar:{autoCollapseCategories:h}}}=(0,y.L)(),v=function(e){const t=(0,Z.Z)();return(0,r.useMemo)((()=>e.href?e.href:!t&&e.collapsible?(0,i.Wl)(e):void 0),[e,t])}(t),g=(0,i._F)(t,o),E=(0,T.Mg)(f,o),{collapsed:k,setCollapsed:O}=(0,N.u)({initialState:()=>!!b&&(!g&&t.collapsed)}),{expandedItem:S,setExpandedItem:_}=function(){const e=(0,r.useContext)(x);if(e===P)throw new w.i6("DocSidebarItemsExpandedStateProvider");return e}(),C=(e=!k)=>{_(e?null:s),O(e)};return function({isActive:e,collapsed:t,updateCollapsed:n}){const a=(0,w.D9)(e);(0,r.useEffect)((()=>{e&&!a&&t&&n(!1)}),[e,a,t,n])}({isActive:g,collapsed:k,updateCollapsed:C}),(0,r.useEffect)((()=>{b&&null!=S&&S!==s&&h&&O(!0)}),[b,S,s,O,h]),r.createElement("li",{className:(0,a.Z)(l.k.docs.docSidebarItemCategory,l.k.docs.docSidebarItemCategoryLevel(c),"menu__list-item",{"menu__list-item--collapsed":k},p)},r.createElement("div",{className:(0,a.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":E})},r.createElement(B.Z,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){L(e,t,n[t])}))}return e}({className:(0,a.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!f&&b,"menu__link--active":g}),onClick:b?e=>{var r;null===(r=n)||void 0===r||r(t),f?C(!1):(e.preventDefault(),C())}:()=>{var e;null===(e=n)||void 0===e||e(t)},"aria-current":E?"page":void 0,"aria-expanded":b?!k:void 0,href:b?null!=v?v:"#":v},d),m),f&&b&&r.createElement(M,{categoryLabel:m,onClick:e=>{e.preventDefault(),C()}})),r.createElement(N.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:k},r.createElement(ee,{items:u,tabIndex:k?-1:0,onItemClick:n,activePath:o,level:c+1})))}var H=n(85606),D=n(7187);const W={menuExternalLink:"menuExternalLink_NmtK"};function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function V(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function z(e){var{item:t,onItemClick:n,activePath:o,level:c,index:s}=e,d=V(e,["item","onItemClick","activePath","level","index"]);const{href:u,label:m,className:b,autoAddBaseUrl:p}=t,f=(0,i._F)(t,o),h=(0,H.Z)(u);return r.createElement("li",{className:(0,a.Z)(l.k.docs.docSidebarItemLink,l.k.docs.docSidebarItemLinkLevel(c),"menu__list-item",b),key:m},r.createElement(B.Z,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){R(e,t,n[t])}))}return e}({className:(0,a.Z)("menu__link",!h&&W.menuExternalLink,{"menu__link--active":f}),autoAddBaseUrl:p,"aria-current":f?"page":void 0,to:u},h&&{onClick:n?()=>n(t):void 0},d),m,!h&&r.createElement(D.Z,null)))}const U={menuHtmlItem:"menuHtmlItem_M9Kj"};function K({item:e,level:t,index:n}){const{value:o,defaultStyle:c,className:i}=e;return r.createElement("li",{className:(0,a.Z)(l.k.docs.docSidebarItemLink,l.k.docs.docSidebarItemLinkLevel(t),c&&[U.menuHtmlItem,"menu__list-item"],i),key:n,dangerouslySetInnerHTML:{__html:o}})}function G(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){G(e,t,n[t])}))}return e}function q(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function X(e){var{item:t}=e,n=q(e,["item"]);switch(t.type){case"category":return r.createElement(F,Y({item:t},n));case"html":return r.createElement(K,Y({item:t},n));default:return r.createElement(z,Y({item:t},n))}}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Q(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function $(e){var{items:t}=e,n=Q(e,["items"]);return r.createElement(j,null,t.map(((e,t)=>r.createElement(X,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){J(e,t,n[t])}))}return e}({key:t,item:e,index:t},n)))))}const ee=(0,r.memo)($),te={menu:"menu_SIkG",menuWithAnnouncementBar:"menuWithAnnouncementBar_GW3s"};function ne({path:e,sidebar:t,className:n}){const o=function(){const{isActive:e}=(0,I.nT)(),[t,n]=(0,r.useState)(e);return(0,b.RF)((({scrollY:t})=>{e&&n(0===t)}),[e]),e&&t}();return r.createElement("nav",{"aria-label":(0,m.I)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,a.Z)("menu thin-scrollbar",te.menu,o&&te.menuWithAnnouncementBar,n)},r.createElement("ul",{className:(0,a.Z)(l.k.docs.docSidebarMenu,"menu__list")},r.createElement(ee,{items:t,activePath:e,level:1})))}const re="sidebar_njMd",ae="sidebarWithHideableNavbar_wUlq",oe="sidebarHidden_VK0M",le="sidebarLogo_isFc";function ce({path:e,sidebar:t,onCollapse:n,isHidden:o}){const{navbar:{hideOnScroll:l},docs:{sidebar:{hideable:c}}}=(0,y.L)();return r.createElement("div",{className:(0,a.Z)(re,l&&ae,o&&oe)},l&&r.createElement(k.Z,{tabIndex:-1,className:le}),r.createElement(ne,{path:e,sidebar:t}),c&&r.createElement(C,{onClick:n}))}const ie=r.memo(ce);var se=n(18901),de=n(6714);const ue=({sidebar:e,path:t})=>{const n=(0,de.e)();return r.createElement("ul",{className:(0,a.Z)(l.k.docs.docSidebarMenu,"menu__list")},r.createElement(ee,{items:e,activePath:t,onItemClick:e=>{"category"===e.type&&e.href&&n.toggle(),"link"===e.type&&n.toggle()},level:1}))};function me(e){return r.createElement(se.Zo,{component:ue,props:e})}const be=r.memo(me);function pe(e){const t=(0,E.i)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return r.createElement(r.Fragment,null,n&&r.createElement(ie,e),a&&r.createElement(be,e))}const fe={expandButton:"expandButton_m80_",expandButtonIcon:"expandButtonIcon_BlDH"};function he({toggleSidebar:e}){return r.createElement("div",{className:fe.expandButton,title:(0,m.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:e,onClick:e},r.createElement(S,{className:fe.expandButtonIcon}))}const ve={docSidebarContainer:"docSidebarContainer_b6E3",docSidebarContainerHidden:"docSidebarContainerHidden_b3ry",sidebarViewport:"sidebarViewport_Xe31"};function ge({children:e}){var t;const n=(0,d.V)();var a;return r.createElement(r.Fragment,{key:null!==(a=null===(t=n)||void 0===t?void 0:t.name)&&void 0!==a?a:"noSidebar"},e)}function Ee({sidebar:e,hiddenSidebarContainer:t,setHiddenSidebarContainer:n}){const{pathname:o}=(0,g.TH)(),[c,i]=(0,r.useState)(!1),s=(0,r.useCallback)((()=>{c&&i(!1),!c&&(0,v.n)()&&i(!0),n((e=>!e))}),[n,c]);return r.createElement("aside",{className:(0,a.Z)(l.k.docs.docSidebarContainer,ve.docSidebarContainer,t&&ve.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ve.docSidebarContainer)&&t&&i(!0)}},r.createElement(ge,null,r.createElement("div",{className:(0,a.Z)(ve.sidebarViewport,c&&ve.sidebarViewportHidden)},r.createElement(pe,{sidebar:e,path:o,onCollapse:s,isHidden:c}),c&&r.createElement(he,{toggleSidebar:s}))))}const ye={docMainContainer:"docMainContainer_gTbr",docMainContainerEnhanced:"docMainContainerEnhanced_Uz_u",docItemWrapperEnhanced:"docItemWrapperEnhanced_czyv"};function ke({hiddenSidebarContainer:e,children:t}){const n=(0,d.V)();return r.createElement("main",{className:(0,a.Z)(ye.docMainContainer,(e||!n)&&ye.docMainContainerEnhanced)},r.createElement("div",{className:(0,a.Z)("container padding-top--md padding-bottom--lg",ye.docItemWrapper,e&&ye.docItemWrapperEnhanced)},t))}const Oe={docPage:"docPage__5DB",docsWrapper:"docsWrapper_BCFX"};function Se({children:e}){const t=(0,d.V)(),[n,a]=(0,r.useState)(!1);return r.createElement(u.Z,{wrapperClassName:Oe.docsWrapper},r.createElement(h,null),r.createElement("div",{className:Oe.docPage},t&&r.createElement(Ee,{sidebar:t.items,hiddenSidebarContainer:n,setHiddenSidebarContainer:a}),r.createElement(ke,{hiddenSidebarContainer:n},e)))}var _e=n(20723),Ce=n(92417);function Ie(e){const{versionMetadata:t}=e;return r.createElement(r.Fragment,null,r.createElement(Ce.Z,{version:t.version,tag:(0,c.os)(t.pluginId,t.version)}),r.createElement(o.d,null,t.noIndex&&r.createElement("meta",{name:"robots",content:"noindex, nofollow"})))}function we(e){const{versionMetadata:t}=e,n=(0,i.hI)(e);if(!n)return r.createElement(_e.default,null);const{docElement:c,sidebarName:u,sidebarItems:m}=n;return r.createElement(r.Fragment,null,r.createElement(Ie,e),r.createElement(o.FG,{className:(0,a.Z)(l.k.wrapper.docsPages,l.k.page.docsDocPage,e.versionMetadata.className)},r.createElement(s.q,{version:t},r.createElement(d.b,{name:u,items:m},r.createElement(Se,null,c)))))}},20723:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});var r=n(67294),a=n(27692),o=n(83355),l=n(27972);function c(){return r.createElement(r.Fragment,null,r.createElement(o.d,{title:(0,a.I)({id:"theme.NotFound.title",message:"Page Not Found"})}),r.createElement(l.Z,null,r.createElement("main",{className:"container margin-vert--xl"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--6 col--offset-3"},r.createElement("h1",{className:"hero__title"},r.createElement(a.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),r.createElement("p",null,r.createElement(a.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),r.createElement("p",null,r.createElement(a.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))))}}}]);