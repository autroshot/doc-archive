---
sidebar_position: 7
sidebar_label: 양식 작성하기
---

# 넥스트로 양식 작성하기

웹 양식에는 **클라이언트-서버** 관계가 있습니다. 이는 데이터를 보내 웹 서버에서 데이터를 처리하고 저장하는 관계입니다. 양식 자체가 클라이언트이고 서버는 필요할 때 데이터를 저장, 검색, 전송하는 데 사용할 수 있는 모든 저장 메커니즘입니다.

이 안내서는 넥스트를 사용하여 웹 양식을 만드는 방법을 알려줍니다.

## 1. HTML 양식

HTML 양식은 `<form>` 태그를 사용하여 작성됩니다. `<form>` 태그에는 텍스트 필드, 확인란, 드롭다운 메뉴, 버튼, 라디오 버튼 등과 같은 양식을 구성하기 위해 속성과 필드 세트가 필요합니다.

HTML 양식의 구문은 다음과 같습니다.

```html
<!-- 기본 HTML 양식 -->
<form action="/send-data-here" method="post">
  <label for="first">First name:</label>
  <input type="text" id="first" name="first" />
  <label for="last">Last name:</label>
  <input type="text" id="last" name="last" />
  <button type="submit">Submit</button>
</form>
```

HTML `<form>` 태그는 `text` 필드와 같은 여러 `<input>` 요소와 `submit` `button`의 컨테이너 역할을 합니다.

해당 요소를 하나하나 살펴보겠습니다.

- `action` - 양식이 제출될 때 양식 데이터가 전송되는 위치를 지정하는 속성입니다. 일반적으로 URL(절대 URL 또는 상대 URL)입니다.
- `method` - [HTTP 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)를 지정합니다. 양식을 제출할 때 데이터를 보내는 방식을 지정하며 `GET`이나 `POST`를 많이 사용합니다.
- `<label>` - 다른 양식 요소의 레이블을 정의하는 요소입니다. 레이블은 스크린 리더의 접근성을 향상시킵니다.
- `<input>` - 양식 필드를 구성하는 데 널리 사용되는 양식 요소입니다. `type` 속성 값에 따라 크게 달라집니다. 타입은 `text`, `checkbox`, `email`, `radio` 등이 될 수 있습니다.
- `<button>` - 양식 데이터를 제출하는 데 사용되는 클릭 가능한 버튼을 나타냅니다.

### 양식 유효성 검사

사용자가 제공한 정보가 올바른지 확인하는 프로세스입니다. 또한 양식 유효성 검사는 제공된 정보가 올바른 형식인지 확인합니다. 예를 들어 이메일 필드에 `@`가 있는지 확인할 수 있습니다.

유효성 검사에는 두 가지 유형이 있습니다.

- **클라이언트 측** - 유효성 검사를 브라우저에서 수행
- **서버 측** - 유효성 검사를 서버에서 수행

두 가지 유형 모두 중요하지만 이 안내서에서는 클라이언트 측 유효성 검사만 다룰 것입니다.

클라이언트 측 유효성 검사는 다음과 같이 분류할 수 있습니다.

- **내장** - `required`, `type`, `minLength`, `maxLength`, `pattern` 등과 같은 HTML 기반 속성을 사용함
- **자바스크립트 기반** - 자바스크립트로 작성한 유효성 검사

### 내장 양식 유효성 검사

- `required` - 양식을 제출하기 전에 작성해야 하는 필드를 지정
- `type` - 데이터 유형(예: 숫자, 이메일 주소, 문자열 등)을 지정
- `minLength` - 텍스트 데이터 문자열의 최소 길이를 지정
- `maxLength` - 텍스트 데이터 문자열의 최대 길이를 지정

다음은 이 속성들을 사용하는 양식 예시입니다.

```html
<!-- 내장 유효성 검사를 사용하는 HTML 양식 -->
<form action="/send-data-here" method="post">
  <label for="roll">Roll Number</label>
  <input
    type="text"
    id="roll"
    name="roll"
    required
    minlength="10"
    maxlength="20"
  />
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />
  <button type="submit">Submit</button>
</form>
```

사용자가 `name` 필드를 작성하지 않은 상태로 제출하려고 하면 양식 필드에 바로 표시되는 오류가 발생합니다. 마찬가지로 `roll` 번호는 길이가 10-20자인 경우에만 입력할 수 있습니다.

### 자바스크립트 기반 양식 유효성 검사

양식 유효성 검사는 사용자가 올바른 형식으로 올바른 데이터를 제출했는지 확인할 수 있으므로 중요합니다. 자바스크립트는 클라이언트 측에서 HTML 기본 양식 속성과 함께 추가적인 유효성 검사를 제공합니다.

개발자는 일반적으로 서버 측 유효성 검사에 비해 데이터 처리가 빠른 자바스크립트 기반의 양식 데이터 유효성 검사를 선호합니다. 하지만 악의적인 사용자가 항상 잘못된 형식의 데이터를 서버에 보낼 수 있으므로 일부 시나리오에서는 프론트 엔드 유효성 검사가 안전하지 않을 수 있습니다.

다음 예시에서는 자바스크립트를 사용하여 양식을 검증하는 방법을 보여줍니다.

```html
<form onsubmit="validateFormWithJS()">
  <label for="rollNumber">Roll Number:</label>
  <input type="text" name="rollNumber" id="rollNumber" />

  <label for="name">Name:</label>
  <input type="text" name="name" id="name" />

  <button type="submit">Submit</button>
</form>

<script>
  function validateFormWithJS() {
    const name = document.querySelector('#name').value;
    const rollNumber = document.querySelector('#rollNumber').value;

    if (!name) {
      alert('Please enter your name.');
      return false;
    }

    if (rollNumber.length < 3) {
      alert('Roll Number should be at least 3 digits long.');
      return false;
    }
  }
</script>
```

HTML [스크립트](https://developer.mozilla.org/ko/docs/Web/HTML/Element/script) 태그는 클라이언트 측 자바스크립트를 넣는 데 사용됩니다. 위의 예시와 같이 인라인 스크립팅 명령문을 넣거나 `src` 속성으로 외부 스크립트 파일을 지정할 수 있습니다.

이 예시에서는 사용자의 이름과 롤 번호를 확인합니다. `validateFormWithJS()` 함수는 이름 필드가 비어 있는 것을 허용하지 않으며 롤 번호는 최소 3자리 이상이어야 합니다. 제출 버튼을 누르면 유효성 검사가 수행됩니다. 주어진 값이 올바르지 않으면 다음 페이지로 리디렉션되지 않습니다.

#### 정규식을 사용한 양식 유효성 검사

정규식(일반적으로 RegEx라고 함)은 문자 패턴을 설명하는 객체입니다.

정규 표현식을 사용한 자바스크립트 유효성 검사는 `pattern` HTML 속성을 사용합니다. `pattern` 속성은 `<input>` 요소에만 적용할 수 있습니다. 이렇게 하면 고유한 규칙을 정의한 정규식(RegEx)을 사용하여 입력 값의 유효성을 검사할 수 있습니다. 값이 정의된 패턴과 일치하지 않으면 `input` 요소에서 오류가 발생합니다.

다음 예시는 `input` 요소에 `pattern` 속성을 사용하는 방법을 보여줍니다.

```html
<form action="/action_page.php">
  <label for="pswrd">Password:</label>
  <input
    type="password"
    id="pswrd"
    name="pswrd"
    pattern="[a-z0-9]{1,15}"
    title="Password should be digits (0 to 9) or alphabets (a to z)."
  />

  <button type="submit">Submit</button>
</form>
```

비밀번호 양식 필드는 숫자(0~9)와 소문자 알파벳(a~z)만 포함해야 하며 길이는 15자 이하여야 합니다. 다른 문자(#,$,& 등)는 허용되지 않습니다. RegEx의 규칙은 `[a-z0-9]{1,15}`로 작성되었습니다.

:::note 참고

HTML 양식에 대한 자세한 내용은 [MDN 웹 문서](https://developer.mozilla.org/ko/docs/Learn/Forms)를 확인하세요.

:::

## 2. 프로젝트 설정

이제 넥스트를 사용하여 리액트에서 양식을 생성할 것입니다.

먼저 새로운 넥스트 앱을 생성합니다. 빠른 시작을 위해 [create-next-app](https://nextjs.org/docs/getting-started#setup)을 사용할 수 있습니다. 커맨드 라인 터미널에서 다음을 실행합니다.

```bash
npx create-next-app
```

질문에 답하여 프로젝트를 만들고 이름을 지정합니다. 이 예시에서는 [`next-forms`](https://github.com/vercel/next.js/tree/canary/examples/next-forms)입니다.

## 3. 넥스트 양식 API 경로 설정하기

클라이언트와 서버 모두 넥스트를 사용하여 빌드될 것입니다. 서버 파트를 위해 양식 데이터를 보낼 API 엔드포인트를 만듭니다.

넥스트는 [페이지](./basic-features/pages.md)를 기반으로 구축된, 라우팅을 위한 파일 기반 시스템을 제공합니다. `pages/api` 폴더 내의 모든 파일은 `/api/*`에 매핑되며 페이지 대신 API 엔드포인트로 취급됩니다. 이 [API 엔드포인트](./api-routes/introduction.md)는 서버 측 전용이 될 것입니다.

`pages/api`에 `form.js`라는 파일을 만들고 노드로 작성된 다음 코드를 붙여 넣습니다.

```js
export default function handler(req, res) {
  // 제출된 요청의 본문에 있는 데이터를 얻습니다.
  const body = req.body;

  // 넥스트 앱이 실행 중인 커맨드 라인에서
  // 응답을 보기 위한 선택적 로깅입니다.
  console.log('body: ', body);

  // 성과 이름을 확인하고 존재하지 않으면
  // 조기에 반환합니다.
  if (!body.first || !body.last) {
    // 잘못된 요청에 대한 HTTP 오류 코드를 전송합니다.
    return res.status(400).json({ data: 'First or last name not found' });
  }

  // 이름이 존재합니다.
  // HTTP 성공 코드를 전송합니다.
  res.status(200).json({ data: `${body.first} ${body.last}` });
}
```

이 양식 `handler` 함수는 클라이언트로부터 `req` 요청(제출된 양식 데이터)을 받습니다. 그리고 이름과 성이 모두 들어있는 JSON으로 `res` 응답을 전송합니다. 이 API 엔드포인트는 `http://localhost:3000/api/form`로 접근할 수 있습니다. 또는 배포 시 로컬호스트 URL을 실제 베르셀 배포 주소로 바꿀 수 있습니다.

:::note 참고

또는 이 API를 몽고DB나 구글 스프레드시트와 같은 데이터베이스에 연결할 수도 있습니다. 이렇게 하면 제출한 양식 데이터가 나중에 사용할 수 있도록 안전하게 저장됩니다. 이 안내서에서는 데이터베이스를 사용하지 않습니다. 대신 데이터가 그대로 사용자에게 반환됩니다.

:::

### 자바스크립트 없이 양식 제출하기

이제 양식의 `action` 속성에서 `/api/form` 상대 경로 엔드포인트를 사용할 수 있습니다. 양식이 `POST` HTTP 메서드(데이터를 보내는 데 사용됨)로 제출될 때 양식 데이터가 서버로 전송됩니다.

```html
<form action="/api/form" method="post">
  <label for="first">First name:</label>
  <input type="text" id="first" name="first" />
  <label for="last">Last name:</label>
  <input type="text" id="last" name="last" />
  <button type="submit">Submit</button>
</form>
```

이 양식을 제출하면 양식 API 엔드포인트 `/api/form`에 데이터가 제출됩니다. 그러면 서버가 응답합니다. 서버는 보통 데이터를 처리하고 `action` 속성에 정의된 URL을 로드하여 새 페이지를 로드합니다. 이 예시에서는 서버에서 다음 응답과 함께 `http://localhost:3000/api/form`으로 리디렉션합니다.

```json
{ "data": "Maedah Batool" }
```

## 4. 넥스트에서 양식 작성하기

양식 제출을 위한 넥스트 API 경로를 생성했습니다. 이제 리액트를 사용하여 넥스트 내부에 클라이언트(양식)를 작성할 차례입니다.

첫 번째 단계는 HTML 양식에 대한 지식을 확장하고 이를 [JSX](https://ko.reactjs.org/docs/introducing-jsx.html)를 사용해 리액트로 변환하는 것입니다.

다음은 동일한 양식을 JSX를 사용하여 작성한 리액트 함수 컴포넌트입니다.

```jsx
export default function Form() {
  return (
    <form action="/api/form" method="post">
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />

      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />

      <button type="submit">Submit</button>
    </form>
  );
}
```

변경된 사항은 다음과 같습니다.

- `for` 속성이 `htmlFor`로 변경됩니다. `for`가 자바스크립트의 for 반복문과 연결된 키워드이므로 리액트 요소는 대신 `htmlFor`을 사용합니다.
- `action` 속성에는 양식 API 엔드포인트인 상대 URL을 넣었습니다.

이제 넥스트 기반 양식의 기본 구조를 완성했습니다.

## 5. 자바스크립트 없이 양식 제출하기

자바스크립트는 웹 앱에 상호 작용을 제공합니다. 하지만 때로는 자바스크립트 번들이 너무 커지지 않도록 제어해야 하거나 사이트 방문자가 자바스크립트를 비활성화할 수 있습니다.

사용자가 자바스크립트를 비활성화하는 데는 몇 가지 이유가 있습니다.

- 대역폭 제약 때문에
- 기기(휴대폰 또는 노트북)의 배터리 시간을 늘리기 위해
- 분석 스크립트로 추적되지 않기를 원해서

어떤 이유로든 자바스크립트를 비활성화하면 사이트 기능이 완전히는 아니더라도 부분적으로 영향을 받게 됩니다.

`/pages` 디렉터리에 다음과 같이 `no-js-form.js` 파일을 작성합니다.

```jsx
export default function PageWithoutJSbasedForm() {
  return (
    <form action="/api/form" method="post">
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />

      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />

      <button type="submit">Submit</button>
    </form>
  );
}
```

자바스크립트가 비활성화된 상태에서 제출 버튼을 누르면 이벤트가 트리거되어 양식 데이터를 수집하고 `POST` HTTP `method`를 사용하여 `action` 속성에 정의된 양식 API 엔드포인트로 데이터를 전송합니다. 양식의 `action`에 의해 `/api/form` 엔드포인트로 리디렉션됩니다.

양식 데이터는 앞에서 작성한 양식 처리기 함수에 `req` 요청으로 서버에 제출됩니다. 처리기 함수는 데이터를 처리하고 `res` 응답을 반환하는데, 이는 제출한 이름이 포함된 JSON 문자열입니다.

:::note 참고

사용자 경험을 개선하기 위해 응답으로 사용자를 페이지로 리디렉션하고 양식 제출에 대해 감사를 표할 수 있습니다.

:::

## 6. 자바스크립트가 활성화된 양식 제출하기

`/pages`에 `js-form.js`라는 다른 파일을 생성합니다. 그러면 넥스트 앱에 `/js-form` 페이지가 생성됩니다.

이제 양식이 제출되는 즉시 페이지를 다시 로드하는 양식의 기본 작동을 막습니다. 양식 데이터를 가져와 JSON 문자열로 변환한 다음 API 엔드포인트인 서버로 보냅니다. 그러면 서버는 제출된 이름으로 응답합니다. 이 모든 것이 기본 자바스크립트인 `handleSubmit()` 함수에 의해 수행됩니다.

함수는 다음과 같습니다.

```jsx
export default function PageWithJSbasedForm() {
  // 양식 제출을 처리합니다.
  const handleSubmit = async (event) => {
    // 양식 제출과 페이지 새로고침을 막습니다.
    event.preventDefault();

    // 양식에서 데이터를 얻습니다.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    };

    // 데이터를 JSON 형식으로 서버에 전송합니다.
    const JSONdata = JSON.stringify(data);

    // 양식 데이터를 전송하는 API 엔드포인트입니다.
    const endpoint = '/api/form';

    // 서버로 전송하는 데이터 요청을 설정합니다.
    const options = {
      // 데이터를 전송하므로 메서드는 POST입니다.
      method: 'POST',
      // JSON을 전송한다고 서버에 알려줍니다.
      headers: {
        'Content-Type': 'application/json',
      },
      // 요청의 본문은 위에서 생성한 JSON 데이터입니다.
      body: JSONdata,
    };

    // 양식 데이터를 베르셀의 양식 API로 전송하고 응답을 받습니다.
    const response = await fetch(endpoint, options);

    // 서버의 응답 데이터를 JSON으로 얻습니다.
    // 서버가 제출한 이름을 반환한다면 양식이 제대로 작동하는 것입니다.
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };
  return (
    // 제출 시에 이벤트를 handleSubmit() 함수에 전달합니다.
    <form onSubmit={handleSubmit}>
      <label htmlFor="first">First Name</label>
      <input type="text" id="first" name="first" required />

      <label htmlFor="last">Last Name</label>
      <input type="text" id="last" name="last" required />

      <button type="submit">Submit</button>
    </form>
  );
}
```

JSX로 작성된 `<form>` 요소가 포함된 리액트 함수 컴포넌트 `PageWithJSbasedForm`가 있는 넥스트 페이지입니다. `<form>` 요소에는 `action` 속성이 없습니다. 대신 `onSubmit` 이벤트 처리기를 사용하여 `{handleSubmit}` 함수에 데이터를 전송합니다.

`handleSubmit()` 함수는 일련의 단계를 통해 양식 데이터를 처리합니다.

- `event.preventDefault()`는 `<form>` 요소가 페이지 전체를 새로고침하는 것을 막습니다.
- 양식의 `first`와 `last` 값을 사용하여 자바스크립트 객체 `data`를 만들었습니다.
- JSON은 프로그래밍 언어에 구애받지 않는 데이터 전송 형식입니다. 그래서 `JSON.stringify(data)`를 사용해 데이터를 JSON으로 변환합니다.
- 그런 다음 JSON과 HTTP `POST` 메서드 방식으로 `fetch()`를 사용해 `/api/form` 엔드포인트에 데이터를 전송합니다.
- 서버는 제출된 이름이 포함된 응답을 다시 전송합니다.

## 결론

이 안내서에서 다룬 내용은 다음과 같습니다.

- 기본 HTML `form` 요소
- 리액트로 양식 이해하기
- 자바스크립트를 사용하거나 사용하지 않고 양식 데이터의 유효성 검사하기
- 넥스트 API 경로를 사용 하여 클라이언트와 서버에서 `req`와 `res` 처리하기
