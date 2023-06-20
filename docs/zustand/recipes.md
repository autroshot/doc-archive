---
sidebar_position: 4
description: 트슈탄트로 필요한 모든 것을 수행하는 방법
---

# 조리법

## 모든 것을 가져오기

모든 것을 가져올 수 있습니다. 하지만 모든 상태 변경에서 컴포넌트가 갱신된다는 점을 명심하세요!

```jsx
const state = useStore()
```

## 여러 상태 조각 선택하기

기본적으로 엄격한 동등성(`old === new`)으로 변경 사항을 감지합니다. 이는 원자 상태 선택에 효율적입니다.

```jsx
const nuts = useStore((state) => state.nuts)
const honey = useStore((state) => state.honey)
```

리렌더링을 보다 효과적으로 제어하기 위해, 두 번째 인수에 대체 동등 함수를 제공할 수 있습니다.

```jsx
const treats = useStore(
  (state) => state.treats,
  (oldTreats, newTreats) => compare(oldTreats, newTreats)
)
```

예를 들어 리덕스의 `mapStateToProps`와 유사하게, 내부에 여러 상태 선택이 있는 단일 객체를 구성하고 싶다면, `shallow` 동등 함수를 전달하여 객체가 얕게 확산되기를 원한다고 트슈탄트에게 말할 수 있습니다.

```jsx
import { shallow } from 'zustand/shallow'

// 객체 선택. `state.nuts`이나 `state.honey`가 변경될 때 컴포넌트를 다시 렌더링합니다.
const { nuts, honey } = useStore(
  (state) => ({ nuts: state.nuts, honey: state.honey }),
  shallow
)

// 배열 선택. `state.nuts`이나 `state.honey`가 변경될 때 컴포넌트를 다시 렌더링합니다.
const [nuts, honey] = useStore((state) => [state.nuts, state.honey], shallow)

// 매핑 선택. `state.treats`의 순서, 개수, 키가 변경될 때 컴포넌트를 다시 렌더링합니다.
const treats = useStore((state) => Object.keys(state.treats), shallow)
```

## 여러 저장소에서 가져오기

원하는 만큼 저장소를 만들 수 있으므로, 후속 선택기에 결과를 전달하는 것은 자연스러운 일입니다.

```jsx
const currentBear = useCredentialsStore((state) => state.currentBear)
const bear = useBearStore((state) => state.bears[currentBear])
```

## 상태 덮어쓰기

`set` 함수에는 기본값이 `false`인 두 번째 인수가 있습니다. 이를 설정하면 병합하는 대신 상태 모델을 대체합니다. 작업처럼 의존성이 있는 부분이 지워지지 않도록 주의하세요.

```jsx
import omit from 'lodash-es/omit'

const useStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // 작업을 포함한 전체 저장소를 지웁니다.
  deleteTuna: () => set((state) => omit(state, ['tuna']), true),
}))
```

## 비동기 작업

준비가 되었을 때 `set`을 호출하기만 하면, 트슈탄트는 작업의 비동기 여부를 신경 쓰지 않습니다.

```jsx
const useStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))
```

## 작업에서 상태 읽기

`set`은 함수적 갱신인 `set(state => result)`를 허용하지만, 여전히 `get`을 통해 set 외부에서 상태에 접근하는 것도 가능합니다.

```jsx
const useStore = create((set, get) => ({
  sound: 'grunt',
  action: () => {
    const sound = get().sound
    // ...
  },
}))
```

## 컴포넌트 외부에서 상태 읽기/쓰기, 변경에 반응하기

비반응적 방식으로 상태에 접근하거나 저장소에 따라 작업을 수행해야 하는 경우가 있습니다. 이를 위해 결과 훅에는 프로토타입에 연결된 유틸리티 함수가 있습니다.

선택기로 구독해야 한다면, `subscribeWithSelector` 미들웨어가 도움이 될 것입니다. 이 미들웨어를 사용하면 구독은 추가 서명을 수락합니다.

```jsx
subscribe(selector, callback, options?: { equalityFn, fireImmediately }): Unsubscribe
```

```jsx
import { create } from 'zustand'
import { subscribeWithSelector, shallow } from 'zustand/middleware'
const useStore = create(
  subscribeWithSelector(() => ({ paw: true, snout: true, fur: true }))
)

// 비반응적으로 새로운 상태를 얻습니다.
const paw = useStore.getState().paw
// 모든 변경 사항을 듣고 변경마다 실행됩니다.
const unsub1 = useStore.subscribe(console.log)
// 선택된 변경 사항을 듣습니다. 이 경우에는 `paw`의 변경입니다.
const unsub2 = useStore.subscribe((state) => state.paw, console.log)
// 구독은 선택적 동등 함수도 지원합니다.
const unsub3 = useStore.subscribe(
  (state) => [state.paw, state.fur],
  console.log,
  { equalityFn: shallow }
)
// 구독은 또한 이전 값도 노출합니다.
const unsub4 = useStore.subscribe(
  (state) => state.paw,
  (paw, previousPaw) => console.log(paw, previousPaw)
)
// 상태를 갱신하면 수신기가 트리거됩니다.
useStore.setState({ paw: false })
useStore.setState({ snout: false })
// 수신기 구독 취소하기
unsub1()
unsub2()
unsub3()
unsub4()
// 저장소 파괴하기 (모든 수신기 제거)
useStore.destroy()

// 물론 평소처럼 훅을 사용할 수도 있습니다.
function Component() {
  const paw = useStore((state) => state.paw)
  // ...
}
```

## 리액트 없이 트슈탄트 사용하기

트슈탄트의 핵심 부분은 리액트 종속성 없이 가져와 사용할 수 있습니다. 유일한 차이점은 생성 함수가 훅을 반환하지 않고 API 유틸리티를 반환한다는 것입니다.

```jsx
import { createStore } from 'zustand/vanilla'

const store = createStore(() => ({ ... }))
const { getState, setState, subscribe, destroy } = store
```

기존 바닐라 저장소를 리액트와 함께 사용할 수도 있습니다.

```jsx
import { create } from 'zustand'
import { vanillaStore } from './vanillaStore'

const useStore = create(vanillaStore)
```

## 임시 갱신 (빈번한 상태 변경용)

`subscribe` 함수를 사용하면 컴포넌트가 변경 사항을 다시 렌더링하지 않고도 상태 부분에 바인딩할 수 있습니다. 마운트 해제 시 자동 구독 취소를 위해 `useEffect`와 결합하는 것이 가장 좋습니다. 보기를 직접 변경할 수 있는 경우, 성능에 [심각한](https://codesandbox.io/s/peaceful-johnson-txtws) 영향을 미칠 수 있습니다.

```jsx
const useScratchStore = create(set => ({ scratches: 0, ... }))

function Component() {
  // 초기 상태 가져오기
  const scratchRef = useRef(useScratchStore.getState().scratches)
  // 마운트 시 저장소에 연결하기, 마운트 해제 시 연결 끊기, 참조에서 상태 변경을 포착하기
  useEffect(() => useScratchStore.subscribe(
    (state) => (scratchRef.current = state.scratches)
  ), [])
  // ...
}
```

## 변환기와 중첩 상태 변경이 지겹다면 이머를 사용하세요!

중첩 구조를 줄이는 것은 번거로운 일입니다. [이머](https://github.com/immerjs/immer)를 사용해 본 적이 있나요?

```jsx
import produce from 'immer'

const useStore = create((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  set: (fn) => set(produce(fn)),
}))

const set = useStore((state) => state.set)
set((state) => {
  state.lush.forest.contains = null
})
```

## 미들웨어

원하는 방식으로 저장소를 기능적으로 구성할 수 있습니다.

```jsx
// 상태가 변경될 때마다 기록하기
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('  applying', args)
      set(args)
      console.log('  new state', get())
    },
    get,
    api
  )

// `set` 메서드를 이머 프록시로 전환하기
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api)

const useStore = create(
  log(
    immer((set) => ({
      bees: false,
      setBees: (input) => set((state) => void (state.bees = input)),
    }))
  )
)
```

### 미들웨어를 파이프로 연결하는 방법

```js
import { create } from 'zustand'
import produce from 'immer'
import pipe from 'ramda/es/pipe'

/* 이전 예시의 로그와 이머 함수 */
/* 원하는 만큼 미들웨어를 파이프로 연결할 수 있습니다. */
const createStore = pipe(log, immer, create)

const useStore = createStore((set) => ({
  bears: 1,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}))

export default useStore
```

TS 예시는 [토론](https://github.com/pmndrs/zustand/discussions/224#discussioncomment-118208)을 참고하세요.

### 타입스크립트에서 이머 미들웨어를 타이핑하는 방법

```ts
import { State, StateCreator } from 'zustand'
import produce, { Draft } from 'immer'

// 이머 V8 이하
const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as (state: T) => T), get, api)

// 이머 V9
const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api)
```

## 영속 미들웨어

모든 종류의 스토리지를 사용하여 저장소의 데이터를 유지할 수 있습니다.

```jsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage', // 고유한 이름
      getStorage: () => sessionStorage, // (선택 사항) 기본적으로 `localStorage`가 사용됩니다.
    }
  )
)
```

## 리덕스와 같은 변환기와 작업 유형 없이는 살 수 없나요?

```jsx
const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by }
    case types.decrease:
      return { grumpiness: state.grumpiness - by }
  }
}

const useStore = create((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}))

const dispatch = useStore((state) => state.dispatch)
dispatch({ type: types.increase, by: 2 })
```

또는 `redux` 미들웨어를 사용하세요. 이것은 주 변환기를 연결하고, 초기 상태를 설정하고, 상태 자체와 기본 API에 발송 함수를 추가합니다.

```jsx
import { redux } from 'zustand/middleware'

const useStore = create(redux(reducer, initialState))
```

## 리액트 이벤트 처리기 외부에서 작업 호출하기

리액트는 이벤트 처리기 외부에서 호출되는 경우, `setState`를 동기적으로 처리합니다. 이벤트 처리기 외부에서 상태를 갱신하면 리액트는 컴포넌트를 동기적으로 갱신하므로, 좀비 자식 효과가 발생할 위험이 추가됩니다. 이 문제를 해결하려면 작업을 `unstable_batchedUpdates`로 래핑해야 합니다.

```jsx
import { unstable_batchedUpdates } from 'react-dom' // or 'react-native'

const useStore = create((set) => ({
  fishes: 0,
  increaseFishes: () => set((prev) => ({ fishes: prev.fishes + 1 })),
}))

const nonReactCallback = () => {
  unstable_batchedUpdates(() => {
    useStore.getState().increaseFishes()
  })
}
```

자세한 내용은 [문제](https://github.com/pmndrs/zustand/issues/302)에서 확인하세요.

## 리덕스 개발자 도구

```jsx
import { devtools } from 'zustand/middleware'

// 일반 작업 저장소와 함께 사용하면 `setState`로 작업을 기록합니다.
const useStore = create(devtools(store))
// 리덕스 저장소와 함께 사용하면 전체 작업 유형을 기록합니다.
const useStore = create(devtools(redux(reducer, initialState)))
// 개발자 도구 비활성화 (예: 프로덕션 빌드에서)
const useStore = create(devtools(store, { enabled: false }))
```

`devtools` 미들웨어는 저장소 함수를 첫 번째 인수로 사용합니다. 원한다면 작업 앞에 붙는 두 번째 인수인 `devtoolsOptions`를 사용하여 저장소 이름을 지정할 수 있습니다.

일반적인 **결합 변환기** 리덕스 저장소와 달리, `devtools`는 분리된 각 저장소의 작업만 기록합니다. [이곳](https://github.com/pmndrs/zustand/issues/163)에서 저장소를 결합하는 방법을 확인하세요.

## 타입스크립트

```tsx
type State = {
  bears: number
  increase: (by: number) => void
}

const useStore = create<State>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```

인터페이스를 사용할 수도 있습니다.

```tsx
import { State } from 'zustand'

interface BearState extends State {
  bears: number
  increase: (by: number) => void
}
```

또는 `combine`을 사용하고 `tsc`가 타입을 추론하게 합니다.

```tsx
import { combine } from 'zustand/middleware'

const useStore = create(
  combine({ bears: 0 }, (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  }))
)
```
