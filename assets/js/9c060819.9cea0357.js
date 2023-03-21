"use strict";(self.webpackChunkdocs_repository=self.webpackChunkdocs_repository||[]).push([[5464],{4137:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>u});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var i=r.createContext({}),c=function(e){var a=r.useContext(i),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},p=function(e){var a=c(e.components);return r.createElement(i.Provider,{value:a},e.children)},d={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},m=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(t),u=n,k=m["".concat(i,".").concat(u)]||m[u]||d[u]||o;return t?r.createElement(k,l(l({ref:a},p),{},{components:t})):r.createElement(k,l({ref:a},p))}));function u(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var o=t.length,l=new Array(o);l[0]=m;var s={};for(var i in a)hasOwnProperty.call(a,i)&&(s[i]=a[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var c=2;c<o;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},425:(e,a,t)=>{t.d(a,{Z:()=>l});var r=t(7294),n=t(6010);const o="tabItem_Ymn6";function l(e){let{children:a,hidden:t,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,n.Z)(o,l),hidden:t},a)}},3992:(e,a,t)=>{t.d(a,{Z:()=>b});var r=t(7462),n=t(7294),o=t(6010),l=t(2957),s=t(6775),i=t(5238),c=t(3609),p=t(2560);function d(e){return function(e){return n.Children.map(e,(e=>{if((0,n.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))}(e).map((e=>{let{props:{value:a,label:t,attributes:r,default:n}}=e;return{value:a,label:t,attributes:r,default:n}}))}function m(e){const{values:a,children:t}=e;return(0,n.useMemo)((()=>{const e=a??d(t);return function(e){const a=(0,c.l)(e,((e,a)=>e.value===a.value));if(a.length>0)throw new Error(`Docusaurus error: Duplicate values "${a.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[a,t])}function u(e){let{value:a,tabValues:t}=e;return t.some((e=>e.value===a))}function k(e){let{queryString:a=!1,groupId:t}=e;const r=(0,s.k6)(),o=function(e){let{queryString:a=!1,groupId:t}=e;if("string"==typeof a)return a;if(!1===a)return null;if(!0===a&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:a,groupId:t});return[(0,i._X)(o),(0,n.useCallback)((e=>{if(!o)return;const a=new URLSearchParams(r.location.search);a.set(o,e),r.replace({...r.location,search:a.toString()})}),[o,r])]}function v(e){const{defaultValue:a,queryString:t=!1,groupId:r}=e,o=m(e),[l,s]=(0,n.useState)((()=>function(e){let{defaultValue:a,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!u({value:a,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${a}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return a}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:a,tabValues:o}))),[i,c]=k({queryString:t,groupId:r}),[d,v]=function(e){let{groupId:a}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(a),[r,o]=(0,p.Nk)(t);return[r,(0,n.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:r}),N=(()=>{const e=i??d;return u({value:e,tabValues:o})?e:null})();(0,n.useLayoutEffect)((()=>{N&&s(N)}),[N]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!u({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),c(e),v(e)}),[c,v,o]),tabValues:o}}var N=t(1048);const y="tabList__CuJ",f="tabItem_LNqP";function F(e){let{className:a,block:t,selectedValue:s,selectValue:i,tabValues:c}=e;const p=[],{blockElementScrollPositionUntilNextRender:d}=(0,l.o5)(),m=e=>{const a=e.currentTarget,t=p.indexOf(a),r=c[t].value;r!==s&&(d(a),i(r))},u=e=>{var a;let t=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":{const a=p.indexOf(e.currentTarget)+1;t=p[a]??p[0];break}case"ArrowLeft":{const a=p.indexOf(e.currentTarget)-1;t=p[a]??p[p.length-1];break}}null==(a=t)||a.focus()};return n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},a)},c.map((e=>{let{value:a,label:t,attributes:l}=e;return n.createElement("li",(0,r.Z)({role:"tab",tabIndex:s===a?0:-1,"aria-selected":s===a,key:a,ref:e=>p.push(e),onKeyDown:u,onClick:m},l,{className:(0,o.Z)("tabs__item",f,null==l?void 0:l.className,{"tabs__item--active":s===a})}),t??a)})))}function E(e){let{lazy:a,children:t,selectedValue:r}=e;if(t=Array.isArray(t)?t:[t],a){const e=t.find((e=>e.props.value===r));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return n.createElement("div",{className:"margin-top--md"},t.map(((e,a)=>(0,n.cloneElement)(e,{key:a,hidden:e.props.value!==r}))))}function h(e){const a=v(e);return n.createElement("div",{className:(0,o.Z)("tabs-container",y)},n.createElement(F,(0,r.Z)({},e,a)),n.createElement(E,(0,r.Z)({},e,a)))}function b(e){const a=(0,N.Z)();return n.createElement(h,(0,r.Z)({key:String(a)},e))}},5081:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var r=t(7462),n=(t(7294),t(4137)),o=t(3992),l=t(425);const s={sidebar_position:2},i="\uc124\uce58",c={unversionedId:"miscellaneous/chakra-ui/getting-started",id:"miscellaneous/chakra-ui/getting-started",title:"\uc124\uce58",description:"\ucc28\ud06c\ub77c UI \ubc84\uc804 2\ub294 \ub9ac\uc561\ud2b8 18\uacfc\ub9cc \ud638\ud658\ub429\ub2c8\ub2e4. \ub9ac\uc561\ud2b8 17 \uc774\ud558 \ubc84\uc804\uc744 \uc0ac\uc6a9\ud574\uc57c \ud558\ub294 \uacbd\uc6b0 \ucc28\ud06c\ub77c UI \ubc84\uc804 1\uc744 \uc0ac\uc6a9\ud558\uc138\uc694.",source:"@site/docs/miscellaneous/chakra-ui/getting-started.mdx",sourceDirName:"miscellaneous/chakra-ui",slug:"/miscellaneous/chakra-ui/getting-started",permalink:"/docs-repository/docs/miscellaneous/chakra-ui/getting-started",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"chakraUISidebar",previous:{title:"\ub514\uc790\uc778 \uc6d0\uce59",permalink:"/docs-repository/docs/miscellaneous/chakra-ui/"},next:{title:"Next.js",permalink:"/docs-repository/docs/miscellaneous/chakra-ui/nextjs"}},p={},d=[{value:"\ud504\ub808\uc784\uc6cc\ud06c \uc548\ub0b4\uc11c",id:"\ud504\ub808\uc784\uc6cc\ud06c-\uc548\ub0b4\uc11c",level:2}],m={toc:d};function u(e){let{components:a,...t}=e;return(0,n.kt)("wrapper",(0,r.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"\uc124\uce58"},"\uc124\uce58"),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"\ucc28\ud06c\ub77c UI \ubc84\uc804 2\ub294 \ub9ac\uc561\ud2b8 18\uacfc\ub9cc \ud638\ud658\ub429\ub2c8\ub2e4. \ub9ac\uc561\ud2b8 17 \uc774\ud558 \ubc84\uc804\uc744 \uc0ac\uc6a9\ud574\uc57c \ud558\ub294 \uacbd\uc6b0 ",(0,n.kt)("a",{parentName:"p",href:"https://v1.chakra-ui.com/guides/first-steps"},"\ucc28\ud06c\ub77c UI \ubc84\uc804 1"),"\uc744 \uc0ac\uc6a9\ud558\uc138\uc694.")),(0,n.kt)("p",null,"\ud504\ub85c\uc81d\ud2b8\uc5d0\uc11c \ucc28\ud06c\ub77c UI\ub97c \uc0ac\uc6a9\ud558\ub824\uba74 \ud130\ubbf8\ub110\uc5d0\uc11c \ub2e4\uc74c \uba85\ub839\uc744 \uc2e4\ud589\ud569\ub2c8\ub2e4."),(0,n.kt)(o.Z,{groupId:"package-manager",mdxType:"Tabs"},(0,n.kt)(l.Z,{value:"npm",label:"npm",default:!0,mdxType:"TabItem"},(0,n.kt)("div",{className:"shiki-twoslash-fragment"},(0,n.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion"))))),(0,n.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion"))))))),(0,n.kt)(l.Z,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,n.kt)("div",{className:"shiki-twoslash-fragment"},(0,n.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion"))))),(0,n.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"bash"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion")))))))),(0,n.kt)("p",null,"\ucc28\ud06c\ub77c UI\ub97c \uc124\uce58\ud55c \ud6c4, \uc571\uc758 \ub8e8\ud2b8\uc5d0 ",(0,n.kt)("inlineCode",{parentName:"p"},"ChakraProvider"),"\ub97c \uc124\uc815\ud574\uc57c \ud569\ub2c8\ub2e4. \uc774 \uc704\uce58\ub294 \uc0ac\uc6a9\ud558\ub294 \ud504\ub808\uc784\uc6cc\ud06c\uc5d0 \ub530\ub77c ",(0,n.kt)("inlineCode",{parentName:"p"},"index.jsx")," \ub610\ub294 ",(0,n.kt)("inlineCode",{parentName:"p"},"index.tsx")," \ub610\ub294 ",(0,n.kt)("inlineCode",{parentName:"p"},"App.jsx"),"\uac00 \ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."),(0,n.kt)("div",{className:"shiki-twoslash-fragment"},(0,n.kt)("pre",{parentName:"div",className:"shiki min-light",style:{backgroundColor:"#ffffff",color:"#24292eff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"jsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"*"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"as"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," React "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'react'"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},";")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// 1. ChakraProvider \ucef4\ud3ec\ub10c\ud2b8\ub97c \uac00\uc838\uc635\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," { ChakraProvider } "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#22863A"}},"'@chakra-ui/react'"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},";")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"function"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#6F42C1"}},"App"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"() {")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#C2C3C5"}},"// 2. \uc571\uc758 \ub8e8\ud2b8\uc5d0\uc11c ChakraProvider\ub97c \ub798\ud551\ud569\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#D32F2F"}},"return"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," (")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"    <"),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"ChakraProvider"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},">")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"      <"),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"TheRestOfYourApplication"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}}," />")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"    </"),(0,n.kt)("span",{parentName:"div",style:{color:"#1976D2"}},"ChakraProvider"),(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},">")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"  );")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#24292EFF"}},"}"))))),(0,n.kt)("pre",{parentName:"div",className:"shiki nord",style:{backgroundColor:"#2e3440ff",color:"#d8dee9ff"}},(0,n.kt)("div",{parentName:"pre",className:"language-id"},"jsx"),(0,n.kt)("div",{parentName:"pre",className:"code-container"},(0,n.kt)("code",{parentName:"div"},(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"*"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"as"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"React"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"react"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// 1. ChakraProvider \ucef4\ud3ec\ub10c\ud2b8\ub97c \uac00\uc838\uc635\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"import"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9"}},"ChakraProvider"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"from"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#A3BE8C"}},"@chakra-ui/react"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"'"),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")),(0,n.kt)("div",{parentName:"code",className:"line"}),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"function"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#88C0D0"}},"App"),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"()"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"{")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#616E88"}},"// 2. \uc571\uc758 \ub8e8\ud2b8\uc5d0\uc11c ChakraProvider\ub97c \ub798\ud551\ud569\ub2c8\ub2e4.")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"return"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," (")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"<"),(0,n.kt)("span",{parentName:"div",style:{color:"#8FBCBB"}},"ChakraProvider"),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},">")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"      "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"<"),(0,n.kt)("span",{parentName:"div",style:{color:"#8FBCBB"}},"TheRestOfYourApplication"),(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}}," "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"/>")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"    "),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},"</"),(0,n.kt)("span",{parentName:"div",style:{color:"#8FBCBB"}},"ChakraProvider"),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},">")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#D8DEE9FF"}},"  )"),(0,n.kt)("span",{parentName:"div",style:{color:"#81A1C1"}},";")),(0,n.kt)("div",{parentName:"code",className:"line"},(0,n.kt)("span",{parentName:"div",style:{color:"#ECEFF4"}},"}")))))),(0,n.kt)("h2",{id:"\ud504\ub808\uc784\uc6cc\ud06c-\uc548\ub0b4\uc11c"},"\ud504\ub808\uc784\uc6cc\ud06c \uc548\ub0b4\uc11c"),(0,n.kt)("p",null,"\ucc28\ud06c\ub77c UI\ub97c \uc6d0\ud558\ub294 \ud504\ub808\uc784\uc6cc\ud06c\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub2e4\uc74c \ud504\ub808\uc784\uc6cc\ud06c\uc5d0 \ub300\ud55c \ub2e8\uacc4\ubcc4 \uc548\ub0b4\uc11c\ub97c \uc900\ube44\ud588\uc2b5\ub2c8\ub2e4."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/docs-repository/docs/miscellaneous/chakra-ui/nextjs"},"Next.js"))),(0,n.kt)("p",null,"\ub2e4\ub978 \ud504\ub808\uc784\uc6cc\ud06c\ub294 ",(0,n.kt)("a",{parentName:"p",href:"https://chakra-ui.com/getting-started#framework-guide"},"\uc6d0\ubb38"),"\uc744 \ud655\uc778\ud558\uc138\uc694."))}u.isMDXComponent=!0}}]);