# Modul패턴

### Module 패턴의 주요 특징

1. **코드 분리**: 큰 코드베이스를 작은 모듈로 분리하여 유지보수성을 높입니다.
2. **재사용성**: 모듈 단위로 기능을 분리함으로써 코드의 재사용성을 높입니다.
3. **캡슐화**: 모듈 내부의 변수와 함수는 외부에서 접근할 수 없도록 캡슐화할 수 있습니다.
4. **명시적 인터페이스**: 모듈에서 외부에 노출하고자 하는 함수나 변수만 명시적으로 export합니다.

### ES2015 모듈

ES2015(ES6)에서는 자바스크립트에 모듈 기능이 추가되었습니다. 이를 통해 코드의 재사용성과 유지보수성을 크게 향상시킬 수 있습니다.

### 예제: `math.js` 모듈

먼저, 몇 가지 계산 함수를 포함한 `math.js` 모듈을 정의해보겠습니다.

```jsx
// math.js

const privateValue = "This is a value private to the module!";

export function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

위 예제에서 `privateValue`는 모듈 내부에서만 사용 가능하며, 외부에서는 접근할 수 없습니다.

### 예제: `index.js`에서 `math.js` 모듈 사용하기

이제 `math.js` 모듈의 함수를 `index.js`에서 사용해보겠습니다.

```jsx
// index.js

import { add, multiply, subtract, square } from "./math.js";

console.log(add(5, 3)); // 8
console.log(multiply(4)); // 8
console.log(subtract(9, 4)); // 5
console.log(square(3)); // 9
```

### Default Export

모듈에서 하나의 함수를 기본으로 export할 수도 있습니다. `add` 함수를 default export로 지정해보겠습니다.

```jsx
// math.js

export default function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

기본 export는 import할 때 대괄호 없이 사용할 수 있습니다.

```jsx
// index.js

import add, { multiply, subtract, square } from "./math.js";

console.log(add(5, 3)); // 8
console.log(multiply(4)); // 8
console.log(subtract(9, 4)); // 5
console.log(square(3)); // 9
```

### Dynamic Import

동적으로 모듈을 로드하여 필요한 시점에만 모듈을 불러올 수 있습니다. 이를 통해 초기 로딩 시간을 줄일 수 있습니다.

```jsx
// index.js

async function loadMathModule() {
  const math = await import("./math.js");
  console.log(math.add(5, 3)); // 8
  console.log(math.multiply(4)); // 8
}

document.getElementById("loadButton").addEventListener("click", loadMathModule);
```

### React와 Module 패턴

React 앱에서 모듈 패턴을 사용하여 컴포넌트를 분리하는 예제입니다.

```jsx
// TodoList.js
import React from "react";
import Button from "./Button";
import Input from "./Input";

function TodoList() {
  return (
    <div>
      <Input />
      <Button />
    </div>
  );
}

export default TodoList;
```

각 컴포넌트는 별도의 파일에 선언되어 있으며, `TodoList.js`에서 import하여 사용하고 있습니다.

### 결론

Module 패턴을 사용하면 코드를 작고 재사용 가능하게 만들 수 있으며, 코드베이스의 유지보수성과 가독성을 크게 향상시킬 수 있습니다. 또한, 모듈 내부의 변수와 함수를 캡슐화함으로써 전역 스코프와의 충돌을 방지할 수 있습니다. ES2015의 모듈 기능을 사용하면 이러한 작업이 더욱 쉬워집니다.
