"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[7920],{4593:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var r=n(7294),a=n(9962),l=n(4773),s=n(1514),c=n(3699),o=n(7325);const u=["zero","one","two","few","many","other"];function m(e){return u.filter((t=>e.includes(t)))}const h={locale:"en",pluralForms:m(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,a.Z)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:m(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),h}}),[e])}function p(){const e=i();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const a=n.select(t),l=n.pluralForms.indexOf(a);return r[Math.min(l,r.length-1)]}(n,t,e)}}var g=n(6775),d=n(6136);const f=function(){const e=(0,g.k6)(),t=(0,g.TH)(),{siteConfig:{baseUrl:n}}=(0,a.Z)(),r=d.Z.canUseDOM?new URLSearchParams(t.search):null,l=(null==r?void 0:r.get("q"))||"",s=(null==r?void 0:r.get("ctx"))||"",c=(null==r?void 0:r.get("version"))||"",o=e=>{const n=new URLSearchParams(t.search);return e?n.set("q",e):n.delete("q"),n};return{searchValue:l,searchContext:s,searchVersion:c,updateSearchPath:t=>{const n=o(t);e.replace({search:n.toString()})},generateSearchPageLink:e=>{const t=o(e);return`${n}search?${t.toString()}`}}};var E=n(5202),y=n(6654),S=n(1523),v=n(7976),w=n(9395),b=n(4056),I=n(318),P=n(5901);const F="searchQueryInput_CFBF",R="searchResultItem_U687",_="searchResultItemPath_uIbk",C="searchResultItemSummary_oZHr";function $(){const{siteConfig:{baseUrl:e}}=(0,a.Z)(),{selectMessage:t}=p(),{searchValue:n,searchContext:l,searchVersion:c,updateSearchPath:u}=f(),[m,h]=(0,r.useState)(n),[i,g]=(0,r.useState)(),[d,S]=(0,r.useState)(),v=`${e}${c}`,w=(0,r.useMemo)((()=>m?(0,o.I)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:m}):(0,o.I)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})),[m]);(0,r.useEffect)((()=>{u(m),i&&(m?i(m,(e=>{S(e)})):S(void 0))}),[m,i]);const I=(0,r.useCallback)((e=>{h(e.target.value)}),[]);return(0,r.useEffect)((()=>{n&&n!==m&&h(n)}),[n]),(0,r.useEffect)((()=>{!async function(){const{wrappedIndexes:e,zhDictionary:t}=await(0,E.w)(v,l);g((()=>(0,y.v)(e,t,100)))}()}),[l,v]),r.createElement(r.Fragment,null,r.createElement(s.Z,null,r.createElement("meta",{property:"robots",content:"noindex, follow"}),r.createElement("title",null,w)),r.createElement("div",{className:"container margin-vert--lg"},r.createElement("h1",null,w),r.createElement("input",{type:"search",name:"q",className:F,"aria-label":"Search",onChange:I,value:m,autoComplete:"off",autoFocus:!0}),!i&&m&&r.createElement("div",null,r.createElement(b.Z,null)),d&&(d.length>0?r.createElement("p",null,t(d.length,(0,o.I)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:d.length}))):r.createElement("p",null,(0,o.I)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"}))),r.createElement("section",null,d&&d.map((e=>r.createElement(k,{key:e.document.i,searchResult:e}))))))}function k(e){let{searchResult:{document:t,type:n,page:a,tokens:l,metadata:s}}=e;const o=0===n,u=2===n,m=(o?t.b:a.b).slice(),h=u?t.s:t.t;o||m.push(a.t);let i="";if(P.vc&&l.length>0){const e=new URLSearchParams;for(const t of l)e.append("_highlight",t);i=`?${e.toString()}`}return r.createElement("article",{className:R},r.createElement("h2",null,r.createElement(c.Z,{to:t.u+i+(t.h||""),dangerouslySetInnerHTML:{__html:u?(0,S.C)(h,l):(0,v.o)(h,(0,w.m)(s,"t"),l,100)}})),m.length>0&&r.createElement("p",{className:_},(0,I.e)(m)),u&&r.createElement("p",{className:C,dangerouslySetInnerHTML:{__html:(0,v.o)(t.t,(0,w.m)(s,"t"),l,100)}}))}const x=function(){return r.createElement(l.Z,null,r.createElement($,null))}}}]);