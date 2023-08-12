---
sidebar_position: 9
---

# 모듈

자바스크립트는 모듈화 코드를 처리하는 다양한 방법의 오랜 역사를 가지고 있습니다. 2012년부터 타입스크립트는 이러한 많은 형식을 지원해 왔지만, 시간이 흐르면서 커뮤니티와 자바스크립트 명세서는 ES 모듈(또는 ES6 모듈)이라는 형식으로 수렴되었습니다. 여러분이 `import`/`export` 구문으로 알고 있을 형식입니다.

ES 모듈은 2015년에 자바스크립트 명세서에 추가되었으며, 2020년까지 대부분의 웹 브라우저와 자바스크립트 런타임에서 광범위하게 지원되었습니다.

이 안내서에서는 ES 모듈과 널리 사용되는 선구자인 코먼JS의 `module.exports =` 구문을 모두 다룹니다. 참고 부분의 [모듈](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/modules.html)에서 다른 모듈 패턴에 대한 정보를 찾을 수 있습니다.

## 자바스크립트 모듈의 정의 방법

타입스크립트에서는 ECMA스크립트 2015에서와 마찬가지로 최상위 `import` 또는 `export`를 포함하는 모든 파일을 모듈로 간주합니다.

반대로, 최상위 가져오기 또는 내보내기 선언이 없는 파일은 전역 범위에서(따라서 모듈에서도) 사용할 수 있는 스크립트로 처리됩니다.

모듈은 전역 범위가 아닌 자체 범위 내에서 실행됩니다. 이는 모듈에서 선언된 변수, 함수, 클래스 등이 내보내기 형식 중 하나를 사용하여 명시적으로 내보내지 않는 한 모듈 외부에서 볼 수 없음을 의미합니다. 반대로 다른 모듈에서 내보낸 변수, 함수, 클래스, 인터페이스 등을 사용하려면 가져오기 형식 중 하나를 사용하여 가져와야 합니다.

## 모듈이 아닌 것

시작하기 전에 타입스크립트에서 모듈로 간주하는 것이 무엇인지 알아야 합니다. 자바스크립트 명세서는 `import`, `export`, 최상위 `await`가 없는 모든 자바스크립트 파일을 모듈이 아닌 스크립트로 간주해야 한다고 선언합니다.

스크립트 파일 내부에서 변수와 타입은 공유 전역 범위에 있는 것으로 선언됩니다. [`outFile`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#outFile) 컴파일러 옵션을 사용하여 여러 입력 파일을 하나의 출력 파일로 합치거나 HTML에서 여러 `<script>` 태그를 사용하여 이러한 파일을 (올바른 순서로!) 로드할 수 있습니다.

현재 파일에 `import` 또는 `export`가 없지만 모듈로 취급하고 싶다면 다음 코드를 추가하세요.

```ts twoslash
export {};
```

이는 파일을 아무것도 내보내지 않는 모듈로 변경합니다. 이 구문은 모듈 대상에 관계없이 작동합니다.

## 타입스크립트의 모듈

:::note 추가 읽을거리

- [참을성이 없는 JS (모듈)](https://exploringjs.com/impatient-js/ch_modules.html#overview-syntax-of-ecmascript-modules)
- [MDN: 자바스크립트 모듈](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

:::

타입스크립트에서 모듈 기반 코드를 작성할 때 고려해야 할 세 가지 주요 사항은 다음과 같습니다.

- **구문** - 항목을 가져오고 내보내는 데 어떤 구문을 사용하고 싶나요?
- **모듈 확인** - 모듈 이름(또는 경로)과 디스크의 파일 사이의 관계는 무엇인가요?
- **모듈 출력 대상** - 출력된 자바스크립트 모듈은 어떤 모습이어야 하나요?

### ES 모듈 구문

파일은 `export default`를 통해 기본 내보내기를 선언할 수 있습니다.

```ts twoslash
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
```

그러면 다음과 같이 가져올 수 있습니다.

```ts twoslash
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
// @filename: index.ts
// ---cut---
import helloWorld from "./hello.js";
helloWorld();
```

기본 내보내기 외에도 `default`를 생략하여 `export`를 통해 변수와 함수를 두 개 이상 내보낼 수 있습니다.

```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
```

`import` 구문을 통해 다른 파일에서 사용할 수 있습니다.

```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
export class RandomNumberGenerator {}
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
// @filename: app.ts
// ---cut---
import { pi, phi, absolute } from "./maths.js";

console.log(pi);
const absPhi = absolute(phi);
//    ^?
```

### 추가 가져오기 구문

가져오기는 `import {old as new}`와 같은 형식을 사용하여 이름을 바꿀 수 있습니다.

```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
// @filename: app.ts
// ---cut---
import { pi as π } from "./maths.js";

console.log(π);
//          ^?
```

위의 구문을 하나의 `import`로 혼합하고 일치시킬 수 있습니다.

```ts twoslash
// @filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}

// @filename: app.ts
import RandomNumberGenerator, { pi as π } from "./maths.js";

RandomNumberGenerator;
// ^?

console.log(π);
//          ^?
```

내보낸 모든 객체를 `* as name`으로 사용하여 하나의 이름공간에 넣을 수 있습니다.

```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
// ---cut---
// @filename: app.ts
import * as math from "./maths.js";

console.log(math.pi);
const positivePhi = math.absolute(math.phi);
//    ^?
```

`import "./file"`을 통해 현재 모듈에 변수를 포함하지 않고 파일을 가져올 수 있습니다.

```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
// ---cut---
// @filename: app.ts
import "./maths.js";

console.log("3.14");
```

이 경우 `import`는 아무것도 하지 않습니다. 그러나 `maths.ts`의 모든 코드가 평가되어 다른 객체에 영향을 미치는 부작용이 생길 수 있습니다.

#### 타입스크립트 전용 ES 모듈 구문

자바스크립트 값과 동일한 구문을 사용하여 타입을 내보내고 가져올 수 있습니다.

```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```

타입스크립트는 타입 가져오기를 선언하기 위한 두 가지 개념으로 `import` 구문을 확장했습니다.

###### `import type`

타입만 가져올 수 있는 가져오기는 다음과 같습니다.

```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";

// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;

// @filename: app.ts
// @errors: 1361
import type { createCatName } from "./animal.js";
const name = createCatName();
```

###### 인라인 `type` 가져오기

타입스크립트 4.5에서는 가져온 참조가 타입임을 나타내기 위해 개별 가져오기에 `type` 접두사를 붙일 수 있습니다.

```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
// ---cut---
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";

export type Animals = Cat | Dog;
const name = createCatName();
```

이를 통해 바벨, swc, es빌드와 같은 타입스크립트가 아닌 트랜스파일러가 어떤 가져오기를 안전하게 제거할 수 있는지 알 수 있습니다.

#### 코먼JS 동작을 사용하는 ES 모듈 구문

타입스크립트에는 코먼JS 및 AMD의 `require`와 직접적으로 연관된 ES 모듈 구문이 있습니다. ES 모듈을 사용한 가져오기는 대부분의 경우 해당 환경의 `require`와 동일하지만, 이 구문을 사용하면 타입스크립트 파일과 코먼JS 출력이 1:1로 일치하게 됩니다.

```ts twoslash
/// <reference types="node" />
// @module: commonjs
// ---cut---
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```

[모듈 참고 페이지](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/modules.html#export--and-import--require)에서 이 구문에 대해 자세히 알아볼 수 있습니다.

## 코먼JS 구문

코먼JS는 npm의 대부분의 모듈이 제공되는 형식입니다. ES 모듈 구문을 사용하여 작성하는 경우에도 코먼JS 구문이 작동하는 방식을 간략하게 이해하면 디버깅을 더 쉽게 할 수 있습니다.

#### 내보내기

식별자는 `module`이라는 전역에서 `exports` 프로퍼티를 ​​설정하여 내보냅니다.

```ts twoslash
/// <reference types="node" />
// ---cut---
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

그런 다음 `require` 문을 통해 이러한 파일을 가져올 수 있습니다.

```ts twoslash
// @module: commonjs
// @filename: maths.ts
/// <reference types="node" />
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
// @filename: index.ts
// ---cut---
const maths = require("./maths");
maths.pi;
//    ^?
```

또는 자바스크립트의 구조 분해 기능을 사용하여 약간 간단하게 만들 수 있습니다.

```ts twoslash
// @module: commonjs
// @filename: maths.ts
/// <reference types="node" />
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
// @filename: index.ts
// ---cut---
const { squareTwo } = require("./maths");
squareTwo;
// ^?
```

### 코먼JS 및 ES 모듈의 상호 운용

기본 가져오기와 모듈 이름공간 객체 가져오기 간의 구분과 관련하여 코먼JS 와 ES 모듈 간에 기능이 일치하지 않습니다. 타입스크립트에는 [`esModuleInterop`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#esModuleInterop)를 사용하여 서로 다른 두 제약 조건 집합 간의 마찰을 줄이기 위한 컴파일러 플래그가 있습니다.

## 타입스크립트의 모듈 확인 옵션

모듈 확인은 `import` 또는 `require` 문에서 문자열을 가져오고 해당 문자열이 참조하는 파일을 결정하는 과정입니다.

타입스크립트에는 클래식과 노드라는 두 가지 확인 전략이 있습니다. 컴파일러 옵션 [`module`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#module)이 `commonjs`가 아닌 경우에 기본값인 클래식은 이전 버전과의 호환성을 위해 포함됩니다. 노드 전략은 `.ts` 및 `.d.ts`에 대한 추가 확인과 함께 노드가 코먼JS 모드에서 작동하는 방식을 복제합니다.

타입스크립트에는 모듈 전략에 영향을 미치는 많은 TSConfig 플래그가 있습니다: [`moduleResolution`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#moduleResolution), [`baseUrl`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#baseUrl), [`paths`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#paths), [`rootDirs`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#rootDirs).

이러한 전략의 작동 방식에 대한 자세한 내용은 [모듈 확인](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/module-resolution.html)을 참고하세요.

## 타입스크립트의 모듈 출력 옵션

내보낸 자바스크립트 출력에 영향을 미치는 두 가지 옵션이 있습니다.

- [`target`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#target)은 어떤 JS 기능이 다운레벨(이전 자바스크립트 런타임에서 실행되도록 변환)되고 어떤 기능이 그대로 남아 있을지 결정합니다.
- [`module`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#module)은 모듈이 서로 상호 작용하는 데 사용되는 코드를 결정합니다.

사용할 [`target`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#target)은 타입스크립트 코드를 실행할 자바스크립트 런타임에서 사용할 수 있는 기능에 따라 결정됩니다. 지원하는 가장 오래된 웹 브라우저, 실행할 것으로 예상되는 노드의 가장 낮은 버전, 런타임(예: 일렉트론)의 고유한 제약 조건에 따라 결정될 수 있습니다.

모듈 간의 모든 통신은 모듈 로더를 통해 이루어지며, 컴파일러 옵션 [`module`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#module)은 어느 것을 사용할지를 결정합니다. 런타임에 모듈 로더는 모듈을 실행하기 전에 모듈의 모든 종속성을 찾아 실행하는 역할을 합니다.

예를 들어 다음은 ES 모듈 구문을 사용하는 타입스크립트 파일로, [`module`](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#module)에 대한 몇 가지 옵션을 보여줍니다.

```ts twoslash
// @filename: constants.ts
export const valueOfPi = 3.142;
// @filename: index.ts
// ---cut---
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `ES2020`

```ts twoslash
// @showEmit
// @module: es2020
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `CommonJS`

```ts twoslash
// @showEmit
// @module: commonjs
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `UMD`

```ts twoslash
// @showEmit
// @module: umd
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

:::note 참고

ES2020은 원래 `index.ts`와 실질적으로 동일합니다.

:::

[`module`에 대한 TSConfig 참고](https://github.com/microsoft/TypeScript-Website/blob/v2/tsconfig#module)에서 사용 가능한 모든 옵션과 내보낸 자바스크립트 코드가 어떻게 보이는지 확인할 수 있습니다.

## 타입스크립트 이름공간

타입스크립트에는 ES 모듈 표준 이전의 `namespaces`라는 자체 모듈 형식이 있습니다. 이 구문에는 복잡한 정의 파일을 만드는 데 유용한 기능이 많이 있으며 여전히 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)에서 적극적으로 사용됩니다. 더 이상 사용되지 않지만 이름공간의 기능 대부분은 ES 모듈에 존재하며 자바스크립트의 방향에 맞춰 이를 사용하는 것이 좋습니다. 이름공간에 대한 자세한 내용은 [이름공간 참고 페이지](https://github.com/microsoft/TypeScript-Website/blob/v2/docs/handbook/namespaces.html)에서 확인할 수 있습니다.