---
sidebar_position: 1
---

# 소개

여기서는 고품질 타입스크립트 선언 파일을 작성하는 방법을 알려줄 것입니다. 시작하려면 타입스크립트 언어에 대한 기본적인 지식이 있어야 합니다.

아직 모른다면 [타입스크립트 안내서](../the-basics.md)를 읽고 기본 개념, 특히 타입과 모듈에 익숙해져야 합니다.

`.d.ts` 파일의 작동 방식을 배우는 가장 일반적인 경우는 타입이 없는 npm 패키지를 타이핑하는 것입니다. 이 경우 [모듈 `.d.ts`](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)로 바로 이동할 수 있습니다.

선언 파일은 다음과 같이 구분됩니다.

## [선언 참고](./declaration-reference.md)

기반 라이브러리의 예시만 가지고 있을 때 선언 파일을 작성해야 하는 경우가 종종 있습니다. [선언 참고](./declaration-reference.md)에서는 많은 API 패턴과 각 패턴의 선언을 작성하는 방법을 보여줍니다. 이 안내서는 타입스크립트의 모든 언어 구조에 아직 익숙하지 않은 타입스크립트 초보자를 대상으로 합니다.

## [라이브러리 구조](https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html)

[라이브러리 구조](https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html) 안내서에서는 일반적인 라이브러리 형식과 각 형식의 적절한 선언 파일을 작성하는 방법을 배울 수 있습니다. 기존 파일을 편집하는 경우에는 이 부분을 읽을 필요가 없습니다. 새로운 선언 파일의 작성자는 라이브러리 형식이 선언 파일 작성에 어떤 영향을 미치는지 제대로 이해하기 위해 이 부분을 읽을 것을 강력히 권장합니다.

템플릿 부분에는 새 파일을 작성할 때 유용한 시작점 역할을 하는 여러 선언 파일이 있습니다. 구조에 대해 이미 안다면 [`d.ts` 템플릿](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)을 참고하세요.

## [해야 할 것과 하지 말아야 할 것](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

선언 파일에서 흔히 하는 많은 실수를 피할 수 있습니다. [해야 할 것과 하지 말아야 할 것](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)에서는 일반적인 오류를 식별하고 이를 감지하는 방법과 해결하는 방법을 설명합니다. 일반적인 실수를 피하려면 누구나 이 부분을 읽어야 합니다.

## [심층 분석](https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html)

선언 파일의 기본 작동 방식에 관심이 있는 숙련된 작성자를 위한 곳입니다. [심층 분석](https://www.typescriptlang.org/docs/handbook/declaration-files/deep-dive.html)에서는 선언 작성의 많은 고급 개념을 설명하고 이를 활용하여 보다 깨끗하고 직관적인 선언 파일을 만드는 방법을 보여줍니다.

## [npm에 게시하기](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

[게시하기](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)에서는 선언 파일을 npm 패키지에 게시하는 방법을 설명하고 종속 패키지를 관리하는 방법을 보여줍니다.

## [선언 파일을 찾고 설치하기](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)

자바스크립트 라이브러리 사용자의 경우, 해당하는 선언 파일을 찾아 설치하는 몇 가지 간단한 단계를 [사용하기](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)에서 배울 수 있습니다.