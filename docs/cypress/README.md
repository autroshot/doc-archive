---
sidebar_position: 1
---

# 소개

사이프러스(Cypress)는 모던 웹을 위한 프론트 엔드 테스트 도구입니다.

이 도구를 사용하면 다음이 가능해집니다.

- 테스트 설정
- 테스트 작성
- 테스트 실행
- 테스트 디버그

사이프러스를 사용하면 모든 유형의 테스트를 작성할 수 있습니다.

- End-to-end(E2E) 테스트
- 통합 테스트
- 단위 테스트

사이프러스는 브라우저에서 실행되는 모든 것을 테스트할 수 있습니다.

## 특징

- **시간 여행** - 사이프러스는 테스트가 실행되는 동안 스냅샷을 만듭니다. [명령 로그](https://docs.cypress.io/guides/core-concepts/cypress-app#Command-Log)의 명령에 마우스를 올려놓으면 각 단계에서 어떤 일이 발생했는지 확인할 수 있습니다.
- **강력한 디버깅** - 이제 테스트가 실패하는 이유를 추측할 필요가 없습니다. 개발자 도구와 같은 친숙한 도구에서 [직접 디버그](https://docs.cypress.io/guides/guides/debugging)할 수 있습니다. 읽을 수 있는 오류와 스택 추적은 디버깅을 번개처럼 빠르게 만듭니다.
- **자동 대기** - 테스트에 대기(wait)나 수면(sleep)을 추가할 필요가 없습니다. 사이프러스는 테스트를 계속 진행하기 전에 [자동으로 명령과 단언(assertion)을 기다립니다](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-is-Not-Like-jQuery). 비동기 지옥에서 해방됩니다.
- **스파이, 스텁, 시계** - 함수, 서버 응답, 타이머의 [동작을 검증하고 제어합니다](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks). 단위 테스트와 동일한 기능을 바로 사용할 수 있습니다.
- **네트워크 트래픽 제어** - 서버를 사용하지 않고도 쉽게 [에지 케이스를 제어, 스텁, 테스트할 수 있습니다](https://docs.cypress.io/guides/guides/network-requests). 원하는 대로 네트워크 트래픽을 스텁할 수 있습니다.
- **일관된 결과** - 사이프러스는 셀레늄이나 웹드라이버를 사용하지 않습니다. 플레이크가 없는 빠르고 일관되며 신뢰할 수 있는 테스트를 만날 수 있습니다.
- **스크린샷과 비디오** - 실패 시 자동으로 캡처된 스크린샷이나 CLI에서 실행할 때 전체 테스트 제품군의 비디오를 볼 수 있습니다.
- **브라우저 간 테스트** - 파이어폭스와 및 크롬 제품군 브라우저(엣지와 일렉트론 포함) 내에서 테스트를 실행할 수 있고 [지속적 통합 파이프라인에 최적화되었습니다](https://docs.cypress.io/guides/guides/cross-browser-testing).
