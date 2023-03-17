---
sidebar_position: 3
---

# 단언

**_단언은 요소, 객체, 앱의 원하는 상태를 설명합니다._**

단언을 경비원이라고 생각할 수 있습니다. 경비원에게 앱이 어떻게 생겼는지 설명하면 사이프러스가 해당 상태에 도달할 때까지 자동으로 차단, 대기, 재시도를 수행합니다.

## 영어로 단언하기

단언을 영어로 설명하는 방법을 살펴보겠습니다.

> _After clicking on this_ `<button>`_, I expect its class to eventually be_ `active`_._

사이프러스에서 이를 표현하면 다음과 같습니다.

```js
cy.get('button').click().should('have.class', 'active');
```

위의 테스트는 `.active` 클래스가 버튼에 비동기적으로, 혹은 불확실한 시간이 지난 후에 적용되어도 성공할 것입니다.

```javascript
$('button').on('click', (e) => {
  setTimeout(() => {
    $(e.target).addClass('active');
  }, 2000);
});
```

다음은 다른 예시입니다.

> _After making an HTTP request to my server, I expect the response body to equal_ `{name: 'Jane'}`

이를 단언으로 표현하면 다음과 같습니다.

```js
cy.request('/users/1').its('body').should('deep.eq', { name: 'Jane' });
```

## 사용 시기

사이프러스가 제공하는 수많은 단언에도 불구하고 때로는 테스트에 단언이 없어도 됩니다.

예시:

```js
cy.visit('/home');

cy.get('.main-menu').contains('New Project').click();

cy.get('.title').type('My Awesome Project');

cy.get('form').submit();
```

명시적 단언이 하나도 없음에도 이 테스트에는 실패할 수 있는 방법은 수십 가지가 됩니다.

:::info 핵심 개념

사이프러스를 사용하면 유용한 테스트를 위해 단언을 사용하지 않아도 됩니다. 단언이 없더라도 몇 줄의 사이프러스로 수천 줄의 코드가 클라이언트와 서버에서 제대로 작동하는지 확인할 수 있습니다.

이는 많은 명령에 높은 수준의 보증을 제공하는 기본 단언이 내장되어 있기 때문입니다.

:::

## 기본 단언

많은 명령에는 기본적으로 단언이나 요구 사항이 내장되어 있습니다.

- [`cy.visit()`](https://docs.cypress.io/api/commands/visit) - 페이지가 상태 코드 `200`과 text/html 콘텐츠를 보낼 것을 예상
- [`cy.request()`](https://docs.cypress.io/api/commands/request) - 원격 서버가 존재하고 응답을 제공할 것으로 예상
- [`cy.contains()`](https://docs.cypress.io/api/commands/contains) - 콘텐츠가 있는 요소가 결국 DOM에 존재할 것으로 예상
- [`cy.get()`](https://docs.cypress.io/api/commands/get) - 요소가 결국 DOM에 존재할 것으로 예상
- [`.find()`](https://docs.cypress.io/api/commands/find) - 요소가 결국 DOM에 존재할 것으로 예상
- [`.type()`](https://docs.cypress.io/api/commands/type) - 요소가 결국 타이핑이 가능한 상태가 될 것으로 예상
- [`.click()`](https://docs.cypress.io/api/commands/click) - 요소가 결국 액션이 가능한 상태가 될 것으로 예상
- [`.its()`](https://docs.cypress.io/api/commands/its) - 결국 현재 주어에 대한 프로퍼티를 찾을 것으로 예상

`cy.request()` 같은 특정 명령에는 재시도 없이 즉시 실패하도록 하는 요구 사항이 있습니다.

DOM 기반 명령은 실패하기 전에 자동으로 재시도하고 해당 요소가 존재하기를 기다립니다.

액션 명령은 실패하기 전에 해당 요소가 액션이 가능한 상태에 도달할 때까지 자동으로 기다립니다.

:::info 핵심 개념

모든 DOM 기반 명령은 해당 요소가 DOM에 존재하기를 자동으로 기다립니다.

DOM 기반 명령 다음에는 `.should('exist')`를 작성할 필요가 없습니다.

:::

대부분의 명령에서는 기본 단언을 우회하기 위한 `{force: true}` 옵션을 제공합니다.

### 예시 #1: 존재와 액션 가능성

```js
cy
  // 계속하기 전에 이 버튼이 DOM에 존재해야 한다는
  // 기본 단언이 포함되어 있습니다.
  .get('button')

  // 클릭을 실행하기 전에 이 단추는 액션이 가능해야 합니다.
  // 'disabled', 'covered', 'hidden'이 아니어야 합니다.
  .click();
```

사이프러스는 자동으로 요소가 기본 단언을 통과할 때까지 기다립니다. 명시적 단언과 마찬가지로 이러한 모든 단언은 동일한 시간 제한 값을 공유합니다.

### 예시 #2: 기본 단언 반전시키기

요소가 존재하지 않을 때까지 기다리고 싶을 때가 종종 있습니다.

다음과 같은 단언을 추가하면 요소가 존재하기를 기다리는 규칙이 반전됩니다.

```js
// 이제 사이프러스는 버튼이 클릭 후에
// DOM에 존재하지 않을 때까지 기다립니다.
cy.get('button.close').click().should('not.exist');

// 그리고 #modal이 DOM에 존재하지 않을 때까지 기다립니다.
cy.get('#modal').should('not.exist');
```

:::info 핵심 개념

DOM 명령에 `.should('not.exist')`를 추가하면 사이프러스는 기본 단언을 뒤집고 요소가 존재하지 않을 때까지 자동으로 기다립니다.

:::

### 예시 #3: 기타 기본 단언

기타 명령에는 DOM과 관련되지 않은 기본 단언이 있습니다.

예를 들어 [`.its()`](https://docs.cypress.io/api/commands/its)는 해당 프로퍼티가 객체에 존재할 때까지 기다립니다.

```js
// 빈 객체를 생성합니다.
const obj = {};

// 1초 후에 foo 프로퍼티를 설정합니다.
setTimeout(() => {
  obj.foo = 'bar';
}, 1000);

// '.its()'는 객체에 foo 프로퍼티가 존재할 때까지 기다립니다.
cy.wrap(obj).its('foo');
```

## 단언 목록

사이프러스는 내장 단언을 위해 [차이](https://docs.cypress.io/guides/references/bundled-libraries#Chai), [차이 제이쿼리](https://docs.cypress.io/guides/references/bundled-libraries#Chai-jQuery), [시논 차이](https://docs.cypress.io/guides/references/bundled-libraries#Sinon-Chai)을 제공합니다. [단언 참조 목록](https://docs.cypress.io/guides/references/assertions)에서 전체 목록을 확인하세요. 차이 플러그인 같은 [자신만의 단언](https://docs.cypress.io/examples/examples/recipes#Fundamentals)도 사이프러스에서 사용 가능합니다.

## 단언 작성하기

사이프러스에서 단언을 작성하는 방법은 두 가지입니다.

1. 암시적 주어 - `.should()`나 `.and()`를 사용
2. 명시적 주어 - `expect`를 사용

## 암시적 주어

사이프러스에서 단언을 만드는 기본적인 방법은 `.should()`나 `.and()` 명령을 사용하는 것입니다. 이는 일반적인 사이프러스 명령으로, 명령 사슬에서 현재 생성된 주어에 적용됩니다.

```js
// 이곳의 암시적 주어는 첫 번째 <tr>입니다.
// 이 단언은 <tr>이 '.active' 클래스를 가져야 한다고 말합니다.
cy.get('tbody tr:first').should('have.class', 'active');
```

복수의 단언을 `.and()`와 함께 사용해 연쇄할 수 있습니다. `.and()`는 `.should()`와 동일한 기능을 하며 가독성을 높이는 역할을 합니다.

```js
cy.get('#header a')
  .should('have.class', 'active')
  .and('have.attr', 'href', '/users');
```

`.should('have.class')`가 주어를 바꾸지 않으므로 `.and('have.attr')`는 동일한 요소에 대해 실행됩니다. 이것은 하나의 주어에 대해 여러 가지를 빠르게 단언할 때 편리합니다.

이 단언을 명시적 형식으로 작성하면 다음과 같습니다.

```js
cy.get('tbody tr:first').should(($tr) => {
  expect($tr).to.have.class('active');
  expect($tr).to.have.attr('href', '/users');
});
```

이 경우에는 암시적 형식이 훨씬 짧은 것을 알 수 있습니다.

## 명시적 주어

`expect`를 사용하면 특정 주어를 전달하고 이에 대한 단언을 할 수 있습니다.

단위 테스트에서 많이 보는 단언입니다.

```js
// 이곳의 명시적 주어는 'boolean: true'입니다.
expect(true).to.be.true;
```

명시적 주어는 다음의 경우에 유용합니다.

- 단언을 만들기 이전에 사용자 정의 논리를 수행
- 동일한 주어에 대해 복수의 단언을 작성

`.should()` 명령을 사용하면 생성된 주어를 첫 번째 인수로 사용하는 콜백 함수를 건네줄 수 있습니다. 이는 사이프러스가 콜백 함수 내부의 모든 것이 통과할 때까지 자동으로 기다리며 재시도한다는 점만 제외하면 `.then()`과 유사하게 작동합니다.

### 복잡한 단언

다음 예시는 여러 요소에 대해 단언을 작성하는 유스 케이스입니다. `.should()` 콜백 함수를 사용하면 부모의 여러 자식 요소에 대해 쿼리하고 무언가를 단언할 수 있습니다.

이렇게 하면 일반적인 사이프러스 DOM 명령을 사용하여 개별적으로 쿼리할 필요 없이, 하위 항목의 상태가 예상과 일치하도록 사이프러스를 차단하고 보호할 수 있습니다.

```js
cy.get('p').should(($p) => {
  // 주어를 조작해 DOM 요소에서 모든 p의 텍스트 배열로 변환합니다.
  let texts = $p.map((i, el) => {
    return Cypress.$(el).text();
  });

  // 제이쿼리 맵은 제이쿼리 객체를 반환하며
  // '.get()'은 이 객체를 배열로 변환합니다.
  texts = texts.get();

  // 배열의 길이는 3이고
  expect(texts).to.have.length(3);

  // 특정 콘텐츠를 가져야 합니다.
  expect(texts).to.deep.eq([
    'Some text from first p',
    'More text from second p',
    'And even more text from third p',
  ]);
});
```

:::danger

`.should()`와 콜백 함수를 사용할 때는 전체 함수가 부작용 없이 여러 번 실행될 수 있는지 확인해야 합니다. 사이프러스는 재시도 논리를 해당 함수에 적용합니다. 만약 실패하면 시간 제한이 끝날 때까지 단언을 재실행합니다. 이는 코드가 재시도에 안전해야 한다는 것을 의미합니다.

이에 대한 기술적 용어는 코드의 **멱등성**입니다.

:::
