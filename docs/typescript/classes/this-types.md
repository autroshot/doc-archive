---
sidebar_position: 8
---

# `this` 타입

클래스에서 `this`라는 특별한 타입은 현재 클래스의 타입을 **동적**으로 참조합니다. 이것이 어떻게 유용한지 알아보겠습니다.

```ts twoslash
class Box {
  contents: string = "";
  set(value: string) {
//  ^?
    this.contents = value;
    return this;
  }
}
```

여기서 타입스크립트는 `set`의 반환 타입을 `Box`가 아닌 `this`로 추론했습니다. 이제 `Box`의 하위 클래스를 만들어 보겠습니다.

```ts twoslash
class Box {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}
// ---cut---
class ClearableBox extends Box {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const b = a.set("hello");
//    ^?
```

매개변수 타입 주석에서도 `this`를 사용할 수 있습니다.

```ts twoslash
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
```

이는 `other: Box`를 작성하는 것과 다릅니다. 파생 클래스의 `sameAs` 메서드는 이제 동일한 파생 클래스의 다른 인스턴스만 허용합니다.

```ts twoslash
// @errors: 2345
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base);
```

## `this` 기반 타입 가드

클래스와 인터페이스 메서드의 반환 위치에서 `this is Type`을 사용할 수 있습니다. `if`문 같은 타입 좁히기와 혼합되면 대상 객체의 타입이 지정된 `Type`으로 좁혀집니다.

```ts twoslash
// @strictPropertyInitialization: false
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;
// ^?
} else if (fso.isDirectory()) {
  fso.children;
// ^?
} else if (fso.isNetworked()) {
  fso.host;
// ^?
}
```

`this` 기반 타입 가드의 일반적인 사용 사례는 특정 필드의 느린 유효성 검사를 허용하는 것입니다.

예를 들어 다음 사례는 `hasValue`가 참으로 확인되었을 때 `Box` 안의 값에서 `undefined`가 제거됩니다.

```ts twoslash
class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box();
box.value = "Gameboy";

box.value;
//  ^?

if (box.hasValue()) {
  box.value;
  //  ^?
}
```
