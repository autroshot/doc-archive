---
sidebar_position: 2
---

# 문서

## 시작하기

스키마는 파싱 작업(변환)과 입력 값에 대한 단언(테스트)으로 구성됩니다. 입력 값의 유효성을 검사하여 파싱하고 설정된 단언문 집합을 실행합니다. 메서드를 연쇄하여 스키마를 구축합니다.

```typescript
import { object, string, number, date, InferType } from 'yup';

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

// 파싱하고 단언문에 대한 유효성 검사를 실시합니다.
const user = await userSchema.validate(await fetchUser());

type User = InferType<typeof userSchema>;
/* {
  name: string;
  age: number;
  email?: string | undefined
  website?: string | null | undefined
  createdOn: Date
}*/
```

스키마를 사용하여 입력 값을 올바른 타입으로 강제 변환하거나 **캐스팅(cast)**하고, 선택적으로 추가 단언문 없이 해당 값을 보다 구체적인 값으로 변환합니다.

```typescript
// 값을 올바른 타입으로 강제로 변환하는 것을 시도합니다.
const parsedUser = userSchema.cast({
  name: 'jimmy',
  age: '24',
  createdOn: '2014-09-23T19:25:25Z',
});
// ✅ { name: 'jimmy', age: 24, createdOn: Date }
```

입력 값이 이미 파싱된 상태라면 입력 값의 유효성을 **엄격하게** 확인하고 파싱 논리 실행 비용을 아낄 수 있습니다.

```typescript
// ❌ 유효성 검사 오류 "age is not a number"
const parsedUser = await userSchema.validate(
  {
    name: 'jimmy',
    age: '24',
  },
  { strict: true }
);
```

## 스키마 기본

스키마 정의는 입력을 원하는 모양과 타입으로 조작하는 **변환** 파싱, 파싱된 데이터에 대한 단언문을 만드는 **테스트**로 구성됩니다. 스키마는 또한 오류 메시지를 개선하거나, 스키마를 동적으로 사용하는 도구를 빌드하거나, 스키마를 다른 형식으로 직렬화하는 데 사용할 수 있는, 스키마 자체에 대한 세부 정보인 **메타데이터**를 저장합니다.

유연성을 위해 특정 요구 사항에 맞게 파싱과 단언문을 별도로 실행하는 것도 가능합니다.

### 파싱: 변환

각 내장 타입은 JSON과 같은 직렬화된 데이터를 파싱할 때 편리한 기본 타입 파싱을 구현합니다. 또한 타입은 가능한 타입별 변환을 구현합니다.

```typescript
const num = number().cast('1'); // 1

const obj = object({
  firstName: string().lowercase().trim(),
})
  .camelCase()
  .cast('{"first_name": "jAnE "}'); // { firstName: 'jane' }
```

사용자 정의 변환을 추가하는 것도 가능합니다.

```typescript
const reversedString = string()
  .transform((currentValue) => currentValue.split('').reverse().join(''))
  .cast('dlrow olleh'); // "hello world"
```

변환은 이전 변환의 값이 다음 변환으로 파이프되는 **파이프라인**을 형성합니다. 최종 값이 `undefined`이면 엽은 설정된 스키마 기본값을 적용합니다.

:::caution

값은 변환 함수에서 유효한 타입으로 보장되지 않습니다. 이전 변환이 실패했을 수 있습니다. 예를 들어 숫자 변환은 입력 값으로 `NaN`이나 숫자를 받을 수 있습니다.

:::

### 유효성 검사: 테스트

엽은 입력 값에 대한 단언문, 즉 테스트를 강력하게 지원합니다. 테스트는 입력이 어떤 기준을 준수한다고 단언합니다. 테스트는 입력(또는 해당 타입)을 변경하지 않는다는 점에서 변환과 구별되며, 일반적으로 불가능하지는 않더라도 정적 타입으로 표현하기 어려운 검사를 위해 예약됩니다.

```typescript
string()
  .min(3, 'must be at least 3 characters long')
  .email('must be a valid email')
  .validate('no'); // ValidationError
```

변환과 마찬가지로 테스트를 즉석에서 사용자 정의할 수 있습니다.

```typescript
const jamesSchema = string().test(
  'is-james',
  (d) => `${d.path} is not James`,
  (value) => value == null || value === 'James'
);

jamesSchema.validateSync('James'); // "James"

jamesSchema.validateSync('Jane'); // ValidationError "this is not James"
```

:::note 참고

변환과 달리 사용자 정의 테스트의 `value`는 올바른 타입(이 경우 선택적 문자열)이 보장됩니다. 이 값은 스키마에 따라 `undefined`나 `null`이 될 수 있으며, 변환이 존재 관련 단언을 하지 않는 한 존재하지 않는 값에 대해 `true`를 반환할 수 있습니다.

:::

#### 오류 사용자 정의하기

가장 간단한 경우, 테스트 함수는 검사의 통과 여부에 따라 `true`나 `false`를 반환합니다. 테스트가 실패하면 엽은 해당 테스트에 대한 (기본) 메시지와 함께 [`ValidationError`](https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string)를 던집니다. `ValidationErrors`에는 테스트 이름, 호출된 인수 (존재하는 경우), 중첩 유효성 검사의 경우에는 실패한 필드의 경로 등 테스트에 대한 많은 메타데이터가 포함되어 있습니다.

오류 메시지는 스키마 실패 방식을 사용자 정의하기 위해 즉석에서 만드는 것도 가능합니다.

```typescript
const order = object({
  no: number().required().
  sku: string().test({
    name: 'is-sku',
    skipAbsent: true,
    test(value, ctx) {
      if (!value.startsWith('s-')) {
        return ctx.createError({ message: 'SKU missing correct prefix' })
      }
      if (!value.endsWith('-42a')) {
        return ctx.createError({ message: 'SKU missing correct suffix' })
      }
      if (value.length < 10) {
        return ctx.createError({ message: 'SKU is not the right length' })
      }
      return true
    }
  })
})

order.validate({ no: 1234, sku: 's-1a45-14a' })
```

### 합성 및 재사용

스키마는 변경할 수 없으며 각 메서드 호출은 새 스키마 개체를 반환합니다. 다른 인스턴스 변경에 대한 걱정 없이 재사용하고 전달할 수 있습니다.

```typescript
const optionalString = string().optional();

const definedString = optionalString.defined();

const value = undefined;
optionalString.isValid(value); // true
definedString.isValid(value); // false
```

## 타입스크립트 통합

엽 스키마는 정적 타입스크립트 인터페이스를 생성합니다. `InferType`을 사용해 해당 인터페이스를 추출할 수 있습니다.

```typescript
import * as yup from 'yup';

const personSchema = yup.object({
  firstName: yup.string().defined(),
  nickName: yup.string().default('').nullable(),
  sex: yup
    .mixed()
    .oneOf(['male', 'female', 'other'] as const)
    .defined(),
  email: yup.string().nullable().email(),
  birthDate: yup.date().nullable().min(new Date(1900, 0, 1)),
});

interface Person extends yup.InferType<typeof personSchema> {
  // 타입 대신 인터페이스를 사용하는 것이 일반적으로 더 나은 편집기 피드백을 제공합니다.
}
```

### 스키마 기본값

캐스팅이 `undefined` 출력 값을 생성할 때 스키마의 기본값이 사용됩니다. 따라서 기본값을 설정하면 스키마의 출력 타입에 영향을 미치며 기본적으로 `defined()`로 표시합니다.

```typescript
import { string } from 'yup';

const value: string = string().default('hi').validate(undefined);

// vs

const value: string | undefined = string().validate(undefined);
```

### 스키마가 기존 타입과 일치하는지 확인하기

어떤 경우에는 타입스크립트 타입이 이미 존재하며 스키마가 호환 가능한 타입을 생성하는지 확인하고 싶을 수 있습니다.

```typescript
import { object, number, string, ObjectSchema } from 'yup';

interface Person {
  name: string;
  age?: number;
  sex: 'male' | 'female' | 'other' | null;
}

// 스키마가 유효한 사용자를 생성하지 않으면 컴파일 타임에 타입 오류가 발생합니다.
const schema: ObjectSchema<Person> = object({
  name: string().defined(),
  age: number().optional(),
  sex: string<'male' | 'female' | 'other'>().nullable().defined();
});

// ❌ 오류:
// "Type 'number | undefined' is not assignable to type 'string'."
const badSchema: ObjectSchema<Person> = object({
  name: number(),
});
```

### 새로운 메서드로 내장 스키마 확장하기

원한다면 타입스크립트의 인터페이스 병합 작동을 사용하여 스키마 타입을 확장할 수 있습니다. 타입 확장은 `globals.d.ts`와 같은 주변 타입 정의 파일에 있어야 합니다. 앱 코드에서 엽 타입을 실제로 확장하는 것을 잊지 말아야 합니다.

:::caution

병합은 제네릭을 포함하여 타입 정의가 정확히 동일한 경우에만 작동합니다. 각 타입에 대한 엽 소스 코드를 참조하여 올바르게 정의하고 있는지 확인해야 합니다.

:::

```typescript title="globals.d.ts"
declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    append(appendStr: string): this;
  }
}
```

```typescript title="app.ts"
import { addMethod, string } from 'yup';

addMethod(string, 'append', function append(appendStr: string) {
  return this.transform((value) => `${value}${appendStr}`);
});

string().append('~~~~').cast('hi'); // 'hi~~~~'
```

### 타입스크립트 설정

형식 추론이 작동하려면 `strictNullChecks` 컴파일러 옵션이 활성화되어 있어야 합니다.

또한 기능적으로 더 나은 타입을 위해 `strictFunctionTypes`을 `false`로 설정하는 것이 좋습니다. 이렇게 하면 전반적인 건전성이 감소하지만 타입스크립트는 이미 메서드와 생성자에 대한 이 검사를 비활성화합니다. (TS 문서 참고)

:::note 참고

이 기능을 개발하는 동안 DOM의 일부를 포함하여 본질적으로 안전하지 않은 클래스 계층 구조를 많이 발견했습니다. 따라서 이 설정은 메서드 문법이 아닌 함수 문법으로 작성된 함수에만 적용됩니다.

:::

이득은 다양할 수 있지만, 이 검사가 실제 버그를 많이 방지하지는 못하면서 앱에서 번거로운 명시적 타입 캐스팅의 양을 증가시키는 것으로 보입니다.

## 오류 메시지 사용자 정의하기

기본 오류 메시지는 유효성 검사 테스트에 제공된 메시지가 없을 때 사용자 정의할 수 있습니다. 사용자 정의 사전에 메시지가 누락된 경우 오류 메시지는 기본적으로 엽의 것으로 표시됩니다.

```typescript
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Não é válido',
  },
  number: {
    min: 'Deve ser maior que ${min}',
  },
});

// 이제 사용자 정의 사전을 정의한 후에 엽 스키마를 사용한다.
let schema = yup.object().shape({
  name: yup.string(),
  age: yup.number().min(18),
});

try {
  await schema.validate({ name: 'jimmy', age: 11 });
} catch (err) {
  err.name; // => 'ValidationError'
  err.errors; // => ['Deve ser maior que 18']
}
```

### 현지화 및 i18n

엽은 다국어를 지원합니다. `setLocale` 함수는 번역 키와 값으로 오류 객체를 생성하는 데 사용하는 함수를 인수로 받습니다. 생성된 오류 객체를 원하는 i18n 라이브러리에 넣을 수 있습니다.

```typescript
import { setLocale } from 'yup';

setLocale({
  // 값이 없는 메시지에 대한 일정한 번역 키를 사용합니다.
  mixed: {
    default: 'field_invalid',
  },
  // 함수를 사용하여 스키마에서 값을 포함한 오류 객체를 생성합니다.
  number: {
    min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
    max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
  },
});

// ...

let schema = yup.object().shape({
  name: yup.string(),
  age: yup.number().min(18),
});

try {
  await schema.validate({ name: 'jimmy', age: 11 });
} catch (err) {
  messages = err.errors.map((err) => i18next.t(err.key));
}
```
