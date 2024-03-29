---
sidebar_position: 4
---

# 시간 제한

대부분의 명령이 어떤 방식으로든 시간 제한에 도달할 수 있습니다.

기본 단언이든 직접 추가한 단언이든, 모두 단언은 동일한 시간 제한 값을 공유합니다.

## 시간 제한 적용하기

명령의 시간 제한을 수정할 수 있습니다. 이 시간 제한은 기본 단언과, 추가한 특정 단언 모두에 영향을 줍니다.

단언은 이전 명령의 조건을 설명하는 데 사용되므로 `timeout`의 수정은 단언이 아니라 이전 명령에 적용됩니다.

### 예시 #1: 기본 단언

```js
// '.get()'에는 해당 요소가 존재한다는 기본 단언이 있으므로
// 시간 제한에 도달하고 실패할 수 있습니다.
cy.get('.mobile-nav');
```

사이프러스 내부에서는 다음과 같이 작동합니다.

- `.mobile-nav` 요소에 대한 질의
- ✨ 그리고 요소가 DOM에 존재할 때까지 최대 4초를 기다림 ✨

### 예시 #2: 추가 단언

```js
// 테스트에 두 개의 단언을 추가했습니다.
cy.get('.mobile-nav').should('be.visible').and('contain', 'Home');
```

사이프러스 내부에서는 다음과 같이 작동합니다.

- `.mobile-nav` 요소에 대한 질의
- ✨ 그리고 요소가 DOM에 존재할 때까지 최대 4초를 기다림 ✨
- ✨ 그리고 요소가 보일 때까지 최대 4초를 기다림 ✨
- ✨ 그리고 요소에 `Home`이라는 텍스트가 포함될 때까지 최대 4초를 기다림 ✨

사이프러스가 모든 단언이 통과할 때까지 기다리는 총 시간은 `cy.get()`의 시간 제한인 4초입니다.

시간 제한은 명령별로 수정할 수 있으며 이는 모든 기본 단언과 해당 명령 이후에 연결된 모든 단언에 영향을 미칩니다.

### 예시 #3: 시간 제한 수정하기

```js
// 기본 단언과 추가 단언 모두에 영향을 주는
// 시간 제한을 수정했습니다.
cy.get('.mobile-nav', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'Home');
```

사이프러스 내부에서는 다음과 같이 작동합니다.

- `.mobile-nav` 요소에 대한 질의
- ✨ 그리고 요소가 DOM에 존재할 때까지 최대 10초를 기다림 ✨
- ✨ 그리고 요소가 보일 때까지 최대 10초를 기다림 ✨
- ✨ 그리고 요소에 `Home`이라는 텍스트가 포함될 때까지 최대 10초를 기다림 ✨

시간 제한은 모든 단언으로 흘러갔고 이제 사이프러스는 모든 단언이 통과할 때까지 총 10초 동안 기다립니다.

:::danger

단언 내부에서 시간 제한을 변경하지 않아야 합니다. `timeout` 매개변수는 항상 명령 내부에 있어야 합니다.

```js
// ❌ 작동하지 않는다.
cy.get('.selector').should('be.visible', { timeout: 1000 });
// ✔️ 올바른 방법
cy.get('.selector', { timeout: 1000 }).should('be.visible');
```

단언뿐만 아니라 단언이 첨부된 명령을 재시도한다는 것을 기억해야 합니다.

:::

## 기본값

사이프러스는 명령 유형에 따라 몇 가지 다른 시간 제한 값을 제공합니다. 특정 작업의 예상 소요 시간을 기준으로 기본 시간 제한 값을 설정했습니다.

- [`cy.visit()`](https://docs.cypress.io/api/commands/visit) - 원격 페이지를 로드하고 모든 외부 자원이 로드 단계를 완료할 때까지 이행되지 않습니다. 시간이 오래 걸릴 수 있으므로 기본 시간 제한은 `60000ms`로 설정됩니다.
- [`cy.exec()`](https://docs.cypress.io/api/commands/exec) - 데이터베이스 시딩과 같은 시스템 명령을 실행합니다. 이것은 잠재적으로 오랜 시간이 걸릴 것으로 예상되며 기본 시간 제한은 `60000ms`로 설정됩니다.
- [`cy.wait()`](https://docs.cypress.io/api/commands/wait) - 두 개의 다른 시간 제한을 사용합니다. 라우팅 별칭을 기다릴 때는 `5000ms` 동안 일치하는 요청을 기다리며, 그러고 나서 추가로 서버의 응답을 `30000ms` 동안 기다립니다. 앱이 일치하는 요청을 빠르게 만들 것으로 예상하고, 서버의 응답은 잠재적으로 훨씬 더 오래 걸릴 것으로 예상합니다.

DOM 기반 명령을 포함한 대부분의 명령은 기본적으로 `4000ms` 후에 시간 제한에 도달합니다.
