# 49장 Babel과 Webpack을 이용한 ES6+ / ES.NEXT 개발 환경 구축

- ES6 지원율은 약 98%로 거의 대부분 지원한다.
- 매년 새롭게 도입되는 ES6 이상의 버전(ES6+)과 제안 단계에 있는 제인 사양(ES.NEXT)은 브라우저에 따라 지원율이 제각각이다.
- ES6+와 ES.NEXT의 최신 ECMAScript 사양을 사용하여 프로젝트를 진행하려면 최신 사양으로 작성된 코드를 경우에 따라 구형 브라우저에서 무제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다.
- 대부분의 프로젝트가 모듈을 사용하므로 모듈 로더도 필요하다. ES6 모듈(ESM)은 대부분의 모던 브라우저에서 사용할 수 있다. 하지만 다음과 같은 이유로 아직까지 ESM보다는 별도의 모듈 로더를 사용하는 것이 일반적이다.
  - 구형 브라우저는 ESM을 지원하지 않는다.
  - ESM을 사용하더라도 트랜스파일링이나 번들링이 필요한 것은 변함이 없다.
  - ESM이 아직 지원하지 않는 기능이 있고 점차 해결되고는 있지만 아직 몇 가지 이슈가 존재한다.

## 49.1 Babel

```tsx
;[1, 2, 3].map(n => n ** n)
```

- 위 예제는 ES6의 화살표 함수와 ES7의 지수 연산자를 사용하고 있다.
- 구형 브라우저는 지원하지 않을 수 있다.
- Babel을 사용하면 위 코드를 다음과 같이 ES5 사양으로 변환할 수 있다.

```tsx
'use strict'[(1, 2, 3)].map(function (n) {
  return Math.pow(n, n)
})
```

### 49.1.1 Babel 설치

```bash
npm install --save-dev @babel/core @babel/cli
```

_package.json_

```json
{
  "name": "esnext-project",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^7.10.3",
    "@babel/core": "7.10.3"
  }
}
```

- Babel, Webpack, 플로그인의 버전은 빈번하게 업그레이드 되므로 위 버전과 다른 최신 버전의 패키지가 설치될 수도 있다.

### 49.1.2 Babel 프리셋 설치와 babel.config.json 설정 파일 작성

- Babel을 사용하려면 @babel/preset-env를 설치해야 한다.
  - @babel/preset-env는 함께 사용되어야 하는 Babel 플로그인을 모아둔 것으로 Babel 프리셋이라고 부른다.
  - @babel/preset-env는 필요한 플러그인들을 프로젝트 지원 환경에 맞춰 동적으로 결정해 준다.
- 프로젝트 지원 환경은 Browserslist 형식으로 .browserlistrc 파일에 상세히 설정할 수 있다.
  - 프로젝트 지원 환경 설정 작업을 생략하면 기본값으로 설정된다.

```bash
npm install --save-dev @babel/preset-env
```

```json
{
  "name": "esnext-project",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^7.10.3",
    "@babel/core": "7.10.3",
    "@babel/preset-env": "^7.10.1"
  }
}
```

_babel.config.json_

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 49.1.3 트랜스파일링

- Babel을 사용하여 ES6+ / ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링 해보자.

```json
{
	"name": "esnext-project",
	"version": "1.0.0",
	"scripts": {
		"build": "babel src/js -w -d dist/js"
	}
	"devDependencies": {
		"@babel/cli": "^7.10.3",
		"@babel/core": "7.10.3",
		"@babel/preset-env": "^7.10.1"
	}
}
```

- npm build
  - src/js 폴더에 있는 모든 자바스크립트 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다.
  - -w: 타깃 폴더에 있는 모든 자바스크립트 파일들의 변경을 감지하여 자동으로 트랜스파일한다.
  - -d: 트랜스파일린된 결과물이 저장될 폴더를 지정한다. 만약 지정된 폴더가 존재하지 않으면 자동 생성한다. (—out-dir)

### 49.1.4 Babel 플러그인 설치

- 설치가 필요한 Babel 플러그인은 Babel 홈페이지에서 검색할 수 있다.

```bash
npm install --save-dev @babel/plugin-proposal-class-properties
```

_.babel.config.json_

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

### 39.1.5 브라우저에서 모듈 로딩 테스트

- 브라우저는 CommonJs 방식의 require 함수를 지원하지 않으므로 트랜스파일링된 결과를 그대로 부라우저에서 실행하면 에러가 발생한다.
- 프로젝트 루트 폴더에 다음과 같은 `index.html`을 작성하여 트랜스파일링된 자바스크립트 파일을 브라우저에서 실행해보자.

```html
<body>
  <script src="dist/js/lib.js"></script>
  <script src="dist/js/main.js"></script>
  <body></body>
</body>
```

- 위 HTML 파일을 브라우저에서 실행하면 다음과 같은 에러가 발생한다.
  ```bash
  Uncaught ReferenceError: exports is not defined at lib.js:3
  main.js:3 Uncaught ReferenceError: require is not defined at main js:3
  ```
  - Webpack을 통해 문제를 해결할 수 있다.

## 49.2 Webpack

- Webpack은 의존 관계가 있는 자바스크립트, CSS, 이미지 등의 리소스들을 하나 또는 여러개의 파일로 번들링하는 모듈 번들러다.
- Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요 없다.
  - HTML 파일에서 script 태그로 여러 개의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

### 49.2.1 Webpack 설치

```bash
npm install --save-dev webpack webpack-cli
```

### 49.2.2 babel-loader 설치

```bash
npm install -save-dev babel-loader
```

- Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+ / ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링하도록 설치한다.

### 49.2.3 webpack.config.js 설정 파일 작성

- Webpack이 실행될 때 참조하는 설정 파일이다.
- 프로젝트 루트 폴더에 파일을 생성한다.

  ```jsx
  const path = require('path')

  module.exports = {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'), // 저장 경로
      filename: 'js/bundle.js' // 번들링 된 js 파일 이름
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resilve(__dirname, 'src/js')],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        }
      ]
    },
    devtool: 'source-map',
    mode: 'development'
  }
  ```

- Webpack을 실행하여 트랜스파일링 및 번들링을 실행해보자.
  - `npm run build`
  - `dist/js` 폴더에 `bundle.js`가 생성된다. → `main.js`, `lib.js` 모듈이 하나로 번들링 된 결과물

### 49.2.4 babel-polyfill 설치

- Babel을 사용하여 ES6+ / ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링해도 브라우저가 지원하지 않는 코드는 남아 있을 수 있다.
  - ES6에 추가된 Promise, Object.assign, Array.from 등은 ES5 사양으로 트랜스파일링해도 대체할 기능이 없기 때문에 트랜스파일링되지 못하고 그대로 남는다.

```bash
npm install @babel/polyfill
```

- 실제 운영 환경에서도 사용해야 되기 때문에 개발용 의존성으로 설치하지 않는다.
- ES6의 import를 사용하는 경우에는 진입점의 선두에서 먼저 폴리필을 로드하도록 한다.
  ```jsx
  // src/js/main.js
  import "@babel/polyfill
  ```
- webpack을 사용하는 경우에는 위 방법 대신 webpack.config.js 파일의 entry 배열에 폴리필을 추가한다.
  ```jsx
  entry: ['@babel/polyfill', './src/js/main.js'],
  ```
