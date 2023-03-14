# Code Squad - WEEK 02

## ✏️ 학습 내용

## DOM, EVENT 제어

### `template literal` : 내장된 표현식을 허용하는 문자열

```html
`string text` `string text line 1 string text line 2` `string text ${expression}
string text` tag `string text ${expression} string text`
```

### `createElement`

HTML 문서에서 `Document.createElement()` 메서드는 지정한 tagName의 HTML 요소를 만들어 반환한다.

```jsx
let element = document.createElement(tagName[, option])
```

`tagName` : 생성할 요소의 유형

`options` : (optional) `is` 속성 하나를 가진 `elementCreationOptions` 객체

```html
<!DOCTYPE html>
<html>
  <head>
    <title>||Working with elements||</title>
  </head>
  <body>
    <div id="div1">위의 텍스트는 동적으로 추가했습니다.</div>
  </body>
</html>
```

```jsx
document.body.onload = addElement;

function addElement() {
  // create a new div element
  var newDiv = document.createElement("div");

  // and give it some content
  var newContent = document.createTextNode("환영합니다!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}
```

### `appendChild`

`Node.appendChild()` 메소드는 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙인다. 만약 주어진 노드가 이미 문서에 존재하는 노드를 참조하고 있다면 `appendChild()` 메소드는 노드를 현재 위치에서 새로운 위치로 이동시킨다.

이 것은 한 노드가 문서상의 두 지점에 동시에 존재할 수 없다는 것을 의미한다.

이 메소드는 서로 다른 문서로 노드를 이동시키진 못한다. 만약 노드를 다른 문서로 이동시키고 싶다면 `document.importNode()` 메소드를 사용해야 한다.

```jsx
var p = document.createElement("p");
document.body.appendChild(p);
```

### VS `append()`

`append` 메서드는 `appendChild`와 같이 node 객체로 자식 요소를 설정할 수 있을 뿐만 아니라 DOMString을 사용할 수도 있다.

```jsx
const div = document.createElement("div");
div.append("hello");

// <div>hello</div>
```

또한 여러 개의 자식 요소를 추가할 수 있다.

```jsx
const div = document.createElement("div");
const p = documnet.createElement("p");

document.body.append(div, p, "hello");

// <div></div> <p></p> hello
```

### `insertBefore`

`Node.insertBefore()` 메소드는 참조된 노드 앞에, 특정 부모 노드의 자식 노드를 삽입한다.

```html
<div id="parentElement">
  <span id="childElement">foo bar</span>
</div>
```

```jsx
const newNode = document.createElement("span");
const referenceNode = document.getElementById("childElement");
const parentNode = referenceNode.parentNode;

parentNode.insertBefore(newNode, referenceNode);

// <div id="parentElement">
//   <sapn></span>
//   <span id="childElement">foo bar</span>
// </div>
```

`referenceNode`가 `null`이라면, `newNode`가 자식 노드의 리스트의 끝에 삽입된다.

### `event.target`

이벤트가 발생한 가장 안쪽의 요소는 `target` 요소라고 불리고, `event.target`을 사용해 접근할 수 있다.

VS `this`( = `event.currentTarget`)

- `event.target`: 실제 이벤트가 시작된 ‘타킷’ 요소이다. 버블링이 진행되어도 변하지 않는다.
- `this` : ‘현재’ 요소이다. 현재 실행 중인 핸들러가 할당된 요소를 참조한다.

### `event.preventDefault()`

a 태그나 submit 태그는 누르면 href를 통해 이동하거나 창이 새로고침하여 실행된다. `preventDefalut`를 통해 이러한 동작을 막아줄 수 있다.

### Event delegation

- 버블링
  한 요소에 이벤트가 발생하면, 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작한다. 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작한다.
  ```html
  <form onclick="alert('form')">
    FORM
    <div onclick="alert('div')">
      DIV
      <p onclick="alert('p')">P</p>
    </div>
  </form>
  ```
  1. `<p>`에 할당된 `onClick` 핸들러가 동작한다.
  2. 바깥의 `<div>`에 할당된 핸들러가 동작한다.
  3. 그 바깥의 `<form>`에 할당된 핸들러가 동작한다.
  4. `document` 객체를 만날 때까지, 각 요소에 할당된 `onClick` 핸들러가 동작한다.
     거의 모든 이벤트는 버블링 된다. `focus` 이벤트와 같이 버블링 되지 않는 이벤트도 있다.
  - 버블링 중단 `event.stopPropagation()`
    한 요소의 특정 이벤트를 처리하는 핸들러가 여러개인 상황에서, 핸들러 중 하나가 버블링을 멈추더라도 나머지 핸들러는 여전히 동작한다. 위 쪽으로 일어나는 버블링은 막아주지만, 다른 핸들러들이 동작하는 건 막지 못한다.
    꼭 필요한 경우를 제외하곤 버블링을 막지 않는게 좋다.
- 캡쳐링
  표준 DOM 이벤트에서 정의한 이벤트 흐름엔 3가지 단계가 있다.
  1. 캡처링 단계 : 이벤트가 하위 요소로 전파되는 단계
  2. 타깃 단계 : 이벤트가 실제 타깃 요소에 전달되는 단계
  3. 버블링 단계 : 이벤트가 상위 요소로 전파되는 단계
     캡쳐링 단계에서 이벤트를 잡아내려면 `addEventListener`의 `capture` 옵션을 `true`로 설정해야 한다.
     캡쳐링 단계를 이용해야 하는 경우는 흔치 않다.

## reference

[버블링과 캡쳐링](https://ko.javascript.info/bubbling-and-capturing)
