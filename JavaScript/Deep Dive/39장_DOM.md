## Document Object Model

- HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API다.
- 프로퍼티와 메서드를 제공하는 트리 자료구조다.

## 39.1 노드

### 39.1.1 HTML 요소와 노드 객체

![<img width="702" alt="image" src="https://user-images.githubusercontent.com/88878874/265576592-a748cae2-cff7-42cf-884e-2de88c9de63f.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/be693cbd-1306-44d1-abcf-3677ca2e7e80/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265576592-a748cae2-cff7-42cf-884e-2de88c9de63f.png">

- HTML 요소(element)는 HTML 문서를 구성하는 개별적인 요소를 의미한다.
- HTML 요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.
  - HTML 요소의 어트리뷰트는 어트리뷰트 노드
  - HTML 요소의 텍스트 콘텐츠는 텍스트 노드

![<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265577945-16ae1a3f-b819-46cb-8172-878eac35c631.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/f82d8f9a-9076-4eb7-9a11-2d6b39d530ed/Untitled.png)

<img width="508" alt="image" src="https://user-images.githubusercontent.com/88878874/265577945-16ae1a3f-b819-46cb-8172-878eac35c631.png">

- HTML 문서는 요소들의 집합으로 이루어지며, HTML 요소는 중첩 관계를 갖는다.
- HTML 요소의 콘텐츠 영역에는 텍스트뿐만 아니라 다른 HTML 요소도 포함할 수 있다.
- HTML 요소 간의 부자 관계를 반영하여 HTML 문서의 구성 요소인 HTML 요소를 객체화한 모든 노드 객체들은 트리 자료 구조로 구성한다.

### ✅ 노드 객체들로 구성된 트리 자료구조를 DOM이라 한다. = DOM tree

### 39.1.2 노드 객체의 타입

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

- 렌더링 엔진은 위 HTML 문서를 파싱하여 아래와 같은 DOM을 생성한다.
  - 공백 텍스트 노드는 생략되어 있다.

![<img width="754" alt="image" src="https://user-images.githubusercontent.com/88878874/265579306-975cd49a-9c60-48ea-a1c1-a08138c6f9da.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/e014543e-d6b7-4bbb-840a-cd1e7eeaafec/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265579306-975cd49a-9c60-48ea-a1c1-a08138c6f9da.png">

**✓ 문서 노드**

- DOM 트리의 최상위에 존재하는 루트 노드이다.
- document 객체를 가리킨다.
- HTML 문서 전체를 가리키는 객체이다.
- 전역 객체 window의 document 프로퍼티에 바인딩되어 있다. (`window.document`)
- 모든 자바스크립트 코드는 전역 객체 window의 document에 바인딩되어 있는 하나의 document 객체를 바라본다.

### ✅ HTML 문서당 document 객체는 유일하다.

**✓ 요소 노드**

- HTML 요소를 가리키는 객체다.
- 요소 노드는 문서의 구조를 표현한다고 할 수 있다.

**✓ 어트리뷰트 노드**

- HTML 요소의 어트리뷰트를 가리키는 객체다.
- 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있다.
- 부모 노드와 연결되어 있지 않고 요소 노드에만 연결되어 있다.

**✓ 텍스트 노드**

- HTML 요소의 텍스트를 가리키는 객체다.
- 요소 노드의 자식 노드다.
- 자식 노드를 가질 수 없는 리프 노드다.

### 39.1.3 노드 객체의 상속 구조

- DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다.
- DOM을 구성하는 노드 객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 **_호스트 객체_**다.
- 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.

![<img width="782" alt="image" src="https://user-images.githubusercontent.com/88878874/265583386-02f62dad-8925-44c0-b4ba-5fcfa9a60543.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/9c423585-acf8-4d3b-bdce-249424e7b693/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265583386-02f62dad-8925-44c0-b4ba-5fcfa9a60543.png">

![<img width="390" alt="image" src="https://user-images.githubusercontent.com/88878874/265584792-cea15800-dcbb-42a8-85dd-30c2e08e3dae.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/f556d0ac-cd3c-4cb7-9a8b-79698d980997/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265584792-cea15800-dcbb-42a8-85dd-30c2e08e3dae.png">

- 모든 노드 객체는 공통적으로 이벤트를 발생시킬 수 있다.
  - `EventTarget.addEventListener`, `EventTarget.removeEventListener` 등
- 모든 노드 객체는 트리 자료구조의 노드로서 공통적으로 트리 탐색 기능이나 노드 정보 제공 기능을 Node 인터페이스로부터 제공받는다.
  - `Node.parentNode`, `Node.childNodes`, `Node.previousSibiling` 등
- HTML 요소가 갖는 공통적인 기능은 HTMLElement 인터페이스가 제공한다.
  - `style` 등
- 공통된 기능일수록 프로토타입 체인의 상위에, 개별적인 고유 기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축하여 노드 객체의 프로퍼티와 메서드를 제공하는 상속 구조를 갖는다.

## 39.2 요소 노드 취득

### 39.2.1 id를 이용한 요소 노드 취득

```jsx
const $elem = document.getElementById('apple')
```

- HTML 문서 내에 중복된 id 값을 갖는 요소가 여러개 존재할 경우 첫 번째 요소 노드만 반환한다.
- 인수로 전달된 id 값을 갖는 요소가 존재하지 않는 경우 `null`을 반환한다.
- HTML 요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과가 있다.
- id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않는다.

### 39.2.2 태그 이름을 이용한 요소 노드 취득

```jsx
// document.prototype : document의 모든 li 요소 노드 취득
const $elems = document.getElementsByTagName('li')

// document.prototype : document의 모든 요소 노드 취득
const $all = document.getElementsByTagName('*')

// element.prototype : $fruits 요소의 자손 노드 중에서 li 요소 노드 취득
const $fruits = document.getElementById('fruits')
const $fruitList = $fruits.getElementsByTagName('li')
```

- `getElementsByTagName` 메서드가 반환하는 DOM 컬렉션 객체인 `HTMLCollection` 객체는 유사 배열 객체이면서 이터러블이다.

### 39.2.3 class를 이용한 요소 노드 취득

```jsx
const $fruits = document.getElementsByClassName('fruit')
const $apples = document.getElementsByClassName('fruit apple')
const $banana = $fruits.getElementsByClassName('banana')
```

### 39.2.4 CSS 선택자를 이용한 요소 노드 취득

```css
* {
}

p {
}

#foo {
}

.foo {
}

/* 어트리뷰트 선택자 */
input[type='text'] {
}

/* 후손 선택자: div의 후손 요소 중 p 요소를 모두 선택 */
div p {
}

/* 자식 선택자: div의 자식 요소 중 p 요소를 모두 선택 */
div > p {
}

/* 인접 형제 선택자: p 형제 요소 중 p 요소 바로 뒤에 위치하는 ul 요소 선택 */
p + ul {
}

/* 일반 형제 선택자: p 형제 요소 중 p 요소 뒤에 위치하는 ul 요소를 모두 선택*/
p ~ ul {
}

a:hover {
}

p::before {
}
```

```jsx
document.prototype.querySelector('.banana')
element.prototype.querySelector('.banana')
```

- `querySelector`는 CSS 선택자를 만족시키는 첫 번째, 하나의 요소 노드를 탐색하여 반환한다.
- 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 `null`을 반환한다.
- 선택자가 문법에 맞지 않는 경우 `DOMException` 에러가 발생한다.

```jsx
const $elem = document.querySelectorAll('ul > li')
```

- `querySelectorAll`메서드는 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다.
- DOMCollection 객체인 NodeList 객체를 반환한다.
- NodeList 객체는 유사 배열 객체이면서 이터러블이다.
- 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 빈 `NodeList`를 반환한다.
- 선택자가 문법에 맞지 않는 경우 `DOMException` 에러가 발생한다.

### 39.2.5 특정 요소 노드를 취득할 수 있는지 확인

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
  <script>
    const $apple = document.querySelector('.apple')

    // $apple 노드는 '#fruits > li.apple'로 취득할 수 있다?
    console.log($apple.matches('#fruits > li.apple')) // true
    // $apple 노드는 '#fruits > li.banana'로 취득할 수 있다?
    console.log($apple.matches('#fruits > li.banana')) // false
  </script>
</html>
```

- `matches`는 이벤트 위임을 사용할 때 유용하다.

### 39.2.6 HTMLCollection과 NodeList

- DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다.
- 유사 배열 객체이면서 이터러블이다.
- `for..of`로 순회할 수 있으며 스프레드 문법을 사용하여 배열로 변환할 수 있다.
- 중요한 특징은 노드 객체의 상태 변화를 실시간으로 반영하는 **_살아있는 객체_**라는 것이다.
  - 단, NodeList는 대부분의 경우 non-live 객체로동작하지만 경우에 따라 live 객체로 동작한다.

### HTMLCollection

- `getElementsByTagName`, `getElementsByClassName` 메서드가 반환하는 HTMLCollection 객체는 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는 DOM 컬렉션 객체다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li class="red">Apple</li>
      <li class="red">Banana</li>
      <li class="red">Orange</li>
    </ul>
  </body>
  <script>
    const $elems = document.getElementsByClassName('red')
    console.log($elems) // HTMLCollection(3) [li.red, li.red, li.red]

    for (let i = 0; i < $elems.length; i++) {
      $elems[i].className = 'blue'
    }

    console.log($elems) // HTMLCollection(31) [li.red]
  </script>
</html>
```

- 실시간으로 노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기 때문에 주의해야 한다.
- 아래와 같이 `for`문을 역방향으로 순회하거나 `while` 문을 사용하여 회피할 수 있다.

```jsx
for (let i = $elems.length - 1; i >= 0; i--) {
  $elems[i].className = 'blue'
}
```

```jsx
let i = 0
while ($elems.length > i) {
  $elems[i].className = 'blue'
}
```

- 더 간단한 해결책은 부작용을 발생시키는 원인인 `HTMLCollection` 객체를 사용하지 않는 것이다.

```jsx
;[...$elems].forEach(elem => (elem.className = 'blue'))
```

### NodeList

- `HTMLCollection` 객체의 부작용을 해결하기 위해 `querySelectorAll` 메서드를 사용하는 방법도 있다.
- `NodeList` 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체다.
  - `childNodes` 프로퍼티가 반환하는 `NodeList` 객체는 live 객체로 동작하므로 주의가 필요하다.
- `NodeList.prototype`은 `forEach`, `item`, `entries`, `keys`, `values` 메서드를 제공한다.

### ✅ 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하는 것을 권장한다.

## 39.9 노드 탐색

- 요소를 취득한 다음, 취득한 요소 노드를 기점으로 DOM 트리의 노드를 옮겨 다니며 부모, 형제, 자식 노드 등을 탐색해야 할 때가 있다.

![<img width="543" alt="image" src="https://user-images.githubusercontent.com/88878874/265623164-196216df-9b89-4c50-97c8-599aa5fc89f4.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/b249c359-fe75-4cb4-9a58-b698186d862d/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265623164-196216df-9b89-4c50-97c8-599aa5fc89f4.png">

- Node.prototype이 제공
  - `parentNode`, `previousSibling`, `firstChild`, `childNodes`
- Element.prototype이 제공
  - `previousElementSibling`, `nextElementSibling`, `children`
- 노드 탐색 프로퍼티는 setter없이 getter만 존재하는 읽기 전용 접근자 프로퍼티다.
  - 프로퍼티에 값을 할당하면 아무런 에러 없이 무시된다.

### 39.3.1 공백 텍스트 노드

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

![<img width="773" alt="image" src="https://user-images.githubusercontent.com/88878874/265624283-09e338cb-50c9-4fc0-88ec-d107ccbf6c0b.png">](https://prod-files-secure.s3.us-west-2.amazonaws.com/7f20a21f-2262-43f1-bee4-a3168dd27560/8a754e90-f5bf-470a-8763-6b807bfdf653/Untitled.png)

<img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265624283-09e338cb-50c9-4fc0-88ec-d107ccbf6c0b.png">

- 노드를 탐색할 때는 공백 문자가 생성한 공백 텍스트 노드에 주의해야 한다.

### 39.3.2 자식 노드 탐색

- Node.prototype.childNodes
  - 모든 자식 노드를 NodeList에 담아 반환한다.
  - 요소 노드뿐만 아니라 텍스트 노드도 포함되어 있을 수 있다.
- Element.prototype.children
  - 자식 노드 중 요소 노드만 탐색하여 HTMLCollection에 담아 반환한다.
  - 텍스트 노드가 포함되지 않는다.
- Node.prototype.firstChild
  - 첫 번째 자식 노드를 반환한다.
  - 텍스트 노드이거나 요소 노드이다.
- Node.prototype.lastChild
  - 마지막 자식 노드를 반환한다.
  - 텍스트 노드이거나 요소 노드이다.
- Element.prototype.firstElementChild
  - 첫 번째 자식 노드를 반환한다.
  - 요소 노드만 반환한다.
- Element.prototype.lastElementChild
  - 마지막 자식 노드를 반환한다.
  - 요소 노드만 반환한다.

### 39.3.3 자식 노드 존재 확인

```jsx
const $fruits = document.getElementById('fruits')

// 텍스트 노드를 포함하여 자식 노드의 존재를 확인
$fruit.hasChildNodes() // boolean

// 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인
$fruit.children.length // number
$fruit.childElementCount // number
```

### 39.3.5 부모 노드 탐색

```jsx
const $banana = document.querySeletor('.banana')
$banana.parentNode
```

### 39.3.6 형제 노드 탐색

- Node.prototype.previousSibling
  - 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다.
  - 텍스트 노드이거나 요소 노드이다.
- Node.prototype.nextSibling
  - 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다.
  - 텍스트 노드이거나 요소 노드이다.
- Element.prototype.previousElementSibling
  - 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다.
  - 요소 노드만 반환한다.
- Element.prototype.nextElementSibling
  - 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다.
  - 요소 노드만 반환한다.

## 39.4 노드 정보 취득

- Node.prototype.nodeType
  - 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환한다.
  - Node.ELEMENT_NODE: 1
  - Node.TEXT_NODE: 3
  - Node.DOCUMENT_NODE: 9
- Node.prototype.nodeName
  - 노드의 이름을 문자열로 반환한다.
  - 요소 노드: “UL”, “LI” 등
  - 텍스트 노드: “#TEXT”
  - 문서 노드: “#DOCUMENT”

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

- setter와 getter 모두 존재하는 접근자 프로퍼티다.
- 참조와 할당이 모두 가능하다.
- 노드 객체의 값을 반환한다. → 텍스트 노드
- 텍스트 노드가 아닌 노드의 nodeValue를 참조하면 null을 반환한다.

### 39.5.2 textCotent

- setter와 getter 모두 존재하는 접근자 프로퍼티다.
- 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.

```html
<div id="foo">Hello <span>world!</span></div>
```

```jsx
document.getElementById('foo').textContent // Hello world!
```

## 39.6 DOM 조작

- 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것이다.
- 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 영향을 준다.

### 39.6.1 innerHTML

- setter와 getter 모두 존재하는 접근자 프로퍼티다.
- 요소 노드의 HTML 마크업을 취득하거나 변경한다.
- 모든 HTML 마크업을 문자열로 반환한다.
- 요소 노드의 innerHTML 프로퍼티에 할당한 HTML 마크업 문자열은 렌더링 엔진에 의해 파싱되어 요소 노드의 자식으로 DOM에 반영된다.
- 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 크로스 사이트 스크립팅 공격(XSS)에 취약하므로 위험하다.
- HTML sanitization: 사용자로부터 입력받은 데이터에 의해 발생할 수 있는 XSS을 예방하기 위해 잠재적 위험을 제거하는 기능
  ```jsx
  DOMPurify.sanitize('<img src="x" onerror="document.cookie">')
  ```
- 요소 노드의 innerHTML 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경한다는 단점이 있다.

### 39.6.2 insertAdjacentHTML 메서드

```jsx
Element.prototype.insertAdjacentHTML(position, DOMString)
```

- 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.
- DOMString을 파싱하고 그 결과로 생성된 노드를 position에 삽입하여 DOM에 반영한다.  
  <img width="373" alt="image" src="https://user-images.githubusercontent.com/88878874/265691255-260f921e-60ab-44b4-a90b-046ad7b8b23e.png">
- HTML 문자열을 파싱하므로 XSS에 취약하다는 점은 동일하다.

### 39.6.3 노드 생성과 추가

```jsx
// 요소 노드 생성
const $li = document.prototype.createElement('li')

// 텍스트 노드 생성
const textNode = document.prototype.createTextNode('Banana')

// 텍스트 노드를 요소 노드의 자식 노드로 추가
$li.appendChild(textNode)

// 요소 노드를 DOM에 추가
$fruits.appendChild($li)
```

- 위 예제는 단 하나의 요소 노드를 생성하여 DOM에 한번 추가하므로 DOM은 한 번 변경된다.
- 이 때 리플로우와 리페인트가 실행된다.

### 39.6.4 복수의 노드 생성과 추가

```jsx
const $container = document.createElement('div')[
  // container 대신 비어 있는 노드를 생성해서 활용할 수도 있다.
  // const $fragment = document.createDocumentFragment()

  ('apple', 'banana', 'orange')
].forEach(text => {
  // 요소 노드 생성
  const $li = document.prototype.createElement('li')

  // 텍스트 노드 생성
  const textNode = document.prototype.createTextNode(text)

  // 텍스트 노드를 요소 노드의 자식 노드로 추가
  $li.appendChild(textNode)

  // $li 요소 노드를 컨테이너 요소의 마지막 자식 노드로 추가
  $container.appendChild($li)
})

// 요소 노드를 DOM에 추가
$fruits.appendChild($container)
```

### 39.6.5 노드 삽입

```jsx
// 마지막 노드로 추가
const $li = document.createElement('li')

$li.appendChild(document.createTextNode('Orange'))
document.getElementById('fruits').appendChild($li)

// 지정한 위치에 노드 삽입
const $fruits = document.getElementById('fruits')
const $li = document.createElement('li')

$li.appendChild(document.createTextNode('Orange'))
$fruits.insertBefor($li, $fruits.lastElementChild)
$fruits.insertBefor($li, null) // appendChild처럼 동작
```

### 39.6.6 노드 이동

- DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다.

```jsx
const $fruits = document.getElementById('fruits')
const [$apple, $banana] = $fruits.children

$fruits.appendChild($apple)
$fruits.insertBefore($banana, $fruits.lastElementChild)
```

### 39.6.7 노드 복사

- Node.prototype.cloneNode([deep: true | false])
- 노드의 사본을 생성하여 반환한다.
- deep에 true를 전달하면 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성한다.
- deep에 false를 전달하면 얕은 복사하여 노드 자신만의 사본을 생성한다.

### 39.6.8 노드 교체

- Node.prototype.replaceChild(newChild, oldChild)
- 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체한다.

### 39.6.9 노드 삭제

- Node.prototype.removeChild(child)
- child 매개변수에 인수로 전달한 노드를 DOM에서 삭제한다.

## 39.7 어트리뷰트

### 39.7.1 어트리뷰트 노드와 attributes 프로퍼티

- 글로벌 어트리뷰트 이벤트 핸들러 어트리뷰트는 모든 HTML 요소에서 공통적으로 사용할 수 있지만 특정 HTML 요소에만 한정적으로 사용 가능한 어트리뷰트도 있다.
- 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 NamedNodeMap 객체에 담겨서 요소 노드의 attributes 프로퍼티에 저장된다.
- 어트리뷰트당 하나의 어트리뷰트 노드가 생성된다.
- 요소 노드의 모든 어트리뷰트 노드는 요소 노드의 Element.prototype.attributes 프로퍼티로 취득할 수 있다.
  - getter만 존재하는 읽기 전용 접근자 프로퍼티다.
  - 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.

```html
// 3개의 어트리뷰트 노드 생성 <input id="user" type="text" value="ungmo2" />
```

```jsx
const { attributes } = document.getElementById('user')

console.log(attributes.id.value) // user
console.log(attributes.type.value) // text
console.log(attributes.value.value) // ungmo2
```

### 39.7.2 HTML 어트리뷰트 조작

- Element.prototype.getAttribute(attributeName)
  - HTML 어트리뷰트 값을 참조하기 위한 메서드다.
  ```jsx
  #input.getAttribute('value')
  ```
- Element.prototype.setAttribute(attributeName, attributeValue)
  - HTML 어트리뷰트 값을 변경하기 위한 메서드다.
  ```jsx
  #input.setAttribute('value', 'foo')
  ```
- Element.prototype.hasAttribute(attributeName)
  - HTML 어트리뷰트가 존재하는지 확인하기 위한 메서드다.
- Element.prototype.removeAttribute(attributeName)
  - HTML 어트리뷰트를 삭제하기 위한 메서드다.

### 39.7.3 HTML 어트리뷰트 vs DOM 프로퍼티

- 요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티가 존재한다. (DOM 프로퍼티)
- DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다.

```html
<input id="user" type="text" value="ungmo2" />
```

- 위 요소가 파싱되어 생성된 요소 노드 객체에는 id, type, value 어트리뷰트에 대응하는 id, type, value 프로퍼티가 존재하며, 이 DOM 프로퍼티들은 HTML 어트리뷰트의 값을 초기값으로 가지고 있다.
- DOM 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티다.

  <img width="500" alt="image" src="https://user-images.githubusercontent.com/88878874/265691531-fb40475b-6443-4ea9-bf89-fe12d0f53ee4.png">

- ✅ HTML 어트리뷰트는 DOM에서 중복관리되고 있지 않다.
- HTML 어트리뷰트의 역할

  - HTML 요소의 초기 상태를 지정하는 것이다.
  - HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않는다.
  - input 요소의 요소 노드가 생성되어 첫 렌더링이 끝난 시점까지 어트리뷰트 노드의 어트리뷰트 값과 노드의 value 프로퍼티에 할당된 값은 HTML 어트리뷰트 값과 동일하다.

  ```html
  <input id="user" type="text" value="ungmo2" />
  <script>
    const $input = document.getElementById('user')

    // attributes 프로퍼티에 저장된 value 어트리뷰트 값
    console.log($input.getAttribute('value')) // ungmo2

    // 요소 노드의 value 프로퍼티에 저장된 value 어트리뷰트 값
    console.log($input.value) // ungmo2
  </script>
  ```

  - 첫 렌더링 이후 사용자가 Input 요소에 무언가를 입력하기 시작하면 상황이 달라진다.
  - input 요소 노드는 사용자가 입력 필드에 입력한 값을 상태로 가지고 있다. → 사용자의 입력에 의해 변화
  - input 요소의 입력 필드에 “foo”라는 값을 입력한 경우, 요소 노드는 2개의 상태, 즉 초기 상태와 최신 상태를 관리해야 한다.

  ### ✅ 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는 DOM 프로퍼티가 관리한다.

### 어트리뷰트 노드

- HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태는 어트리뷰트 노드에서 관리한다.
- 어트리뷰트 노드에서 관리하는 어트리뷰트 값은 사용자의 입력에 의해 상태가 변경되어도 변하지 않고 HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태를 그대로 유지한다.
- 초기 상태 값을 취득하거나 변경하려면 `getAttribute`, `setAttribute` 메서드를 사용한다.

### DOM 프로퍼티

- 사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리한다.
- DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지한다.

### 39.7.4 data 어트리뷰트와 dataset 프로퍼티

- HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있다.
- data어트리뷰트는 data-접두사 다음에 임의의 이름을 붙여 사용한다.

```html
<li data-user-id="123" data-role="admin">Lee</li>
```

### dataset 프로퍼티

- dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는 객체 반환한다.
- data 어트리뷰트의 data-접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다.
- dataset 프로퍼티로 data 어트리뷰트의 값을 취득하거나 변경 가능하다.

```jsx
console.log($user.dataset.role) // "admin"
$user.dataset.role = 'subscriber'
console.log($user.dataset.role) // "subscriber"
```

## 39.8 스타일

### 39.8.1 인라인 스타일 조작

### style 프로퍼티

- getter와 setter 모두 존재하는 접근자 프로퍼티이다.
- 인라인 스타일을 취득하거나 추가 또는 변경한다.

```jsx
$div.style.width = '100px'
```

### 39.8.2 클래스 조작

### className

- getter와 setter 모두 존재하는 접근자 프로퍼티이다.
- 참조하면 class 어트리뷰트 값을 문자열로 반환한다.
- 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경한다.

```html
<body>
  <div class="box red">hi</div>
  <script>
    const $box = document.querySelector('.box')
    console.log($box.className) // 'box red'
  </script>
</body>
```

### classList

### add(...className)

- 인수로 전달한 1개 이상의 문자열을 class 어트리뷰트 값으로 추가한다.

```jsx
$box.classList.add('foo', 'bar') //  class="box red foo bar"
```

### remove(...className)

- 인수로 전달한 문자열과 일치하는 클래스를 class 어트리뷰트에서 삭제한다.
- 인수로 전달한 문자열과 일치하는 클래스가 없으면 무시한다.

```jsx
$box.classList.remove('foo')
```

### contains(className)

- 인수로 전달한 문자열과 일치하는 클래스가 존재하는 지 확인한다.

```jsx
$box.classList.contains('foo')
```

### replace(oldClassName, newClassName)

- 첫 번째 인수로 전달한 문자열을 두 번째 인수로 전달한 문자열로 변경한다.

```jsx
$box.classList.replace('red', 'blue')
```

### toggle(className)

- 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고, 존재하지 않으면 추가한다.

```jsx
$box.classList.add('foo')
```

### 39.8.3 요소에 적용되어 있는 CSS 스타일 참조

### getCoputedStyle(element)

- 링크, 임베딩, 인라인, js에서 적용한 스타일, 상속된 스타일, 브라우저 스타일 등 모든 스타일이 최종적으로 적용된 스타일을 참조할 수 있다.

```jsx
const boxStyle = window.getComputedStyled($box)
console.log(boxStyle.width)
```
