# HOC 패턴 (고차 컴포넌트 패턴)

고차 컴포넌트(Higher-Order Component, HOC)는 React에서 재사용 가능한 로직을 여러 컴포넌트에 주입하기 위해 사용되는 디자인 패턴입니다. 이 패턴을 통해 공통 로직을 쉽게 공유할 수 있으며, 컴포넌트의 중복을 줄이고 코드의 가독성과 유지보수성을 높일 수 있습니다.

### HOC 패턴의 주요 특징

1. **재사용성**: 여러 컴포넌트에서 동일한 로직을 쉽게 재사용할 수 있습니다.
2. **구성**: 컴포넌트를 함수로 받아 새로운 컴포넌트를 반환합니다.
3. **추상화**: 반복되는 로직을 추상화하여 코드의 중복을 줄입니다.

### HOC 패턴 예제

### 스타일링 HOC 예제

아래 예제에서는 여러 컴포넌트에 동일한 스타일을 적용하는 HOC를 구현합니다.

```jsx
function withStyles(Component) {
  return function StyledComponent(props) {
    const style = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click me!</button>;
const Text = () => <p>Hello World!</p>;

const StyledButton = withStyles(Button);
const StyledText = withStyles(Text);

// 사용 예시
<StyledButton />;
<StyledText />;
```

위의 예제에서 `withStyles` HOC는 `Button`과 `Text` 컴포넌트에 스타일을 적용하고, `StyledButton`과 `StyledText`로 반환합니다.

### 로딩 상태 표시 HOC 예제

API에서 데이터를 받아오는 동안 로딩 상태를 표시하는 HOC를 구현해 보겠습니다.

```jsx
import React, { useState, useEffect } from "react";

function withLoader(Component, url) {
  return function LoaderComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }, [url]);

    if (loading) return <div>Loading...</div>;
    return <Component data={data} {...props} />;
  };
}

function DogImages({ data }) {
  return (
    <div>
      {data.message.map((src, index) => (
        <img key={index} src={src} alt="dog" />
      ))}
    </div>
  );
}

const EnhancedDogImages = withLoader(
  DogImages,
  "<https://dog.ceo/api/breed/labrador/images/random/6>"
);

// 사용 예시
<EnhancedDogImages />;
```

위의 예제에서 `withLoader` HOC는 API에서 데이터를 받아오는 동안 로딩 메시지를 표시하고, 데이터를 받아온 후 `DogImages` 컴포넌트를 렌더링합니다.

### HOC의 장단점

### 장점

1. **코드 재사용성**: 여러 컴포넌트에서 동일한 로직을 한 번만 구현하여 재사용할 수 있습니다.
2. **관심사의 분리**: 비즈니스 로직과 UI 로직을 분리하여 유지보수가 쉬워집니다.
3. **추상화**: 반복되는 로직을 추상화하여 코드의 가독성을 높입니다.

### 단점

1. **Prop 충돌**: HOC가 반환하는 컴포넌트에 전달되는 props의 이름이 겹칠 수 있습니다.
2. **복잡성 증가**: 여러 HOC를 조합하여 사용하면 컴포넌트 트리가 깊어지고 복잡해질 수 있습니다.
3. **디버깅 어려움**: 중첩된 HOC는 디버깅을 어렵게 만들 수 있습니다.

### HOC와 Hooks 비교

React의 훅(Hook)은 HOC와 유사한 문제를 해결할 수 있지만, 각기 다른 장점과 단점을 가지고 있습니다.

### HOC 사용 사례

- **앱 전반적으로 동일하며 커스터마이징 불가한 동작이 여러 컴포넌트에 필요한 경우**
- **컴포넌트가 커스텀 로직 추가 없이 단독으로 동작할 수 있어야 하는 경우**

### Hooks 사용 사례

- **공통 기능이 각 컴포넌트에서 쓰이기 전에 커스터마이징 되어야 하는 경우**
- **공통 기능이 앱 전반적으로 쓰이는 것이 아닌 하나나 혹은 몇 개의 컴포넌트에서 요구되는 경우**
- **해당 기능이 기능을 쓰는 컴포넌트에게 여러 프로퍼티를 전달해야 하는 경우**

### 사례 분석

### Apollo Client

Apollo Client는 React에서 GraphQL을 사용하기 위한 라이브러리로, 초기에는 HOC를 통해 데이터를 주입했습니다.

```jsx
import { graphql } from "@apollo/react-hoc";

const query = gql`
  query {
    dogs {
      id
      breed
    }
  }
`;

function DogList({ data: { loading, error, dogs } }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog.id}>{dog.breed}</li>
      ))}
    </ul>
  );
}

export default graphql(query)(DogList);
```

React에 훅이 추가된 이후 Apollo는 훅을 지원하게 되었습니다.

```jsx
import { useQuery } from "@apollo/client";

const query = gql`
  query {
    dogs {
      id
      breed
    }
  }
`;

function DogList() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <ul>
      {data.dogs.map((dog) => (
        <li key={dog.id}>{dog.breed}</li>
      ))}
    </ul>
  );
}
```

훅을 사용하면 HOC를 중첩해서 사용하는 복잡성을 줄일 수 있고, 코드가 간결해집니다.

### 결론

HOC 패턴은 여러 컴포넌트에 공통 로직을 주입할 수 있는 강력한 방법입니다. 하지만 훅이 도입된 이후로는 상황에 따라 HOC보다 훅을 사용하는 것이 더 나은 선택이 될 수 있습니다. HOC는 컴포넌트를 래핑하여 로직을 주입하는 반면, 훅은 컴포넌트 내에서 로직을 주입할 수 있습니다. 각각의 패턴은 특정 상황에서 더 적합할 수 있으므로, 사용자의 필요에 맞게 선택하는 것이 중요합니다.
