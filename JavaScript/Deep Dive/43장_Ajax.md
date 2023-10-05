# 43장 Ajax

## 43.1 Ajax란?

- Asynchronous JavaScript and XML
- 자바스크립트를 사용하여 브라우저가 서버에 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식을 말한다.
- Web API인 XMLHttpRequest 객체를 기반으로 동작한다. XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.
- 이전의 웹페이지는 html 태그로 시작해서 html 태그로 끝나는 완전한 HTML을 서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했다. 따라서 화면이 전환되면 서버로부터 새로운 HTML을 전송받아 웹 페이지 전체를 처음부터 다시 렌더링했다.

### 전통적인 방식의 단점

<img width="460" alt="image" src="https://user-images.githubusercontent.com/88878874/272957149-e92c5c46-e649-4fb8-82ff-d748c18ce3fd.png">

1. 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.
2. 변경할 필요가 없는 부분까지 처음부터 다시 렌더링한다. 이로 인해 화면 전환이 일어나면 화면이 순간적으로 깜박이는 현상이 발생한다.
3. 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹된다.

### Ajax 장점

<img width="458" alt="image" src="https://user-images.githubusercontent.com/88878874/272957279-37094084-7b19-4747-985e-44ae7498fe91.png">

1. 변경할 부분을 갱신하는 데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
2. 변경할 필요가 없는 부분은 다시 렌더링하지 않는다. 따라서 화면이 순간적으로 깜빡이는 현상이 발생하지 않는다.
3. 클라이언트와 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹이 발생하지 않는다.

## 43.2 JSON

- JavaScript Object Notation
- 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.
- 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용할 수 있다.

### 43.2.1 JSON 표기 방식

```jsx
{
	"name": "Lee",
	"age": 20,
	"alive": true,
	"hobby": ["traveling", "tennis"]
}
```

### 43.2.2 JOSN.stringify

- 객체를 JSON 포맷의 문자열로 변환한다. (= 직렬화)
- 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 한다.

```jsx
const obj = {
  name: 'Lily',
  alive: true
}

JSON.stringify(obj)

const todos = [
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
]

JSON.stringify(todos)
```

### 43.2.3 JOSN.parse

- JOSN 포맷의 문자열을 객체로 변환한다. (= 역직렬화)
- 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다.

## 43.3 XMLHttpRequest

- 브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다.
- 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.
- Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공한다.

### 43.3.1 XMLHttpRequest 객체 생성

```jsx
const xhr = new XMLHttpRequest()
```

### 43.3.2 XMLHttpRequest 객체의 프로퍼티와 메서드

### XMLHttpRequest 객체의 프로토타입 프로퍼티

- readyState
  - HTTP 요청의 현재 상태를 나타내는 정수
  - UNSENT: 0
  - OPENED: 1
  - HEADERS_RECEIVED: 2
  - LOADING: 3
  - DONE: 4
- status
  - HTTP 요청에 대한 응답 상태를 나타내는 정수
  - 예) 200
- statusText
  - HTTP 요청에 대한 응답 메시지를 나타내는 문자열
  - 예) “OK”
- responseType
  - HTTP 응답 타입
  - 예) document, json, text, blob, arraybuffer
- response
  - HTTP 요청에 대한 응답 몸체 (response body)
  - responseType에 따라 타입이 다르다.
- responseText
  - 서버가 전송한 HTTP 요청에 대한 응답 문자열

### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

- onreadystatechange
  - readyState 프로퍼티 값이 변경된 경우
- onladstart
  - HTTP 요청에 대한 응답을 받기 시작한 경우
- onprogress
  - HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생
- onabort
  - abort 메서드에 의해 HTTP 요청이 중단된 경우
- onerror
  - HTTP 요청에 에러가 발생한 경우
- onload
  - HTTP 요청이 성공적으로 완료한 경우
- ontimeout
  - HTTP 요청 시간이 초과한 경우
- onloadend
  - HTTP 요청이 완료한 경우
  - HTTP 요청이 성공 또는 실패하면 발생

### XMLHttpRequest 객체의 메서드

| 메서드            | 설명                                     |
| ----------------- | ---------------------------------------- |
| open              | HTTP 요청 초기화                         |
| send              | HTTP 요청 전송                           |
| abort             | 이미 전송된 HTTP 요청 중단               |
| setRequestHeader  | 특정 HTTP 요청 헤더의 값을 설정          |
| getResponseHeader | 특정 HTTP 요청 헤더의 값을 문자열로 반환 |

### XMLHttpRequest 객체의 정적 프로퍼티

| 정적 프로퍼티    | 값  | 설명                                   |
| ---------------- | --- | -------------------------------------- |
| UNSENT           | 0   | open 메서드 호출 이전                  |
| OPENED           | 1   | open 메서드 호출 이후                  |
| HEADERS_RECIEVED | 2   | send 메서드 호출 이후                  |
| LOADING          | 3   | 서버 응답 중 (응답 데이터 미완성 상태) |
| DONE             | 4   | 서버 응답 완료                         |

### 43.3.3 HTTP 요청 전송

1. [XMLHttpRequest.prototype.open](http://XMLHttpRequest.prototype.open) 메서드로 HTTP 요청을 초기화한다.
2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송한다.

```jsx
const xhr = new XMLHttpRequest()

// HTTP 요청 초기화
xhr.open('GET', '/users')

// HTTP 요청 헤더 설정
xhr.setRequestHeader('content-type', 'application/json')

// HTTP 요청 전송
xhr.send()
```

### XMLHttpRequest.prototype.open

| 매개변수 | 설명                                                                     |
| -------- | ------------------------------------------------------------------------ |
| method   | HTTP 요청 메서드(”GET”, “POST”, “PUT”, “DELETE” 등)                      |
| url      | HTTP 요청을 전송할 URL                                                   |
| async    | 비동기 요청 여부. 옵션으로 기본 값은 true이며, 비동기 방식으로 동작한다. |

- HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다.

### XMLHttpRequest.prototype.send

- open 메서드로 초기화된 HTTP 요청을 서버에 전송한다.
- GET 요청 메서드 : 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송한다.
- POST 요청 메서드 : 데이터(payload)를 요청 몸체(request body)에 담다 전송한다.
  - 페이로드가 객체인 경우 반드시 `JSON.stringify` 메서드를 사용하여 직렬화한 다음 전달해야 한다.

### XMLHttpRequest.prototype.setRequestHeader

- 반드시 open 메서드를 호출한 이후에 호출해야 한다.
- 자주 사용하는 HTTP 요청 헤더인 Content-type과 Accept에 대해 살펴보자.
  - content-type은 요청 몸체에 담아 전송할 데이터의 MINE 타입의 정보를 표현한다.
    | MINE type | Sub type |
    | ----------- | -------------------------------------------------- |
    | text | text/plain, text/html, text/css, text/javascript |
    | application | application/json, application/x-www-form-urlencode |
    | multipart | multipart/formed-data |

### 43.3.4 HTTP 응답 처리

- 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다.

```jsx
const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')
xhr.send()
xhr.onreadystatechange = () => {
  if (xhr.readyState !== XMLHttpRequest.DONE) return
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response))
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```

- send 메서드를 통해 HTTP 요청을 서버에 전송하면 서버는 응답을 반환한다.
- readystatechange 이벤트를 통해 HTTP 요청의 현재 상태를 확인해야 한다.
- readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될 때마다 발생한다.
- readystatechange 이벤트 대신 load 이벤트를 캐치해도 좋다.

```jsx
const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')
xhr.send()
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response))
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```
