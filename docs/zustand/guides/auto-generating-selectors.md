---
sidebar_position: 4
---

# 선택기 자동 생성하기

저장소에서 프로퍼티나 작업을 사용할 때 선택기를 사용하는 것이 좋습니다. 다음과 같이 저장소에서 값에 접근할 수 있습니다.

```typescript
const bears = useBearStore((state) => state.bears)
```

그러나 이런 코드를 작성하는 것은 지루할 수 있습니다. 원한다면 선택기를 자동으로 생성할 수 있습니다.

## `createSelectors` 함수 만들기

```typescript
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
```

다음과 같은 저장소가 있다고 가정해 보겠습니다.

```typescript
interface BearState {
  bears: number
  increase: (by: number) => void
  increment: () => void
}

const useBearStoreBase = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}))
```

앞의 함수를 저장소에 적용합니다.

```typescript
const useBearStore = createSelectors(useBearStoreBase)
```

이제 선택기가 자동으로 생성되어 직접 접근할 수 있습니다.

```typescript
// 프로퍼티 가져오기
const bears = useBearStore.use.bears()

// 작업 가져오기
const increase = useBearStore.use.increment()
```

## 라이브 데모

작동하는 예시는 [코드 샌드박스](https://codesandbox.io/s/zustand-auto-generate-selectors-forked-rl8v5e?file=/src/selectors.ts)를 참고하세요.

## 타사 라이브러리

- [auto-zustand-selectors-hook](https://github.com/Albert-Gao/auto-zustand-selectors-hook)
- [react-hooks-global-state](https://github.com/dai-shi/react-hooks-global-state)
- [zustood](https://github.com/udecode/zustood)