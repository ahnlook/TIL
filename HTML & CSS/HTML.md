# HTML

### 브라우저 렌더링과 리플로우, 리페인트

## 브라우저 렌더링 동작 과정

1. `Parsing` : HTML 파일과 CSS 파일을 파싱해서 `DOM(document object model) tree`, `CSSOM(css object model)`을 만든다.
2. `Style` : 두 tree를 결합하여 `Rendering tree`를 만든다.
3. `Layout` : Rendering tree에서 각 노드의 위치와 크기를 계산한다.
4. `Paint` : 계산된 값을 이용해 각 노드를 화면상의 실제 픽셀로 변환하고, 레이어를 만든다.
5. `Composite` : 레이어를 합성하여 실제 화면에 나타낸다.

### Parsing

![image](https://user-images.githubusercontent.com/88878874/226832933-8f2a3bc4-421d-4734-9dec-a8a4d608fb40.png)

### Style

Render tree를 구성할 때 `visibility: hidden`은 요소 공간을 차지하고, 보이지만 않기 때문에 render tree에 포함이 되지만, `display: none`의 경우 render tree에서 제외된다.

![image](https://user-images.githubusercontent.com/88878874/226833343-1cdb4b4d-4124-4a7a-94ee-1f24cfdc3370.png)

### Layout

Layout 단계에서는 render tree를 화면에 어떻게 배치해야 할 것인지 노드의 정확한 위치와 크기를 계산한다.

루트부터 노드를 순회하면서 노드의 정확한 크기와 위치를 계산하고 render tree에 반영한다. 만약 크기 값을 %로 지정하였다면, Layout 단계에서 % 값을 계산해서 픽셀 단위로 변환한다.

### Paint

Paint 단계에서는 Layout 단계에서 계산된 값을 이용해 render tree의 각 노드를 화면상의 실제 픽셀로 변환한다. 이 때 픽셀로 변환된 결과는 하나의 레이어가 아니라 여러 개의 레어이로 관리된다. 스타일이 복잡할수록 paint 시간도 늘어난다.

### Composite

Paint 단계에서 생성된 레이어를 합성하여 실제 화면에 나타낸다. 우리가 화면에서 웹 페이지로 볼 수 있다.

### `defer` vs `async`

모던 웹브라우저에서 돌아가는 스크립트들은 대부분 HTML보다 무겁다. 용량이 커서 다운로드 받는데 오랜 시간이 걸리고 처리하는 것 또한 마찬가지이다.

브라우저는 HTML을 읽다가 `<script> ... </script>`을 만나면 스크립트를 먼저 실행해야 하므로 DOM 생성을 멈춘다. `<script scr="..."></script>`를 만났을 때도 마찬가지이다. 외부에서 스크립트를 다운받고 실행한 후에야 남은 페이지를 처리할 수 있다.

- `defer`
  `<script defer src="..."></script`
  - 브라우저를 백그라운드에서 다운로드 한다. 따라서 지연 스크립트를 다운로드 하는 도중에도 HTML parsing이 멈추지 않는다. 그리고 `defer` 스크립트 실행은 페이지 구성이 끝날 때까지 지연된다.
  - 지연 스크립트는 DOM이 준비된 후에 실행되긴 하지만 `DOMContentLoaded` 이벤트 발생 전에 실행된다.
  - 외부 스크립트에만 유효하다.
- `async`
  - defer와 마찬가지로 백그라운드에서 다운로드된다. 따라서 HTML 페이지는 async 스크립트 다운이 완료되길 기다리지 않고 페이지 내 콘텐츠를 처리, 출력한다. 하지만 `async` 스크립트 실행 중에는 HTML parsing이 멈춘다.
  - `DOMContentLoaded` 이벤트와 다른 스크립트들은 `async`를 기다리지 않으며, `async` 또한 기다리지 않는다.

![defer & async](https://user-images.githubusercontent.com/88878874/225210436-e6c10d7f-55f4-4a09-898f-8e5fb43eff13.png)
