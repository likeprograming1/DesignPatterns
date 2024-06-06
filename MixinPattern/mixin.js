class Dog {
  constructor(name) {
    this.name = name;
  }
}
const animalFunctionality = {
  walk: function () {
    console.log("Walking!");
  },
  sleep: function () {
    console.log("Sleeping!");
  },
};

const dogFunctionality = {
  bark: function () {
    console.log("Woof!");
  },
  wagTail: function () {
    console.log("Wagging my tail!");
  },
  play: function () {
    console.log("Playing!");
  },
  walk: function () {
    animalFunctionality.walk.call(this);
  },
  sleep: function () {
    animalFunctionality.sleep.call(this);
  },
};

Object.assign(Dog.prototype, dogFunctionality);

const pet2 = new Dog("Buddy");

pet2.walk(); // Walking!
pet2.sleep(); // Sleeping!
