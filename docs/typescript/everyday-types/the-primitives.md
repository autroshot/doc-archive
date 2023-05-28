---
sidebar_position: 1
---

# 원시값: `string`, `number`, `boolean`

자바스크립트에는 매우 일반적으로 사용되는 세 가지 [원시값](https://developer.mozilla.org/ko/docs/Glossary/Primitive)이 있습니다. `string`, `number`, `boolean`입니다. 각각은 타입스크립트에 해당하는 타입이 있습니다. 예상할 수 있듯이, 이러한 타입의 값에 자바스크립트의 `typeof` 연산자를 사용할 때 표시되는 것과 동일한 이름입니다.

- `string`은 `"Hello, world"`와 같은 문자열 값을 나타냅니다.
- `number`는 `42`와 같은 숫자를 의미합니다. 자바스크립트는 정수에 대한 특별한 런타임 값이 없으며 `int`나 `float`에 해당하는 것이 없습니다. 모든 것이 단순히 `number`입니다.
- `boolean`은 두 값, `true`와 `false`를 의미합니다.

:::caution

`String`, `Number`, `Boolean`과 같이 대문자로 시작하는 타입 이름은 유효하지만 특수한 내장 타입을 참조합니다. 이들은 거의 사용하지 않습니다. 항상 타입에 `string`, `number`, `boolean`을 사용하세요.

:::