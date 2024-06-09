# Render Prop 패턴

고차 컴포넌트(Higher-Order Component, HOC)와 함께 컴포넌트의 로직을 재사용할 수 있는 또 다른 방법으로 Render Prop 패턴을 사용할 수 있습니다.

### Render Prop 패턴

Render Prop은 컴포넌트의 prop으로 함수를 넘기고, 그 함수가 JSX 엘리먼트를 반환하는 패턴입니다. 이 패턴을 통해 컴포넌트 자체는 렌더링을 하지 않고, 대신 전달받은 render prop 함수를 호출합니다.

### 예제: Title 컴포넌트

```jsx
const Title = (props) => props.render();

<Title render={() => <h1>I am a render prop!</h1>} />;
```

위의 예제에서 `Title` 컴포넌트는 `render` prop으로 전달받은 함수를 호출하여 JSX 엘리먼트를 반환합니다. 이 패턴은 컴포넌트의 재사용성을 높이는 데 유용합니다.

### 데이터와 함께 Render Prop 사용

Render Prop 패턴을 사용하면 데이터를 함수의 인자로 전달할 수도 있습니다.

```jsx
function Component(props) {
  const data = { ... };
  return props.render(data);
}

<Component render={(data) => <ChildComponent data={data} />} />

```

위의 예제에서는 `Component`가 `render` prop을 호출할 때 데이터도 함께 전달합니다. 이를 통해 `ChildComponent`는 `data`를 prop으로 전달받아 사용할 수 있습니다.

### Render Prop 패턴을 활용한 예제

### 온도 변환기 앱

섭씨 온도를 입력받아 화씨와 켈빈으로 변환하는 간단한 앱을 만들어 보겠습니다.

1. 상태를 부모 컴포넌트로 올리기

```jsx
function Input({ value, handleChange }) {
  return <input value={value} onChange={(e) => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  );
}
```

위의 예제에서는 상태를 부모 컴포넌트로 올려서 `Input`, `Kelvin`, `Fahrenheit` 컴포넌트가 상태를 공유하도록 합니다.

1. Render Prop 패턴 사용

```jsx
function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```

위의 예제에서는 `Input` 컴포넌트가 `render` prop을 받아서 상태를 하위 컴포넌트로 전달합니다.

1. 자식 컴포넌트를 함수로 받기

```jsx
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  );
}

function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```

위의 예제에서는 `Input` 컴포넌트가 `props.children`을 통해 자식 요소로 전달된 함수를 호출하여 상태를 전달합니다.

### Hooks로 대체하기

몇몇 경우에서는 Render Prop 패턴이 Hooks로 대체될 수 있습니다. 예를 들어, Apollo Client를 사용할 때, Mutation 컴포넌트 대신 useMutation 훅을 사용할 수 있습니다.

```jsx
import { useMutation } from "@apollo/client";

function Component() {
  const [addMessage] = useMutation(ADD_MESSAGE);
  return <div className="input-row">{/* ... */}</div>;
}
```

useMutation 훅을 사용하면 컴포넌트의 중첩을 줄이고 필요한 데이터를 간단하게 사용할 수 있습니다.

### 장점과 단점

### 장점

- Render Prop을 사용하여 데이터를 쉽게 공유할 수 있습니다.
- Prop 병합 문제를 피할 수 있습니다.
- 명시적인 prop 전달로 인해 prop의 출처를 쉽게 파악할 수 있습니다.
- 컴포넌트와 로직을 분리할 수 있습니다.

### 단점

- React Hooks로 인해 많은 경우 Render Prop 패턴이 대체될 수 있습니다.
- Render Prop 내에서는 생명 주기 함수를 사용할 수 없습니다.

이처럼 Render Prop 패턴은 특정 상황에서 유용하게 사용될 수 있으며, 특히 컴포넌트 간의 데이터 공유와 재사용성을 높이는 데 도움이 됩니다.
