# Hooks 패턴

### 개요

React 16.8 버전부터 추가된 Hooks는 함수형 컴포넌트에서도 상태와 생명주기 기능을 사용할 수 있게 해줍니다. 이는 클래스 컴포넌트의 복잡성과 제약을 줄이고, 코드의 재사용성과 가독성을 높이는 데 큰 기여를 합니다. 여기서는 Hooks의 기본 개념과 활용법을 살펴보고, 이를 통해 코드 구조를 개선하는 방법을 알아보겠습니다.

### 클래스 컴포넌트의 한계

Hooks가 도입되기 전에는 React에서 상태와 생명주기 메서드를 사용하기 위해 클래스 컴포넌트를 사용해야 했습니다. 클래스 컴포넌트는 다음과 같은 몇 가지 단점이 있었습니다:

1. **클래스 문법의 복잡성**: 클래스 컴포넌트를 작성하려면 ES2015의 클래스 문법을 이해해야 했습니다. 특히 `this` 키워드와 메서드 바인딩 등의 개념이 복잡했습니다.
2. **리팩토링의 어려움**: 상태 관리 로직을 가진 컴포넌트를 리팩토링하는 과정에서 클래스 문법을 다루는 것이 번거로웠습니다.
3. **Wrapper Hell**: HOC 패턴이나 Render Prop 패턴을 사용하여 코드 재사용을 하다 보면 중첩된 래퍼 컴포넌트들로 인해 구조가 복잡해지는 문제가 발생했습니다.
4. **코드 중복**: 생명주기 메서드를 사용하면서 코드의 중복이 발생하는 경우가 많았습니다.

### Hooks의 장점

Hooks를 사용하면 위의 단점들을 극복할 수 있습니다. 다음은 Hooks를 사용하여 얻을 수 있는 주요 이점입니다:

1. **함수형 컴포넌트에서의 상태 관리**: `useState` 훅을 사용하면 함수형 컴포넌트에서도 쉽게 상태를 관리할 수 있습니다.
2. **생명주기 메서드의 대체**: `useEffect` 훅을 사용하면 클래스 컴포넌트의 생명주기 메서드 (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`)를 대체할 수 있습니다.
3. **코드 재사용**: 커스텀 훅을 사용하면 상태 로직을 여러 컴포넌트에서 재사용할 수 있습니다.
4. **코드 간결화**: 생명주기와 상태 관리를 훅으로 처리하면 코드가 간결해지고, 관심사에 따라 기능을 분리할 수 있습니다.

### 예제: 버튼 컴포넌트

클래스 컴포넌트를 사용하여 버튼 상태를 관리하는 예제를 살펴보겠습니다.

### 클래스 컴포넌트

```jsx
import React from "react";
import "./styles.css";

export default class Button extends React.Component {
  constructor() {
    super();
    this.state = { enabled: false };
  }

  render() {
    const { enabled } = this.state;
    const btnText = enabled ? "enabled" : "disabled";

    return (
      <div
        className={`btn enabled-${enabled}`}
        onClick={() => this.setState({ enabled: !enabled })}
      >
        {btnText}
      </div>
    );
  }
}
```

### 함수형 컴포넌트와 Hooks

위 예제를 함수형 컴포넌트와 `useState` 훅을 사용하여 다시 작성해보겠습니다.

```jsx
import React, { useState } from "react";
import "./styles.css";

function Button() {
  const [enabled, setEnabled] = useState(false);
  const btnText = enabled ? "enabled" : "disabled";

  return (
    <div
      className={`btn enabled-${enabled}`}
      onClick={() => setEnabled(!enabled)}
    >
      {btnText}
    </div>
  );
}

export default Button;
```

### 커스텀 훅

커스텀 훅을 사용하여 여러 컴포넌트에서 재사용할 수 있는 상태 관리 로직을 작성할 수 있습니다. 예를 들어, 특정 키가 눌렸는지 여부를 감지하는 훅을 만들어보겠습니다.

```jsx
import { useState, useEffect } from "react";

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function handleDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyPressed;
}

export default useKeyPress;
```

### 정리

Hooks는 React에서 상태와 생명주기 메서드를 함수형 컴포넌트에서도 사용할 수 있게 해주는 강력한 도구입니다. 이를 통해 코드의 복잡성을 줄이고, 재사용성과 가독성을 높일 수 있습니다. Hooks를 적절히 사용하면 함수형 프로그래밍의 장점을 극대화할 수 있으며, 클래스 컴포넌트의 복잡성을 피할 수 있습니다.
