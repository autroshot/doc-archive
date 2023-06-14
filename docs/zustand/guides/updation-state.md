---
sidebar_position: 1
---

# 상태 갱신하기

## 평평한 갱신

트슈탄트로 상태를 갱신하는 것은 간단합니다! 새 상태로 제공된 `set` 함수를 호출하면 스토어의 기존 상태와 얕게 병합됩니다.

```tsx
type State = {
  firstName: string
  lastName: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}

// 상태 및 작업(선택 사항)을 모두 포함하는 저장소를 만듭니다.
const useStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

// 소비 앱에서
function App() {
  // 필요한 상태와 작업을 '선택'합니다.
  // 이 경우에는 firstName 값과 updateFirstName 작업입니다.
  const [firstName, updateFirstName] = useStore(
    (state) => [state.firstName, state.updateFirstName],
    shallow
  )

  return (
    <main>
      <label>
        First name
        <input
          // 'firstName' 상태를 갱신합니다.
          onChange={(e) => updateFirstName(e.currentTarget.value)}
          value={firstName}
        />
      </label>

      <p>
        Hello, <strong>{firstName}!</strong>
      </p>
    </main>
  )
}
```

## 깊게 중첩된 객체

다음과 같이 깊은 상태 객체가 있다고 가정해 보겠습니다.

```ts
type State = {
  deep: {
    nested: {
      obj: { count: number }
    }
  }
}
```

중첩된 상태를 갱신하려면 과정이 불변적으로 완료되도록 약간의 노력이 필요합니다.

### 일반적인 접근법

리액트나 리덕스와 마찬가지로 일반적인 접근법은 상태 객체의 각 수준을 복사하는 것입니다. 전개 연산자 `...`를 사용하여, 수동으로 새로운 상태 값과 병합합니다.

```ts
normalInc: () =>
  set((state) => ({
    deep: {
      ...state.deep,
      nested: {
        ...state.deep.nested,
        obj: {
          ...state.deep.nested.obj,
          count: state.deep.nested.obj.count + 1
        }
      }
    }
  })),
```

코드가 매우 길어집니다! 여러분의 삶을 더 편하게 만들어 줄 몇 가지 대안을 살펴보겠습니다.

### 이머 사용하기

많은 사람들이 [이머](https://github.com/immerjs/immer)를 사용하여 중첩된 값을 갱신합니다. 리액트, 리덕스 등에서 중첩된 상태를 갱신해야 할 때마다 이머를 사용할 수 있습니다. 물론 트슈탄트도 동일합니다!

이머를 사용하여 깊게 중첩된 객체의 상태 갱신을 단순화할 수 있습니다. 예시를 살펴보겠습니다.

```ts
immerInc: () =>
  set(produce((state: State) => { ++state.deep.nested.obj.count })),
```

정말 짧아졌네요! 여기에 나열된 [주의 사항](https://docs.pmnd.rs/zustand/integrations/immer-middleware)을 참고하세요.

### optics-ts 사용하기

[optics-ts](https://github.com/akheron/optics-ts/)라는 다른 옵션이 있습니다.

```ts
opticsInc: () =>
  set(O.modify(O.optic<State>().path("deep.nested.obj.count"))((c) => c + 1)),
```

이머와 달리 optics-ts는 프록시나 변형 구문을 사용하지 않습니다.

### 람다 사용하기

[람다](https://ramdajs.com/)를 사용할 수도 있습니다.

```ts
ramdaInc: () =>
  set(R.over(R.lensPath(["deep", "nested", "obj", "count"]), (c) => c + 1)),
```

람다와 optics-ts는 모두 타입에 대해서도 작동합니다.

### 코드샌드박스 데모

https://codesandbox.io/s/zustand-normal-immer-optics-ramda-updating-ynn3o?file=/src/App.tsx