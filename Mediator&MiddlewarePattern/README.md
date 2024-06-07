# Mediator&Middleware Pattern

### Mediator 패턴

Mediator 패턴은 여러 객체들이 직접 통신하는 대신, 중재자 역할을 하는 객체를 통해 통신하도록 하는 디자인 패턴입니다. 이를 통해 객체 간의 결합도를 낮추고, 시스템의 유연성과 확장성을 높일 수 있습니다. 이 패턴은 특히 복잡한 상호작용을 관리할 때 유용합니다.

### Mediator 패턴의 주요 특징

1. **중재자 역할**: Mediator 객체가 여러 객체 간의 통신을 중재합니다.
2. **결합도 감소**: 객체들이 서로 직접 참조하지 않고 Mediator를 통해 통신하므로, 객체 간의 결합도가 낮아집니다.
3. **유연성**: 새로운 객체나 기능을 추가할 때 Mediator만 수정하면 되므로 시스템의 유연성이 증가합니다.

### Mediator 패턴 예제

### 채팅 시스템 구현

채팅 시스템에서 각 사용자가 직접 통신하는 대신, 메시지를 중재자(Mediator) 역할을 하는 채팅 방(ChatRoom)을 통해 주고받도록 할 수 있습니다.

```jsx
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();
    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

// 사용 예시
const chatRoom = new ChatRoom();

const user1 = new User("Alice", chatRoom);
const user2 = new User("Bob", chatRoom);

user1.send("Hello, Bob!"); // 메시지가 ChatRoom을 통해 전달됨
user2.send("Hi, Alice!"); // 메시지가 ChatRoom을 통해 전달됨
```

이 예제에서 `User` 객체는 `ChatRoom` 객체를 통해 메시지를 주고받습니다. 각 사용자는 메시지를 직접 상대방에게 보내지 않고, `ChatRoom`을 통해서만 메시지를 주고받습니다.

### Middleware 패턴

Middleware 패턴은 요청과 응답 사이에 여러 개의 처리 단계를 추가하여, 각 단계에서 요청을 처리하거나 수정할 수 있도록 하는 패턴입니다. 이 패턴은 특히 웹 서버에서 요청을 처리할 때 유용하게 사용됩니다.

### Middleware 패턴의 주요 특징

1. **요청과 응답의 체인**: 요청이 여러 개의 미들웨어를 거쳐 처리됩니다.
2. **단일 책임 원칙**: 각 미들웨어는 하나의 책임만을 가집니다.
3. **유연한 처리**: 각 미들웨어는 다음 미들웨어로 요청을 넘기거나, 요청 처리를 종료할 수 있습니다.

### Middleware 패턴 예제

### Express.js 미들웨어 구현

Express.js는 미들웨어 패턴을 활용하여 요청을 처리합니다. 각 미들웨어는 요청 객체(req), 응답 객체(res), 그리고 다음 미들웨어를 호출하는 next 함수를 인자로 받습니다.

```jsx
const express = require("express");
const app = express();

// 첫 번째 미들웨어: 요청에 헤더 추가
app.use("/", (req, res, next) => {
  req.headers["test-header"] = "1234";
  next(); // 다음 미들웨어 호출
});

// 두 번째 미들웨어: 헤더가 추가되었는지 확인
app.use("/", (req, res, next) => {
  console.log(`Request has test header: ${!!req.headers["test-header"]}`);
  res.send("Middleware pattern example");
});

// 서버 시작
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

이 예제에서는 두 개의 미들웨어를 설정했습니다. 첫 번째 미들웨어는 요청 객체에 헤더를 추가하고, 두 번째 미들웨어는 헤더가 잘 추가되었는지 확인한 후 응답을 보냅니다. 각 미들웨어는 `next` 함수를 호출하여 다음 미들웨어로 제어를 넘깁니다.

### 결론

Mediator 패턴과 Middleware 패턴은 서로 다른 문제를 해결하기 위해 사용되는 디자인 패턴입니다. Mediator 패턴은 객체 간의 직접적인 통신을 피하고 중재자를 통해 통신하도록 하여 결합도를 낮추고, Middleware 패턴은 요청과 응답 사이에 여러 처리 단계를 추가하여 요청을 유연하게 처리할 수 있도록 합니다. 이 두 패턴은 복잡한 시스템을 보다 관리하기 쉽게 만들어 줍니다.
