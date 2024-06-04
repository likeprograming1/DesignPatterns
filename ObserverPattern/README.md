# Observer 패턴

Observer 패턴은 이벤트 기반 시스템에서 자주 사용되는 디자인 패턴입니다. 이 패턴에서 특정 객체를 구독할 수 있는데, 구독하는 주체를 `Observer`라 하고, 구독 가능한 객체를 `Observable`이라 합니다. 이벤트가 발생할 때마다 `Observable`은 모든 `Observer`에게 이벤트를 전파합니다.

## Observable 객체의 특징

Observable 객체는 보통 3가지 주요 특징을 포함합니다:

1. **observers**: 이벤트가 발생할 때마다 전파할 Observer들의 배열
2. **subscribe()**: Observer를 Observer 배열에 추가합니다.
3. **unsubscribe()**: Observer 배열에서 Observer를 제거합니다.
4. **notify()**: 등록된 모든 Observer들에게 이벤트를 전파합니다.

아래는 ES6 클래스를 사용하여 Observable을 구현한 예제입니다.

```jsx
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

`subscribe` 메서드를 통해 Observer를 등록하고, `unsubscribe` 메서드를 통해 등록을 해지할 수 있습니다. 그리고 `notify` 메서드를 통해 모든 Observer에게 이벤트를 전파할 수 있습니다.

## 예제: Button과 Switch 컴포넌트

Observable 객체를 이용해 Button 컴포넌트와 Switch 컴포넌트를 가진 기본적인 앱을 만들어 보겠습니다.

### 목표

- 사용자가 버튼을 클릭하거나 스위치를 토글할 때마다 타임스탬프를 로깅하고, 이벤트 발생 시마다 토스트 알림을 화면에 노출합니다.

### 구현

1. **Observable 객체 생성**:

```jsx
const observable = new Observable();
```

1. **logger 함수와 toastify 함수**:

```jsx
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}
```

1. **Observable에 Observer 등록**:

```jsx
observable.subscribe(logger);
observable.subscribe(toastify);
```

1. **React 컴포넌트**:

```jsx
import React from "react";
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

export default function App() {
  function handleClick() {
    observable.notify("User clicked button!");
  }

  function handleToggle() {
    observable.notify("User toggled switch!");
  }

  return (
    <div className="App">
      <Button onClick={handleClick}>Click me!</Button>
      <FormControlLabel control={<Switch onChange={handleToggle} />} />
      <ToastContainer />
    </div>
  );
}
```

### 전체 플로우

`handleClick`과 `handleToggle`이 Observable의 `notify`를 호출하고, 이를 구독하고 있던 Observer인 `logger`와 `toastify` 함수는 이벤트를 받아 특정 동작을 수행합니다. 앱 내에서 인터랙션이 발생하는 동안 `logger`와 `toastify`는 `notify`의 호출로부터 이벤트를 계속 받을 수 있습니다.

## 사례 분석

### RxJS

RxJS는 Observer 패턴을 구현한 유명 오픈소스 라이브러리입니다. ReactiveX는 Observer 패턴, 이터레이터 패턴, 함수형 프로그래밍을 조합하여 이벤트의 순서를 이상적으로 관리할 수 있습니다.

```jsx
import { fromEvent } from "rxjs";

const observable = fromEvent(document, "mousemove");

observable.subscribe((event) => {
  console.log(`Mouse is at: ${event.clientX}, ${event.clientY}`);
});
```

RxJS는 Observer 패턴에 대한 매우 많은 빌트인 기능들을 제공합니다.

## 장점

- **관심사의 분리**: Observer 패턴은 관심사의 분리와 단일 책임 원칙을 강제하기 위한 좋은 방법입니다. Observer 객체는 Observable 객체와 강결합되어 있지 않고 언제든지 분리될 수 있습니다.
- **유연성**: Observable 객체는 이벤트 모니터링 역할을 갖고, Observer는 받은 데이터를 처리하는 역할을 가집니다.

## 단점

- **성능 이슈**: Observer가 복잡해지면 모든 Observer에게 알림을 전파하는 데 성능 이슈가 발생할 수 있습니다.
