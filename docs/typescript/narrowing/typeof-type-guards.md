---
sidebar_position: 1
---

# `typeof` 타입 가드

앞에서 봤듯이, 자바스크립트는 런타임에 값의 타입에 대한 매우 기본적인 정보를 제공할 수 있는 `typeof` 연산자를 제공합니다. 타입스크립트는 해당 연산자가 다음의 문자열을 반환할 것을 예상합니다.

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

앞의 `padLeft`에서 봤듯이 이 연산자는 자바스크립트 라이브러리에 자주 등장합니다. 타입스크립트는 이를 여러 분기의 좁은 타입으로 이해할 수 있습니다.

타입스크립트에서는 `typeof`에서 반환된 값을 확인하는 것이 타입 가드입니다. 타입스크립트는 `typeof`가 여러 값에서 작동하는 방식을 그대로 인코딩하므로 자바스크립트의 이상한 작동 방식을 그대로 갖습니다. 예를 들어 위의 `typeof` 반환 목록에 `"null"`이 없다는 점을 주목해야 합니다.

다음 예시를 확인하세요.

```ts twoslash
// @errors: 2531 18047
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // 아무것도 하지 않습니다.
  }
}
```

`strs`가 배열 타입인지 확인하기 위해 `strs`가 객체인지 확인했습니다. 자바스크립트에서 배열은 객체이기 때문입니다. 하지만 자바스크립트에서 `typeof null`은 `"object"`를 반환합니다. 이는 자바스크립트 역사의 불행한 사고 중 하나입니다.

경험이 많지 않은 개발자는 이 문제를 처음 봤을 수도 있습니다. 다행히 타입스크립트는 `strs`가 `string[]`이 아닌 `string[] | null`로 좁혀졌을 뿐이라는 것을 알 수 있습니다.