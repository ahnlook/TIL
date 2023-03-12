# CSS(**Cascading Style Sheets)**

cascading은 CSS를 이해하는데 매우 중요하다.

작업 중 element에 적용해야 할 CSS가 작동하지 않는다면 일반적으로 `cascading`과 `specificity`의 규칙에 의해서일 것이다. 어떤 규칙에 따라 element를 원하는 스타일로 만들지 못할 수도 있으므로 이러한 메커니즘의 작동 방식을 이해해야 한다.

`inheritance` 개념도 중요하다. 기본적으로 일부 CSS 속성은 현재 element의 부모 element에 설정된 값을 상속하지만, 일부는 그렇지 않다.

## 계단식 Cascade

CSS 규칙의 순서가 중요하다는 것을 의미한다. 동일한 우선 순위를 갖는 두 규칙이 적용될 때 CSS에서 마지막에 나오는 규칙이 사용될 것이다.

### 중요도

1. Importance
2. 우선 순위
3. 소스 순서: CSS에서 마지막에 오는 규칙이 우선한다.

## 우선 순위 Specificity

우선 순위는 여러 규칙에 다른 선택자가 있지만, 여전히 동일한 element에 적용될 수 있는 경우, 브라우저가 어떤 규칙을 적용할지 결정하는 방법이다.

- element selector는 덜 구체적이다.
- class selector는 보다 구체적이다.

### 포인트 단위

1. Thousands: 인라인 스타일
2. Hundreds: ID 선택자
3. Tens: class, element
4. Ones: element

### !Important

위의 모든 계산을 무효화하는데 사용할 수 있지만 중요하게 사용해야 한다. 계단식(cascade)의 일반적인 규칙을 무시하는데 사용된다.

## 상속 Inheritance

부모 element에서 설정된 일부 CSS 속성 값은 자식 element에 상속되며, 일부는 그렇지 않다.

### 상속 제어하기

- `inherit`: 선택한 요소에 적용된 속성 값을 부모 요소의 속성 값과 동일하게 설정한다.
- `initial`: 선택한 요소에 적용된 속성 값을 브라우저의 기본 스타일 시트에서 해당 요소의 해당 속성에 설정된 값과 동일하게 설정한다. 브라우저의 기본 스타일 시트에서 값을 설정하지 않고 속성이 자연스럽게 상속되면 속성 값이 대신 `inherit` 되도록 설정된다.
- `unset`: 속성을 natural 값으로 재설정한다. 즉, 속성이 자연적으로 상속되면 `inherit`된 것처럼 작동하고 그렇지 않으면 `initial`처럼 작동한다.

# CSS 작동 방식

<img width="633" alt="image" src="https://user-images.githubusercontent.com/88878874/224520876-f02be256-721e-4874-bb78-86a3923ff37f.png">

1. 브라우저는 HTML을 load한다.
2. HTML을 DOM으로 변환한다. (DOM은 컴퓨터 메모리의 문서를 나타낸다.)
3. 브라우저는 포함된 이미지 및 비디오 같은 HTML 문서에 연결된 대부분의 리소스와 연결된 CSS를 가지고 온다.
4. `render tree`: 브라우저는 가져온 CSS를 구문 분석하고 선택자 유형별로 다른 규칙을 다른 buckets로 정렬한다.
   - element, class, ID 등 찾은 선택자를 기반으로 DOM의 어느 node에 어떤 규칙을 적용해야 하는지 결정하고 필요에 따라 스타일을 첨부한다. 이 중간 단계를 render tree라고 한다.
5. render tree는 규칙이 적용된 후에 표시되어야 하는 구조로 배치된다.
6. `painting`: 페이지의 시각적 표시가 화면에 표시된다.

## reference

[CSS MDN](https://developer.mozilla.org/ko/docs/Learn)
