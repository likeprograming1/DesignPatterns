# Container/Presentational 패턴

Container/Presentational 패턴은 비즈니스 로직으로부터 뷰를 분리하여 관심사의 분리(Separation of Concerns, SoC)를 강제합니다. 이 패턴은 React에서 자주 사용되며, 이를 통해 비즈니스 로직과 뷰 로직을 명확하게 분리할 수 있습니다.

## 개요

React에서 관심사의 분리를 강제하는 방법 중 하나는 Container/Presentational 패턴을 이용하는 것입니다. 이를 통해 비즈니스 로직과 뷰 로직을 명확히 분리할 수 있습니다.

### 예제 시나리오

6개의 강아지 사진을 다운로드받아 화면에 렌더링하는 앱을 만든다고 가정해보겠습니다. 이 프로세스를 아래 두 가지로 분리하여 관심사의 분리를 강제하고 싶습니다:

- **Presentational Components**: 데이터가 어떻게 사용자에게 보여질지에 대해서만 다루는 컴포넌트. 예제에서는 강아지 사진의 목록을 렌더링하는 부분입니다.
- **Container Components**: 어떤 데이터가 보여질지에 대해 다루는 컴포넌트. 예제에서는 강아지 사진들을 다운로드하는 부분입니다.

강아지 사진을 다운로드하는 것은 비즈니스 로직의 역할이고, 이미지를 보여주는 것은 뷰의 역할입니다.

## Presentational Component

Presentational 컴포넌트는 `props`를 통해 데이터를 받습니다. 이 컴포넌트의 주요 기능은 받은 데이터를 화면에 표현하는 것이며, 이를 위해 스타일시트를 포함합니다. 데이터는 직접 수정하지 않습니다.

아래는 강아지 사진을 출력하는 예제입니다. 강아지 사진을 렌더링할 때, 단순히 각 이미지를 API로부터 다운로드하고 화면에 렌더링하는 대신, 이미지를 `props`로 받아 화면에 그리는 함수형 컴포넌트를 만듭니다.

```jsx
function DogImages({ images }) {
  return (
    <div>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Dog ${index + 1}`} />
      ))}
    </div>
  );
}
```

여기서 `DogImages` 컴포넌트는 Presentational 컴포넌트입니다. Presentational 컴포넌트는 UI 변경을 위한 상태 외에는 상태를 갖지 않으며, `props`로 받은 데이터를 수정하지 않습니다.

## Container Component

Container 컴포넌트의 주요 기능은 Presentational 컴포넌트에 데이터를 전달하는 것입니다. Container 컴포넌트는 자체적으로 화면에 아무것도 렌더링하지 않으며, 스타일시트도 포함하지 않습니다.

아래 예제에서 강아지 사진 목록을 `DogImages` 컴포넌트에 전달하기 위해 Container 컴포넌트를 만들었습니다. 이 컴포넌트는 외부 API로부터 강아지 이미지를 다운로드하고 Presentational 컴포넌트인 `DogImages` 컴포넌트에게 전달합니다.

```jsx
class DogImagesContainer extends React.Component {
  state = {
    images: [],
  };

  componentDidMount() {
    fetch("<https://dog.ceo/api/breed/labrador/images/random/6>")
      .then((res) => res.json())
      .then(({ message }) => {
        this.setState({ images: message });
      });
  }

  render() {
    return <DogImages images={this.state.images} />;
  }
}
```

위의 두 컴포넌트를 조합하면 비즈니스 로직과 뷰 로직을 분리할 수 있습니다.

## Hooks

대개 Container/Presentational 패턴은 React Hooks로 대체할 수 있습니다. React에 Hooks가 추가되면서 Container 컴포넌트 없이도 stateless 컴포넌트를 쉽게 만들 수 있게 되었습니다.

아래는 `DogImagesContainer` 컴포넌트에 있는 데이터 로드 코드를 커스텀 훅으로 만든 예제입니다.

```jsx
import { useState, useEffect } from "react";

export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("<https://dog.ceo/api/breed/labrador/images/random/6>")
      .then((res) => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

위의 훅을 사용하면 데이터를 받아오기 위해 `DogImagesContainer` 컴포넌트를 사용할 필요가 없습니다. 대신 Presentational 컴포넌트인 `DogImages`에서 훅을 직접 호출해 사용할 수 있습니다.

```jsx
function DogImages() {
  const images = useDogImages();

  return (
    <div>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Dog ${index + 1}`} />
      ))}
    </div>
  );
}
```

`useDogImages` 훅을 사용하여 Container/Presentational 패턴을 사용한 것과 같이 비즈니스 로직과 뷰 로직을 분리할 수 있습니다. `DogImages`는 단순히 훅에서 반환된 값을 수정 없이 사용하면 됩니다.

## 장점

Container/Presentational 패턴은 여러 장점들을 가지고 있습니다.

1. **관심사의 분리**: Presentational 컴포넌트는 UI를 담당하는 순수함수로 작성하게 되며, Container 컴포넌트는 상태와 기타 데이터를 책임지게 됩니다.
2. **재사용성**: Presentational 컴포넌트는 데이터 변경 없이 화면에 출력할 수 있으므로 앱의 여러 곳에서 다양한 목적으로 재사용할 수 있습니다.
3. **유지보수성**: Presentational 컴포넌트는 비즈니스 로직을 수정하지 않으므로 코드베이스에 대한 이해가 깊지 않은 개발자도 쉽게 수정할 수 있습니다. 공통으로 쓰이는 Presentational 컴포넌트를 디자인 요구사항에 따라 수정하면 앱 전체에 반영됩니다.
4. **테스트 용이성**: Presentational 컴포넌트는 일반적으로 순수함수로 구현되므로 전체 목 데이터 스토어를 만들 필요 없이 요구하는 데이터만 인자로 넘겨주면 됩니다.

## 단점

Container/Presentational 패턴은 비즈니스 로직과 렌더링 로직을 쉽게 분리할 수 있지만, Hooks를 활용하면 클래스형 컴포넌트를 사용하지 않고도 이 패턴을 대체할 수 있습니다. 상태를 가진 컴포넌트도 함수형으로 만들 수 있습니다.

훅을 사용하더라도 이 패턴을 사용할 수는 있지만, 너무 작은 규모의 앱에서는 오버엔지니어링이 될 수 있습니다.
