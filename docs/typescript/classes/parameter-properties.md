---
sidebar_position: 9
---

# 매개변수 프로퍼티

타입스크립트는 생성자 매개변수를 동일한 이름과 값을 가진 클래스 프로퍼티로 전환하기 위한 특수 구문을 제공합니다. 이를 **매개변수 프로퍼티**라고 하며 가시성 수정자 `public`, `private`, `protected`, `readonly` 중 하나를 생성자 인수에 접두사로 추가하여 생성됩니다. 결과 필드는 해당 수정자를 가져옵니다.

```ts twoslash
// @errors: 2341
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // 본문이 필요 없습니다.
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
//            ^?
console.log(a.z);
```
