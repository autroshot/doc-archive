# 프로세스 간 통신

IPC(Inter-Process Communication, 프로세스 간 통신)는 일렉트론에서 풍부한 기능을 가진 데스크톱 애플리케이션을 구축하는 데 있어 핵심적인 부분입니다. 주 프로세스와 렌더러 프로세스는 일렉트론의 프로세스 모델에서 서로 다른 책임을 갖습니다. 그리고 IPC는 UI에서 네이티브 API를 호출하거나 네이티브 메뉴에서 웹 콘텐츠의 변경 사항을 트리거하는 것과 같은 많은 작업을 수행하는 유일한 방법입니다.

## IPC 채널

일렉트론에서 프로세스는 [`ipcMain`](https://www.electronjs.org/docs/latest/api/ipc-main) 및 [`ipcRenderer`](https://www.electronjs.org/docs/latest/api/ipc-renderer) 모듈과 함께 개발자가 정의한 **채널**을 통해 메시지를 전달하여 통신합니다. 채널은 **임의**(원하는 대로 이름을 지정할 수 있음)이며 **양방향**(두 모듈에 동일한 채널 이름을 사용할 수 있음)입니다.

이 안내서에서는 앱 코드에 참고할 수 있는 구체적인 예시와 함께 몇 가지 기본적인 IPC 패턴을 살펴보겠습니다.

## 컨텍스트 격리 프로세스 이해하기

구현 세부 사항을 진행하기 전에, 컨텍스트가 격리된 렌더러 프로세스에서 [사전 로드 스크립트](../process-model.mdx#사전-로드-스크립트)를 사용하여 노드와 일렉트론 모듈을 가져오는 방법을 알고 있어야 합니다.

- 일렉트론의 프로세스 모델에 대한 전체 개요는 [프로세스 모델 문서](../process-model.mdx)를 참고하세요.
- `contextBridge` 모듈을 사용하여 사전 로드 스크립트에서 API를 노출하는 방법은 [컨텍스트 격리 자습서](../context-isolation.md)를 확인하세요.

## 객체 직렬화

일렉트론의 IPC 구현은 HTML 표준인 [구조화된 복제 알고리즘](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)을 사용하여 프로세스 간에 전달되는 객체를 직렬화합니다. 즉, 특정 타입의 객체만 IPC 채널을 통해 전달될 수 있습니다.

특히 DOM 객체(예: `Element`, `Location`, `DOMMatrix`), C++ 클래스에서 지원하는 노드 객체(예: `process. env`, `Stream`의 일부 멤버), C++ 클래스에서 지원하는 일렉트론 객체(예: `WebContents`, `BrowserWindow`, `WebFrame`)는 구조화된 복제로 직렬화할 수 없습니다.