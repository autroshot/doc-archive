---
sidebar_position: 5
---

# 정적 블록

정적 블록을 사용하면 해당 클래스 내의 `private` 필드에 접근할 수 있는 자체 스코프가 있는 일련의 명령문을 작성할 수 있습니다. 즉, 명령문 작성의 모든 기능을 사용하고, 변수 누락 없이, 클래스 내부에 대한 완전한 접근 권한을 가지고, 초기화 코드를 작성할 수 있습니다.

```ts twoslash
declare function loadLastInstances(): any[]
// ---cut---
class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```
