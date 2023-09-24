## FileReader로 파일을 읽는 작업 중 다른 파일의 읽기 작업을 요청하면 어떻게 될까?

<img width="571" alt="image" src="https://user-images.githubusercontent.com/88878874/270156938-ed7362ef-4883-42f5-9c26-afb305525c8d.png">

회원가입 기능 구현 중 사용자 이미지를 입력을 받았다. `<input type="file">`로 이미지 입력을 받으면 웹 API인 FileReader 객체는 해당 파일을 읽어 파일을 읽는 메서드를 제공한다. 해당 메서드를 활용해 해당 파일의 내용이나 데이터를 반환해 우리는 브라우저에 미리보기를 제공할 수 있게 된다.

우리가 테스트 하는 환경에서는 그렇게 큰 용량의 이미지를 넣지 않아서 해당 이미지를 읽어오는데 오랜 시간이 걸리지 않았다. 근데 만약에 “하나의 미지를 읽어오는데 기다릴 수 없는 시간이 걸린다면?”, “기다리는 동안 다른 사진으로 변경하고 싶어서 새로운 이미지를 입력한다면 어떻게 될까?”의 궁금증이 생겼다.

## FileReader는 어떻게 동작할까?

먼저 예시 코드와 함께 하나의 이미지를 FileReader는 어떻게 처리하는지 과정을 알아보자.

```jsx
const fileInput = document.querySelector('input[type="file"]')
const reader = new FileReader()

reader.onload = ({ target }) => {
  console.log('File data:', target.result)
}

reader.onabort = () => {
  console.warn('File reading was aborted!')
}

fileInput.addEventListener('change', ({ target }) => {
  const file = target.files[0]
  reader.readAsText(file)
})
```

1. `fileInput`을 통해 파일 선택
   - 이 때 `fileInput`의 change 이벤트가 발생한다.
2. 비동기 작업 시작
   - `FileReader`의 `readAsDataURL` 메서드가 호출, 파일 읽기 작업은 **비동기**적으로 실행된다.
   - 이 시점에서 JavaScript 이벤트 루프 내 다음 코드로 이동하게 된다.
3. 파일 읽기 완료
   - 파일 읽기 작업이 완료되면, `FileReader`는 이벤트를 생성한다. (ex. `load` 이벤트)
   - 이 이벤트는 즉시 실행되지 않고 이벤트 큐에 쌓인다.
4. 이벤트 콜백 실행
   - 이벤트 루프가 해당 `load` 이벤트 처리할 차례가 되면 `FileReader`에 연결된 `load` 이벤트의 콜백 함수가 실행된다.

위와 같은 순서대로 진행되며, 여기서 포인트는 `비동기`적으로 실행된다는 점이다. 간단한 그래프로 표현해보면 아래와 같을 것이다.

<img width="754" alt="image" src="https://user-images.githubusercontent.com/88878874/270157002-790dc8c5-7164-4e9b-acbc-53c761df462c.png">

## 비동기로 작동하는 FileReader, 순서를 어떻게 보장해서 마지막에 선택한 파일을 내가 읽을 수 있을까?

`FileReader`이 비동기라고 하니 처음 궁금증이 더 증폭되었다. 만약 사용자가 프로필 사진 등록을 위해 ‘파일1’을 입력하고 `FileReader`가 비동기로 읽기 작업을 진행하는 도중에 사용자는 ‘파일2’를 입력했고, 사용자는 프로필 사진이 ‘파일2’로 등록되기를 기대할 것이다. 그런데 비동기적인 읽기 작업이 ‘파일2’, ‘파일1’ 순서로 완료가 된다면 최종적으로 완료된 것은 ‘파일1’이니 내가 최종적으로 브라우저에 보여줄 수 있는 것은 ‘파일1’의 이미지일까?

결론적으론 아니다. `FileReader`는 인스턴스 당 하나의 파일만 읽을 수 있다. 같은 인스턴스로 여러 개의 파일 입력을 중복적으로 하게 된다면 최종적으로 입력한 파일만 입력 작업이 완료되고 우리가 읽을 수 있는 파일은 마지막에 입력한 파일이 될 것이다.

아래 코드와 함께 동작 순서를 살펴보자.

```jsx
const fileInput = document.querySelector('input[type="file"]')
const reader = new FileReader()

reader.onload = ({ target }) => {
  console.log('File data:', target.result)
}

reader.onabort = () => {
  console.warn('File reading was aborted!')
}

fileInput.addEventListener('change', ({ target }) => {
  const file = target.files[0]
  reader.readAsText(file)
})
```

1. 파일1 읽기 요청
2. 파일1 읽기 시작
   - `readAsText(file1)`와 같은 메서드가 호출된다.
   - 이 메서드는 **비동기적**으로 파일을 읽기 시작하며, 그 결과는 아직 준비되지 않았다.
3. 파일2 읽기 요청
   - 동일한 `FiledReader` 인스턴스에 `readAsText(file2)`가 호출한다.
   - `FiledReader`는 현재 진행 중인 파일1의 읽기 작업을 중단하고 `abort` 이벤트를 발생시킨다.
4. `abort` 이벤트 처리
   - `abort` 이벤트가 처리되고, 이에 연결된 이벤트 핸들러(ex. reader.onabort)가 실행된다.
   - 이때 파일1에 대한 읽기 작업이 중단되었음을 알 수 있다.
5. 파일2 읽기 계속
   - `FiledReader`는 파일2에 대한 읽기 작업을 계속한다.
   - 파일2 읽기가 완료되면 `load` 이벤트가 발생한다.
   - 해당 이벤트 핸들러에서 파일2의 내용을 처리할 수 있다.

위와 같은 순서대로 진행되게 된다. 여기서 포인트는 먼저 읽기 요청을 시작했던 ‘파일1’은 ‘파일2’의 읽기 요청 들어오면 `abort` 이벤트가 발생, 읽기 작업이 중단된다. 간단한 그래프로 그려보면 아래와 같을 것이다.

<img width="812" alt="image" src="https://user-images.githubusercontent.com/88878874/270157026-fbb812a8-a796-4978-bb60-1779a4dff4d0.png">

## FileReader가 web API라면 JavaScript Engine과 Browser Environment 사이에서 어떻게 동작할까?

파일 하나를 읽는 과정에 덧붙여 설명하자면 아래와 같을 것이다.

```jsx
const fileInput = document.querySelector('input[type="file"]')
const reader = new FileReader()

reader.onload = ({ target }) => {
  console.log('File data:', target.result)
}

reader.onabort = () => {
  console.warn('File reading was aborted!')
}

fileInput.addEventListener('change', ({ target }) => {
  const file = target.files[0]
  reader.readAsText(file)
})
```

1. `fileInput`의 change 이벤트가 발생하면 실행될 이벤트 핸들러가 Browser Environment에 등록
2. 사용자 파일 읽기 요청 : change 이벤트 발생
3. 비동기 작업 시작 : 파일 읽기 시작
   - `FileReader`의 `readAsDataURL` 같은 메서드를 호출하면, 파일 읽기 작업은 비동기적으로 실행된다.
   - 이 시점에서 JavaScript 이벤트 루프 내 다음 코드로 이동하게 된다.
4. 읽기 작업 완료
   - 파일 읽기 작업이 완료되면, `FileReader`는 이벤트를 생성한다. (ex. `load` 이벤트)
   - 이 이벤트는 즉시 실행되지 않고 이벤트 큐(task queue)에 쌓인다.
5. 이벤트 루프
   - 메인 스레드에서 실행 중인 JavaScript 코드가 모두 완료되면, 이벤트 루프는 이벤트 큐에서 대기 중인 이벤트를 하나씩 가져와 처리한다.
   - `FileReader`에 의해 생성된 `load` 이벤트는 JavaScript가 현재 실행 중인 다른 작업들이 모두 완료된 후에 처리된다.
6. 이벤트 콜백 실행
   - 이벤트 루프가 해당 `load` 이벤트 처리할 차례가 되면 `FileReader`에 연결된 `load` 이벤트의 콜백 함수가 실행된다.
