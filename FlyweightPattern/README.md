# 플라이웨잇 패턴 (Flyweight Pattern)

플라이웨잇 패턴은 동일한 객체를 다룰 때 이미 존재하는 인스턴스를 재사용하여 메모리 사용을 최적화하는 디자인 패턴입니다. 이 패턴은 비슷한 객체를 대량으로 만들어야 할 때 메모리를 절약할 수 있게 해줍니다.

### 예제 설명

책을 추가할 수 있는 앱을 예로 들어 보겠습니다. 모든 책은 `title`, `author`, `isbn` 속성을 가지고 있습니다. 도서관에서는 동일한 책을 여러 권 보유할 수 있으므로, 같은 책에 대해 새로운 인스턴스를 매번 생성하는 것은 비효율적입니다. 대신, 하나의 책을 의미하는 Book 클래스의 인스턴스를 재사용하려고 합니다.

### Book 클래스 정의

```jsx
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```

### createBook 함수

이미 존재하는 책인지 확인하고, 존재하면 해당 책 인스턴스를 반환하며, 존재하지 않으면 새로운 책 인스턴스를 생성하여 반환하는 함수입니다.

```jsx
const books = new Map();

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};
```

### addBook 함수

도서관의 책 목록에 책을 추가하는 함수입니다. 이 함수는 책 인스턴스를 새로 만들거나 이미 존재하는 경우를 고려하여 `createBook` 함수를 호출합니다.

```jsx
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};
```

### 사용 예제

3종류의 책 5권을 추가하는 예제입니다. 이 예제에서는 5개의 책을 추가했지만, `Book` 인스턴스는 3개만 생성됩니다.

```jsx
addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);
```

### 요약

플라이웨잇 패턴은 대량의 객체를 만들어 낼 때 메모리를 많이 사용하는 문제를 해결할 수 있습니다. 이 패턴을 사용하면 메모리 사용량을 최소화할 수 있습니다. 그러나 자바스크립트에서는 프로토타입 상속을 통해서도 비슷한 효과를 낼 수 있기 때문에, 이 패턴이 항상 필수적인 것은 아닙니다.
