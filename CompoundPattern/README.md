# 컴파운드 패턴 (Compound Pattern)

컴파운드 패턴은 하나의 작업을 수행하기 위해 여러 컴포넌트를 만들어 각 컴포넌트가 역할을 분담하도록 하는 디자인 패턴입니다. 이 패턴을 사용하면 서로 상태를 공유하거나 특정 로직을 함께 사용하는 컴포넌트를 만들 수 있습니다. 예를 들어, 드롭다운 메뉴나 셀렉트 박스와 같은 컴포넌트에서 자주 사용됩니다.

### 예제 설명

다람쥐 사진 목록을 보여주는 앱에 버튼을 추가하여 각 사진을 수정하거나 삭제할 수 있도록 하는 예제를 통해 컴파운드 패턴을 설명하겠습니다. `FlyOut` 컴포넌트를 사용하여 메뉴를 토글할 수 있게 구현합니다.

### 컴포넌트 구성

컴파운드 패턴을 구현하기 위해 `FlyOut`, `Toggle`, `List`, `Item` 컴포넌트를 정의합니다. 이 컴포넌트들은 서로 상호작용하며, `FlyOut` 컴포넌트의 상태를 공유합니다.

### FlyOut 컴포넌트

`FlyOut` 컴포넌트는 상태를 관리하고, 자식 컴포넌트들에게 값을 전달하는 `FlyOutProvider`를 제공합니다.

```jsx
const FlyOutContext = createContext();

function FlyOut({ children }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {children}
    </FlyOutContext.Provider>
  );
}
```

### Toggle 컴포넌트

`Toggle` 컴포넌트는 사용자가 버튼을 눌러 메뉴를 열고 닫을 수 있게 합니다.

```jsx
function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={toggle}>
      <Icon />
    </div>
  );
}
```

### List 컴포넌트

`List` 컴포넌트는 `open` 상태에 따라 메뉴를 보여주거나 숨깁니다.

```jsx
function List({ children }) {
  const { open } = useContext(FlyOutContext);
  return open ? <ul>{children}</ul> : null;
}
```

### Item 컴포넌트

`Item` 컴포넌트는 리스트 아이템을 렌더링합니다.

```jsx
function Item({ children }) {
  return <li>{children}</li>;
}
```

### Static Property로 컴포넌트 추가

각 컴포넌트를 `FlyOut` 컴포넌트의 static property로 추가하여, 하나의 컴포넌트로 사용할 수 있도록 합니다.

```jsx
FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
```

### FlyOut 컴포넌트 사용 예제

`FlyOut` 컴포넌트와 그 하위 컴포넌트를 사용하여 메뉴를 구현합니다.

```jsx
import React from "react";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

### React.Children.map을 이용한 컴포넌트 순회

자식 컴포넌트들을 순회 처리하고 필요한 상태를 전달하기 위해 `React.Children.map`과 `React.cloneElement`를 사용할 수 있습니다.

```jsx
export function FlyOut({ children }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, toggle })
      )}
    </div>
  );
}
```

### 장점

- **내부 상태 관리**: 컴포넌트의 상태를 내부적으로 관리하면서, 외부에서는 이를 신경 쓰지 않아도 됩니다.
- **간단한 사용법**: 여러 자식 컴포넌트를 일일히 import할 필요 없이, 부모 컴포넌트를 통해 간단히 사용할 수 있습니다.

### 단점

- **약속된 구조 필요**: 자식 컴포넌트를 약속된 형태로 전달해야 하며, 이를 지키지 않을 경우 오류가 발생할 수 있습니다.
- **prop 이름 충돌 가능성**: `React.cloneElement`를 사용할 때 기존 prop과 이름이 충돌할 수 있으며, 이 경우 전달된 값으로 덮어씌워집니다.

### 요약

컴파운드 패턴은 여러 컴포넌트를 결합하여 하나의 작업을 수행할 때 유용합니다. 이 패턴을 통해 컴포넌트 간의 상호작용을 관리하고, 코드의 재사용성을 높일 수 있습니다. 특히, 컴포넌트 라이브러리를 만들 때 유용하게 사용할 수 있습니다.
