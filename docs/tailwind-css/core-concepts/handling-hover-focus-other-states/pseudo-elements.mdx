---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 의사 클래스

## 호버, 초점, 활성화

`hover`, `focus`, `active` 수정자를 사용하여 호버, 초점, 활성화 요소에 스타일을 지정합니다.

```html
<button class="bg-violet-500 **hover:bg-violet-600** **active:bg-violet-700** **focus:outline-none focus:ring focus:ring-violet-300** ...">
  Save changes
</button>
```

테일윈드에는 `:visited`, `:focus-within`, `:focus-visible` 등과 같은 다른 대화형 상태에 대한 수정자도 포함되어 있습니다.

사용 가능한 의사 클래스 수정자의 전체 목록은 [의사 클래스 참고](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference)를 확인하세요.

## 처음, 마지막, 홀수, 짝수

첫 번째 자식 또는 마지막 자식인 요소는 `first` 및 `last` 수정자를 사용하여 스타일을 지정합니다.

```html
<ul role="list" class="p-6 divide-y divide-slate-200">
  {#each people as person}
    <!-- 첫 번째/마지막 자식인 경우 위/아래 패딩을 제거합니다. -->
    <li class="flex py-4 **first:pt-0** **last:pb-0**">
      <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">{person.name}</p>
        <p class="text-sm text-slate-500 truncate">{person.email}</p>
      </div>
    </li>
  {/each}
</ul>
```

`odd` 및 `even` 수정자를 사용하여 홀수 또는 짝수 번째인 자식 요소의 스타일을 지정할 수 있습니다.

```html
<table>
  <!-- ... -->
  <tbody>
    {#each people as person}
      <!-- 홀수 행에는 흰색 배경을 사용하고 짝수 행에는 `slate-50`을 사용합니다. -->
      <tr class="**odd:bg-white** **even:bg-slate-50**">
        <td>{person.name}</td>
        <td>{person.title}</td>
        <td>{person.email}</td>
      </tr>
    {/each}
  </tbody>
</table>
```

테일윈드에는 `:only-child`, `:first-of-type`, `:empty` 등과 같은 다른 구조적 의사 클래스에 대한 수정자도 포함되어 있습니다.

사용 가능한 의사 클래스 수정자의 전체 목록은 [의사 클래스 참고](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference)를 확인하세요.

## 양식 상태

`required`, `invalid`, `disabled`과 같은 수정자를 사용하여 다양한 상태의 양식 요소에 스타일을 지정합니다.

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Username</span>
    <!-- 양식 상태 수정자를 사용하면 클래스가 모든 입력에 대해 동일할 수 있습니다. -->
    <input type="text" value="tbone" disabled class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      **disabled:bg-slate-50** **disabled:text-slate-500** **disabled:border-slate-200** **disabled:shadow-none**
      **invalid:border-pink-500** **invalid:text-pink-600**
      **focus:invalid:border-pink-500** **focus:invalid:ring-pink-500**
    "/>
  </label>
  <!-- ... -->
</form>
```

이러한 종류의 수정자를 사용하면 템플릿에서 조건부 로직의 양을 줄일 수 있습니다. 따라서 입력의 상태에 관계없이 동일한 클래스 집합을 사용할 수 있고 브라우저에서 올바른 스타일을 적용할 수 있습니다.

테일윈드에는 `:read-only`, `:indeterminate`, `:checked` 등과 같은 다른 양식 상태에 대한 수정자도 포함되어 있습니다.

사용 가능한 의사 클래스 수정자의 전체 목록은 [의사 클래스 참고](#disabled)를 확인하세요.

## 부모 상태에 기반한 스타일 지정 <small>(group-{modifier})</small>

일부 **부모** 요소의 상태에 따라 요소의 스타일을 지정해야 하는 경우, 부모 요소에 `group` 클래스를 표시하고 `group-*` 수정자(예: `group-hover`)를 사용하여 대상 요소에 스타일을 지정합니다.

```html
<a href="#" class="**group** block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 **group-hover:stroke-white**" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 **group-hover:text-white** text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 **group-hover:text-white** text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

이 패턴은 `group-focus`, `group-active`, 심지어 `group-odd`와 같은 모든 의사 클래스 수정자에서도 작동합니다.

### 중첩된 그룹 구별하기

그룹을 중첩할 때 `group/{name}` 클래스를 사용하여 해당 부모 그룹에 고유한 그룹 이름을 지정하고 `group-hover/{name}`과 같은 클래스를 사용하여 수정자에 해당 이름을 포함하면, **특정** 부모 그룹의 상태에 따라 스타일을 지정할 수 있습니다.

```html
<ul role="list">
  {#each people as person}
    <li class="**group/item** hover:bg-slate-100 ...">
      <img src="{person.imageUrl}" alt="" />
      <div>
        <a href="{person.url}">{person.name}</a>
        <p>{person.title}</p>
      </div>
      <a class="**group/edit** invisible hover:bg-slate-200 **group-hover/item:visible** ..." href="tel:{person.phone}">
        <span class="**group-hover/edit:text-gray-700** ...">Call</span>
        <svg class="**group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500** ...">
          <!-- ... -->
        </svg>
      </a>
    </li>
  {/each}
</ul>
```

그룹 이름은 원하는 대로 지정할 수 있으며 별도의 설정이 필요 없습니다. 마크업에서 직접 그룹 이름을 지정하기만 하면 테일윈드가 필요한 CSS를 자동으로 생성합니다.

### 임의 그룹

대괄호 사이의 [임의의 값](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)에 자체 선택기를 제공하여 일회성 `group-*` 수정자를 즉석에서 생성할 수 있습니다.

<Tabs>
  <TabItem value="html" label="HTML" default>

```html
<div class="group is-published">
  <div class="hidden **group-[.is-published]:block**">
    Published
  </div>
</div>
```

  </TabItem>
  <TabItem value="generated-css" label="Generated CSS">

```css
.group.is-published .group-\[\.is-published\]\:block {
  display: block;
}
```

  </TabItem>
</Tabs>

보다 자세한 제어를 위해 `&` 문자를 사용하여 전달하려는 선택기를 기준으로 최종 선택기에서 `.group`이 끝나야 하는 위치를 표시할 수 있습니다.

<Tabs>
  <TabItem value="html" label="HTML" default>

```html
<div class="group">
  <div class="group-[:nth-of-type(3)_&]:block">
    <!-- ... -->
  </div>
</div>
```

  </TabItem>
  <TabItem value="generated-css" label="Generated CSS">

```css
:nth-of-type(3) .group .group-\[\:nth-of-type\(3\)_\&\]\:block {
  display: block;
}
```

  </TabItem>
</Tabs>

## 형제 상태에 따른 스타일 지정 <small>(peer-{modifier})</small>

**형제** 요소의 상태에 따라 요소의 스타일을 지정해야 하는 경우, 형제 요소에 `peer` 클래스를 표시하고 `peer-*` 수정자(예: `peer-invalid`)를 사용하여 대상 요소에 스타일을 지정합니다.

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Email</span>
    <input type="email" class="**peer** ..."/>
    <p class="mt-2 invisible **peer-invalid:visible** text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>
</form>
```

이를 통해 JS 없이도 [떠 있는 레이블](https://www.youtube.com/watch?v=nJzKi6oIvBA)과 같은 모든 종류의 깔끔한 수법을 수행할 수 있습니다.

이 패턴은 `peer-focus`, `peer-required`, `peer-disabled`과 같은 모든 의사 클래스 수정자에서 작동합니다.

`peer` 마커는 CSS에서 [일반적인 형제 결합기](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator)가 작동하는 방식 때문에 **이전** 형제에만 사용할 수 있다는 점에 유의해야 합니다.

❌ 작동하지 않음, 이전 형제만 동료로 표시할 수 있음

```html
<label>
  <span class="**peer-invalid:text-red-500** ...">Email</span>
  <input type="email" class="**peer** ..."/>
</label>
```

### 동료 구별하기

여러 피어를 사용하는 경우, `peer/{name}` 클래스를 사용하여 해당 동료에 고유한 이름을 지정하고 `peer-checked/{name}`과 같이 수정자에 해당 이름을 포함시켜 **특정** 동료의 상태에 어떤 스타일을 지정할 수 있습니다.

```html
<fieldset>
  <legend>Published status</legend>

  <input id="draft" class="**peer/draft**" type="radio" name="status" checked />
  <label for="draft" class="**peer-checked/draft:text-sky-500**">Draft</label>

  <input id="published" class="**peer/published**" type="radio" name="status" />
  <label for="published" class="**peer-checked/published:text-sky-500**">Published</label>

  <div class="hidden **peer-checked/draft:block**">Drafts are only visible to administrators.</div>
  <div class="hidden **peer-checked/published:block**">Your post will be publicly visible on your site.</div>
</fieldset>
```

동료 이름은 원하는 대로 지정할 수 있으며 별도의 설정이 필요 없습니다. 마크업에서 직접 동료 이름을 지정하기만 하면 테일윈드가 필요한 CSS를 자동으로 생성합니다.

### 임의 동료

대괄호 사이의 [임의의 값](/docs/adding-custom-styles#using-arbitrary-values)에 자체 선택기를 제공하여 일회성 `peer-*` 수정자를 즉석에서 생성할 수 있습니다.

<Tabs>
  <TabItem value="html" label="HTML" default>

```html
<form>
  <label for="email">Email:</label>
  <input id="email" name="email" type="email" class="is-dirty peer" required />
  <div class="**peer-[.is-dirty]**:peer-required:block hidden">This field is required.</div>
  <!-- ... -->
</form>
```

  </TabItem>
  <TabItem value="generated-css" label="Generated CSS">

```css
.peer.is-dirty:required ~ .peer-\[\.is-dirty\]\:peer-required\:block {
  display: block;
}
```

  </TabItem>
</Tabs>

보다 자세한 제어를 위해 `&` 문자를 사용하여 전달하려는 선택기를 기준으로 최종 선택기에서 `.peer`가 끝나야 하는 위치를 표시할 수 있습니다.

<Tabs>
  <TabItem value="html" label="HTML" default>

```html
<div>
  <input type="text" class="peer" />
  <div class="hidden **peer-[:nth-of-type(3)_&]:block**">
    <!-- ... -->
  </div>
</div>
```

  </TabItem>
  <TabItem value="generated-css" label="Generated CSS">

```css
:nth-of-type(3) .peer ~ .peer-\[\:nth-of-type\(3\)_\&\]\:block {
  display: block;
}
```

  </TabItem>
</Tabs>
