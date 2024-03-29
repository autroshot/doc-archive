---
sidebar_position: 1
---

# 커스텀 페이지 확장자

`.mdx`로 끝나는 페이지에 대한 지원을 추가하는 [@next/mdx](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)와 같은 모듈을 목표로 합니다. 페이지를 이행할 때 `pages` 디렉터리에서 찾는 확장을 설정할 수 있습니다.

`next.config.js`을 열고 `pageExtensions` 설정을 추가합니다.

```js
module.exports = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
};
```

:::note 참고

`pageExtensions`의 기본값은 [['tsx', 'ts', 'jsx', 'js'\]](https://github.com/vercel/next.js/blob/f1dbc9260d48c7995f6c52f8fbcc65f08e627992/packages/next/server/config-shared.ts#L161)입니다.

:::

:::note 참고

`pageExtensions` 설정은 `pages/api/` 밑에 있는 `_document.js`, `_app.js`, `middleware.js` 파일들에도 영향을 미칩니다.

예를 들어 `pageExtensions: ['page.tsx', 'page.ts']`로 설정하면 `_document.tsx`, `_app.tsx`, `middleware.ts`, `pages/users.tsx` 파일의 이름을 `_document.page.tsx`, `_app.page.tsx`, `middleware.page.ts`, `pages/users.page.tsx`, `pages/api/users.page.ts`로 바꿔야 합니다.

:::

## `pages` 디렉터리에 페이지가 아닌 파일 포함하기

`pages` 디렉터리의 컴포넌트에서 사용하는 테스트 파일, 생성된 파일, 기타 파일을 함께 배치하려면 확장명에 `page`와 같은 접두사를 붙일 수 있습니다.

`next.config.js`을 열고 `pageExtensions` 설정을 추가합니다.

```js
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};
```

그런 다음 `.page`를 포함하는 파일 확장자를 갖도록 페이지 이름을 바꿉니다. (예: `MyPage.tsx`을 `MyPage.page.tsx`로 바꿈)

:::note 참고

`_document.js`, `_app.js`, `middleware.js`를 비롯해 `pages/api/`에 있는 파일의 이름도 변경해야 합니다.

:::

이 설정이 없으면 넥스트는 `pages` 디렉터리의 모든 `tsx`, `ts`, `jsx`, `js` 파일을 페이지나 API 경로로 간주합니다. 그래서 서비스 거부 공격(DoS)에 취약한 의도하지 않은 경로를 노출하거나 프로덕션 빌드 시 다음과 같은 오류가 발생할 수 있습니다.

```
Build error occurred
Error: Build optimization failed: found pages without a React Component as default export in
pages/MyPage.generated
pages/MyPage.test

See https://nextjs.org/docs/messages/page-without-valid-component for more info.
```
