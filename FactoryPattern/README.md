# 팩토리 패턴 (Factory Pattern)

팩토리 패턴은 객체를 생성하는 팩토리 함수를 사용하여 객체를 만들어내는 디자인 패턴입니다. `new` 키워드를 사용하는 대신, 함수 호출의 결과로 객체를 생성합니다. 이 패턴은 복잡한 객체를 생성하거나 환경이나 설정에 따라 객체의 속성을 다르게 설정해야 할 때 유용합니다.

### 예제 설명

여러 사용자를 추가해야 하는 앱을 예로 들어 보겠습니다. 각 사용자는 `firstName`, `lastName`, `email` 속성을 가지고 있으며, `fullName` 메서드를 통해 전체 이름을 반환할 수 있습니다. 이를 위해 팩토리 함수를 사용하여 객체를 생성합니다.

### 팩토리 함수 정의

사용자를 생성하는 팩토리 함수입니다.

```jsx
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

### 팩토리 함수 사용 예제

`createUser` 팩토리 함수를 사용하여 사용자를 생성합니다.

```jsx
const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
});

console.log(user1.fullName()); // "John Doe"
console.log(user2.fullName()); // "Jane Doe"
```

### 또 다른 예제: 배열을 객체로 변환하는 팩토리 함수

주어진 배열에서 객체를 생성하는 팩토리 함수입니다.

```jsx
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
});

const obj = createObjectFromArray(["name", "John"]);
console.log(obj); // { name: "John" }
```

### 장점

- **간단한 객체 생성**: 팩토리 패턴은 동일한 프로퍼티를 가진 여러 작은 객체를 만들어낼 때 유용합니다.
- **유연성**: 현재의 환경이나 사용자 특징적인 설정을 통해 원하는 객체를 쉽게 만들 수 있습니다.

### 단점

- **메모리 사용**: 자바스크립트에서 팩토리 함수는 `new` 키워드 없이 객체를 만드는 것과 크게 다르지 않습니다. 클래스를 활용하는 것이 메모리를 절약하는데 더 효과적일 수 있습니다.

### 클래스 사용 예제

팩토리 패턴 대신 클래스를 사용하여 사용자를 생성하는 방법입니다.

```jsx
class User {
  constructor({ firstName, lastName, email }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});

const user2 = new User({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
});

console.log(user1.fullName()); // "John Doe"
console.log(user2.fullName()); // "Jane Doe"
```

### 요약

팩토리 패턴은 상대적으로 복잡한 객체를 생성하거나 환경에 따라 객체의 속성을 다르게 설정해야 할 때 유용하게 사용할 수 있습니다. 자바스크립트에서는 팩토리 함수를 사용해 간결하게 객체를 생성할 수 있지만, 메모리 효율성을 위해 클래스 사용을 고려해 볼 수도 있습니다.
