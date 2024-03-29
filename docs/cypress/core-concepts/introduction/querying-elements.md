---
sidebar_position: 1
---

# 요소 질의

## 사이프러스와 제이쿼리의 공통점

이전에 제이쿼리(jQuery)를 사용한 적이 있다면 다음과 같은 요소 질의가 익숙할 것입니다.

```js
$('.my-selector');
```

사이프러스에서의 요소 질의는 동일합니다.

```js
cy.get('.my-selector');
```

사이프러스는 제이쿼리를 기본으로 제공하고 많은 DOM 탐색 방법을 지원하므로 이미 익숙한 API를 사용하여 복잡한 HTML 구조에서 쉽게 작업할 수 있습니다.

```js
cy.get('#main-content')
  .find('.article')
  .children('img[src^="/static"]')
  .first();
```

:::info 핵심 개념

사이프러스는 제이쿼리의 강력한 선택기 엔진을 활용하여 최신 웹 개발자에게 친숙하고 읽기 쉬운 테스트를 제공합니다.

요소 선택에 대한 모범 사례는 [문서](../../references/best-practices.md#요소-선택하기)에서 확인하세요.

:::

## 사이프러스와 제이쿼리의 차이점

제이쿼리에서는 일치하는 DOM 요소를 찾지 못하면 빈 제이쿼리 컬렉션을 반환합니다.

반면 사이프러스에서는 다음 중 하나에 도달할 때까지 질의를 자동으로 재시도합니다.

### 1. 요소가 발견됨

```js
cy
  // cy.get()는 #element을 찾는 질의를 반복합니다...
  .get('#element')

  // ...일치하는 요소를 찾을 때까지!
  // 이제 '.then'을 이용해서 요소를 다룰 수 있습니다.
  .then(($myElement) => {
    doSomething($myElement);
  });
```

### 2. 설정된 시간 제한에 도달함

```js
cy
  // cy.get()는 #element-does-not-exist을 찾는 질의를 반복합니다...
  // ...시간 제한 전에 요소를 찾지 못합니다.
  // 사이프러스는 중지되고 테스트에 실패합니다.
  .get('#element-does-not-exist')

  // ...이 코드는 실행되지 않습니다...
  .then(($myElement) => {
    doSomething($myElement);
  });
```

이런 방식은 사이프러스를 견고하게 만들고, 다른 테스트 도구에서 발생하는 다음과 같은 일반적인 문제에 내성을 갖게 합니다.

- DOM이 아직 로드되지 않음
- 프레임워크의 부트스트랩이 아직 완료되지 않음
- XHR 요청에 대한 응답이 아직 오지 않음
- 애니메이션이 아직 완료되지 않음

사이프러스는 내장 재시도 및 [사용자 정의가 가능한 시간 제한](https://docs.cypress.io/guides/references/configuration#Timeouts) 기능을 통해 이런 문제들을 피할 수 있습니다.

:::info 핵심 개념

사이프러스는 실제 웹 앱의 작동 방식에 잘 맞는 강력한 재시도 및 시간 제한 논리로 모든 DOM 질의를 래핑합니다. 모든 테스트에 대한 안정성을 높이는 대신 DOM 요소를 찾는 방법이 약간 다릅니다.

:::

:::note 참고

사이프러스에서 DOM 요소와 직접 상호 작용하려면, 요소를 첫 번째 인수로 받는 콜백 함수로 `.then()`을 호출합니다. 재시도 및 시간 제한 기능을 완전히 건너뛰고 기존의 동기 작업을 수행하려면 [`Cypress.$`](https://docs.cypress.io/api/utilities/$)을 사용합니다.

:::

## 텍스트 콘텐츠로 질의하기

사용자와 유사하게 요소를 찾는 방법은 콘텐츠, 즉 사용자가 페이지에서 볼 수 있는 것으로 찾는 것입니다. 이를 위한 [`cy.contains()`](https://docs.cypress.io/api/commands/contains) 명령이 있습니다.

예시:

```js
// 'New Post' 텍스트가 포함된 요소를 문서에서 찾습니다.
cy.contains('New Post');

// 'New Post' 텍스트가 포함된 요소를 '.main' 내부에서 찾습니다.
cy.get('.main').contains('New Post');
```

이는 앱과 상호 작용하는 사용자의 관점에서 테스트를 작성할 때 유용합니다.

사용자는 그저 '제출'이라고 표시된 버튼을 클릭하고 싶을 것입니다. 사용자는 `submit`이라는 `type` 속성이나 `my-submit-button`라는 CSS 클래스를 전혀 모릅니다.

:::caution

앱이 i18n을 위해 여러 언어로 번역된 경우, 사용자가 보는 텍스트를 사용하여 DOM 요소를 찾는 것의 부작용을 주의해야 한다.

:::

## 요소가 없는 경우

사이프러스는 웹 앱의 비동기적 특성을 예상하고 요소를 발견하지 못했을 때 즉시 실패하지 않습니다. 사이프러스는 앱이 수행하던 모든 작업을 완료할 수 있는 시간을 줍니다.

이를 `timeout`이라고 하며 대부분의 명령은 시간 제한([기본값은 4초](https://docs.cypress.io/guides/references/configuration#Timeouts)) 시간을 별도로 지정할 수 있습니다.

```js
// 해당 요소가 나타날 때까지 10초의 시간을 줍니다.
cy.get('.my-slow-selector', { timeout: 10000 });
```

[환경 설정: `defaultCommandTimeout`](https://docs.cypress.io/guides/references/configuration#Timeouts)을 통해 시간 제한 시간을 전역으로 설정할 수 있습니다.

:::info 핵심 개념

웹 앱의 작동 방식과 동일하게 사이프러스는 비동기적이며 앱이 예상한 상태로 전환될 때까지 기다리기 위해 시간 제한을 사용합니다.

시간 제한 시간은 전역으로 설정하거나 명령별로 설정할 수 있습니다.

:::
