"use strict";(self.webpackChunkdoc_archive=self.webpackChunkdoc_archive||[]).push([[7920],{64593:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var a=r(67294),n=r(39962),l=r(94972),s=r(31514),c=r(83699),u=r(97325);const o=["zero","one","two","few","many","other"];function m(e){return o.filter((t=>e.includes(t)))}const h={locale:"en",pluralForms:m(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,n.Z)();return(0,a.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:m(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),h}}),[e])}function p(){const e=i();return{selectMessage:(t,r)=>function(e,t,r){const a=e.split("|");if(1===a.length)return a[0];a.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${a.length}: ${e}`);const n=r.select(t),l=r.pluralForms.indexOf(n);return a[Math.min(l,a.length-1)]}(r,t,e)}}var g=r(16550),d=r(36136);const f=function(){const e=(0,g.k6)(),t=(0,g.TH)(),{siteConfig:{baseUrl:r}}=(0,n.Z)(),a=d.Z.canUseDOM?new URLSearchParams(t.search):null,l=a?.get("q")||"",s=a?.get("ctx")||"",c=a?.get("version")||"",u=e=>{const r=new URLSearchParams(t.search);return e?r.set("q",e):r.delete("q"),r};return{searchValue:l,searchContext:s,searchVersion:c,updateSearchPath:t=>{const r=u(t);e.replace({search:r.toString()})},generateSearchPageLink:e=>{const t=u(e);return`${r}search?${t.toString()}`}}};var y=r(5202),E=r(76654),S=r(21523),I=r(77976),R=r(79395),w=r(64056),P=r(70318),v=r(5901);const b={searchQueryInput:"searchQueryInput_CFBF",searchResultItem:"searchResultItem_U687",searchResultItemPath:"searchResultItemPath_uIbk",searchResultItemSummary:"searchResultItemSummary_oZHr"};function F(){const{siteConfig:{baseUrl:e}}=(0,n.Z)(),{selectMessage:t}=p(),{searchValue:r,searchContext:l,searchVersion:c,updateSearchPath:o}=f(),[m,h]=(0,a.useState)(r),[i,g]=(0,a.useState)(),[d,S]=(0,a.useState)(),I=`${e}${c}`,R=(0,a.useMemo)((()=>m?(0,u.I)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:m}):(0,u.I)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})),[m]);(0,a.useEffect)((()=>{o(m),i&&(m?i(m,(e=>{S(e)})):S(void 0))}),[m,i]);const P=(0,a.useCallback)((e=>{h(e.target.value)}),[]);return(0,a.useEffect)((()=>{r&&r!==m&&h(r)}),[r]),(0,a.useEffect)((()=>{!async function(){const{wrappedIndexes:e,zhDictionary:t}=await(0,y.w)(I,l);g((()=>(0,E.v)(e,t,100)))}()}),[l,I]),a.createElement(a.Fragment,null,a.createElement(s.Z,null,a.createElement("meta",{property:"robots",content:"noindex, follow"}),a.createElement("title",null,R)),a.createElement("div",{className:"container margin-vert--lg"},a.createElement("h1",null,R),a.createElement("input",{type:"search",name:"q",className:b.searchQueryInput,"aria-label":"Search",onChange:P,value:m,autoComplete:"off",autoFocus:!0}),!i&&m&&a.createElement("div",null,a.createElement(w.Z,null)),d&&(d.length>0?a.createElement("p",null,t(d.length,(0,u.I)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:d.length}))):a.createElement("p",null,(0,u.I)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"}))),a.createElement("section",null,d&&d.map((e=>a.createElement(_,{key:e.document.i,searchResult:e}))))))}function _(e){let{searchResult:{document:t,type:r,page:n,tokens:l,metadata:s}}=e;const u=0===r,o=2===r,m=(u?t.b:n.b).slice(),h=o?t.s:t.t;u||m.push(n.t);let i="";if(v.vc&&l.length>0){const e=new URLSearchParams;for(const t of l)e.append("_highlight",t);i=`?${e.toString()}`}return a.createElement("article",{className:b.searchResultItem},a.createElement("h2",null,a.createElement(c.Z,{to:t.u+i+(t.h||""),dangerouslySetInnerHTML:{__html:o?(0,S.C)(h,l):(0,I.o)(h,(0,R.m)(s,"t"),l,100)}})),m.length>0&&a.createElement("p",{className:b.searchResultItemPath},(0,P.e)(m)),o&&a.createElement("p",{className:b.searchResultItemSummary,dangerouslySetInnerHTML:{__html:(0,I.o)(t.t,(0,R.m)(s,"t"),l,100)}}))}const C=function(){return a.createElement(l.Z,null,a.createElement(F,null))}}}]);