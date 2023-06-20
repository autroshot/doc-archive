---
sidebar_position: 5
---

# 저장소 작업이 없는 실습

권장되는 사용법은 저장소 내부에 작업과 상태를 함께 두는 것입니다.

```js
export const useBoundStore = create((set) => ({
  count: 0,
  text: 'hello',
  inc: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text }),
}))
```

이렇게 하면 데이터와 작업이 함께 포함된 독립형 저장소가 생성됩니다.

------

다른 접근법은 저장소 외부의 모듈 수준에서 작업을 정의하는 것입니다.

```js
export const useBoundStore = create(() => ({
  count: 0,
  text: 'hello',
}))

export const inc = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }))

export const setText = (text) => useBoundStore.setState({ text })
```

여기에는 몇 가지 장점이 있습니다.

- 작업 호출에 훅이 필요하지 않습니다.
- 코드 분할을 용이하게 합니다.

이 패턴에 단점이 있지는 않지만, 일부는 캡슐화를 위해 함께 두는 것을 선호할 수 있습니다.