---
sidebar_position: 2
---

# 선언 참고

이 안내서의 목적은 고품질 정의 파일을 작성하는 방법을 알려주는 것입니다. 이 안내서는 일부 API에 대한 문서와 예시를 보여주고 해당 선언을 작성하는 방법을 설명합니다.

예시는 뒤로 갈수록 복잡도가 대략적으로 증가합니다.

## 프로퍼티가 있는 객체

**문서**

전역 변수 `myLib`에는 인사말을 만드는 `makeGreeting` 함수와 지금까지 만든 인사말 수를 나타내는 `numberOfGreetings` 프로퍼티가 있습니다.

**코드**

```ts
let result = myLib.makeGreeting("hello, world");
console.log("The computed greeting is:" + result);

let count = myLib.numberOfGreetings;
```

**선언**

`declare namespace`를 사용하여 점 표기법으로 접근하는 타입이나 값을 묘사합니다.

```ts
declare namespace myLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}
```

## 다중 정의된 함수

**문서**

`getWidget` 함수는 숫자를 받아 위젯을 반환하거나 문자열을 받아 위젯 배열을 반환합니다.

**코드**

```ts
let x: Widget = getWidget(43);

let arr: Widget[] = getWidget("all of them");
```

**선언**

```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

## 재사용 가능한 타입 (인터페이스)

**문서**

인사말을 지정할 때 `GreetingSettings` 객체를 전달해야 합니다. 이 객체에는 다음과 같은 프로퍼티가 있습니다.

1. 인사말 - 필수 문자열
2. 기간 - 선택적 시간 길이 (밀리초)
3. 색상 - 선택적 문자열 (예: '#ff00ff')

**코드**

```ts
greet({
  greeting: "hello world",
  duration: 4000
});
```

**선언**

프로퍼티가 있는 타입을 정의하려면 `interface`를 사용하세요.

```ts
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}

declare function greet(setting: GreetingSettings): void;
```

## 재사용 가능한 타입 (타입 별칭)

**문서**

인사말이 필요한 곳에서 `string`, `string`을 반환하는 함수, `Greeter` 인스턴스를 전달할 수 있습니다.

**코드**

```ts
function getGreeting() {
  return "howdy";
}
class MyGreeter extends Greeter {}

greet("hello");
greet(getGreeting);
greet(new MyGreeter());
```

**선언**

타입 별칭을 사용하여 타입에 대한 약칭을 만들 수 있습니다.

```ts
type GreetingLike = string | (() => string) | MyGreeter;

declare function greet(g: GreetingLike): void;
```

## 타입 구성하기

**문서**

`greeter` 객체는 파일에 기록하거나 경고를 표시할 수 있습니다. `.log(...)`에 `LogOptions`을 전달하고 `.alert(...)`에 경고 옵션을 전달할 수 있습니다.

**코드**

```ts
const g = new Greeter("Hello");
g.log({ verbose: true });
g.alert({ modal: false, title: "Current Greeting" });
```

**선언**

이름공간을 사용하여 타입을 구성합니다.

```ts
declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean;
  }
  interface AlertOptions {
    modal: boolean;
    title?: string;
    color?: string;
  }
}
```

하나의 선언에서 중첩된 이름공간을 만들 수도 있습니다.

```ts
declare namespace GreetingLib.Options {
  // `GreetingLib.Options.Log`를 통해 참조합니다.
  interface Log {
    verbose?: boolean;
  }
  interface Alert {
    modal: boolean;
    title?: string;
    color?: string;
  }
}
```

## 클래스

**문서**

`Greeter` 객체를 인스턴스화하여 인사를 만들거나 객체에서 확장하여 커스텀 인사를 만들 수 있습니다.

**코드**

```ts
const myGreeter = new Greeter("hello, world");
myGreeter.greeting = "howdy";
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
  constructor() {
    super("Very special greetings");
  }
}
```

**선언**

`declare class`를 사용하여 클래스 또는 클래스와 유사한 객체를 묘사합니다. 클래스는 생성자뿐만 아니라 프로퍼티와 메서드도 가질 수 있습니다.

```ts
declare class Greeter {
  constructor(greeting: string);

  greeting: string;
  showGreeting(): void;
}
```

## 전역 변수

**문서**

전역 변수 `foo`는 존재하는 위젯의 수를 포함합니다.

**코드**

```ts
console.log("Half the number of widgets is " + foo / 2);
```

**선언**

`declare var`를 사용하여 변수를 선언합니다. 변수가 읽기 전용이면 `declare const`를 사용할 수 있습니다. 변수가 블록 범위인 경우에는 `declare let`을 사용할 수도 있습니다.

```ts
/** 존재하는 위젯의 수 */
declare var foo: number;
```

## 전역 함수

**문서**

문자열로 `greet` 함수를 호출하여 사용자에게 인사말을 표시할 수 있습니다.

**코드**

```ts
greet("hello, world");
```

**선언**

함수를 선언하려면 `declare function`을 사용하세요.

```ts
declare function greet(greeting: string): void;
```
