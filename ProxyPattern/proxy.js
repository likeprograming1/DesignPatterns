// Proxy객체를 활용하면 객체와의 인터렉션을 조금 더 컨트롤 할 수 있게 된다.

// 인터렉션은 뭔가?

// Proxy 객체를 활용하면 객체와의 인터렉션을 더 잘 컨트롤할 수 있다는 것은,
// Proxy 객체를 통해 원본 객체와 상호작용할 때 발생하는 동작들을 더 세밀하게 제어할 수 있다는 것
// 을 의미합니다. 여기서 '인터렉션'이란 다음과 같은 다양한 형태의 상호작용을 포함합니다:

const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

// Proxy 클래스의 두 번째 인자는 핸들러를 의미한다. 핸들러 객체에서 우리는 인터렉션의 종류에 따른
// 특정 동작들을 정의할 수 있다.

// const personProxy = new Proxy(person, {
//   get: (obj, prop) => {
//     console.log(`The value of ${prop} is ${obj[prop]}`);
//   },

//   set: (obj, prop, value) => {
//     console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
//     obj[prop] = value;
//   },
// });

// personProxy 객체에 핸들러를 추가해 보자.
// 프로퍼티를 수정하려 할 때는. 앞서 말한 것과 같이 Proxy 의 set 메서드가 호출되므로 이 핸들러 안에서
// 변경 전의 값과 변경 후의 값을 콘솔로 확인할 수 있다.
// 프로퍼티의 값을 읽으려 할 때는 get 메서드가 호출되며 해당 키와 값에 대한 메시지를
// 콘솔에 출력할 수 있다.

// personProxy.name;
// personProxy.age = 43;

// name 프로퍼티에 접근하려 할 때. Proxy 객체가 콘솔에 값을 출력해 준다: The value of name is John Doe
// age 프로퍼티를 수정하려고 할 땐. Proxy 객체가 변경 이전 값과 이후의 값을 콘솔에 출력한다: Changed age from 42 to 43

// Proxy는 person객체를 실수로 수정하는것을 예방해주어 데이터를 안전하게 관리할 수 있다.
// const personProxy = new Proxy(person, {
//   get: (obj, prop) => {
//     if (!obj[prop]) {
//       console.log(`Hmm.. this property doesn't seem to exist`);
//     } else {
//       console.log(`The value of ${prop} is ${obj[prop]}`);
//     }
//   },
//   set: (obj, prop, value) => {
//     if (prop === "age" && typeof value !== "number") {
//       console.log(`Sorry, you can only pass numeric values for age.`);
//     } else if (prop === "name" && value.length < 2) {
//       console.log(`You need to provide a valid name.`);
//     } else {
//       console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
//       obj[prop] = value;
//     }
//     return true;
//   },
// });

// personProxy.nonExistentProperty;
// personProxy.age = "44";
// personProxy.name = "";

// JavaScript는 Reflect라는 빌트인 객체를 제공하는데 Proxy와 함께 사용하면 대상 객체를 쉽게 조작할 수 있다.

// 이전 예제에서는 Proxy의 핸들러 내에서 괄호 표기를 사용하여 직접 프로퍼티를 수정하거나 읽을 수 있었다.
// 그 대신에 Reflect 객체를 쓸 수 있다. Reflect 객체의 메서드는 핸들러 객체과 같은 이름의 메서드를 가질 수 있다.

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";

// Proxy는 객체의 동작을 커스터마이징할 수 있는 유용한 기능이다.
// Proxy는 유효성 검사, 포메팅, 알림, 디버깅 등 유용하게 사용된다.

// 핸들러 객체에서 Proxy 를 너무 헤비하게 사용하면 앱의 성능에 부정적인 영향을 줄 수 있다.
// Proxy를 사용할 땐 성능문제가 생기지 않을 만한 코드를 사용하자.
