---
sidebar_position: 3
---

# 교집합 타입

`interface`를 사용하면 다른 타입을 확장하여 새로운 타입을 만들 수 있습니다. 타입스크립트에서는 기존 객체 타입을 결합할 때 주로 사용하는 **교집합 타입**도 제공합니다.

교집합 타입은 `&` 연산자를 사용하여 정의됩니다.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

여기서는 `Colorful`과 `Circle`을 교차시켜 `Colorful`과 `Circle`의 모든 구성원이 포함된 새로운 타입을 만듭니다.

```ts
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// 문제 없습니다.
draw({ color: "blue", radius: 42 });

// 오류: Argument of type '{ color: string; raidus: number; }' is not assignable to parameter of type 'Colorful & Circle'.
//   Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
draw({ color: "red", raidus: 42 });
```
