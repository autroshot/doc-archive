---
sidebar_position: 3
---

# 고급 설치 안내서

미리 빌드된 일렉트론 이진을 설치하려면 [npm](https://docs.npmjs.com/)을 사용하세요. 선호되는 방법은 일렉트론을 앱의 개발 종속성으로 설치하는 것입니다.

```sh
npm install electron --save-dev
```

앱에서 일렉트론의 버전을 관리하는 방법에 대한 자세한 내용은 [일렉트론 버전 관리 문서](https://www.electronjs.org/docs/latest/tutorial/electron-versioning)를 참고하세요.

## 임시로 일렉트론 실행하기

상황이 급하여 로컬 프로젝트에서 `npm install`을 사용하지 않으려면, `npm`과 함께 번들로 제공되는 [`npx`](https://docs.npmjs.com/cli/v7/commands/npx) 명령 실행기를 사용하여 일렉트론을 임시로 실행할 수 있습니다.

```sh
npx electron .
```

이 명령은 일렉트론으로 현재 작업 디렉터리를 실행합니다. 앱의 종속성은 설치되지 않습니다.

## 사용자 정의하기

다운로드되는 아키텍처(예: `x64` 시스템의 `ia32`)를 변경하려면, `npm install`에 `--arch` 플래그를 사용하거나 `npm_config_arch` 환경 변수를 설정할 수 있습니다.

```shell
npm install --arch=ia32 electron
```

아키텍처를 변경하는 것 외에도 `--platform` 플래그를 사용하여 플랫폼(예: `win32`, `linux` 등)을 지정할 수도 있습니다.

```shell
npm install --platform=win32 electron
```

## 프록시

HTTP 프록시를 사용해야 하는 경우, `ELECTRON_GET_USE_PROXY` 변수를 임의의 값으로 설정하고 호스트 시스템의 노드 버전에 따라 추가 환경 변수를 설정해야 합니다.

- [노드 10 이상](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
- [노드 10 이전](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## 커스텀 미러와 캐시

설치 과정에서 `electron` 모듈은 [`@electron/get`](https://github.com/electron/get)을 호출하여 플랫폼용으로 사전 빌드된 일렉트론 이진을 다운로드합니다. 모듈은 깃허브의 릴리스 다운로드 페이지(` https://github.com/electron/electron/releases/tag/v$VERSION `, 여기서 `$VERSION`는 일렉트론의 정확한 버전)를 연결합니다.

깃허브에 접근할 수 없거나 커스텀 빌드를 제공해야 한다면, 미러나 기존 캐시 디렉터리를 제공하여 이를 수행할 수 있습니다.

### 미러

환경 변수를 사용하여 기본 URL, 일렉트론 이진을 찾을 경로, 이진 파일 이름을 재정의할 수 있습니다. `@electron/get`에서 사용하는 URL은 다음과 같이 구성됩니다.

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

다음은 중국 CDN 미러를 사용하는 예시입니다.

```shell
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```

기본적으로 `ELECTRON_CUSTOM_DIR`은 `v$VERSION`으로 설정됩니다. 형식을 변경하려면 `{{ version }}` 자리 표시자를 사용하세요. 예를 들어 `version-{{ version }}`은 `version-5.0.0`으로 이행되고, `{{ version }}`은 `5.0.0`으로 이행되며, `v{{ version }}`은 기본값과 동일합니다.

다음은 중국 비CDN 미러를 사용하는 구체적인 예시입니다.

```shell
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

위 구성은 `https://npmmirror.com/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`과 같은 URL에서 다운로드됩니다.

미러가 공식 일렉트론 릴리스와 다른 체크섬을 가진 아티팩트를 제공하는 경우, 일렉트론이 내장 체크섬 대신 원격 `SHASUMS256.txt` 파일을 사용하여 체크섬을 확인하도록 `electron_use_remote_checksums=1`을 설정해야 할 수 있습니다.

### 캐시

또는 로컬 캐시를 재정의할 수 있습니다. `@electron/get`은 다운로드한 이진을 로컬 디렉토리에 캐시하여 네트워크에 부담을 주지 않습니다. 이 캐시 폴더를 사용하여 일렉트론의 커스텀 빌드를 제공하거나 네트워크와 전혀 연결되지 않게 할 수 있습니다.

- 리눅스 - `$XDG_CACHE_HOME` or `~/.cache/electron/`
- 맥OS - `~/Library/Caches/electron/`
- 윈도우 - `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

이전 버전의 일렉트론을 사용하는 환경에서는 `~/.electron`에서도 캐시를 찾을 수 있습니다.

`electron_config_cache` 환경 변수를 제공하여 로컬 캐시의 위치를 재정의할 수도 있습니다.

캐시에는 버전의 공식 `zip` 파일과 체크섬이 포함되어 있으며 `[checksum]/[filename]`으로 저장됩니다. 일반적인 캐시의 모습은 다음과 같습니다.

```sh
├── a91b089b5dc5b1279966511344b805ec84869b6cd60af44f800b363bba25b915
│   └── electron-v15.3.1-darwin-x64.zip
```

## 이진 다운로드 건너뛰기

내부적으로 일렉트론의 자바스크립트 API는 구현이 포함된 이진에 바인딩됩니다. 이 이진은 일렉트론 앱의 함수에 중요하기 때문에, npm 레지스트리에서 `electron`을 설치할 때마다 `postinstall` 단계에서 기본적으로 다운로드됩니다.

그러나 프로젝트의 종속성을 설치하고 싶지만 일렉트론 기능을 사용할 필요가 없다면, `ELECTRON_SKIP_BINARY_DOWNLOAD` 환경 변수를 설정하여 이진이 다운로드되지 않게 할 수 있습니다. 예를 들어 이 기능은 `electron` 모듈을 모조하는 단위 테스트를 실행할 때 지속적인 통합 환경에서 유용할 수 있습니다.

```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## 문제 해결

`npm install electron`을 실행할 때 일부 사용자에게 설치 오류가 발생할 수 있습니다.

대부분 이러한 오류는 `electron` npm 패키지의 문제가 아니라 네트워크 문제의 결과입니다. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, `ETIMEDOUT`과 같은 오류는 모두 네트워크 문제를 나타냅니다. 가장 좋은 해결 방법은 네트워크를 전환하거나 잠시 기다렸다가 다시 설치하는 것입니다.

`npm`을 통한 설치가 실패할 경우, [electron/electron/releases](https://github.com/electron/electron/releases)에서 직접 일렉트론을 다운로드할 수 있습니다.

`EACCESS` 오류와 함께 설치에 실패하면 [npm의 권한을 수정](https://docs.npmjs.com/getting-started/fixing-npm-permissions)해야 할 수 있습니다.

위의 오류가 지속되면 [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) 플래그를 `true`로 설정해야 할 수 있습니다.

```sh
sudo npm install electron --unsafe-perm=true
```

느린 네트워크에서는 다운로드 진행률을 표시하기 위해 `--verbose` 플래그를 사용하는 것이 좋습니다.

```sh
npm install --verbose electron
```

자산과 `SHASUM` 파일을 강제로 다시 다운로드해야 하는 경우, `force_no_cache` 환경 변수를 `true`로 설정합니다.