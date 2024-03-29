---
sidebar_position: 5
sidebar_label: 클라이언트 측
---

# 클라이언트 측 데이터 가져오기

클라이언트 측 데이터 가져오기는 페이지에 SEO 인덱싱이 필요하지 않거나, 데이터를 미리 렌더링할 필요가 없거나, 페이지 콘텐츠를 자주 갱신해야 할 때 유용합니다. 서버 측 렌더링 API와 달리 컴포넌트 수준에서 클라이언트 측 데이터 가져오기를 사용할 수 있습니다.

페이지 수준에서 수행하는 경우, 런타임에 데이터를 가져오고 데이터가 변경되면 페이지 내용이 갱신됩니다. 컴포넌트 레벨에서 수행하는 경우, 컴포넌트 마운트 시점에 데이터를 가져오고 데이터가 변경되면 컴포넌트의 내용이 갱신됩니다.

클라이언트 측 데이터 가져오기를 사용하면 앱의 성능과 페이지의 로드 속도에 영향을 미칠 수 있다는 점을 유의해야 합니다. 이는 컴포넌트나 페이지가 마운트되는 시점에 데이터 가져오기가 이루어지고 데이터가 캐싱되지 않기 때문입니다.

## `useEffect`로 클라이언트 측 데이터 가져오기

다음 예시는 `useEffect` 훅을 사용하여 클라이언트 측에서 데이터를 가져오는 방법을 보여줍니다.

```jsx
function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
```

## SWR로 클라이언트 측 데이터 가져오기

넥스트 뒤에 있는 팀은 [**SWR**](https://swr.vercel.app/)이라는 데이터 가져오기를 위한 리액트 훅 라이브러리를 만들었습니다. 클라이언트 측에서 데이터를 가져오는 경우에 적극 권장합니다. 캐싱, 재검증, 초점 추적, 주기적으로 다시 가져오기 등을 처리합니다.

위와 예시에 SWR을 적용해 보겠습니다. SWR은 자동으로 데이터를 캐시하고 데이터가 오래되면 유효성을 다시 검사합니다.

SWR 사용에 대한 자세한 내용은 [SWR 문서](https://swr.vercel.app/docs/getting-started)를 확인하세요.

```jsx
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  );
}
```
