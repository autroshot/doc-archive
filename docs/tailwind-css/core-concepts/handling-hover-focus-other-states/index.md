---
sidebar_position: 1
---

# 호버, 초점, 기타 상태 처리하기

유틸리티를 사용하여 호버, 초점을 갖는 요소에 스타일을 지정합니다.

테일윈드의 모든 유틸리티 클래스는 클래스 이름 앞에 조건을 설명하는 수정자를 추가하여 **조건부로** 적용할 수 있습니다.

예를 들어 호버 시 `bg-sky-700` 클래스를 적용하려면 `hover:bg-sky-700` 클래스를 사용합니다.

```html
<button class="bg-sky-500 **hover:bg-sky-700** ...">
  Save changes
</button>
```

<details>
  <summary>전통적인 CSS와 비교하면 어떤 점이 다른가요?</summary>
  기존 방식으로 CSS를 작성하면 하나의 클래스 이름이 현재 상태에 따라 다른 작업을 수행합니다.

  ❌ 기존에는 동일한 클래스 이름이라도 호버 시 다른 스타일이 적용됨

  ```css
  .btn-primary {
    background-color: #0ea5e9;
  }
  .btn-primary:hover {
    background-color: #0369a1;
  }
  ```

  테일윈드에서는 기존 클래스에 호버 상태의 스타일을 추가하는 대신, **호버 시에만** 동작하는 다른 클래스를 요소에 추가합니다.

  ✔️ 테일윈드에서는 기본 상태와 호버 상태에 별도의 클래스가 사용됨

  ```css
  .bg-sky-500 {
    background-color: #0ea5e9;
  }
  .hover\:bg-sky-700:hover {
    background-color: #0369a1;
  }
  ```

  `hover:bg-sky-700`이 `:hover` 상태에 대한 **스타일만** 정의하는 것을 확인할 수 있습니다. 기본적으로 아무 작업도 수행하지 않지만, 해당 클래스가 있는 요소 위로 마우스를 가져가면 배경색이 `sky-700`으로 변경됩니다.

  유틸리티 클래스를 **조건부로** 적용할 수 있다는 것은 바로 이러한 의미입니다. 수정자를 사용하면 HTML을 벗어나지 않고도 다양한 상태에서 디자인의 작동 방식을 정확하게 제어할 수 있습니다.
</details>

테일윈드에는 다음과 같이 필요한 거의 모든 것에 대한 수정자가 포함되어 있습니다.

- [의사 클래스](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-classes) - `:hover`, `:focus`, `:first-child`, `:required`
- [의사 요소](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-elements) - `::before`, `::after`, `::placeholder`, `::selection`
- [미디어 및 기능 질의](https://tailwindcss.com/docs/hover-focus-and-other-states#media-and-feature-queries) - 반응형 중단점, 어두운 모드, `prefers-reduced-motion`
- [속성 선택기](https://tailwindcss.com/docs/hover-focus-and-other-states#attribute-selectors) - `[dir="rtl"]`, `[open]`

이러한 수정자를 [쌓아서](https://tailwindcss.com/docs/hover-focus-and-other-states#ordering-stacked-modifiers) 보다 구체적인 상황을 대상으로 지정할 수도 있습니다. 예를 들어 다음과 같이 어두운 모드, 중간 중단점, 호버 시 배경색을 변경할 수 있습니다.

```html
<button class="**dark:md:hover:bg-fuchsia-600** ...">
  Save changes
</button>
```

이 안내서에서는 프레임워크에서 사용할 수 있는 모든 수정자, 커스텀 클래스에서 수정자를 사용하는 방법, 심지어 커스텀 클래스를 만드는 방법에 대해 알아봅니다.
