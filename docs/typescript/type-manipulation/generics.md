# 제네릭

소프트웨어 엔지니어링의 주요 부분은 잘 정의되고 일관된 API가 있을 뿐만 아니라 재사용 가능한 구성 요소를 구축하는 것입니다. 현재의 데이터와 미래의 데이터를 처리할 수 있는 구성 요소는 대규모 소프트웨어 시스템을 구축하기 위한 가장 유연한 기능을 제공합니다.

C# 및 자바와 같은 언어에서 재사용 가능한 구성 요소를 만들기 위한 주요 도구 중 하나는 **제네릭(generic)**입니다. 즉, 단일 타입이 아닌 다양한 타입에서 작동할 수 있는 구성 요소를 만들 수 있습니다. 사용자는 이러한 구성 요소를 소비하고 자신의 타입을 사용할 수 있습니다.

## 제네릭의 `hello world`

먼저 제네릭의 `hello world`인 `identity` 함수를 살펴보겠습니다. `identity` 함수는 전달된 것이 무엇이든 그대로 반환하는 함수입니다. 이는 `echo` 명령과 비슷하다고 볼 수 있습니다.

제네릭이 없으면 `identity` 함수에 특정 타입을 지정해야 합니다.

```ts
function identity(arg: number): number {
  return arg;
}
```

또는 `any` 타입을 사용하여 `identity` 함수를 묘사할 수 있습니다.

```ts
function identity(arg: any): any {
  return arg;
}
```

`any`를 사용하면 함수가 `arg` 타입에 모든 타입을 허용한다는 점에서 확실히 일반적이지만, 실제로 반환될 때 해당 타입이 무엇인지에 대한 정보를 잃게 됩니다. 숫자를 전달했을 때, 모든 타입이 반환될 수 있다는 정보만 얻을 수 있습니다.

대신 인수의 타입을 포착하여 반환되는 것을 나타낼 수 있는 방법이 필요합니다. 여기서는 값이 아닌 타입에 대해 작동하는 특별한 종류의 변수인 **타입 변수**를 사용합니다.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

이제 `identity` 함수에 타입 변수 `Type`을 추가했습니다. 이 `Type`을 사용하면 사용자가 제공하는 타입(예: `number`)을 포착하여, 나중에 해당 정보를 사용할 수 있습니다. 여기서는 `Type`을 반환 타입으로 다시 사용합니다. 

이제 검사에서 인수와 반환 타입에 동일한 타입이 사용되는 것을 볼 수 있습니다. 이를 통해 타입 정보를 함수의 한 쪽에서 다른 쪽으로 통행시킬 수 있습니다.

이 버전의 `identity` 함수는 다양한 타입에서 작동하기 때문에 일반적(generic)이라고 말할 수 있습니다. `any`를 사용하는 것과 달리, 인수와 반환 타입에 숫자를 사용한 첫 번째 `identity` 함수만큼 정확합니다(즉, 정보를 잃지 않음).

제네릭 `identity` 함수를 작성했으면, 호출할 수 있는 방법은 두 가지가 있습니다.

첫 번째 방법은 타입 인수를 포함한 모든 인수를 함수에 전달하는 것입니다.

```ts
// let output: string
let output = identity<string>("myString");
```

여기서는 명시적으로 `()` 대신 인수 주위의 `<>`를 사용하여, `Type`을 `string`으로 설정합니다.

두 번째 방법이 가장 일반적일 것입니다. 여기서는 **타입 인수 추론**을 사용합니다. 즉, 전달하는 인수의 타입에 따라 컴파일러가 자동으로 `Type` 값을 설정하기를 원합니다.

```ts
// let output: string
let output = identity("myString");
```

꺾쇠 괄호(`<>`) 안에 타입을 명시적으로 전달할 필요가 없다는 점을 유의하세요. 컴파일러는 단지 `"myString"` 값을 보고 `Type`을 해당 타입으로 설정했습니다.

타입 인수 추론은 코드를 더 짧고 읽기 쉽게 유지하는 데 유용한 도구일 수 있습니다. 하지만 컴파일러가 타입을 추론하지 못한다면, 이전 예시에서처럼 타입 인수를 명시적으로 전달해야 할 수도 있습니다. 더 복잡한 코드에서 이런 경우가 생길 수 있습니다.

## 제네릭 타입 변수로 작업하기

제네릭을 사용하기 시작하면 `identity`와 같은 제네릭 함수를 만들 때, 컴파일러가 함수 본문에서 제네릭 타입의 매개변수를 올바르게 사용하도록 강제하는 것을 알 수 있습니다. 즉, 실제로 매개변수를 모든 타입이 될 수 있는 것처럼 취급합니다.

이전의 `identity` 함수를 살펴보겠습니다.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

호출할 때마다 `arg` 인수의 길이도 콘솔에 기록하려면 어떻게 해야 할까요? 이렇게 작성하고 싶을지도 모릅니다.

```ts
function loggingIdentity<Type>(arg: Type): Type {
  // 오류: Property 'length' does not exist on type 'Type'.
  console.log(arg.length);
  return arg;
}
```

이렇게 하면 컴파일러는 `arg`의 `.length` 멤버를 사용하고 있다는 오류를 표시하지만, 우리는 `arg`가 이 멤버를 가지고 있다고 말한 적이 없습니다. 앞에서 말했듯이 이러한 타입 변수는 모든 타입을 의미하므로, 이 함수에는 `.length` 멤버가 없는 `number`를 전달할 수 있습니다.

이 함수는 실제로 `Type`이 아닌 `Type`의 배열에서 작동하도록 설계되었다고 가정해 보겠습니다. 배열로 작업하고 있으므로 `.length` 멤버를 사용할 수 있어야 합니다. 다른 타입의 배열을 만드는 방식으로 이를 묘사할 수 있습니다.

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

`loggingIdentity`의 타입을 다음과 같이 읽을 수 있습니다. "제네릭 함수 `loggingIdentity`는 타입 매개변수 `Type`과 `Type` 배열인 `arg` 인수를 받아서 `Type` 배열을 반환합니다." 숫자 배열을 전달하면 `Type`에 `number`가 바인딩되므로 숫자 배열을 다시 얻게 됩니다. 이를 통해 제네릭 타입 변수 `Type`을 전체 타입이 아닌 작업 중인 타입의 일부로 사용할 수 있으므로 유연성이 향상됩니다.

또는 예시를 다음과 같이 작성할 수 있습니다.

```ts
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // 배열에는 '.length'가 있으므로 더 이상 오류가 발생하지 않습니다.
  return arg;
}
```

다른 언어에서 이러한 스타일의 타입을 많이 봤을 것입니다. 이제 `Array<Type>`과 같은 제네릭 타입을 직접 만드는 방법에 대해 알아보겠습니다.

## 제네릭 타입

앞에서는 다양한 타입에서 작동하는 제네릭 `identity` 함수를 만들었습니다. 여기서는 함수 자체의 타입과 제네릭 인터페이스를 만드는 방법을 살펴보겠습니다.

제네릭 함수의 타입은 제네릭이 아닌 함수의 타입과 비슷하며, 함수 선언과 마찬가지로 타입 매개변수가 먼저 나열됩니다.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Type>(arg: Type) => Type = identity;
```

타입 변수의 수와 타입 변수가 사용되는 방식이 일치하는 한, 타입의 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있습니다.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: <Input>(arg: Input) => Input = identity;
```

객체 리터럴 타입의 호출 시그니처로 제네릭 타입을 작성할 수도 있습니다.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: { <Type>(arg: Type): Type } = identity;
```

이제 첫 번째 제네릭 인터페이스를 작성해 보겠습니다. 이전 예시에서 객체 리터럴을 가져와 인터페이스로 옮겨 보겠습니다.

```ts
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn = identity;
```

유사한 예시에서 제네릭 매개변수를 전체 인터페이스의 매개변수로 옮기고 싶을 수 있습니다. 이를 통해 어떤 타입(들)이 제네릭인지 확인할 수 있습니다. (예: `Dictionary`가 아닌 `Dictionary<string>`) 이렇게 하면 인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있습니다.

```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
 
function identity<Type>(arg: Type): Type {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```

이제 예시가 약간 다르게 바뀌었습니다. 제네릭 함수를 묘사하는 대신, 이제 제네릭 타입의 일부인 제네릭이 아닌 함수 시그니처가 있습니다. 이제 `GenericIdentityFn`을 사용할 때는 타입 인수(여기서는 `number`)도 지정해야 하며, 기반 호출 시그니처가 사용할 내용을 효과적으로 잠글 수 있습니다. 타입 매개변수를 호출 시그니처에 직접 배치하는 시기와 인터페이스 자체에 배치하는 시기를 이해하면 타입의 어떤 측면이 제네릭인지 묘사하는 데 도움이 됩니다.

제네릭 인터페이스 외에도 제네릭 클래스를 만들 수 있습니다. 제네릭 열거형 및 네임스페이스를 만드는 것은 불가능합니다.

## 제네릭 클래스

제네릭 클래스의 모양은 제네릭 인터페이스와 비슷합니다. 제네릭 클래스에는 클래스 이름 뒤에 오는 꺾쇠 괄호(`<>`) 안에 제네릭 타입 매개변수 목록이 있습니다.

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

이는 `GenericNumber` 클래스의 이름 그대로 사용하는 것이지만, `number` 타입만 사용하도록 제한하는 것은 아무것도 없습니다. 대신 `string`이나 더 복잡한 객체를 사용할 수도 있습니다.

```ts
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
 
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

인터페이스와 마찬가지로 클래스 자체에 타입 매개변수를 추가하면 클래스의 모든 속성이 동일한 타입으로 작동하는지 확인할 수 있습니다.

[클래스 부분](https://www.typescriptlang.org/docs/handbook/2/classes.html)에서 다룬 것처럼 클래스에는 정적 측면과 인스턴스 측면이라는 두 가지 타입의 측면이 있습니다. 제네릭 클래스는 정적 측면이 아닌 인스턴스 측면에서만 제네릭입니다. 따라서 클래스로 작업할 때 정적 멤버는 클래스의 타입 매개변수를 사용할 수 없습니다.

## 제네릭 제약 조건

앞의 예시를 기억한다면 타입 집합이 어떤 기능에 있는지 **어느 정도** 알고 있는 상태에서 해당 타입 집합에서 작동하는 제네릭 함수를 작성하고 싶을 수 있습니다. `loggingIdentity` 예시에서 `arg`의 `.length` 프로퍼티에 접근하고 싶었지만, 컴파일러는 모든 타입에 `.length` 프로퍼티가 있음을 증명할 수 없으므로 이러한 가정을 할 수 없다고 경고합니다.

```ts
function loggingIdentity<Type>(arg: Type): Type {
  // 오류: Property 'length' does not exist on type 'Type'.
  console.log(arg.length);
  return arg;
}
```

이 함수가 모든 타입에서 작동하는 대신, `.length` 프로퍼티**도** 있는 모든 타입에서 작동하도록 제한하고 싶습니다. 타입에 이 멤버가 있는 한 허용되지만, 최소한 이 멤버 이상이 있어야 합니다. 그렇게 하려면 `Type`이 될 수 있는 것에 대한 제약 조건으로 요구 사항을 나열해야 합니다.

이를 위해 제약 조건을 설명하는 인터페이스를 만듭니다. 여기서는 단일 `.length` 프로퍼티가 있는 인터페이스를 만든 다음 이 인터페이스와 `extends` 키워드를 사용하여 제약 조건을 나타냅니다.

```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // 이제 '.length' 프로퍼티가 있다는 것을 알고 있으므로 더 이상 오류가 발생하지 않습니다.
  return arg;
}
```

제네릭 함수는 이제 제약이 있으므로 더 이상 모든 타입에서 작동하지 않습니다.

```ts
// Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
loggingIdentity(3);
```

대신 필요한 프로퍼티가 모두 있는 타입의 값을 전달해야 합니다.

```ts
loggingIdentity({ length: 10, value: 3 });
```

## 제네릭 제약 조건에서 타입 매개변수 사용하기

다른 타입 매개변수에 의해 제한되는 타입 매개변수를 선언할 수 있습니다.

예를 들어 여기서는 이름이 지정된 객체에서 프로퍼티를 가져오려고 합니다. `obj`에 존재하지 않는 프로퍼티를 실수로 가져오지 않기 위해, 두 타입 사이에 제약 조건을 설정합니다.

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
// Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
getProperty(x, "m");
```

## 제네릭에서 클래스 타입 사용하기

제네릭을 사용하여 타입스크립트에서 공장을 만들 때, 생성자 함수로 클래스 타입을 참조해야 합니다.

예를 들어 다음과 같습니다.

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

고급 예시에서는 프로토타입 프로퍼티를 사용하여 생성자 함수와 클래스 타입의 인스턴스 측 사이의 관계를 추론하고 제한합니다.

```ts
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

이 패턴은 [믹스인](https://www.typescriptlang.org/docs/handbook/mixins.html) 디자인 패턴을 강화하는 데 사용됩니다.