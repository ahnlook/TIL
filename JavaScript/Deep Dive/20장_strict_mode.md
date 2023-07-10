## 20.1 strict mode란?

> ### 암묵적 전역 implicit global
>
> ```jsx
> function foo() {
>   x = 10
> }
>
> foo()
>
> console.log(x)
> ```
>
> - `foo` 함수 내에서 선언하지 않은 `x` 변수에 값 10을 할당했다.
> - 자바스크립트 엔진은 `x` 변수가 어디에서 선언되었는지 **스코프 체인**을 통해 검색하기 시작한다.
>   1. `foo` 함수의 스코프에서 `x` 변수의 선언을 검색한다.
>   2. `foo` 함수 컨텍스트의 상위 스코프에서 `x` 변수의 선언을 검색한다.
> - `x` 변수의 선언이 존재하지 않아 ReferenceError를 예상하지만 그렇지 않다.
>   - 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다.
>   - 이 때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있다.
> - 이러한 현상을 암묵적 전역이라고 한다.

### 근복적인 해결책

- 잠재적 오류를 발생시키기 어려운 개발 환경을 만들고 그 환경에서 개발하는 것이 좀 더 근본적인 해결책이라고 할 수 있다.
- 이를 지원하기 위해 ES5부터 strict mode가 추가되었다.
- ESLint 같은 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다.
  - 린트 도구는 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유요한 도구이다.

## 20.2 strict mode의 적용

- 함수 몸체 또는 코드의 선두에 `'use strict'`를 위치시켜야 한다.

```jsx
'use strict'

function foo() {
  x = 10
}

foo()
```

```jsx
function foo() {
  'use strict'

  x = 10
}

foo()
```

## 20.3 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다.

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

- 어떤 함수는 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않다.
- strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 문제가 발생할 수 있다.
- strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

## 20.5 strict mode가 발생시키는 에러

### 20.5.1 암묵적 전역

### 20.5.2 변수, 함수, 매개변수의 삭제

```jsx
(functi on () {
	'use strict';

	var x = 1;
	delete x; // SyntaxError: Delete of an unqualifi ed identifi er in strict mode.

	function foo(a) {
		delete a; // SyntaxError: Delete of an unqualifi ed identifi er in strict mode.
		delete foo; // SyntaxError: Delete of an unqualifi ed identifi er in strict mode.
}());
```

### 20.5.3 매개변수 이름의 중복

- 중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

### 20.5.4 with 문의 사용

## 20.6 stric mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

- strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다.
  - 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.

### 20.6.2 arguments 객체

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```jsx
;(function (a) {
  'use strict'

  a = 2

  console.log(arguments)
  // { 0: 1, length: 1 }
})(1)
```
