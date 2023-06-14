---
sidebar_position: 2
description: 트슈탄트와 유사한 라이브러리 비교하기
---

# 비교

트슈탄트는 리액트를 위한 많은 상태 관리 라이브러리 중 하나입니다. 이 페이지에서는 리덕스, 발티오, 죠타이, 리코일을 포함한 일부 라이브러리와 비교하여 트슈탄트에 대해 설명합니다.

각 라이브러리에는 고유한 장단점이 있는데, 우리는 각 라이브러리 간의 주요 차이점과 유사점을 비교해 볼 것입니다.

## 리덕스

### 상태 모델

개념적으로 트슈탄트와 리덕스는 매우 유사하며, 둘 다 불변 상태 모델을 기반으로 합니다. 그러나 리덕스에서는 앱이 컨텍스트 제공자에 래핑되어야 하지만 트슈탄트는 그렇지 않습니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

type Action = {
  type: keyof Actions
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  dispatch: (action: Action) => set((state) => countReducer(state, action)),
}))
```

**리덕스**

```ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // 리덕스 도구 모음은 상태를 변형하지 않으며 이머 라이브러리를 사용합니다.
      // 내부적으로는 '초안 상태'라는 것을 가질 수 있습니다.
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })
```

### 렌더링 최적화

앱 내에서 렌더링 최적화와 관련하여 트슈탄트와 리덕스 간에 접근 방식에는 큰 차이가 없습니다. 두 라이브러리 모두 선택기를 사용하여 렌더링 최적화를 수동으로 적용하는 것이 좋습니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  // ...
}
```

**리덕스**

```ts
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

type State = {
  count: number
}

type Action = {
  type: 'increment' | 'decrement'
  qty: number
}

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty }
    case 'decrement':
      return { count: state.count - action.qty }
    default:
      return state
  }
}

const countStore = createStore(countReducer)

const Component = () => {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  // ...
}
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: { value: 0 },
  reducers: {
    incremented: (state, qty: number) => {
      // 리덕스 도구 모음은 상태를 변형하지 않으며 이머 라이브러리를 사용합니다.
      // 내부적으로는 '초안 상태'라는 것을 가질 수 있습니다.
      state.value += qty
    },
    decremented: (state, qty: number) => {
      state.value -= qty
    },
  },
})

const countStore = configureStore({ reducer: countSlice.reducer })

const useAppSelector: TypedUseSelectorHook<typeof countStore.getState> =
  useSelector

const useAppDispatch: () => typeof countStore.dispatch = useDispatch

const Component = () => {
  const count = useAppSelector((state) => state.count.value)
  const dispatch = useAppDispatch()
  // ...
}
```

## 발티오

### 상태 모델

트슈탄트와 발티오가 상태 관리에 접근하는 방식은 근본적으로 다릅니다. 트슈탄트는 **불변** 상태 모델을 기반으로 하고, 발티오는 **가변** 상태 모델을 기반으로 합니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  obj: { count: number }
}

const store = create<State>(() => ({ obj: { count: 0 } }))

store.setState((prev) => ({ obj: { count: prev.obj.count + 1 } }))
```

**발티오**

```ts
import { proxy } from 'valtio'

const state = proxy({ obj: { count: 0 } })

state.obj.count += 1
```

### 렌더링 최적화

트슈탄트와 발티오의 또 다른 차이점은, 발티오가 프로퍼티 접근을 통해 렌더링을 최적화한다는 것입니다. 반면 트슈탄트에서는 선택기를 사용하여 렌더링 최적화를 수동으로 적용하는 것이 좋습니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

const useCountStore = create<State>(() => ({
  count: 0,
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  // ...
}
```

**발티오**

```ts
import { proxy, useSnapshot } from 'valtio'

const state = proxy({
  count: 0,
})

const Component = () => {
  const { count } = useSnapshot(state)
  // ...
}
```

## 죠타이

### 상태 모델

트슈탄트와 죠타이 사이에는 두 가지 주요 차이점이 있습니다. 먼저 트슈탄트는 단일 저장소인 반면, 죠타이는 함께 구성될 수 있는 원시 원자로 구성됩니다. 그리고 트슈탄트 저장소는 외부 저장소이므로 리액트 외부에서 접근해야 할 때 더 적합합니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  updateCount: (
    countCallback: (count: State['count']) => State['count']
  ) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))
```

**죠타이**

```ts
import { atom } from 'jotai'

const countAtom = atom<number>(0)
```

### 렌더링 최적화

죠타이는 원자 종속성을 통해 렌더링 최적화를 달성합니다. 그러나 트슈탄트에서는 선택기를 사용하여 렌더링 최적화를 수동으로 적용하는 것이 좋습니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  updateCount: (
    countCallback: (count: State['count']) => State['count']
  ) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const updateCount = useCountStore((state) => state.updateCount)
  // ...
}
```

**죠타이**

```ts
import { atom, useAtom } from 'jotai'

const countAtom = atom<number>(0)

const Component = () => {
  const [count, updateCount] = useAtom(countAtom)
  // ...
}
```

## 리코일

### 상태 모델

트슈탄트와 리코일의 차이점은 트슈탄트와 죠타이의 차이점과 유사합니다. 리코일은 원자 객체 참조 ID 대신 원자 문자열 키에 의존합니다. 또한 리코일은 컨텍스트 제공자에서 앱을 래핑해야 합니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  setCount: (countCallback: (count: State['count']) => State['count']) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  setCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))
```

**리코일**

```ts
import { atom } from 'recoil'

const count = atom({
  key: 'count',
  default: 0,
})
```

### 렌더링 최적화

앞의 최적화 비교와 유사하게, 리코일은 원자 종속성을 통해 렌더링 최적화를 수행합니다. 반면 트슈탄트에서는 선택기를 사용하여 렌더링 최적화를 수동으로 적용하는 것이 좋습니다.

**트슈탄트**

```ts
import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  setCount: (countCallback: (count: State['count']) => State['count']) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  setCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}))

const Component = () => {
  const count = useCountStore((state) => state.count)
  const setCount = useCountStore((state) => state.setCount)
  // ...
}
```

**리코일**

```ts
import { atom, useRecoilState } from 'recoil'

const countAtom = atom({
  key: 'count',
  default: 0,
})

const Component = () => {
  const [count, setCount] = useRecoilState(countAtom)
  // ...
}
```
