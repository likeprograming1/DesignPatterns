
# Singleton Pattern

Singleton 패턴은 한 번만 인스턴스화되어 전역에서 접근 가능한 클래스를 의미합니다. 앱의 전역 상태를 관리하기에 적합합니다. ES2015 클래스로 작성된 Singleton을 예시로 들어 Counter 클래스를 구현해보았습니다.

초기 코드에서는 여러 번 인스턴스를 생성할 수 있어 Singleton 조건을 만족하지 못했습니다. 이를 해결하기 위해, 인스턴스를 단 한 번만 만들 수 있도록 instance 변수를 사용하여 생성자를 수정했습니다. 또한, Object.freeze를 사용해 인스턴스를 수정할 수 없도록 했습니다.

프로젝트 파일 구조는 다음과 같습니다:
- `counter.js`: Counter 클래스와 Singleton 인스턴스를 구현 및 export.
- `index.js`: `redButton.js`와 `blueButton.js`를 로드.
- `redButton.js`와 `blueButton.js`: 각각 Counter의 increment 및 decrement 메서드를 실행하고 값을 콘솔에 출력.

Singleton의 장점은 메모리 절약이지만, 단점으로는 테스트가 어려워지고, 의존성이 명확하지 않으며, 전역 동작으로 인해 잘못된 값으로 덮어쓰여질 위험이 있습니다.

React에서는 전역 상태 관리를 위해 Redux나 React Context를 사용하여, Singleton의 단점을 보완합니다. 이는 상태를 직접 수정하지 못하게 하고, 개발자가 의도한 대로만 수정되도록 합니다.
