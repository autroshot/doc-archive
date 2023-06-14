---
sidebar_position: 2
---

# 불변 상태와 병합하기

리액트의 `useState`와 마찬가지로, 우리는 상태를 불변으로 갱신해야 합니다.

다음은 일반적인 예시입니다.

```jsx
import { create } from 'zustand'

const useCountStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
```

`set` 함수는 저장소에서 상태를 갱신하는 것입니다. 상태는 불변이므로 다음과 같아야 합니다.

```js
set((state) => ({ ...state, count: state.count + 1 }))
```

그러나 이는 일반적인 패턴이므로 `set`은 실제로 상태를 병합합니다. 따라서 `...state` 부분은 생략할 수 있습니다.

```js
set((state) => ({ count: state.count + 1 }))
```

## 중첩된 객체

`set` 함수는 하나의 수준에서만 상태를 병합합니다. 중첩된 객체의 경우에는 명시적인 병합이 필요합니다. 다음과 같이 전개 연산자 패턴을 사용합니다.

```jsx
import { create } from 'zustand'

const useCountStore = create((set) => ({
  nested: { count: 0 },
  inc: () =>
    set((state) => ({
      nested: { ...state.nested, count: state.nested.count + 1 },
    })),
}))
```

복잡한 사용 사례의 경우, 불변 갱신에 도움이 되는 일부 라이브러리를 사용하는 것이 좋습니다. [중첩된 상태 객체 값 갱신하기](./updation-state.md#깊게-중첩된-객체)를 참고할 수 있습니다.

## 플래그 바꾸기

병합 동작을 비활성화하려면, 다음과 같이 `set`에 `replace` 불린 값을 지정할 수 있습니다.

```js
set((state) => newState, true)
```

