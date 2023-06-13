"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[7918],{35822:(e,t,n)=>{n.r(t),n.d(t,{default:()=>xe});var r=n(67294),a=n(83355),l=n(9480);const o=r.createContext(null);function c({children:e,content:t}){const n=function(e){return(0,r.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(t);return r.createElement(o.Provider,{value:n},e)}function i(){const e=(0,r.useContext)(o);if(null===e)throw new l.i6("DocProvider");return e}function s(){const{metadata:e,frontMatter:t,assets:n}=i();var l;return r.createElement(a.d,{title:e.title,description:e.description,keywords:t.keywords,image:null!==(l=n.image)&&void 0!==l?l:t.image})}var d=n(86010),u=n(64767),m=n(27692),b=n(61596);function p(e){const{permalink:t,title:n,subLabel:a,isNext:l}=e;return r.createElement(b.Z,{className:(0,d.Z)("pagination-nav__link",l?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},a&&r.createElement("div",{className:"pagination-nav__sublabel"},a),r.createElement("div",{className:"pagination-nav__label"},n))}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){f(e,t,n[t])}))}return e}function v(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function h(e){const{previous:t,next:n}=e;return r.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,m.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&r.createElement(p,v(g({},t),{subLabel:r.createElement(m.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),n&&r.createElement(p,v(g({},n),{subLabel:r.createElement(m.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}function y(){const{metadata:e}=i();return r.createElement(h,{previous:e.previous,next:e.next})}var O=n(70397),E=n(97203),w=n(77560),j=n(25662),P=n(34801);const k={unreleased:function({siteTitle:e,versionMetadata:t}){return r.createElement(m.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:e,versionLabel:r.createElement("b",null,t.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function({siteTitle:e,versionMetadata:t}){return r.createElement(m.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:e,versionLabel:r.createElement("b",null,t.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function _(e){const t=k[e.versionMetadata.banner];return r.createElement(t,e)}function N({versionLabel:e,to:t,onClick:n}){return r.createElement(m.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:e,latestVersionLink:r.createElement("b",null,r.createElement(b.Z,{to:t,onClick:n},r.createElement(m.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function L({className:e,versionMetadata:t}){const{siteConfig:{title:n}}=(0,O.Z)(),{pluginId:a}=(0,E.gA)({failfast:!0}),{savePreferredVersionName:l}=(0,j.J)(a),{latestDocSuggestion:o,latestVersionSuggestion:c}=(0,E.Jo)(a),i=null!=o?o:(s=c).docs.find((e=>e.id===s.mainDocId));var s;return r.createElement("div",{className:(0,d.Z)(e,w.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},r.createElement("div",null,r.createElement(_,{siteTitle:n,versionMetadata:t})),r.createElement("div",{className:"margin-top--md"},r.createElement(N,{versionLabel:c.label,to:i.path,onClick:()=>l(c.name)})))}function Z({className:e}){const t=(0,P.E)();return t.banner?r.createElement(L,{className:e,versionMetadata:t}):null}function T({className:e}){const t=(0,P.E)();return t.badge?r.createElement("span",{className:(0,d.Z)(e,w.k.docs.docVersionBadge,"badge badge--secondary")},r.createElement(m.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:t.label}},"Version: {versionLabel}")):null}function x({lastUpdatedAt:e,formattedLastUpdatedAt:t}){return r.createElement(m.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:r.createElement("b",null,r.createElement("time",{dateTime:new Date(1e3*e).toISOString()},t))}}," on {date}")}function S({lastUpdatedBy:e}){return r.createElement(m.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:r.createElement("b",null,e)}}," by {user}")}function U({lastUpdatedAt:e,formattedLastUpdatedAt:t,lastUpdatedBy:n}){return r.createElement("span",{className:w.k.common.lastUpdated},r.createElement(m.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:e&&t?r.createElement(x,{lastUpdatedAt:e,formattedLastUpdatedAt:t}):"",byUser:n?r.createElement(S,{lastUpdatedBy:n}):""}},"Last updated{atDate}{byUser}"),!1)}const D="iconEdit_Z9Sw";function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function M(e){var{className:t}=e,n=A(e,["className"]);return r.createElement("svg",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){C(e,t,n[t])}))}return e}({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,d.Z)(D,t),"aria-hidden":"true"},n),r.createElement("g",null,r.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function B({editUrl:e}){return r.createElement("a",{href:e,target:"_blank",rel:"noreferrer noopener",className:w.k.common.editThisPage},r.createElement(M,null),r.createElement(m.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}const I="tag_zVej",V="tagRegular_sFm0",H="tagWithCount_h2kH";function F({permalink:e,label:t,count:n}){return r.createElement(b.Z,{href:e,className:(0,d.Z)(I,n?H:V)},t,n&&r.createElement("span",null,n))}const z="tags_jXut",R="tag_QGVx";function $({tags:e}){return r.createElement(r.Fragment,null,r.createElement("b",null,r.createElement(m.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),r.createElement("ul",{className:(0,d.Z)(z,"padding--none","margin-left--sm")},e.map((({label:e,permalink:t})=>r.createElement("li",{key:t,className:R},r.createElement(F,{label:e,permalink:t}))))))}const G="lastUpdated_vwxv";function W(e){return r.createElement("div",{className:(0,d.Z)(w.k.docs.docFooterTagsRow,"row margin-bottom--sm")},r.createElement("div",{className:"col"},r.createElement($,e)))}function q({editUrl:e,lastUpdatedAt:t,lastUpdatedBy:n,formattedLastUpdatedAt:a}){return r.createElement("div",{className:(0,d.Z)(w.k.docs.docFooterEditMetaRow,"row")},r.createElement("div",{className:"col"},e&&r.createElement(B,{editUrl:e})),r.createElement("div",{className:(0,d.Z)("col",G)},(t||n)&&r.createElement(U,{lastUpdatedAt:t,formattedLastUpdatedAt:a,lastUpdatedBy:n})))}function J(){const{metadata:e}=i(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:a,lastUpdatedBy:l,tags:o}=e,c=o.length>0,s=!!(t||n||l);return c||s?r.createElement("footer",{className:(0,d.Z)(w.k.docs.docFooter,"docusaurus-mt-lg")},c&&r.createElement(W,{tags:o}),s&&r.createElement(q,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:a})):null}var Q=n(99863),X=n(13096);const Y="tocCollapsibleButton_TO0P",K="tocCollapsibleButtonExpanded_MG3E";function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function ne(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function re(e){var{collapsed:t}=e,n=ne(e,["collapsed"]);return r.createElement("button",te(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){ee(e,t,n[t])}))}return e}({type:"button"},n),{className:(0,d.Z)("clean-btn",Y,!t&&K,n.className)}),r.createElement(m.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}const ae="tocCollapsible_ETCw",le="tocCollapsibleContent_vkbj",oe="tocCollapsibleExpanded_sAul";function ce({toc:e,className:t,minHeadingLevel:n,maxHeadingLevel:a}){const{collapsed:l,toggleCollapsed:o}=(0,Q.u)({initialState:!0});return r.createElement("div",{className:(0,d.Z)(ae,!l&&oe,t)},r.createElement(re,{collapsed:l,onClick:o}),r.createElement(Q.z,{lazy:!0,className:le,collapsed:l},r.createElement(X.Z,{toc:e,minHeadingLevel:n,maxHeadingLevel:a})))}const ie="tocMobile_ITEo";function se(){const{toc:e,frontMatter:t}=i();return r.createElement(ce,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,d.Z)(w.k.docs.docTocMobile,ie)})}var de=n(80059);function ue(){const{toc:e,frontMatter:t}=i();return r.createElement(de.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:w.k.docs.docTocDesktop})}var me=n(24805),be=n(71302);function pe({children:e}){const t=function(){const{metadata:e,frontMatter:t,contentTitle:n}=i();return t.hide_title||void 0!==n?null:e.title}();return r.createElement("div",{className:(0,d.Z)(w.k.docs.docMarkdown,"markdown")},t&&r.createElement("header",null,r.createElement(me.Z,{as:"h1"},t)),r.createElement(be.Z,null,e))}var fe=n(30562),ge=n(7266),ve=n(63278);function he(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ye(e){return r.createElement("svg",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){he(e,t,n[t])}))}return e}({viewBox:"0 0 24 24"},e),r.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}const Oe="breadcrumbHomeIcon_YNFT";function Ee(){const e=(0,ve.Z)("/");return r.createElement("li",{className:"breadcrumbs__item"},r.createElement(b.Z,{"aria-label":(0,m.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e},r.createElement(ye,{className:Oe})))}const we="breadcrumbsContainer_Z_bl";function je(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Pe(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function ke({children:e,href:t,isLast:n}){const a="breadcrumbs__link";return n?r.createElement("span",{className:a,itemProp:"name"},e):t?r.createElement(b.Z,{className:a,href:t,itemProp:"item"},r.createElement("span",{itemProp:"name"},e)):r.createElement("span",{className:a},e)}function _e({children:e,active:t,index:n,addMicrodata:a}){return r.createElement("li",Pe(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){je(e,t,n[t])}))}return e}({},a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"}),{className:(0,d.Z)("breadcrumbs__item",{"breadcrumbs__item--active":t})}),e,r.createElement("meta",{itemProp:"position",content:String(n+1)}))}function Ne(){const e=(0,fe.s1)(),t=(0,ge.Ns)();return e?r.createElement("nav",{className:(0,d.Z)(w.k.docs.docBreadcrumbs,we),"aria-label":(0,m.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},r.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&r.createElement(Ee,null),e.map(((t,n)=>{const a=n===e.length-1;return r.createElement(_e,{key:n,active:a,index:n,addMicrodata:!!t.href},r.createElement(ke,{href:t.href,isLast:a},t.label))})))):null}const Le="docItemContainer_Djhp",Ze="docItemCol_VOVn";function Te({children:e}){const t=function(){const{frontMatter:e,toc:t}=i(),n=(0,u.i)(),a=e.hide_table_of_contents,l=!a&&t.length>0;return{hidden:a,mobile:l?r.createElement(se,null):void 0,desktop:!l||"desktop"!==n&&"ssr"!==n?void 0:r.createElement(ue,null)}}();return r.createElement("div",{className:"row"},r.createElement("div",{className:(0,d.Z)("col",!t.hidden&&Ze)},r.createElement(Z,null),r.createElement("div",{className:Le},r.createElement("article",null,r.createElement(Ne,null),r.createElement(T,null),t.mobile,r.createElement(pe,null,e),r.createElement(J,null)),r.createElement(y,null))),t.desktop&&r.createElement("div",{className:"col col--3"},t.desktop))}function xe(e){const t=`docs-doc-id-${e.content.metadata.unversionedId}`,n=e.content;return r.createElement(c,{content:e.content},r.createElement(a.FG,{className:t},r.createElement(s,null),r.createElement(Te,null,r.createElement(n,null))))}},45190:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(58638),a=n(67294);var l=n(76206);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const c=(i=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){o(e,t,n[t])}))}return e}({},r.Z),s=null!=(s={Image:function({img:e,alt:t,maxWidth:n}){return a.createElement(l.Z,{img:e,alt:t,style:{maxWidth:n}})},CodeSandbox:function({title:e,modulePath:t}){return a.createElement("iframe",{src:function(){let n="";if(t){const e=t.replace(/\//g,"%2F");n=`&module=${e}`}return`https://codesandbox.io/embed/${e}?codemirror=1&fontsize=14&hidenavigation=1&view=editor${n}`}(),style:{width:"100%",height:"500px",border:"0",borderRadius:"4px",overflow:"hidden"},title:e,allow:"accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"})}})?s:{},Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(s)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(s)).forEach((function(e){Object.defineProperty(i,e,Object.getOwnPropertyDescriptor(s,e))})),i);var i,s}}]);