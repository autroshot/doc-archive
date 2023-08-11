---
sidebar_position: 4
---

# 렌더러에서 렌더러로

`ipcMain`과 `ipcRenderer` 모듈을 사용하여 일렉트론의 렌더러 프로세스 간에 메시지를 보내는 직접적인 방법은 없습니다. 이를 위한 두 가지 옵션이 있습니다.

- 렌더러 간의 메시지 중개인으로 주 프로세스를 사용합니다. 한 렌더러에서 주 프로세스로 메시지를 보내면, 주 프로세스가 다른 렌더러로 메시지를 전달합니다.
- 주 프로세스에서 두 렌더러로 [MessagePort](https://www.electronjs.org/docs/latest/tutorial/message-ports)를 전달합니다. 이렇게 하면 초기 설정 후, 렌더러 간에 직접 통신이 가능해집니다.