---
sidebar_position: 3
---

# 주에서 렌더러로

주 프로세스에서 렌더러 프로세스로 메시지를 보낼 때는 메시지를 받을 렌더러를 지정해야 합니다. 메시지는 [`WebContents`](https://www.electronjs.org/docs/latest/api/web-contents) 인스턴스를 통해 렌더러 프로세스로 전송되어야 합니다. 이 WebContents 인스턴스에는 `ipcRenderer.send`와 동일한 방식으로 사용할 수 있는 [`send`](https://www.electronjs.org/docs/latest/api/web-contents#contentssendchannel-args) 메서드가 포함되어 있습니다.

이 패턴을 시연하기 위해 네이티브 운영 체제 메뉴에서 제어하는 ​​숫자 카운터를 구축해 보겠습니다.

이 데모에서는 주 프로세스, 렌더러 프로세스, 사전 로드 스크립트에 코드를 추가해야 합니다. 전체 코드는 피들에서 확인할 수 있으며, 각 파일을 개별적으로 설명할 것입니다.

[DOCS/FIDDLES/IPC/PATTERN-3 (25.5.0)](https://github.com/electron/electron/tree/v25.5.0/docs/fiddles/ipc/pattern-3)[Open in Fiddle](https://fiddle.electronjs.org/launch?target=electron/v25.5.0/docs/fiddles/ipc/pattern-3)

## 1. `webContents` 모듈로 메시지 보내기

이 데모에서는 먼저 일렉트론의 `Menu` 모듈을 사용하여 주 프로세스에서 커스텀 메뉴를 구축해야 합니다. `Menu` 모듈은 `webContents.send` API를 사용하여 주 프로세스에서 대상 렌더러로 IPC 메시지를 전송합니다.

main.js (Main Process)

```javascript
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
}
// ...
```

`click` 처리기가 `update-counter` 채널을 통해 렌더러 프로세스에 메시지(`1` 또는 `-1`)를 전송한다는 점을 주목해야 합니다.

```javascript
click: () => mainWindow.webContents.send('update-counter', -1)
```

INFO

다음 단계를 위해 `index.html`과 `preload.js` 진입점을 로드하고 있는지 확인하세요!

## 2. 사전 로드를 통해 `ipcRenderer.on` 노출하기

앞의 '렌더러에서 주로' 예시와 마찬가지로 사전 로드 스크립트에서 `contextBridge`와 `ipcRenderer` 모듈을 사용하여 렌더러 프로세스에 IPC 기능을 노출합니다.

preload.js (Preload Script)

```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
})
```

사전 로드 스크립트를 로드한 후, 렌더러 프로세스는 `window.electronAPI.onUpdateCounter()` 수신기 함수 에 접근할 수 있어야 합니다.

보안 경고

[보안상의 이유](../context-isolation.md#보안-고려-사항)로 `ipcRenderer.on` API 전체를 직접 노출하지 않습니다. 일렉트론 API에 대한 렌더러의 접근을 최대한 제한하세요.

INFO

이 간단한 예시에서는 `contextBridge`를 통해 노출하는 대신 사전 로드 스크립트에서 직접 `ipcRenderer.on`을 호출하고 있습니다.

preload.js (Preload Script)

```javascript
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter')
  ipcRenderer.on('update-counter', (_event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
  })
})
```

그러나 이 접근 방식은 수신기가 렌더러 코드와 직접 상호 작용할 수 없습니다. 따라서 `contextBridge`를 통해 사전 로드 API를 노출하는 것과 비교할 때 유연성이 떨어집니다.

## 3. 렌더러 프로세스 UI 구축하기

이 모든 것을 하나로 묶기 위해, 로드된 HTML 파일에 `#counter` 요소가 포함된 인터페이스를 만들어 값을 표시할 것입니다.

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

마지막으로 HTML 문서에서 값을 갱신해 보겠습니다. `update-counter` 이벤트를 실행할 때마다 `#counter` 요소의 값이 갱신되도록 DOM을 조작하는 코드를 추가하겠습니다.

renderer.js (Renderer Process)

```javascript
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((_event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
})
```

위의 코드에서는 사전 로드 스크립트에서 노출된 `window.electronAPI.onUpdateCounter` 함수에 콜백을 전달하고 있습니다. 두 번째 `value` 매개변수는 네이티브 메뉴의 `webContents.send` 호출에서 전달한 `1` 또는 `-1`에 해당합니다.

## 선택 사항: 응답 반환하기

'주에서 렌더러로' IPC에는 `ipcRenderer.invoke`에 해당하는 것이 없습니다. 대신 `ipcRenderer.on` 콜백 내에서 주 프로세스로 응답을 보낼 수 있습니다.

이전 예시의 코드를 약간 수정하여 이를 확인해 보겠습니다. 렌더러 프로세스에서 `event` 매개변수를 사용하여 `counter-value` 채널을 통해 주 프로세스에 응답을 보냅니다.

renderer.js (Renderer Process)

```javascript
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
  event.sender.send('counter-value', newValue)
})
```

주 프로세스에서 `counter-value` 이벤트를 수신하고 적절하게 처리합니다.

main.js (Main Process)

```javascript
// ...
ipcMain.on('counter-value', (_event, value) => {
  console.log(value) // 노드 콘솔에 값을 출력합니다.
})
// ...
```
