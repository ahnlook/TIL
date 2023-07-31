# 25장 클래스

## 25.1 클래스는 프로토타입의 문법적 설탕인가?

- 사실 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이라고 볼 수도 있다.
- 클래스와 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 않는다.
- 클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능도 제공한다.
  - 클래스를 `new` 연산자 없이 호출하면 에러가 발생한다.
  - 클래스는 상속을 지원한는 `extends`와 `super` 키워드를 제공한다.
  - 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
  - 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되며 해제할 수 없다.
  - 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. 다시 말해, 열거되지 않는다.
- 클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕이라고 보기보다는 새로운 객체 생성 메커니즘으로 보는 것이 좀 더 합당하다.

## 25.2 클래스 정의

- `class` 키워드를 사용하여 정의한다. 파스칼 케이스를 사용하는 것이 일반적이다.
  ```jsx
  class Person {}
  ```
- 표현식을 클래스를 정의할 수도 있다.

  ```jsx
  // 익명 클래스 표현식
  const Person = class {}

  // 기명 클래스 표현식
  const Person = class MyClass {}
  ```

  - 클래스를 표현식으로 정의할 수 있다는 것은 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다. (클래스는 함수다.)
    - 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
    - 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
    - 함수의 매개변수에게 전달할 수 있다.
    - 하무의 반환값으로 사용할 수 있다.

- 클래스 몸체에서 정의할 수 있는 메서드는 세 가지가 있다.
  - constructor
  - 프로토타입 메서드
  - 정적 메서드

### 생성자 함수와 정의 방식 비교

```jsx
// 생성자 함수
function Person(name) {
  this.name = name
}

//프로토타입 메서드
Person.prototype.sayHi = function () {
  console.log(`Hi! ${this.name}`)
}

// 정적 메서드
Person.sayHello = function () {
  console.log('Hi!')
}
```

```jsx
// 생성자
constructor(name) {
  this.name = name
}

// 프로토타입 메서드
sayHi() {
  console.log(`Hi! ${this.name}`)
}

// 정적 메서드
static sayHello() {
  console.log('Hi!')
}
```

## 25.3 클래스 호이스팅

- 클래스는 함수로 평가된다.

  ```jsx
  class Person {}

  console.log(typeof Person) // function
  ```

- 클래스 선언문으로 정의한 클래스는 런타임 이전에 먼저 평가되어 함수 객체를 생성한다.
- 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수, 즉 `constructor`다.
- 클래스는 정의 이전에 참조할 수 없다.

  - 클래스 선언문은 마치 호이스팅이 발생하지 않는 것처럼 보이지만 그렇지 않다.

  ```jsx
  const Person = ''

  {
    console.log(Person) // 📍 ReferenceError: Cannot access 'Person' before initialization

    class Person {}
  }
  ```

  📍 호이스팅이 발생하지 않는다면 `‘’`이 출력되어야 한다.

- 클래스 선언문도 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생한다.
  - 단, 클래스는 `let`, `const` 키워드로 선언한 변수처럼 호이스팅 된다.
  - 따라서 클래스 선언문 이전에 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

## 25.4 인스턴스 생성

- 클래스는 생성자 함수이며 `new` 연산자와 함께 호출되어 인스턴스를 생성한다.

  ```jsx
  class Person {}

  const me = new Person()
  console.log(me) // Person {}
  ```

- 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 `new` 연산자와 함께 호출해야 한다.

  ```jsx
  class Person {}

  const me = Person()
  // TypeError: Class constructor Person cannot be invoked without 'new'
  ```

  ```jsx
  const Person = class MyClass {}

  const me = new Person()
  console.log(MyClass) // ReferenceError: MyClass is not defined.

  const you = new MyClass() // ReferenceError: MyClass is not defined.
  ```

  - 클래스를 가리키는 식별자로 인스턴스를 생성해야 한다.
  - 클래스 이름 MyClass는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자다.

## 25.5 메서드

### 25.5.1 constructor

- 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다.
- 이름을 변경할 수 없다.
- 클래스는 클래스는 인스턴스를 생성하기 위한 생성자 함수이다.
  - 클래스는 함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프 체인을 구성한다.
- `prototype` 프로퍼티가 가리키는 프로토타입 객체의 `constructor` 프로퍼티는 클래스 자신을 가리키고 있다.
- Perosn 클래스의 `constructor` 내부에서 `this`에 추가한 `name` 프로퍼티가 클래스가 생성한 인스턴스의 프로퍼티로 추가된 것을 확인할 수 있다.
- 생성자함수와 마찬가지로 `constructor` 내부에서 `this`에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.
  - `constructor` 내부의 `this`는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.

<img width="1054" alt="image" src="https://user-images.githubusercontent.com/88878874/257264587-31a14511-6587-4aea-86c3-970e3b001ac2.png">

- `constructor`는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다.
  - 클래스 정의가 평기되면 `constructor`의 기술된 동작을 하는 함수 객체가 생성된다.
- `constructor`를 생략하면 클랙스에 빈 `constructor`가 암묵적으로 정의된다.
  - `constructor`를 생략한 클래스는 빈 객체를 생성한다.

```jsx
class Person {
  constructor(address) {
    this.name = 'Lee' // 고정 값으로 인스턴스 초기화
    this.address = address // 💚 인수로 인스턴스 초기화
  }
}

const me = new Person('Seoul') // 💚 인수로 초기값을 전달
```

- 인스턴스를 초기화하려면 `constructor`를 생략해서는 안 된다.
- `constructor`는 반환문을 가지지 않아야한다.

  - `new` 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 `this`, 즉 인스턴스를 반환하기 때문이다.

    - `this`가 아닌 다른 객체를 명시적으로 반환하면 `this`, 즉 인스턴스가 반환되지 못하고 `return` 문에 명시한 객체가 반환된다.

      ```jsx
      class Person {
        constructore(name) {
          this.name = name
          return {}
        }
      }

      const me = new Person('lily')
      console.log(me) // {}
      ```

    - 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 `this`가 반환된다.

      ```jsx
      class Person {
        constructore(name) {
          this.name = name
          return 100
        }
      }

      const me = new Person('lily')
      console.log(me) // Person { name: 'lily' }
      ```

  ### 25.5.2 프로토타입 메서드

  - 생성자 함수의 prototype

  ```jsx
  function Person(name) {
    this.name = name
  }

  Person.prototype.sayHi = function () {
    console.log('Hi ${this.name')
  }

  const me = new Person('lily')
  me.sayHi() // Hi Lily
  ```

  - 클래스의 prototype

  ```jsx
  class Person(name) {
    constructor(name) {
      this.name = name
    }

    sayHi() {
      console.log('Hi ${this.name')
    }
  }

  const me = new Person('lily')
  me.sayHi() // Hi Lily
  ```

- 클래스 몸체에서 정의한 메서드는 기본적으로 프로토타입 메서드가 된다.
- 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.
  ```jsx
  Object.getPrototypeOf(me) === Person.prototype // true
  Object.getPrototypeOf(Person.prototype) === object.prototype // true
  me.constructor === Person // true
  ```
  <img width="598" alt="image" src="https://user-images.githubusercontent.com/88878874/257264774-22ee386a-9a8a-4ed0-a0c7-bf5fbc76663f.png">

### 25.5.3 정적 메서드

- 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.

```jsx
class Person {
  constructor(name) {
    this.name = name
  }

  static sayHi() {
    console.log('hi!')
  }
}
```

<img width="1255" alt="image" src="https://user-images.githubusercontent.com/88878874/257264838-f90eb8c4-2ab6-47ee-bca7-0fddfd73599d.png">

- 정적 메서드는 클래스에 바인딩 된 메서드가 된다.
- 클래스는 함수 객체로 평가되므로 자신의 프로퍼티와 메서드를 소유할 수 있다.
- 정적 메서드는 프로토타입 메서드처럼 인스턴스로 호출하지 않고 클래스로 호출한다.
  ```jsx
  Person.sayHi() // hi!
  ```
  ```jsx
  const me = new Persom('lily')
  me.sayHi() // TypeError: me.sayHi is not a functon
  ```

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

- 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
- 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
- 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

_➕ 정적 메서드를 사용하는 경우_

- **유틸리티 함수:**

  ```jsx
  class MathUtils {
    static add(a, b) {
      return a + b
    }

    static subtract(a, b) {
      return a - b
    }
  }

  console.log(MathUtils.add(5, 3)) // 출력: 8
  console.log(MathUtils.subtract(5, 3)) // 출력: 2
  ```

- **팩토리 메소드:**

  ```jsx
  class Person {
    constructor(name) {
      this.name = name
    }

    static createAnonymous() {
      return new Person('Anonymous')
    }
  }

  let anonymousPerson = Person.createAnonymous()
  console.log(anonymousPerson.name) // 출력: "Anonymous"
  ```

- **싱글톤 패턴: 이 클래스의 인스턴스는 언제나 하나이다.**

  ```jsx
  class Singleton {
    constructor() {
      if (!Singleton.instance) {
        Singleton.instance = this
      }

      return Singleton.instance
    }

    static getInstance() {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton()
      }

      return Singleton.instance
    }
  }

  let instance1 = Singleton.getInstance()
  let instance2 = Singleton.getInstance()

  console.log(instance1 === instance2) // 출력: true
  ```

### 25.5.5 클래스에서 정의한 메서드의 특징

- `function` 키워드를 생략한 메서드 축약 표현을 사용
- 객체 리터럴과 다르게 클래스에 메서드를 정의할 때는 콤마가 불필요
- 암묵적으로 strict mode로 실행
- 내부 메서드 [[Construct]]를 갖지 않는 non-constructor. 따라서 `new` 연산자와 함께 호출할 수 없음

## 25.6 클래스의 인스턴스 생성 과정

- `new` 연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 `[[Constructor]]`가 호출된다.

### 1. 인스턴스 생성과 this 바인딩

- `new` 연산자와 함께 클래스를 호출하면 `Constructor`의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다.
  - 이 빈 객체가 클래스가 생성한 인스턴스다.
  - 이 때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.
  - 이 빈 객체, 인스턴스가 this에 바인딩된다.
- `constructor` 내부의 `this`는 클래스가 생성한 인스턴스를 가리킨다.

### 2. 인스턴스 초기화

- `constructor`의 내부 코드가 실행되어 `this`에 바인딩되어 있는 인스턴스를 초기화한다.
- `constructor`가 생략되었다면 이 과정도 생략된다.

### 3. 인스턴스 반환

- 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this`가 암묵적으로 반환된다.

```jsx
class Person {
  constructor(name) {
    // 1️⃣ 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this) // Person {}
    console.log(Object.getPrototypeOf(this) === Person.Person.prototype) // true

    // 2️⃣ this에 바인딩되어 있는 인스턴스를 초기화 한다.
    this.name = name

    // 3️⃣ 완성된 인스턴스가 바인딩 된 this가 암묵적으로 반환된다.
  }
}
```

## 25.7 프로퍼티

### 25.7.1 인스턴스 프로퍼티

```jsx
class Person {
  constructor(name) {
    // 💚 인스턴스 프로퍼티
    // 💚 name 프로퍼티는 public하다.
    this.name = name
  }
}

const me = new Person('lily')
console.log(me) // Person { name: 'lily' }

// 💚 name은 public하다.
console.log(me.name) // lily
```

🤔 책에서는 private, public, protected와 같은 접근 제한자를 지원하지 않는다고 되어 있는데 현재는 private을 지원하고 있다.

[Private class fields - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

### 25.7.2 접근자 프로퍼티

- 자체적으로는 값(`[[Value]]` 내부슬롯)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.
- `getter`함수와 `setter`함수로 구성되어 있다.

```jsx
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split('')
  }
}

const me = newPerson('lily', 'Ahn')

console.log(`${me.firstName} ${me.lastName}`) // lily Ahn

me.fullName = 'Hannah Ahn'
console.log(me)          // { firstName: 'Hannah', 'lastName: 'Ahn' }

console.log(me.fullName) // Hannah Ahn

console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName')
// { get: f, set: f, enumerble: false, cofigurable: true }
```

### 25.7.3 클래스 필드 정의 제안

- 클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가르키는 용어다.

<img width="635" alt="image" src="https://user-images.githubusercontent.com/88878874/257265146-d8f7a927-c7cd-48fb-b9b8-88f0f96c964a.png">

🤔 자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있다. → 라고 되어 있는데 현재는 프로퍼티 정의가 가능하다.

- 단, 클래스 내부에서 프로퍼티 참조 시 `this`를 사용해야 한다.

<img width="609" alt="image" src="https://user-images.githubusercontent.com/88878874/257265240-66a68249-bbb7-4edb-888e-53de9a54ad9f.png">

<img width="611" alt="image" src="https://user-images.githubusercontent.com/88878874/257265288-20393453-c6a3-43e2-95f9-b0fa9638ee4d.png">

- 인스턴스에서 프로퍼티로 바로 접근하여 참조할 수 있다.
- 클래스 몸체에서 클래스 필드를 정의하는 경우 `this`에 클래스 필드를 바인딩 해서는 안 된다.
  ```jsx
  class Person {
  	this.name = ''
  	// SyntaxError: Unexpected token '.'
  }
  ```
- 인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 `constructor`에서 클래스 필드를 초기화해야 한다.
  - 이런 경우 `constructor` 밖에서 필드를 정의할 필요가 없다.
  - 이 때 `this`, 즉 클래스가 생성한 인스턴스에 클래스 필드에 해당하는 프로퍼티가 없다면 자동 추가된다.
- 함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다.

  ```jsx
  class Person {
    name = 'lily'

    getName = function () {
      return this.name
    }

    getName2 = () => this.name
  }
  ```

  - 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.
  - 클래스 필드에 함수를 할당하는 것은 권장되지 않는다.

- 클래스 필드에 화살표 함수를 할당하여 화살표 함수 내부의 this가 인스턴스를 가리키게 하는 경우도 있다.

### 25.7.4 private 필드 정의 제안

- private 필드의 선두에는 `#`을 붙여준다.
- private 필드는 클래스 내부에서만 참조할 수 있다.
  - 접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효하다.
- private 필드를 직접 `constructor`에 정의하면 에러가 발생한다.

### 25.7.5 static 필드 정의 제안

→ 25.5.3 정적 메서드 참고

## 25.8 상속에 의한 클래스 확장

### 25.8.1 클래스 상속과 생성자 함수 상속
