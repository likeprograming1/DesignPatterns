class Singleton {
  constructor() {
    if (Singleton.instance) {
      return console.warn("Warning : Singleton class already instantiated");
    }
    Singleton.instance = this;
    this.version = Date.now();
    this.config = "test";
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

// 첫 번째
// 첫 번째 는 인스턴스가 생성되고 제대로 찍힙니다.
// const s1 = new Singleton();
// console.log(s1);

// 두 번째는 이미 존재하여 찍히지 않고 경고가 나옵니다.
// const s2 = new Singleton();
// console.log(s2);

// 두 번째
// 둘 다 똑같은 인스턴스를 사용해서 둘 다 출력됩니다.
// const s1 = Singleton.getInstance();
// console.log(s1);

// const s2 = Singleton.getInstance();
// console.log(s2);
// console.log(s1 === s2);

// Singleton 하나를 위한 패턴
// 앱의 설정들을 관리하기 위해 사용하는 패턴
// 클래스 생성시 constructor는 private입니다.
// constructor는 직접적으로 접근을 방지
// static요소를 사용해서 접근해야함 이 두가지 요소가 싱글톤 패턴이다.
// 이 두 가지 요소가 있어야 싱글톤 패턴이라 말할 수 있다.

// 요약
// 1. 하나의 객체 인스턴스만 존재
// 2. 스태틱 함수로 객체 접근
