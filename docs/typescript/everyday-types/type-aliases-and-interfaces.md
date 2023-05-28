---
sidebar_position: 8
---

# 타입 별칭과 인터페이스

## 타입 별칭

우리는 객체 타입과 합집합 타입을 타입 주석에 직접 작성하여 사용해 왔습니다. 이 방법도 편리하지만, 동일한 타입을 두 번 이상 사용할 때는 하나의 이름으로 참조하는 것이 일반적입니다.

**타입 별칭**은 정확히 그 역할을 수행합니다. 즉, 타입 별칭은 **타입의 이름**입니다. 타입 별칭의 구문은 다음과 같습니다.

```ts
type Point = {
  x: number;
  y: number;
};

// 이전 예시와 완전히 동일합니다.
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

사실 타입 별칭을 사용하면 객체 타입뿐만 아니라 모든 타입의 이름을 지정할 수 있습니다. 예를 들어 타입 별칭은 합집합 타입의 이름을 지정할 수 있습니다.

```ts
type ID = number | string;
```

별칭은 별칭일 뿐입니다. 타입 별칭을 사용하여 동일한 타입의 서로 다른(고유한) **버전**을 만들 수는 없습니다. 별칭을 사용한다는 것은 타입의 별칭을 작성하는 것입니다. 다음 코드는 잘못된 것처럼 보일 수 있지만, 타입스크립트에 따르면 두 타입은 동일한 타입의 별칭이기 때문에 문제가 없습니다.

```ts
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// 살균된 입력을 생성합니다.
let userInput = sanitizeInput(getInput());

// 여전히 문자열을 사용하여 재할당할 수 있습니다.
userInput = "new input";
```

## 인터페이스

**인터페이스 선언**은 객체 타입의 이름을 지정하는 또 다른 방법입니다.

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

앞에서 타입 별칭을 사용했을 때와 마찬가지로, 이 예시는 익명 객체 타입을 사용한 것처럼 작동합니다. 타입스크립트는 `printCoord`에 전달한 값의 **구조**에만 관심이 있습니다. 예상되는 프로퍼티의 존재 여부에만 관심이 있습니다.

타입의 구조와 기능에만 관심을 가지기 때문에, 우리는 타입스크립트를 **구조적으로 타입이 지정된** 타입 시스템이라고 부릅니다.

## 타입 별칭과 인터페이스의 차이점

타입 별칭과 인터페이스는 매우 유사하며, 대부분의 경우 자유롭게 선택할 수 있습니다. `interface`의 거의 모든 기능은 `type`에서도 제공됩니다. 주요 차이점은 인터페이스는 항상 확장 가능한 반면, 타입은 새 프로퍼티를 추가하기 위해 다시 열 수 없다는 점입니다.

### 인터페이스

인터페이스 확장하기

```ts
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

기존 인터페이스에 새 필드 추가하기

```ts
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

### 타입

교집합을 통해 타입 확장하기

```ts
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

생성된 후에는 타입을 변경할 수 없습니다.

```ts
type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

// 오류: Duplicate identifier 'Window'.
```

이후의 장에서 이 개념에 대해 자세히 배우므로, 모든 내용을 바로 이해하지 못하더라도 걱정하지 마세요.

- 타입스크립트 버전 4.2 이전에서는 타입 별칭 이름이 동등한 익명 타입 대신 [오류 메시지에 나타날 수 있습니다](https://www.typescriptlang.org/ko/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWZWhfYAjABMAMwALA+gbsVjoADqgjKESytQPxCHghAByXigYgBfr8LAsYj8aQMUASbDQcRSExCeCwFiIQh+AKfAYyBiQFgOPyIaikSGLQo0Zj-aazaY+dSaXjLDgAGXgAC9CKhDqAALxJaw2Ib2RzOISuDycLw+ImBYKQflCkWRRD2LXCw6JCxS1JCdJZHJ5RAFIbFJU8ADKC3WzEcnVZaGYE1ABpFnFOmsFhsil2uoHuzwArO9SmAAEIsSFrZB-GgAjjA5gtVN8VCEc1o1C4Q4AGlR2AwO1EsBQoAAbvB-gJ4HhPgB5aDwem-Ph1TCV3AEEirTp4ELtRbTPD4vwKjOfAuioSQHuDXBcnmgACC+eCONFEs73YAPGGZVT5cRyyhiHh7AAON7lsG3vBggB8XGV3l8-nVISOgghxoLq9i7io-AHsayRWGaFrlFauq2rg9qaIGQHwCBqChtKdgRo8TxRjeyB3o+7xAA). 이는 바람직할 수도 있고 바람직하지 않을 수도 있습니다. 인터페이스는 항상 오류 메시지에 이름이 지정됩니다.
- 타입 별칭은 [선언 병합에 참여할 수 없지만 인터페이스는 참여할 수 있습니다](https://www.typescriptlang.org/ko/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).
- 인터페이스는 [객체의 모양을 선언하는 데만 사용할 수 있으며, 원시값의 이름을 바꾸는 데는 사용할 수 없습니다](https://www.typescriptlang.org/ko/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).
- 인터페이스 이름은 오류 메시지에 [**항상** 원래 형태로](https://www.typescriptlang.org/ko/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWY2Q-YAjABMAMwALA+gbsVjNXW8yxySoAADaAA0CCaZbPh1XYqXgOIY0ZgmcK0AA0nyaLFhhGY8F4AHJmEJILCWsgZId4NNfIgGFdcIcUTVfgBlZTOWC8T7kAJ42G4eT+GS42QyRaYbCgXAEEguTzeXyCjDBSAAQSE8Ai0Xsl0K9kcziExDeiQs1lAqSE6SyOTy0AKQ2KHk4p1V6s1OuuoHuzwArMagA) 나타나지만 이름으로 사용될 때만 나타납니다.

대부분의 경우 개인 취향에 따라 선택할 수 있으며, 다른 종류의 선언이 필요한 경우 타입스크립트에서 알려줍니다. 경험적 접근(휴리스틱)을 원한다면, `type`의 기능이 필요하기 전까지는 `interface`를 사용하세요.