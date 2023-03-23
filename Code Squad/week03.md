## 가장 고민했던 부분
html을 동적으로 할당하기 위해서 OOP로 하는 것이 가장 효율적일까? 완전한 함수형은 아니지만 2주차까지 함수로 구현을 했던 부분을 리펙토리 하려다보니 객체지향으로 구현했을 때 오는 이점이 더 많다고 생각했었다. 캡슐화를 통한 전역 변수를 없앨 수도 있었고 컴포넌트 별로 클래스를 만들어서 재사용을 높여 중복 코드를 줄일 수 있었다. 그렇지만 과연 객체지향만이 답인지가 고민이 되었다. 며칠동안 객체지향으로 변경해보고자 코드를 다 뒤집어 엎었다가 문득 그런 생각이 들었다. 지금 내가 짜 놓은 코드에서 더 나은 코드로 리팩토링도 하지 못하는데 다른 것이 더 좋아보인다고 바꾸는 것이 맞을까? 나중에 더 큰 작업에서 리팩토링이 어렵다는 이유로 처음부터 새롭게 하는 것이 가능할까? 그래서 작은 것 하나부터 지금보다 나은 코드로 바꿔나가는 방향으로 가보기로 했다.    

## 학습 내용
### this
  자바스크립트에서 `this`는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정된다. 실행 컨텍스트는 함수를 호출할 때 생성되므로, 바꿔 말하면 this는 함수를 호출할 때 결정된다고 할 수 있다.
- 전역에서의 `this`는 __window__ or __global__이다.
- 메서드 내부에서의 `this`는 호출시 메서드 앞의 __객체__이다.
- 함수 내부에서의 `this`는 __전역객체__이다.
- call
  ````javascript
  var func = function(a, b, c) {
    console.log(this, a, b, b)
  }
  
  func(1, 2, 3)                 // window{ ... } 1 2 3
  func.call({ x: 1 }, 4, 5, 6)  // { x: 1 } 4 5 6
  ````
- bind
  ````javascript
  var func = function(a, b, c, d) {
    console.log(this, a, b, c, d)
  }
  func(1, 2, 3, 4)                            // window{ ... } 1 2 3 4
  
  var bindFunc1 = func.bind({ x: 1 })
  bindFunc1(5, 6, 7, 8)                       // { x: 1 } 5 6 7 8
  
  var bindFunc2 = func.bind({ x: 1 }, 4, 5)
  bindFunc2(6, 7)                             // { x: 1 } 4 5 6 7
  bindFunc2(8, 9)                             // { x: 1 } 4 5 8 9
  ````
### CSS
- transitions vs animations
  - transition
    - Can only move from initial to final state - no intermediate steps
    - Can only run once
    - Require a trigger to run (like mouse hover)
    - Run forwards when triggered in reverse when trigger is removed
    - Easier to use with JS
    - Bast for creating a simple change from one state to another
  - animation
    - Can move from initial to final state, with intermediate steps in between
    - Can loop infinitely thanks to animation iteration count property
    - Can be triggered but can also run automatically
    - Can run forwards, in reverse, or alternate directions
    - More difficult to use with JS
    - Best for creating a complex series of movements
- transition  
  To create a transition, you can use the transition shorthand property, or a combination of the sub-properties below.
  - transition-property
  - transition-duration
  - transition-timing-function
  - transition-delay
- transition not working
  1. Transition-property is set to none.
  2. Transition-duration is not defined, or set to zero or a negative value.
- transform
- Carousel
### SASS  

- [ ] Vsync
- [ ] fps
- [ ] requestAnimationFrame
- [ ] OOP
- [ ] Prototype

### event
- `addEventListener("mouseenter", ...)`는 이벤트 위임이 되지 않는다. 이벤트 객체를 들여다보면 `bubbles: false`로 되어 있다.
- `event.target.closet(element)`: 가까운 element 찾기
  ````
  const list = document.querySelector('ul')
  
  list.addEventListener("click", event => {
    event.target.closet('li').classList.toggle('highlight')
  })
  ````