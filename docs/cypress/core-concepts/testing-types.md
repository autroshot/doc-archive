---
sidebar_position: 2
---

# 테스트 유형

## E2E 테스트

E2E(end-to-end) 테스트는 웹 브라우저에서 백엔드까지 앱을 테스트하고 타사 API 및 서비스와의 통합을 테스트하는 기술입니다. 이 테스트는 앱이 응집력 있는 전체로 잘 작동하는지 확인하는 데 유용합니다.

사이프러스는 사용자가 실제 브라우저를 사용하고, URL을 방문하고, 콘텐츠를 보고, 링크와 버튼을 클릭하며 앱과 상호 작용하는 것과 동일한 방식으로 E2E 테스트를 실행합니다. 이 방법으로 테스트하면 테스트와 사용자 경험이 동일한지 확인할 수 있습니다.

사이프러스에서 E2E 테스트 작성은 응용 프로그램을 빌드하는 개발자, 전문 테스트 엔지니어, 앱이 출시 준비가 되었는지 확인하는 품질 보증 팀이 수행할 수 있습니다. 테스트는 실제 사용자가 취하는 단계를 시뮬레이션하는 API를 사용하여 코드로 작성됩니다.

E2E 테스트는 앱이 프런트 엔드에서 백 엔드까지 의도한 대로 실행되는지 확인할 수 있습니다. 그러나 E2E 테스트는 설정, 실행, 유지 관리가 더 어려울 수 있습니다. 테스트 목적으로 백엔드를 설정하려면 인프라가 필요한 경우가 많습니다. 팀은 이러한 복잡성을 처리할 [전략](https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Testing-strategies)을 세워야 합니다.

E2E 테스트의 이점:

- 앱이 응집력 있는 전체로 잘 작동하는지 확인
- 사용자 경험과 일치하는 테스트
- 개발자 또는 QA 팀이 작성 가능
- 통합 테스트에도 사용 가능

E2E 테스트의 고려 사항:

- 설정, 실행, 유지 관리의 어려움
- CI에서의 테스트 인프라 준비
- 특정 시나리오의 테스트에는 많은 설정이 필요

E2E 테스트의 일반적인 시나리오:

- 인증이나 구매와 같은 중요한 작업 흐름 검증
- 데이터의 지속성과 데이터가 복수의 화면에 잘 표시됨을 보장
- 배포 전에 스모크 테스트 및 시스템 검사 실행

## 컴포넌트 테스트

최신 웹 프레임워크에서는 앱을 컴포넌트라는 더 작은 논리 단위로 분할하여 앱을 작성합니다. 컴포넌트는 버튼과 같이 아주 작은 것부터 등록 양식과 같은 복잡한 것까지 다양합니다.

E2E 테스트에서는 전체 앱을 불러오기 위해 URL을 방문하는 반면, 컴포넌트 테스트에서는 컴포넌트를 '마운트'하고 자체적으로 테스트합니다. 이렇게 하면 컴포넌트의 기능만 테스트하는 데 집중할 수 있습니다. 큰 응용 프로그램의 일부로 컴포넌트를 테스트할 때의 다른 뉘앙스는 걱정할 필요가 없어집니다.

일반적으로 컴포넌트 테스트는 컴포넌트에서 만드는 개발자가 작성합니다. 테스트용 코드는 컴포넌트 코드와 함께 있으며 테스트는 컴포넌트와 동시에 코딩되는 것이 일반적입니다. 개발자는 빌드하는 동안 필요한 기능을 확인할 수 있습니다.

그러나 컴포넌트 테스트를 모두 통과하더라도 앱이 제대로 작동한다는 보장은 없습니다. 컴포넌트 테스트로는 앱의 모든 계층이 함께 잘 작동하는지 확인할 수 없습니다. 따라서 잘 테스트된 앱에는 E2E와 컴포넌트 테스트가 적절하게 결합되어 있습니다.

컴포넌트 테스트의 이점:

- 분리된 컴포넌트를 쉽게 테스트
- 빠르고 안정적임
- 테스트에서 특정 시나리오를 쉽게 설정 가능
- 실행을 위해 외부 시스템에 의존할 필요가 없음

컴포넌트 테스트의 고려 사항:

- 전체 앱의 품질을 보장하지 않음
- 외부 API나 서비스를 호출하지 못함
- 일반적으로 컴포넌트를 만드는 개발자가 작성함

컴포넌트 테스트의 일반적인 시나리오:

- 날짜 선택 도구가 다양한 시나리오에서 제대로 작동하는지 테스트
- 양식이 입력에 따라 특정 부분을 표시하고 숨김
- 디자인 시스템에서 나오는 컴포넌트 테스트
- 컴포넌트에 연결되지 않은 논리 테스트 (단위 테스트와 유사)

## 테스트 유형 비교

|             | E2E                                      | 요소                        |
| ----------- | ---------------------------------------- | --------------------------- |
| 테스트 대상 | 모든 앱 계층                             | 개별 컴포넌트               |
| 특징        | 포괄적이고 느리며 불안정할 가능성이 높음 | 전문화, 신속, 신뢰성        |
| 용도        | 앱이 응집력 있는 전체로 작동하는지 확인  | 개별 컴포넌트의 기능 테스트 |
| 작성자      | 개발자, QA 팀, SDET                      | 개발자, 디자이너            |
| CI 인프라   | 복잡한 설정이 필요한 경우가 많음         | 필요 없음                   |
| 초기화 명령 | `cy.visit(url)`                          | `cy.mount(<MyComponent />)` |
