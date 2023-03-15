# HTML

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
