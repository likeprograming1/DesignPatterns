# ProtoTypePattern

# JavaScript Prototype 패턴 및 ES6 클래스 활용

Prototype 패턴과 ES6 클래스의 활용을 통해 JavaScript 객체지향 프로그래밍을 좀 더 효과적으로 사용할 수 있습니다. 특히 객체들이 동일한 프로퍼티를 공유해야 할 때 Prototype 패턴은 중복을 줄이고 메모리 효율을 높이는 데 유용합니다.

## Prototype 패턴의 이해

JavaScript의 Prototype 패턴은 객체가 다른 객체의 프로퍼티를 상속받을 수 있게 해줍니다. ES6 클래스는 이를 좀 더 편리하게 사용할 수 있도록 합니다.

### 기본 강아지 클래스

먼저, 기본 강아지 클래스를 정의합니다. 이 클래스는 강아지의 이름과 짖는 기능을 가지고 있습니다.

```jsx
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

console.log(dog1.bark()); // Woof!
console.log(dog2.bark()); // Woof!
console.log(dog3.bark()); // Woof!
```

`Dog` 클래스의 인스턴스는 모두 `bark` 메서드를 공유합니다. 이 메서드는 프로토타입 체인을 통해 각 인스턴스에서 사용할 수 있습니다.

### 프로토타입 확인

클래스의 프로토타입과 인스턴스의 프로토타입을 확인해보면, `bark` 메서드가 프로토타입에 정의되어 있음을 알 수 있습니다.

```jsx
console.log(Dog.prototype);
// { constructor: [Function: Dog], bark: [Function: bark] }

console.log(dog1.__proto__);
// { constructor: [Function: Dog], bark: [Function: bark] }

console.log(Object.getPrototypeOf(dog1));
// { constructor: [Function: Dog], bark: [Function: bark] }
```

`__proto__`는 비표준이므로 `Object.getPrototypeOf`를 사용하는 것이 더 안전하고 권장됩니다.

### 프로토타입에 메서드 추가

강아지가 놀 수 있는 기능을 추가해보겠습니다. 프로토타입 객체에 메서드를 추가하면, 기존 인스턴스들도 이 메서드를 사용할 수 있게 됩니다.

```jsx
Dog.prototype.play = function () {
  return `${this.name} is playing!`;
};

console.log(dog1.play()); // Daisy is playing!
console.log(dog2.play()); // Max is playing!
console.log(dog3.play()); // Spot is playing!
```

### 프로토타입 체인

프로토타입 체인은 객체의 프로퍼티를 검색할 때 사용됩니다. 프로퍼티가 객체에 존재하지 않으면, 자바스크립트는 프로토타입 체인을 따라가며 프로퍼티를 찾습니다.

### 상속을 통한 슈퍼 강아지 클래스

`Dog` 클래스를 상속받아 `SuperDog` 클래스를 만들고, 여기에 하늘을 나는 기능을 추가해보겠습니다.

```jsx
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return `${this.name} is flying!`;
  }
}

const superDog = new SuperDog("Daisy");

console.log(superDog.bark()); // Woof!
console.log(superDog.fly()); // Daisy is flying!
```

`SuperDog` 클래스는 `Dog` 클래스를 상속받았기 때문에 `bark` 메서드도 사용할 수 있습니다. 이는 프로토타입 체인 덕분입니다.

### Object.create를 사용한 프로토타입 상속

`Object.create` 메서드를 사용하면 특정 객체를 프로토타입으로 가지는 새로운 객체를 생성할 수 있습니다.

```jsx
const dog = {
  bark() {
    return `Woof!`;
  },
};

const pet1 = Object.create(dog);

console.log(pet1.bark()); // Woof!
```

`pet1`은 자체적으로는 아무런 프로퍼티도 없지만, `dog` 객체를 프로토타입으로 사용하기 때문에 `bark` 메서드를 사용할 수 있습니다.

## 결론

Prototype 패턴과 프로토타입 체인을 활용하면 코드의 중복을 줄이고 메모리 효율을 높일 수 있습니다. ES6 클래스와 상속을 통해 객체지향 프로그래밍을 더욱 직관적으로 구현할 수 있습니다. JavaScript의 프로토타입 기반 상속 메커니즘을 잘 이해하고 활용하면, 더 효율적이고 유지보수하기 쉬운 코드를 작성할 수 있습니다.
