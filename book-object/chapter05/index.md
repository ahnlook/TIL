# 05 책임 할당하기

데이터 중심 설계로 인해 발생하는 문제점을 해결할 수 있는 가장 기본적인 방법은 데이터가 아닌 책임에 초점을 맞추는 것이다.
책임에 초점을 맞춰서 설계할 때 직면하는 가장 큰 어려움은 어떤 객체에게 어떤 책임을 할당할지를 결저하기가 쉽지 않다는 것이다. 책임 할당 과정은 일종의 트레이드오프 활동이다.  
이번 장에서 살펴볼 GRASP 패턴은 책임 할당의 어려움을 해결하기 위한 답을 제시해 줄 것이다.

## 01 책임 주도 설계를 향해

데이터 중심의 설계에서 책임 중심의 설계로 전환하기 위해서는 다음의 두가지 원칙을 따라야 한다.

- 데이터보다 행동을 먼저 결정하라
- 협력이라는 문맥 안에서 책임을 결정하라

### 데이터보다 행동을 먼저 결정하라

객체에게 중요한 것은 데이터가 아니라 외부에 제공하는 행동이다. 클라이언트의 관점에서 객체가 수행하는 행동이란 곧 객체의 책임을 의미한다.
"이 객체가 수행해야 하는 책임은 무엇인가"를 결정한 후에 "이 책임을 수행하는 데 필요한 데이터는 무엇인가"를 결정한다. 즉 책임을 먼저 결정한 후에 객체의 상태를 결정한다는 것이다.

### 협력이라는 문맥 안에서 책임을 결정하라

객체에 할당된 책임이 협력에 어울리지 않는다면 그 책임은 나쁜 것이다. 객체 입장에서는 책임이 조금 어색해 보이더라도 협력에 적합하다면 그 책임은 좋은 것이다. 책임은 객체의 입장이 아니라 객체가 참여하는 협력에 적합해야 한다.  
협력을 시작하는 주체는 메시지 전송자이기 때문에 협력에 적합한 책임이란 메시지 수신자가 아니라 메시지 전송자에게 적합한 책임을 의미한다. 다시 말해서 메시지를 전송하는 클라이언트의 의도에 적합한 책임을 할당해야 한다는 것이다.

> 메시지를 결정하고 이 메시지를 누구에게 전송할지 찾아보게 되었다. "메시지를 전송해야 하는데 누구에게 전송해야 하지?"라고 질문하는 것. 설계의 핵심 질문을 이렇게 바꾸는 것이 메시지 기반 설계로 향하는 첫걸음이다.

메시지가 클라이언트의 의도를 표현한다는 사실에 주목하라. 객체를 결정하기 전에 객체가 수신할 메시지를 먼저 결정한다는 점 역시 주목하라. 클라이언트는 어떤 객체가 메시지를 수신할지 알지 못한다. 메시지를 수신하기로 결정된 객체는 메시지를 처리할 "책임"을 할당 받게 된다.  
결론적으로 책임 중심의 설계에서는 협력이라는 문맥 안에서 객체가 수행할 책임에 초점을 맞춘다.

## 02 책임 할당을 위한 GRASP 패턴

General Responsibility Assignment Software Pattern(일반적인 책임 할당을 위한 소프트웨어 패턴)의 약자로 객체에게 책임을 할당할 때 지침으로 삼을 수 있는 원칙들의 집합을 패턴 형식으로 정리한 것이다.

### 도메인 개념에서 출발하기

> 올바른 도메인 모델이란 존재하지 않는다. 도메인 모델은 구현과는 무관하다고 생각하지만 이것은 도메인의 개념을 오해한 것에 불과하다. 도메인 모델은 도메인을 개념적으로 표현한 것이지만 그 안에 포함된 개념과 관계는 구현의 기반이 돼야 한다. 이것은 도메인 모델이 구현을 염두에 두고 구조화되는 것이 바람직하다는 것을 의미한다. 반대로 코드의 구조가 도메인을 바라보는 관점을 바꾸기도 한다.

### 정보 전문가에게 책임을 할당하라

책임 주도 설계 방식의 첫 단계는 애플리케이션이 제공해야 하는 기능을 애플리케이션의 책임으로 생각하는 것이다. 이 책임을 애플리케이션에 대해 전송된 메시지로 간주하고 이 메시지를 책임질 첫 번째 객체를 선택하는 것으로 설계를 시작한다.

사용자에게 제공해야 하는 기능은 영화를 예매하는 것이다. 첫 번째 질문은 다음과 같다.

> "메시지를 전송할 객체는 무엇을 원하는가?"

협력을 시작하는 객체는 미정이지만 이 객체가 원하는 것은 분명해보인다. 바로 영화를 예매하는 것이다. 메시지를 결정했으므로 메시지에 적합한 객체를 선택해야 한다. 두 번째 질문은 다음과 같다.

> 메시지를 수신할 적합한 객체는 누구인가?

이 질문에 답하기 위해서는 객체가 상태와 행동을 통합한 캡슐화의 단위라는 사실에 집중해야 한다. 객체는 자신의 상태를 스스로 처리하는 자율적인 존재여야 한다. 객체의 책임과 책임을 수행하는 데 필요한 상태는 동일한 객체 안에 존재해야 한다. 따라서 객체에게 책임을 할당하는 첫 번째 원칙은 책임을 수행할 정보를 알고 있는 객체에게 책임을 할당하는 것이다. GRASP에서는 이를 Information Expert 패턴이라고 부른다.

Information Expert 패턴은 객체가 자신이 소유하고 있는 정보와 관련된 작업을 수행한다는 일반적인 직관을 표현한 것이다. 여기서 이야기하는 정보는 데이터와 다르다는 사시에 주의해라. 책임을 수행하는 객체가 정보를 '알고' 있다고 해서 그 정보를 '저장'하고 있을 필요는 없다. 객체는 해당 정보를 제공할 수 있는 다른 객체를 알고 있거나 필요한 정보를 계산해서 제공할 수도 있다. 어떤 방식이건 정보 전문가가 데이터를 반드시 저장하고 있을 필요는 없다는 사실을 이해하는 것이 중요하다.

상영은 영화에 대한 정보와 상영 시간, 상영 순번처럼 영화 예매에 필요한 다양한 정보를 알고 있다. 따라 영화 예매를 위한 정보 전문가다. 상영에게 예매를 위한 책임을 할당하자.

_예매하라_ 메시지를 완료하기 위해서는 예매 가격을 계산하는 작업이 필요하다. 영화 가격을 계산하는 데 필요한 정보를 알고 있는 전문가는 영화다. Movie는 영화 가격을 계산할 책임을 지게 된다.

요금을 계신하기 위해서는 먼저 영화가 할인 가능한지를 판단한 후 할인 정책에 따라 할인 요금을 제외한 금액을 계산하면 된다. Movie는 _할인 여부를 판단하라_ 메시지를 전송해서 외부의 도움을 요청해야 한다.

이 정보에 대한 전문가는 바로 할인 조건이다. DiscountCondition에게 이 책임을 할당하자. DiscountCondition은 자체적으로 할인 여부를 판단하는 데 필요한 모든 정보를 알고 있기 때문에 외부의 도움 없이도 스스로 할인 여부를 판단할 수 있다. 따라서 외부에 메시지를 전송하지 않는다.

### 높은 응집도와 낮은 결합도

올바른 책임 할당을 위해 Information Expert 패턴 이외의 다른 책임 할당 패턴들을 함께 고려할 필요가 있다.

할인 요금을 계산하기 위해 Movie가 DiscountCondition에 할인 여부를 판단하라 메시지를 전송한다. 그렇다면 이 설계의 대안으로 Movie 대신 Screening이 직접 DiscountCondition과 협력하게 하는 것은 어떨까? 기능적인 측면에서는 두 가지 중 어떤 방법을 선택하더라도 차이가 없는 것처럼 보인다. 하지만 Movie가 협력하는 방법을 선택한 이유는 응집도와 결합도에 있다.
