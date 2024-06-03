class Dog {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return "Woof!";
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Mas");
const dog3 = new Dog("Spot");

// 1번째 예제
// console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

// console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

// 2번쨰 예제
// Dog.prototype.play = () => console.log("Playing now!");

// dog1.play();

// 3번째 예제
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}

// Prototype 패턴은 동일 타입의 여러 객체들이 프로퍼티를 공유할 때 유용하게 사용한다.
