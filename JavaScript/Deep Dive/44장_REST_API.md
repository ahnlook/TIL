# 44장 REST API

- REpresentational State Transfer

## 44.1 REST API의 구성

- 자원(resource), 행위(verb), 표현(representations)의 3가지 요소로 구성된다.
- REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청을 이해할 수 있다.
-

| 구성 요소 | 내용                             | 표현 방법        |
| --------- | -------------------------------- | ---------------- |
| 자원      | 자원                             | URI (엔드포인트) |
| 행위      | 자원에 대한 행위                 | HTTP 요청 메서드 |
| 표현      | 자원에 대한 행위의 구체적인 내용 | 페이로드         |

## 44.2 REST API 설계 원치

- URI는 리소스를 표현하는 데 집중하고 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것이 RESTful API를 설계하는 중심 규칙이다.

1. URI는 리소스를 표현해야 한다.
   - bad : GET/getTodos, GET/todos/show/1
   - good : GET/todos/1
2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
   - HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다.
   - bad : GET/todos/delete
   - good : DELETE/todos/1

## 44.3 JSON Server를 이용한 REST API 실습

### 44.3.1 JSON Server 설치

```bash
npm install json-server --save-dev
```

### 44.3.2 db.json 파일 생성

```json
{
  "todos": [
    { "id": 1, "content": "HTML" },
    { "id": 2, "content": "CSS" }
  ]
}
```

### 44.3.3 JSON Server 실행

```bash
## 기본 포트 (3000) / watch 옵션 적용
json-server --watch db.json
```

### package.json 수정

```json
"script": {
	"start": "json-server --watch db.json"
}
```

### 44.3.4 GET 요청

```jsx
const xhr = new XMLHttpRequest()

xhr.open('GET', '/todos')
xhr.send()
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector('pre').textContent = xhr.response
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```

### 44.3.5 POST 요청

```jsx
const xhr = new XMLHttpRequest()

xhr.open('POST', '/todos')
xhr.setRequestHeader('content-type', 'application/json')
xhr.send(JSON.stringify({ id: 3, content: 'JavaScript' }))
xhr.onload = () => {
  if (xhr.status === 200 || xhr.status === 201) {
    document.querySelector('pre').textContent = xhr.response
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```

### 44.3.6 PUT 요청

```jsx
const xhr = new XMLHttpRequest()

xhr.open('PUT', '/todos/3')
xhr.setRequestHeader('content-type', 'application/json')
xhr.send(JSON.stringify({ id: 3, content: 'React' }))
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector('pre').textContent = xhr.response
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```

### 44.3.7 PATCH 요청

```jsx
const xhr = new XMLHttpRequest()

xhr.open('PATCH', '/todos/3')
xhr.setRequestHeader('content-type', 'application/json')
xhr.send(JSON.stringify({ content: 'Next' }))
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector('pre').textContent = xhr.response
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```

### 44.3.8 DELETE 요청

```jsx
const xhr = new XMLHttpRequest()

xhr.open('DELETE', '/todos/3')
xhr.setRequestHeader('content-type', 'application/json')
xhr.send()
xhr.onload = () => {
  if (xhr.status === 200) {
    document.querySelector('pre').textContent = xhr.response
  } else {
    console.error('Error', xhr.status, xhr.statusText)
  }
}
```
