---
sidebar_position: 2
---

# 명령 사슬

사이프러스의 명령 사슬 메커니즘을 이해할 필요가 있습니다. 사이프러스는 사용자를 대신하여 프라미스 사슬을 관리합니다. 사슬이 종료되거나 오류가 발생할 때까지 각 명령이 다음 명령에 대한 **주어(subject)를 생성(yield)합니다**.

## 요소와 상호 작용하기

사이프러스에서 `cy.get()` 또는 `cy.contains()` 명령과 `.click()` 또는 `.type()` 명령을 사용해 페이지의 요소를 클릭하거나 입력할 수 있습니다. 이는 연쇄의 좋은 예입니다.

예시:

```js
cy.get('textarea.post-body').type('This is an excellent post.');
```

`cy.get()`에 `.type()`을 연쇄해서 `cy.get()` 명령에서 생성된 주어(DOM 요소)에 타이핑할 것을 지시하고 있다.

다음은 사이프러스에서 제공하는 앱과의 상호 작용을 위한 작동 명령입니다.

- [`.blur()`](https://docs.cypress.io/api/commands/blur) - 초점을 얻은 DOM 요소가 초점을 잃게 만듬
- [`.focus()`](https://docs.cypress.io/api/commands/focus) - DOM 요소가 초점을 얻음
- [`.clear()`](https://docs.cypress.io/api/commands/clear) - input이나 textarea의 값을 지움
- [`.check()`](https://docs.cypress.io/api/commands/check) - 확인란이나 라디오를 선택
- [`.uncheck()`](https://docs.cypress.io/api/commands/uncheck) - 확인란의 선택을 취소
- [`.select()`](https://docs.cypress.io/api/commands/select) - `<select>`의 `<option>`을 선택
- [`.dblclick()`](https://docs.cypress.io/api/commands/dblclick) - DOM 요소를 더블 클릭
- [`.rightclick()`](https://docs.cypress.io/api/commands/rightclick) - DOM 요소를 오른쪽 클릭

이런 명령은 작동을 수행하기 전에 요소의 몇 가지 상태를 확인합니다.

예를 들어 `.click()` 명령에서 사이프러스는 (실제 사용자가 하는 것처럼) 요소가 상호 작용이 가능한지 확인합니다. 다음과 같이 요소가 작동 가능 상태에 도달할 때까지 자동으로 기다립니다.

- hidden이 아님
- covered가 아님 (상위 요소에게 덮여 있지 않음)
- disabled가 아님
- 애니메이션 중이 아님

또한 테스트에서 앱과 상호 작용할 때 불안정성을 방지하는 데 도움이 됩니다. 일반적으로 `force` 옵션을 사용하여 이 작동을 재정의할 수 있습니다.

:::info 핵심 개념

사이프러스는 [요소와 상호 작용할](https://docs.cypress.io/guides/core-concepts/interacting-with-elements) 때 간단하지만 강력한 알고리즘을 제공합니다.

:::

## 요소에 단언하기

단언(assertion)을 사용하면 요소의 표시 여부나 특정 속성, CSS 클래스, 상태에 있는지 확인할 수 있습니다. 단언은 **앱이 어떤 상태에 있길 원하는지를 설명하는 명령**입니다.

사이프러스는 요소가 해당 상태에 도달할 때까지 자동으로 기다리다가 단언을 통과하지 못하면 테스트에 실패합니다.

예시:

```js
cy.get(':checkbox').should('be.disabled');

cy.get('form').should('have.class', 'form-horizontal');

cy.get('input').should('not.have.value', 'US');
```

사이프러스는 각 단언을 통과할 때까지 자동으로 기다립니다. 요소가 원하는 상태에 도달하는 정확한 순간을 알 필요가 없습니다.

## 주어 관리하기

새로운 사이프러스 사슬은 항상 `cy.[command]`로 시작합니다. `command`에 따라 이후에 사슬로 올 수 있는 명령이 결정됩니다.

[`cy.clearCookies()`](https://docs.cypress.io/api/commands/clearcookies) 같은 메서드는 `null`을 생성하므로 연쇄가 불가능합니다.

[`cy.get()`](https://docs.cypress.io/api/commands/get)이나 [`cy.contains()`](https://docs.cypress.io/api/commands/contains) 같은 메서드는 DOM 요소를 생성하므로 [`.click()`](https://docs.cypress.io/api/commands/click)이나 [`cy.contains()`](https://docs.cypress.io/api/commands/contains)를 사슬로 연결할 수 있습니다.

일부 명령은 특정한 명령 뒤에서만 연쇄가 가능합니다.

- [`cy.clearCookies()`](https://docs.cypress.io/api/commands/clearcookies) - `cy`의 뒤만 가능하며 다른 주어 뒤에 올 수 없음

- [`.type()`](https://docs.cypress.io/api/commands/type) - DOM 요소와 같이 특정한 주어를 생성하는 명령의 뒤에 올 수 있음

- [`cy.contains()`](https://docs.cypress.io/api/commands/contains) - 주어를 생성하는 명령이나 `cy`의 뒤 모두 가능

일부 명령이 생성하는 것은 다음과 같습니다.

- [`cy.clearCookie()`](https://docs.cypress.io/api/commands/clearcookie) - `null`을 생성하며 이 명령 뒤에서는 연쇄가 불가능

- [`.click()`](https://docs.cypress.io/api/commands/click) - 이전 주어와 동일한 주어

- [`.wait()`](https://docs.cypress.io/api/commands/wait) - 해당 명령에 적합한 새로운 주어

예시:

```js
cy.clearCookies(); // null이 생성되어 연쇄가 불가능합니다.

cy.get('.main-container') // 일치하는 DOM 요소의 배열을 생성합니다.
  .contains('Headlines') // 해당 콘텐츠를 가진 첫 번째 DOM 요소를 생성합니다.
  .click(); // 이전 명령과 동일한 DOM 요소를 생성합니다.
```

:::info 핵심 개념

사이프러스 명령은 주어를 **반환하지(return) 않고 생성합니다(yield)**. 사이프러스 명령은 비동기적이며 나중에 실행할 수 있도록 대기열에 추가됩니다. 테스트에서 주어는 하나의 명령에서 다음 명령으로 넘어가며, 모든 것이 잘 작동하는지 확인하기 위해 각 명령 사이에서 수많은 사이프러스 코드가 실행됩니다.

:::

:::note 참고

요소를 참조하고 싶을 때는 [별칭](https://docs.cypress.io/guides/core-concepts/variables-and-aliases)이라는 기능을 이용할 수 있습니다. 별칭을 이용해 요소 참조를 저장했다가 나중에 사용할 수 있습니다.

:::

### `.then()`을 사용해 주어 다루기

주어를 직접 다루고 싶다면 명령 사슬에 [`.then()`](https://docs.cypress.io/api/commands/then)을 추가하면 됩니다. 이전 명령이 이행되면, 생성된 주어를 첫 번째 인수로 갖는 콜백 함수가 호출됩니다.

`.then()` 이후에도 명령 연쇄를 계속하고 싶다면, 해당 명령에서 생성하고 싶은 주어를 반환하면 됩니다. `null`이나 `undefined` 이외의 값을 반환해야 합니다.

예시:

```js
cy
  // id가 some-link인 요소를 찾습니다.
  .get('#some-link')

  .then(($myElement) => {
    // ...주어를 다루는 코드...

    // href 프로퍼티를 얻습니다.
    const href = $myElement.prop('href');

    // '#'와 그 이후의 글자를 모두 삭제합니다.
    return href.replace(/(#.*)/, '');
  })
  .then((href) => {
    // 이제 href가 새로운 주어이며 원하는 작업을 수행할 수 있습니다.
  });
```

### 별칭을 사용해 이전 주어 참조하기

사이프러스에는 과거의 주어를 빠르게 참조할 수 있는 [별칭](https://docs.cypress.io/guides/core-concepts/variables-and-aliases)이라는 기능이 있습니다.

예시:

```js
cy.get('.my-selector')
  .as('myElement') // 별칭을 설정합니다.
  .click();

/* 많은 작업 */

cy.get('@myElement') // 이전과 동일한 DOM을 질의합니다.
  .click();
```

요소가 아직 DOM에 있을 때 이 기능을 사용하면 DOM 질의를 재사용해서 테스트가 더 빨라집니다. DOM에서 일치하는 요소를 찾지 못하면 질의를 자동으로 재시도합니다.

이 기능은 재렌더링을 많이 하는 프론트엔드 프레임워크를 다룰 때 특히 유용합니다.

## 비동기적인 명령

사이프러스 명령은 호출되는 순간에는 아무 일도 하지 않고 나중에 실행되도록 대기열에 추가합니다.

```js
it('hides the thing when it is clicked', () => {
  cy.visit('/my/resource/path'); // 아직 아무 일도 일어나지 않습니다.

  cy.get('.hides-when-clicked') // 아직 아무 일도 일어나지 않습니다.
    .should('be.visible') // 아직 아무 일도 일어나지 않습니다.
    .click() // 아직 아무 일도 일어나지 않습니다.
    .should('not.be.visible'); // 아직 아무 일도 일어나지 않습니다.
});

// 테스트 함수가 실행을 마쳤습니다...
// 모든 명령이 대기열에 들어갔고 이제 사이프러스는
// 순서대로 명령을 실행하기 시작합니다!
```

### 비동기 코드와 동기 코드 섞기

동기 코드는 자신의 위에 있는 사이프러스 명령이 실행될 때까지 기다리지 않고 즉시 실행됩니다.

❌ **잘못된 사용법**

다음 예시에서는 `cy.visit()`이 실행되기 전에 `el`이 즉시 평가되므로 항상 빈 배열로 평가됩니다.

```js
it('does not work as we expect', () => {
  cy.visit('/my/resource/path'); // 아직 아무 일도 일어나지 않습니다.

  cy.get('.awesome-selector') // 아직 아무 일도 일어나지 않습니다.
    .click(); // 아직 아무 일도 일어나지 않습니다.

  // Cypress.$는 동기적이므로 즉시 평가됩니다.
  let el = Cypress.$('.new-el'); // 즉시 []로 평가됩니다.

  if (el.length) {
    // 즉시 0으로 평가됩니다.
    cy.get('.another-selector');
  } else {
    // 코드가 실행될 때는 el.length가 0이므로
    // 이 코드가 항상 실행됩니다.
    cy.get('.optional-selector');
  }
});
```

:heavy_check_mark: **올바른 사용법**

```js
it('does not work as we expect', () => {
  cy.visit('/my/resource/path'); // 아직 아무 일도 일어나지 않습니다.

  cy.get('.awesome-selector') // 아직 아무 일도 일어나지 않습니다.
    .click() // 아직 아무 일도 일어나지 않습니다.
    .then(() => {
      // '.then()' 내부에 코드를 배치하는 것은
      // 해당 코드가 사이프러스의 '실행' 명령 이후에
      // 실행되다는 것을 의미합니다.
      let el = 사이프러스.$('.new-el'); // '.then()' 이후에 평가됩니다.

      if (el.length) {
        cy.get('.another-selector');
      } else {
        cy.get('.optional-selector');
      }
    });
});
```

❌ **잘못된 사용법**

다음 예시에서는 `cy.visit()`이 실행되기 전에 `username` 값이 즉시 평가되므로 항상 `undefined`로 평가됩니다.

```js
it('test', () => {
  let username = undefined; // 즉시 undefined로 평가됩니다.

  cy.visit('https://app.com'); // 아직 아무 일도 일어나지 않습니다.
  cy.get('.user-name') // 아직 아무 일도 일어나지 않습니다.
    .then(($el) => {
      // 아직 아무 일도 일어나지 않습니다.
      // 이 코드는 '.then()'이 실행된 이후에 평가됩니다.
      username = $el.text();
    });

  // 이 코드는 위의 '.then()' 이전에 평가됩니다.
  // 따라서 username은 여전히 undefined입니다.
  if (username) {
    // 즉시 'undefined'로 평가됩니다.
    cy.contains(username).click();
  } else {
    // username이 항상 undefined로 평가되므로
    // 항상 이 코드가 실행됩니다.
    cy.contains('My Profile').click();
  }
});
```

:heavy_check_mark: **올바른 사용법**

```js
it('test', () => {
  let username = undefined; // 즉시 undefined로 평가됩니다.

  cy.visit('https://app.com'); // 아직 아무 일도 일어나지 않습니다.
  cy.get('.user-name') // 아직 아무 일도 일어나지 않습니다.
    .then(($el) => {
      // 아직 아무 일도 일어나지 않습니다.
      // 이 코드는 '.then()'이 실행된 이후에 평가됩니다.
      username = $el.text();

      // 이 코드는 '.then()'이 실행된 이후에 평가됩니다.
      // '$el.text()'에서 얻은 올바른 값이 username에 들어 있습니다.
      if (username) {
        cy.contains(username).click();
      } else {
        cy.get('My Profile').click();
      }
    });
});
```

:::info 핵심 개념

각 사이프러스 명령은 나중에 실행될 명령 대기열에 추가만 되고 즉시 반환됩니다.

명령의 반환값을 이용해 어떤 작업을 수행하는 것은 불가능합니다. 명령은 대기열에 추가되고 내부적으로 관리됩니다.

:::

### 반복문 피하기

`while`과 같은 자바스크립트 반복문을 사용하면 예기치 않은 결과가 발생할 수 있습니다.

앱이 로드 시 임의의 숫자를 표시한다고 가정해 보겠습니다. 숫자 7을 찾으면 테스트가 중지되기를 원합니다. 다른 숫자가 표시되면 테스트에서 페이지를 다시 로드하고 확인합니다.

❌ **잘못된 테스트**

다음 테스트는 작동하지 않으며 브라우저에서 충돌이 생길 가능성이 높습니다.

```js
let found7 = false;

while (!found7) {
  // 이 코드는 무한히 많은 'cy.get...' 명령을 예약하며,
  // 명령 중 하나가 실행되어 found7이 true가 되기 전에 충돌을 일으킵니다.
  cy.get('#result')
    .should('not.be.empty')
    .invoke('text')
    .then(parseInt)
    .then((number) => {
      if (number === 7) {
        found7 = true;
        cy.log('lucky **7**');
      } else {
        cy.reload();
      }
    });
}
```

`while` 반복문은 사이프러스가 첫 번째 `cy.get(...)` 명령의 실행을 시작하도록 허용하지 않습니다.

:heavy_check_mark: **올바른 테스트**

반복 재개 여부를 판단하기 전에 명령을 실행할 기회를 테스트에게 줘야 합니다. 따라서 올바른 테스트는 **재귀**를 사용합니다.

```js
const checkAndReload = () => {
  // 요소의 텍스트를 얻어서 숫자로 변환합니다.
  cy.get('#result')
    .should('not.be.empty')
    .invoke('text')
    .then(parseInt)
    .then((number) => {
      // 원하는 숫자가 나오면 명령을 추가하는 것을 멈춥니다.
      if (number === 7) {
        cy.log('lucky **7**');

        return;
      }

      // 그러지 않으면 새로고침 후에 함수를 호출해서
      // 사이프러스 명령을 추가합니다.
      cy.wait(500, { log: false });
      cy.reload();
      checkAndReload();
    });
};

cy.visit('public/index.html');
checkAndReload();
```

## 순차적으로 실행되는 명령

사이프러스는 앱의 상태가 명령이 예상하는 것과 일치하는지 확인하기 위해 많은 추가 작업을 수행합니다. 일부 명령은 빠르게 이행될 수 있지만, 일부 명령은 이행되는 데 몇 초에서 수십 초가 걸릴 수 있습니다.

:::info 핵심 개념

단계가 성공했는지 확인하는 데 필요한 모든 대기나 재시도는 다음 단계가 시작되기 전에 완료되어야 합니다. 시간 제한이 끝나기 전에 성공적으로 완료되지 않으면 테스트가 실패합니다.

:::

## 사이프러스 명령 대기열

`then()` 구문 때문에 사이프러스 API가 얼핏 프라미스와 비슷해 보이지만 **사이프러스 명령은 프라미스가 아닙니다**. 사이프러스 명령은 나중에 비동기적으로 실행되도록 중앙 대기열로 전달되는 직렬 명령입니다.

거의 모든 명령에는 [재시도 기능](https://docs.cypress.io/guides/core-concepts/retry-ability)이 내장됩니다. 재시도 기능이 없다면 단언이 무작위로 실패할 것입니다.

또한 명령에는 프라미스 기반 테스트에 익숙한 개발자가 예기치 않게 발견할 수 있는 몇 가지 디자인 선택 사항이 있습니다.

### 경주 명령은 불가능

많은 사이프러스 명령은 어떤 방식으로든 브라우저의 상태를 변경합니다.

- [`cy.request()`](https://docs.cypress.io/api/commands/request)
- [`cy.clearCookies()`](https://docs.cypress.io/api/commands/clearcookies)
- [`.click()`](https://docs.cypress.io/api/commands/click)

위의 명령들은 멱등성(idempotent)이 없습니다. 모두 부작용을 일으킵니다.

일관성을 유지하기 위해서는 명령을 제어된 직렬 방식으로 실행해야 합니다. 따라서 경주 명령은 불가능합니다.

### 오류 처리기 `.catch`는 사용 불가

사이프러스에는 실패한 명령에 대한 오류 복구 기능은 없습니다. 명령과 단언은 모두 통과하거나, 하나가 실패하면 나머지 명령이 실행되지 않고 테스트가 실패합니다.

:::note 참고

조건부 테스트를 수행하는 방법은 [이곳](https://docs.cypress.io/guides/core-concepts/conditional-testing)에서 확인하세요.

:::
