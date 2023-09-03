---
sidebar_position: 1
---

# 유틸리티 우선

제한된 기본 유틸리티 집합에서 복잡한 컴포넌트를 구축합니다.

전통적으로 우리는 웹에서 스타일을 지정해야 할 때마다 CSS를 작성합니다.

❌ 커스텀 디자인에 커스텀 CSS가 필요한 전통적인 접근 방식 사용하기

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

테일윈드를 사용하면 HTML에서 직접 기존 클래스를 적용하여 요소의 스타일을 지정할 수 있습니다.

✔️ 유틸리티 클래스를 사용하여 CSS 작성 없이 커스텀 디자인 구축하기

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

위의 예시에서 사용한 것은 다음과 같습니다.

- 전체 카드 레이아웃을 제어하는 테일윈드의 [flexbox](https://tailwindcss.com/docs/display#flex), [padding](https://tailwindcss.com/docs/padding) 유틸리티 (`flex`, `shrink-0`, `p-6`)
- 카드 너비를 제한하고 가로의 중앙에 배치하는 [max-width](https://tailwindcss.com/docs/max-width), [margin](https://tailwindcss.com/docs/margin) 유틸리티 (`max-w-sm`, `mx-auto`)
- 카드의 모양을 지정하는 [background color](https://tailwindcss.com/docs/background-color), [border radius](https://tailwindcss.com/docs/border-radius), [box-shadow](https://tailwindcss.com/docs/box-shadow) 유틸리티 (`bg-white`, `rounded-xl`, `shadow-lg`)
- 로고 이미지 크기를 조정하는 [width](https://tailwindcss.com/docs/width), [height](https://tailwindcss.com/docs/height) 유틸리티 (`w-12`, `h-12`)
- 로고와 텍스트 사이의 간격을 처리하는 [space-between](https://tailwindcss.com/docs/space) 유틸리티 (`space-x-4`)
- 카드 텍스트의 스타일을 지정하는 [font size](https://tailwindcss.com/docs/font-size), [text color](https://tailwindcss.com/docs/text-color), [font-weight](https://tailwindcss.com/docs/font-weight) 유틸리티 (`text-xl`, `text-black`, `font-medium` 등)

이 접근 방식을 사용하면 커스텀 CSS를 한 줄도 작성하지 않고도 완전한 커스텀 컴포넌트 디자인을 구현할 수 있습니다.

*"이건 정말 끔찍해!"*라고 생각하시는 분들이 있을 것이며, 그 말이 맞습니다. 좀 못생겼지요. 사실 처음 봤을 때 좋은 아이디어라고 생각하기란 거의 불가능합니다. **실제로 사용해 봐야 합니다.**

하지만 실제로 이를 사용해 무언가를 구축해 보면 정말 중요한 몇 가지 이점을 금방 알게 될 것입니다.

- **클래스 이름을 짓는 데 에너지를 낭비하지 않아도 됩니다.** 스타일을 지정하기 위해 `sidebar-inner-wrapper` 같은 어리석은 클래스 이름을 추가할 필요도 없고, 플렉스 컨테이너에 불과한 것의 완벽한 추상적 이름 때문에 고민할 필요도 없습니다.
- **CSS가 더 이상 성장하지 않습니다.** 전통적인 방식을 사용하면 새로운 기능을 추가할 때마다 CSS 파일이 커집니다. 유틸리티를 사용하면 모든 것을 재사용할 수 있으므로 새로운 CSS를 작성할 필요가 거의 없습니다.
- **변경이 더 안전하게 느껴집니다.** CSS는 전역적이므로 무언가를 변경할 때 어떤 부분이 깨질지 결코 알 수 없습니다. HTML의 클래스는 로컬이므로 다른 문제가 발생할 염려 없이 변경할 수 있습니다.

미리 정의된 유틸리티 클래스를 사용하여 HTML로만 작업하는 것이 얼마나 생산적인지 깨닫게 되면, 다른 방식으로 작업하는 것이 고문처럼 느껴질 것입니다.

## 인라인 스타일을 사용하지 않는 이유는 무엇인가요?

이 접근 방식에 대한 일반적인 반응은 "이거 그냥 인라인 스타일 아닌가요?"라는 의문입니다. 요소에 클래스 이름을 지정하여 해당 클래스의 스타일을 지정하는 대신 스타일을 요소에 직접 적용하는 것이기 때문에 어떤 면에서는 맞습니다.

하지만 유틸리티 클래스를 사용하면 인라인 스타일에 비해 몇 가지 중요한 이점이 있습니다.

- **제약 조건으로 디자인하기.** 인라인 스타일을 사용하면 모든 값이 마법의 숫자(magic number)가 됩니다. 유틸리티를 사용하면 미리 정의된 [디자인 시스템](https://tailwindcss.com/docs/theme)에서 스타일을 선택할 수 있으므로 시각적으로 일관된 UI를 훨씬 쉽게 구축할 수 있습니다.
- **반응형 디자인.** 인라인 스타일에서는 미디어 쿼리를 사용할 수 없지만, 테일윈드의 [반응형 유틸리티](https://tailwindcss.com/docs/responsive-design)를 사용하면 완전 반응형 인터페이스를 쉽게 구축할 수 있습니다.
- **호버, 초점, 기타 상태.** 인라인 스타일은 호버나 초점과 같은 상태를 대상으로 할 수 없지만, 테일윈드의 [상태 변형](https://tailwindcss.com/docs/hover-focus-and-other-states)은 유틸리티 클래스를 사용하여 이러한 상태를 쉽게 스타일링할 수 있습니다.

이 컴포넌트는 완전 반응형이며 호버 및 초점 스타일이 있는 버튼이 포함되어 있고 유틸리티 클래스로만 구축되었습니다.

```html
<div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 **sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6**">
  <img class="block mx-auto h-24 rounded-full **sm:mx-0 sm:shrink-0**" src="/img/erin-lindford.jpg" alt="Woman's Face" />
  <div class="text-center space-y-2 **sm:text-left**">
    <div class="space-y-0.5">
      <p class="text-lg text-black font-semibold">
        Erin Lindford
      </p>
      <p class="text-slate-500 font-medium">
        Product Engineer
      </p>
    </div>
    <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 **hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2**">Message</button>
  </div>
</div>
```

## 유지 관리 문제

유틸리티 우선 접근법을 사용할 때 가장 큰 유지 관리 문제는 일반적으로 반복되는 유틸리티 조합을 관리하는 것입니다.

이 문제는 [컴포넌트와 부분을 추출](https://tailwindcss.com/docs/reusing-styles#extracting-components-and-partials)하고 다중 커서 편집 및 간단한 루프와 같은 [편집기 및 언어 기능](https://tailwindcss.com/docs/reusing-styles#using-editor-and-language-features)을 사용하면 쉽게 해결할 수 있습니다.

title="PrimaryButton.vue"

```vue
<template>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    <slot/>
  </button>
</template>
```

그 외에도 HTML은 CSS보다 유지 관리가 훨씬 쉽습니다. 따라서 유틸리티 우선 CSS 프로젝트를 유지하는 것이 대규모 CSS 코드베이스를 유지하는 것보다 훨씬 쉽습니다. 깃허브, 넷플릭스, 헤로쿠, 킥스타터, 트위치, 세그먼트 등과 같은 대기업에서 이 접근법을 성공적으로 사용하고 있습니다.

이 접근 방식에 대한 다른 사람들의 경험을 듣고 싶다면 다음을 확인하세요.

- 존 폴라섹의 [수치로 살펴보기: 원자 CSS를 사용한 1년 반](https://medium.com/@johnpolacek/by-the-numbers-a-year-and-half-with-atomic-css-39d75b1263b4)
- 알골리아의 사라 데이얀의 [아니요, 유틸리티 클래스와 인라인 스타일은 동일하지 않습니다](https://frontstuff.io/no-utility-classes-arent-the-same-as-inline-styles)
- 팟캐스트 인터뷰, [깃허브에서 유틸리티 클래스를 사용하는 다이애나 마운터](http://www.fullstackradio.com/75)

더 자세한 내용은 [존 폴라섹](https://twitter.com/johnpolacek)이 선별한 [원자/유틸리티 우선 CSS 사례](https://johnpolacek.github.io/the-case-for-atomic-css/)를 확인하세요.