---
sidebar_position: 3
---

# 동작

플레이라이트는 텍스트 입력, 확인란, 라디오 버튼, 선택 옵션, 마우스 클릭, 문자 입력, 키와 단축키, 파일 업로드, 요소에 집중과 같은 HTML 입력 요소와 상호 작용할 수 있습니다.

## 텍스트 입력

[`locator.fill()`](https://playwright.dev/docs/api/class-locator#locator-fill)을 사용하는 것이 양식 필드를 채우는 가장 쉬운 방법입니다. 요소에 초점을 맞추고 입력된 텍스트로 `input` 이벤트를 트리거합니다. `<input>`, `<textarea>`, `[contenteditable]` 요소에서 작동합니다.

```js
// 텍스트 입력
await page.getByRole('textbox').fill('Peter');

// 날짜 입력
await page.getByLabel('Birth date').fill('2020-02-02');

// 시간 입력
await page.getByLabel('Appointment time').fill('13:15');

// 현지 날짜와 시간 입력
await page.getByLabel('Local time').fill('2020-03-02T05:15');
```

## 확인란과 라디오 버튼

[`locator.setChecked()`](https://playwright.dev/docs/api/class-locator#locator-set-checked)를 사용하는 것이 확인란 또는 라디오 버튼을 선택하거나 취소하는 가장 쉬운 방법입니다. 이 방법은 `input[type=checkbox]`, `input[type=radio]`, `[role=checkbox]` 요소에 사용할 수 있습니다.

```js
// 확인란 선택하기
await page.getByLabel('I agree to the terms above').check();

// 선택된 상태를 단언하기
expect(await page.getByLabel('Subscribe to newsletter').isChecked()).toBeTruthy()

// 라디오 버튼을 선택하기
await page.getByLabel('XL').check();
```

## 선택 옵션

[`locator.selectOption()`](https://playwright.dev/docs/api/class-locator#locator-select-option)을 사용하여 `<select>` 요소에서 하나 이상의 옵션을 선택합니다. 선택할 옵션의 `value`나 `label`을 지정할 수 있습니다. 복수의 옵션을 선택할 수 있습니다.

```js
// 값과 일치하는 단일 선택
await page.getByLabel('Choose a color').selectOption('blue');

// 레이블과 일치하는 단일 선택
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });

// 복수의 항목 선택
await page.getByLabel('Choose multiple colors').selectOption(['red', 'green', 'blue']);
```

## 마우스 클릭

간단한 사람의 클릭을 수행합니다.

```js
// 일반 클릭
await page.getByRole('button').click();

// 더블 클릭
await page.getByText('Item').dblclick();

// 마우스 오른쪽 버튼으로 클릭
await page.getByText('Item').click({ button: 'right' });

// Shift + 클릭
await page.getByText('Item').click({ modifiers: ['Shift'] });

// 요소로 마우스 이동
await page.getByText('Item').hover();

// 왼쪽 상단 클릭
await page.getByText('Item').click({ position: { x: 0, y: 0} });
```

위의 메서드를 비롯한 포인터 관련 메서드는 장막 뒤에서 다음을 수행합니다.

- 지정된 선택자가 있는 요소가 DOM에 존재할 때까지 대기함
- 표시될 때까지 대기함 (비어 있지 않음. `display:none`이 아님. `visibility:hidden`이 아님)
- 움직이지 않을 때까지 대기함 (CSS 전환이 완료됨)
- 요소로 스크롤함
- 동작 지점에서 포인터 이벤트를 받을 때까지 대기함 (요소가 다른 요소에 의해 가려지지 않음)
- 위의 검사 중에 요소가 분리되면 다시 시도함

#### 강제 클릭

때때로 앱은 다른 요소와 겹치는 요소로 마우스를 이동하면 클릭을 가로채는, 사소하지 않은 논리를 사용합니다. 이 동작은 요소가 가려지고 클릭이 다른 곳으로 전달되는 버그와 구별할 수 없습니다. 이 동작이 일어난다는 것을 알고 있다면, [동작 가능성](https://playwright.dev/docs/actionability) 검사를 생략하고 강제 클릭을 수행할 수 있습니다.

```js
await page.getByRole('button').click({ force: true });
```

#### 프로그래밍 방식으로 클릭

실제 조건에서 앱을 테스트하는 데 관심이 없고 클릭을 어떤 방법으로든 시뮬레이션하고 싶을 수 있습니다. 이때, [`locator.dispatchEvent()`](https://playwright.dev/docs/api/class-locator#locator-dispatch-event)를 사용하여 요소에 클릭 이벤트를 전달하면 [`HTMLElement.click()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click) 동작을 트리거할 수 있습니다.

```js
await page.getByRole('button').dispatchEvent('click');
```

## 문자 입력하기

[`locator.type()`](https://playwright.dev/docs/api/class-locator#locator-type)을 사용하여 실제 키보드를 가진 사용자처럼 문자를 하나하나 필드에 입력합니다.

```js
// 한 글자씩 입력하기
await page.locator('#area').type('Hello World!');
```

이 메서드는 `keydown`, `keyup`, `keypress` 이벤트를 비롯한 필요한 모든 키보드 이벤트를 내보냅니다. 키를 누르는 사이에 선택적인 `delay`을 지정하여 실제 사용자 동작을 시뮬레이트할 수도 있습니다.

:::note 참고

대부분은 [`page.fill()`](https://playwright.dev/docs/api/class-page#page-fill)로 충분합니다. 페이지에 특수 키보드 처리가 있는 경우에만 문자를 입력하면 됩니다.

:::

## 키와 단축키

```js
// 엔터 누르기
await page.getByText('Submit').press('Enter');

// Ctrl + Right
await page.getByRole('textbox').press('Control+ArrowRight');

// 키보드의 $ 기호 누르기
await page.getByRole('textbox').press('$');
```

[`locator.press()`](https://playwright.dev/docs/api/class-locator#locator-press) 메서드는 선택한 요소에 초점을 맞추고 단일 키 입력을 생성합니다. 키보드 이벤트의 [`keyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) 프로퍼티에서 내보내는 논리적 키 이름을 허용합니다.

```
Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape,
ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight,
ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.
```

- 또는 `a`나 `#`와 같이 생성하길 원하는 단일 문자를 지정할 수도 있습니다.
- `Shift, Control, Alt, Meta`와 같은 수정 단축키도 지원합니다.

단순한 버전은 단일 문자를 생성합니다. 이 문자는 대소문자를 구분하므로 `a`와 `A`는 다른 결과를 생성합니다.

```js
// <input id=name>
await page.locator('#name').press('Shift+A');

// <input id=name>
await page.locator('#name').press('Shift+ArrowLeft');
```

`Control + o` 또는 `Control + Shift + T`와 같은 단축키도 지원합니다. 수정 키와 함께 지정하면, 수정 키를 누른 상태가 후속 키에서 유지됩니다.

대문자를 생성하려면 `Shift + A`에서 대문자 `A`를 지정해야 한다는 점을 주의해야 합니다. `Shift + a`는 `CapsLock`이 토글된 것처럼 소문자를 생성합니다.

## 파일 업로드하기

[`locator.setInputFiles()`](https://playwright.dev/docs/api/class-locator#locator-set-input-files) 메서드를 사용하여 업로드할 입력 파일을 선택할 수 있습니다. 첫 번째 인수에서 `file` 유형의 [입력 요소](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)를 지정할 것으로 예상합니다. 배열을 사용하여 복수의 파일을 전달할 수 있습니다. 파일 경로의 일부가 상대 경로이면, 해당 경로의 기준은 현재 작업 디렉터리입니다. 빈 배열은 선택한 파일을 취소합니다.

```js
// 단일 파일 선택하기
await page.getByLabel('Upload file').setInputFiles('myfile.pdf');

// 복수의 파일 선택하기
await page.getByLabel('Upload files').setInputFiles(['file1.txt', 'file2.txt']);

// 선택한 파일을 모두 취소하기
await page.getByLabel('Upload file').setInputFiles([]);

// 메모리에서 버퍼 업로드하기
await page.getByLabel('Upload file').setInputFiles({
  name: 'file.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('this is test')
});
```

입력 요소가 (동적으로 생성되어서) 지금은 존재하지 않는다면, [`page.on('filechooser')`](https://playwright.dev/docs/api/class-page#page-event-file-chooser) 이벤트를 처리하거나 동작에 해당하는 대기 메서드를 사용할 수 있습니다.

```js
// 클릭 전에 파일 선택기를 기다리기 시작합니다. await가 없다는 점을 유의하세요.
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByLabel('Upload file').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles('myfile.pdf');
```

## 요소에 초점 맞추기

초점 이벤트를 처리하는 동적 페이지의 경우, [`locator.focus()`](https://playwright.dev/docs/api/class-locator#locator-focus)로 해당 요소에 초점을 맞출 수 있습니다.

```js
await page.getByLabel('Password').focus();
```

## 끌어서 놓기

[`locator.dragTo()`](https://playwright.dev/docs/api/class-locator#locator-drag-to)를 사용하여 끌어서 놓기(drag&drop) 동작을 수행할 수 있습니다. 이 메서드는 다음을 수행합니다.

- 마우스가 끌 요소로 이동함
- 마우스 왼쪽 버튼을 누름
- 마우스가 놓을 요소로 이동함
- 눌려 있던 마우스 왼쪽 버튼을 놓음

```js
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));
```

### 수동으로 끌기

끌기(drag) 동작을 정확하게 제어하려면 [`locator.hover()`](https://playwright.dev/docs/api/class-locator#locator-hover), [`mouse.down()`](https://playwright.dev/docs/api/class-mouse#mouse-down), [`mouse.move()`](https://playwright.dev/docs/api/class-mouse#mouse-move), [`mouse.up()`](https://playwright.dev/docs/api/class-mouse#mouse-up)과 같은 하위 수준의 메서드를 사용하세요.

```js
await page.locator('#item-to-be-dragged').hover();
await page.mouse.down();
await page.locator('#item-to-drop-at').hover();
await page.mouse.up();
```

:::note 참고

페이지가 `dragover` 이벤트에 의존하는 경우에는, 모든 브라우저에서 페이지를 트리거하려면 마우스를 두 번 이상 움직여야 합니다. 안정적으로 두 번째 마우스 이동을 실행하려면 [`mouse.move()`](https://playwright.dev/docs/api/class-mouse#mouse-move) 또는 [`locator.hover()`](https://playwright.dev/docs/api/class-locator#locator-hover)를 두 번 반복하세요.

동작 순서는 다음과 같습니다.

마우스를 끌 요소로 이동함, 마우스 누름, 마우스를 놓을 요소로 이동함, 마우스를 놓을 두 번째 요소로 이동함, 마우스 누름을 해제함.

:::