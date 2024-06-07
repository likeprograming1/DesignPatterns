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
