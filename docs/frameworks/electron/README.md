---
sidebar_position: 1
---

# 소개

일렉트론(Electron)은 자바스크립트, HTML, CSS를 사용하여 플랫폼 간 데스크톱 앱을 구축합니다.

- 웹 기술 - 일렉트론은 웹 개발자가 데스크톱 애플리케이션을 만들 수 있도록 크로미움과 노드를 내장합니다.

- 교차 플랫폼 - 맥OS, 윈도우, 리눅스와 호환되는 일렉트론 앱은 지원되는 모든 아키텍처의 세 가지 플랫폼에서 실행됩니다.

- 오픈 소스 - 일렉트론은 [오픈JS 재단](https://openjsf.org/)과 활발한 기여자 커뮤니티에서 관리하는 오픈 소스 프로젝트입니다.

## 간편한 데스크톱 개발

일렉트론 어려운 부분을 처리하므로 여러분은 애플리케이션의 핵심에 집중할 수 있습니다.

### 네이티브 그래픽 사용자 인터페이스

일렉트론의 주 프로세스 API를 사용하여 운영 체제의 인터페이스와 상호 작용합니다. [애플리케이션 창](https://www.electronjs.org/docs/latest/tutorial/window-customization)의 모양을 사용자 정의하고, 애플리케이션 [메뉴](https://www.electronjs.org/docs/latest/api/menu)를 제어하고, [대화 상자](https://www.electronjs.org/docs/latest/api/dialog) 또는 [알림](https://www.electronjs.org/docs/latest/tutorial/notifications)을 통해 사용자에게 알립니다.

![VS코드의 맥OS 운영 체제 메뉴입니다. 'Code' 메뉴 항목이 선택되었으며 하위 메뉴의 항목은 다음과 같습니다. 'About Visual Studio Code', 'Check for Updates...', 'Preferences', 'Services', 'Hide Visual Studio Code', 'Hide Others', 'Show All', 'Quit Visual Studio Code'.](https://www.electronjs.org/assets/marketing/menu.png)

### 자동 소프트웨어 업데이트

[스쿼럴](https://github.com/Squirrel)이 제공하는 일렉트론의 [`autoUpdater` 모듈](https://www.electronjs.org/docs/latest/api/auto-updater)로 새 버전을 출시할 때마다 맥OS 및 윈도우 사용자에게 소프트웨어 업데이트를 보내세요.

![일렉트론 피들의 자동 업데이트 대화 상자입니다. 사용자에게 v0.27.3으로 업데이트하라는 메시지가 표시됩니다. 'A new version has been downloaded. Restart the application to apply the updates.' 하단에는 'Later'와 'Restart'라는 두 개의 버튼이 있습니다.](https://www.electronjs.org/assets/marketing/auto-updater.png)

### 애플리케이션 설치 프로그램

[커뮤니티 지원 도구](https://www.electronjs.org/docs/latest/tutorial/application-distribution)를 사용하여 맥OS의 애플 디스크 이미지(`.dmg`), 윈도우의 윈도우 설치 프로그램(`.msi`), 리눅스의 RPM 패키지 관리자(`.rpm`)와 같은 플랫폼별 도구를 생성합니다.

![왓츠앱 설치 프로그램(DMG)용 맥OS 창입니다. 'WhatsApp'과 'Applications'라는 두 아이콘이 있습니다. 사용자에게 왓츠앱 앱 아이콘을 애플리케이션 폴더로 끌어오라는 메시지가 표시됩니다.](https://www.electronjs.org/assets/marketing/installer.png)

### 앱스토어 배포

더 많은 사용자에게 애플리케이션을 배포하세요. 일렉트론은 [맥 앱 스토어](https://www.apple.com/ca/osx/apps/app-store/index.html)(맥OS), [마이크로소프트 스토어](https://www.microsoft.com/en-ca/store/apps/windows)(윈도우), [스냅 스토어](https://snapcraft.io/store)(리눅스)를 최고 수준으로 지원합니다.

![맥 앱 스토어 창에서 로켓챗 다운로드 페이지가 열립니다.](https://www.electronjs.org/assets/marketing/app-store.png)

### 충돌 보고

[`crashReporter`](https://www.electronjs.org/docs/latest/api/crash-reporter) 모듈을 사용하여 사용자로부터 자바스크립트와 네이티브 충돌 데이터를 자동으로 수집합니다. 타사 서비스를 사용하여 이 데이터를 수집하거나 자체 온프레미스 크래시패드 서버를 설정하세요.

![센트리(https://sentry.io) 충돌 보고의 스크린숏입니다. 오류 메시지('BrowserWindow Unresponsive'), 사용자 이동 경로, 사용자 정보를 표시합니다.](https://www.electronjs.org/assets/marketing/crash-reporting.png)

## 좋아하는 도구를 사용하기

최신 크로미움의 기능 덕분에, 일렉트론은 앱을 만들 때 깨끗한 백지 상태를 제공합니다. 프런트엔드 생태계에서 원하는 라이브러리와 프레임워크를 통합하거나, 맞춤형 HTML 코드로 자신만의 길을 개척하세요.

## 일렉트론 포지

일렉트론 포지는 일렉트론 앱을 빌드하고 게시하기 위한, 배터리가 포함된 도구 모음입니다. 자바스크립트 번들링과 확장 가능한 모듈 생태계에 대한 최고 수준의 지원을 통해 일렉트론 앱을 올바른 방식으로 시작하세요.

- [시작하기](https://electronforge.io/)
- [소스 코드](https://github.com/electron/forge)

## 설치

직접 알아보고 싶다면 npm 레지스트리에서 직접 일렉트론 패키지를 설치할 수 있습니다.

프로덕션 환경을 위해 최신 안정 버전을 설치하세요. 좀 더 실험적인 것을 원한다면, 사전 공개 또는 나이틀리(nightly) 채널을 사용해 보세요.

## 일렉트론 피들

일렉트론 피들을 사용하면 작은 일렉트론 실험을 만들고, 가지고 놀 수 있습니다. 실행하면 빠른 시작 템플릿이 제공됩니다. 몇 가지 사항을 변경하고 실행할 일렉트론 버전을 선택하여 실행해 보세요.

피들을 깃허브 지스트 또는 로컬 폴더에 저장하세요. 깃허브에 푸시하면, 누구나 주소 표시줄에 피들을 입력하여 빠르게 사용할 수 있습니다.

- [다운로드](https://www.electronjs.org/fiddle)
- [소스 코드](https://github.com/electron/fiddle)