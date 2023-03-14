---
sidebar_position: 1
---

# 소개

**플레이라이트**는 모던 웹 앱에 대한 신뢰할 수 있는 E2E 테스트를 가능하게 합니다.

## 모든 브라우저, 모든 플랫폼, 하나의 API

### 크로스 브라우저

플레이라이트는 크롬, 웹킷, 파이어폭스를 비롯한 모든 모던 렌더링 엔진을 지원합니다.

### 크로스 플랫폼

윈도우, 리눅스, 맥OS에서, 로컬 또는 CI에서, 헤드가 없거나 있는 상태로 테스트합니다.

### 크로스 언어

[타입스크립트](https://playwright.dev/docs/intro), [자바스크립트](https://playwright.dev/docs/intro), [파이썬](https://playwright.dev/python/docs/intro), [닷넷](https://playwright.dev/dotnet/docs/intro), [자바](https://playwright.dev/java/docs/intro)에서 플레이라이트 API를 사용할 수 있습니다.

### 모바일 웹 테스트

안드로이드용 구글 크롬과 모바일 사파리의 네이티브 모바일 에뮬레이션을 사용합니다. 동일한 렌더링 엔진이 데스크톱과 클라우드에서 작동합니다.

## 불안정하지 않으며 복원력이 있는 테스트

### 자동 대기

플레이라이트는 동작을 수행하기 전에 요소가 동작 가능할 때까지 기다립니다. 플레이라이트에는 풍부한 자기 성찰 이벤트도 있습니다. 이 둘을 결합하면 불안정한 테스트의 주요 원인인 인위적인 시간 제한이 필요하지 않습니다.

### 웹 우선 단언

플레이라이트 단언은 동적 웹을 위해 특별히 생성됩니다. 필요 조건이 충족될 때까지 검사가 자동으로 재시도됩니다.

### 추적

테스트 재시도 전략을 설정하고 실행 추적, 비디오, 스크린샷을 캡처하여 불안정성을 제거합니다.

## 상충이나 제한이 없음

브라우저는 서로 다른 프로세스에서 서로 다른 출처의 웹 콘텐츠를 실행합니다. 플레이라이트는 모던 브라우저 구조에 맞춰져 있으며 프로세스 외부에서 테스트를 실행합니다. 이를 통해 플레이라이트는 프로세스 내 테스트 실행기라는 일반적인 제한에서 벗어날 수 있습니다.

### 모든 것을 다중화

복수의 **탭**, 복수의 **출처**, 복수의 **사용자**에 걸쳐 있는 시나리오를 테스트합니다. 여러 사용자에 대해 서로 다른 상황으로 시나리오를 만들고 서버에 대해 모두 하나의 테스트로 실행합니다.

### 신뢰할 수 있는 이벤트

요소에 마우스를 올리거나 동적 컨트롤과 상호 작용하면 신뢰할 수 있는 이벤트가 생성됩니다. 플레이라이트는 실제 사용자와 구별이 안 되는 실제 브라우저 입력 파이프라인을 사용합니다.

### 섀도 DOM을 뚫는 테스트 프레임

플레이라이트 선택기는 섀도(shadow) DOM을 뚫고 프레임에 원활하게 들어갈 수 있습니다.

## 완전한 격리와 빠른 실행

### 브라우저 컨텍스트

플레이라이트는 각 테스트에 대한 브라우저 컨텍스트(context)을 생성합니다. 브라우저 컨텍스트는 완전히 새로운 브라우저 프로필과 동일합니다. 이는 오버헤드 없이 완전한 테스트 격리를 제공합니다. 새 브라우저 컨텍스트를 만드는 데 몇 밀리초밖에 걸리지 않습니다.

### 한 번만 로그인

컨텍스트의 인증 상태를 저장하고 모든 테스트에서 재사용합니다. 이를 통해 각 테스트에서의 반복적인 로그인 작업을 우회하고 각 테스트를 완전히 격리시킵니다.

## 강력한 도구

### 코드젠

동작을 기록하여 테스트를 생성합니다. 어떤 언어로든 저장할 수 있습니다.

### 플레이라이트 검사기

페이지 검사, 선택기 생성, 테스트 실행 단계별 실행, 클릭 지점 확인, 실행 로그 탐색이 가능합니다.

### 추적 뷰어

테스트 실패를 조사하기 위해 모든 정보를 캡처합니다. 플레이라이트 추적에는 테스트 실행 스크린캐스트, 실시간 DOM 스냅숏, 동작 탐색기, 테스트 소스 등이 포함됩니다.