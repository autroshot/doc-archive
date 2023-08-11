---
sidebar_position: 2
---

# 컨텍스트 격리

컨텍스트 격리는 `preload` 스크립트와 일렉트론의 내부 로직이 [`webContents`](https://www.electronjs.org/docs/latest/api/web-contents)에서 로드하는 웹사이트와 별도의 컨텍스트에서 실행되도록 하는 기능입니다. 이는 일렉트론 내부 또는 사전 로드 스크립트가 접근할 수 있는 강력한 API에 웹사이트가 접근하는 것을 방지하므로 보안에 중요한 역할을 합니다.

즉, 사전 로드 스크립트가 접근할 수 있는 `window` 객체가 실제로는 웹사이트가 접근할 수 있는 객체와 **다른** 객체라는 의미입니다. 예를 들어 사전 로드 스크립트에서 `window.hello = 'wave'`를 설정하고 컨텍스트 격리가 활성화된 경우, 웹사이트에서 `window.hello`에 접근하면 `undefined`가 출력됩니다.

컨텍스트 격리는 일렉트론 12부터 기본적으로 활성화되었으며, **모든 애플리케이션**에 권장되는 보안 설정입니다.

## 마이그레이션

컨텍스트 격리 없이, `window.X = apiObject`를 사용하여 사전 로드 스크립트에서 API를 제공하곤 했습니다. 이제 어떻게 해야 할까요?

### 이전: 컨텍스트 격리 비활성화됨

렌더러 프로세스에서 로드된 웹사이트에 사전 로드 스크립트의 API를 노출하는 것은 일반적인 사용 사례입니다. 컨텍스트 격리가 비활성화된 경우, 사전 로드 스크립트는 렌더러와 공통 전역 `window` 객체를 공유합니다. 다음과 같이 사전 로드 스크립트에 임의의 프로퍼티를 첨부할 수 있습니다.

```javascript title="preload.js"
// 컨텍스트 격리가 비활성화된 사전 로드입니다.
window.myAPI = {
  doAThing: () => {}
}
```

그러면 `doAThing()` 함수를 렌더러 프로세스에서 직접 사용할 수 있습니다.

```javascript title="renderer.js"
// 렌더러에서 노출된 API를 사용합니다.
window.myAPI.doAThing()
```

### 이후: 컨텍스트 격리 활성화됨

일렉트론에는 이 작업을 쉽게 수행할 수 있도록 도와주는 전용 모듈이 있습니다. [`contextBridge`](https://www.electronjs.org/docs/latest/api/context-bridge) 모듈을 사용하여 사전 로드 스크립트의 격리된 컨텍스트에서 웹사이트가 실행 중인 컨텍스트로 API를 **안전하게** 노출할 수 있습니다. 이전과 마찬가지로 웹사이트의 `window.myAPI`를 통해 API에 접근할 수 있습니다.

```javascript title="preload.js"
// 컨텍스트 격리가 활성화된 사전 로드입니다.
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

```javascript title="renderer.js"
// 렌더러에서 노출된 API를 사용합니다.
window.myAPI.doAThing()
```

제한 사항을 완전히 이해하려면 [`contextBridge`](https://www.electronjs.org/docs/latest/api/context-bridge) 문서를 읽어보세요. 예를 들어 브리지를 통해 커스텀 프로토타입이나 심볼을 보낼 수는 없습니다.

## 보안 고려 사항

`contextIsolation`을 활성화하고 `contextBridge`를 사용한다고 해서 모든 작업이 자동으로 안전해지는 것은 아닙니다. 예를 들어 다음 코드는 **안전하지 않습니다**.

```javascript title="preload.js"
// ❌ 나쁜 코드
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

이 코드는 인수 필터링이 전혀 없이 강력한 API를 직접 노출합니다. 이렇게 하면 모든 웹사이트에서 임의의 IPC 메시지를 보낼 수 있게 되는데, 이는 원치 않는 일입니다. IPC 기반 API를 노출하는 올바른 방법은 IPC 메시지당 하나의 메서드를 제공하는 것입니다.

```javascript title="preload.js"
// ✅ 좋은 코드
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## 타입스크립트와 함께 사용하기

타입스크립트로 일렉트론 앱을 구축하는 경우, 컨텍스트 브리지를 통해 노출된 API에 타입을 추가하고 싶을 것입니다. [선언 파일](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)로 타입을 확장하지 않으면 렌더러의 `window` 객체에 올바른 타입이 지정되지 않습니다.

예를 들어 다음과 같은 `preload.ts` 스크립트가 있다고 가정해 보겠습니다.

```typescript title="preload.ts"
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

`renderer.d.ts` 선언 파일을 만들고 `Window` 인터페이스를 전역으로 확장할 수 있습니다.

```typescript title="renderer.d.ts"
export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

이렇게 하면 렌더러 프로세스에서 스크립트를 작성할 때, 타입스크립트 컴파일러가 전역 `window` 객체의 `electronAPI` 프로퍼티에 대해 알 수 있습니다.

```typescript title="renderer.ts"
window.electronAPI.loadPreferences()
```
