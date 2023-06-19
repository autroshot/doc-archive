---
sidebar_position: 3
---

# 플럭스에서 영감을 받은 실습

트슈탄트는 독단적이지 않은 라이브러리이지만 권장하는 몇 가지 패턴이 있습니다.

- 단일 저장소 생성하기
- 저장소를 정의할 때 항상 `set`을 사용하기
- 저장소의 루트 수준에서 발송 함수를 정의하여 하나 이상의 저장소 조각을 갱신하기

```js
const useBoundStore = create((set) => ({
  storeSliceA: ...,
  storeSliceB: ...,
  storeSliceC: ...,
  dispatchX: () => set(...),
  dispatchY: () => set(...),
}))
```

별도의 조각으로 저장소를 정의하는 방법은 [저장소를 별도의 조각으로 분할하기](https://docs.pmnd.rs/zustand/guides/slices-pattern)를 참고하세요.

## 플럭스 유사 패턴, 발송 작업

리덕스와 같은 변환기(reducer) 없이는 살 수 없다면 다음과 같이 저장소의 루트 수준에서 `dispatch` 함수를 정의할 수 있습니다.

```typescript
const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by }
    case types.decrease:
      return { grumpiness: state.grumpiness - by }
  }
}

const useGrumpyStore = create((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}))

const dispatch = useGrumpyStore((state) => state.dispatch)
dispatch({ type: types.increase, by: 2 })
```

리덕스 미들웨어를 사용할 수도 있습니다. 이것은 주 변환기를 연결하고, 초기 상태를 설정하고, 상태 자체와 기본 API에 발송 함수를 추가합니다.

```typescript
import { redux } from 'zustand/middleware'

const useReduxStore = create(redux(reducer, initialState))
```

저장소를 갱신하는 또 다른 방법은 상태 함수를 래핑하는 함수를 통하는 것입니다. 이는 또한 작업의 부작용을 처리할 수 있습니다. 예를 들어 HTTP 호출을 사용할 수 있습니다. 리액트 없이 트슈탄트를 사용하려면 [리드미](https://github.com/pmndrs/zustand#readingwriting-state-and-reacting-to-changes-outside-of-components)를 참고하세요.