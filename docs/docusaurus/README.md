---
sidebar_position: 1
---

# 치트 시트

## 문서 범주 추가하기

새로운 문서 범주를 추가할 때 갱신해야 하는 설정은 다음과 같습니다.

- `docusaurus.config.js`의 `navbar`와 `footer` 프로퍼티
- `sidebars.js`

## 메타데이터

문서 메타데이터는 문서의 처음에 작성합니다.

```mdx
---
sidebar_position: 2
sidebar_label: Easy
---

# Easy Tutorial

This is the easy tutorial!
```

디렉터리 메타데이터는 디렉터리의 `_category_.yml` 파일에 작성합니다.

```yaml
position: 2.5 # 부동 위치 지원
label: 'Tutorial'
```

## 코드 블록

### 제목

````mdx
```jsx title="/src/components/HelloCodeTitle.js"
function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
````

### 줄 강조하기

줄 번호는 0부터 시작합니다.

````mdx
```jsx {1,4-6,11}
import React from 'react';

function MyComponent(props) {
  if (props.isBar) {
    return <div>Bar</div>;
  }

  return <div>Foo</div>;
}

export default MyComponent;
```
````

[Shiki Twoslash](https://www.npmjs.com/package/docusaurus-preset-shiki-twoslash)에서는 줄 번호가 1부터 시작합니다.

## 준수 사항

```mdx
:::note 참고

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::tip

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::caution

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::
```

## 이미지

[plugin-ideal-image](https://docusaurus.io/ko/docs/api/plugins/@docusaurus/plugin-ideal-image)를 사용한다고 가정합니다.

```mdx
import Image from '@theme/IdealImage';

<Image img={require('/img/docs/next-js/how-next-js-works/compiling.png)'} alt='컴파일' />
```

코먼JS 대신 ESM을 사용할 수도 있습니다.

```mdx
import Image from '@theme/IdealImage';
import compiling from '/img/docs/next-js/how-next-js-works/compiling.png';

<Image img={compiling} alt='컴파일' />
```

## 마크다운 링크

```mdx
[file path to another document](./installation.md)
```

## 탭

이 기능은 MDX 파일에서만 지원됩니다.

````mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="package-manager">
  <TabItem value="npm" label="npm" default>

```bash
npx create-next-app@latest
```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

```bash
yarn create next-app
```

  </TabItem>
</Tabs>
````

`groupId` 속성으로 여러 탭을 동기화할 수 있습니다.