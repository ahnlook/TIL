# QUIC는 어떻게 **Head-of-Line(HOL) Blocking를 피할 수 있을까?**

🌱 HTTP에 대해 공부를 하다가 HTTP/3.0의 특징에서 QUIC 프로토콜을 사용하여 HOL Blocking 현상을 제거했다고 알게 되었다. *TCP와는 달리 스트림 별로 독립적인 전송을 제공*하기 때문에 제거를 할 수 있었다고 하는데, “스트림 별로 독립적인 전송을 한다는 것은 어떤 의미일까?”라는 의문이 생겨 공부하게 되었다.

HOL Blocking 현상은 HTTP, TCP, 스위치 및 라우터, 데이터베이스 시스템 등에서 발생하는 현상이다. 이 중에서 우리가 알아갈 것은 HTTP, TCP의 HOL Blocking 현상이 어떻게 발생하며, QUIC이 이를 해결한 방법이다.

먼저 QUIC에 대해 간단하게 알아보자.

## QUIC은 왜 등장 했을까?

옛날의 인터넷은 간단한 웹 페이지를 로드하는 데 1~2분 이상 걸릴 수 있었다. 저해상도의 동영상의 재생을 시작하고 즉시 일시 정지를 하여 동영상이 버퍼링 되도록 기다렸다.

오늘날 사람들은 기다릴 필요 없이 인터넷 서핑을 하고 싶었고 동영상을 버퍼링이나 픽셀화 없이 4K로 즉시 스트리밍 되기를 바란다.

오늘날의 인터넷 경험을 가능하게 한 기술 발전에도 불구하고, 우리는 처음부터 동일한 인터넷 프로토콜인 TCP를 사용해 왔다.

TCP는 훌륭한 프로토콜이다. 문제는 엄청나게 빨라야 하는 최신 인터넷 서비스의 요구 사항을 충족하고 더 나은 프로토콜을 만들기 위해 TCP를 변경할 수 없다는 것이다.

## 그래서 QUIC, 왜 빠른데?

### 연결 지역 시간 단축

보안 네트워크 연결을 완료하기 위해 두 번의 hand shake(TCP, TLS)를 기다릴 필요가 없다. 연결 종료 후에도 복원력이 뛰어나다. 서비스에 처음 연결할 때 데이터를 더 빠르게 받기 시작하며 두 번째 연결에서는 더욱 빠르게 받을 수 있다.

QUIC 1.0은 모든 데이터에 TLS 1.3 기반 암호화를 요구한다. 기존 TCP는 3-way-handshake에 의한 최소 1-RTT의 지연 시간이 발생한다. HTTPS를 사용한다면 TSL 과정이 포함되어 RTT가 추가된다. QUIC은 TCP + TLS의 연결 과정(1-RTT)을 거친다.

### 연결 재사용

stream과 session ticket의 두 가지 방법으로 세션을 재 사용할 수 있다. 단일 QUIC session에는 여러 개의 stream이 동시에 있을 수 있다. 또한 서버는 전체 handshake를 거치지 않고 연결에 사용할 수 있는 session ticket을 클라이언트에게 부여하여 안전하게 재 연결할 수 있다.

QUIC은 한 번이라도 클라이언트와 서버가 데이터 전송을 수행한 적이 있으면 0-RTT로 작동한다.

### Connection Migration

QUIC 연결이 IP 변경 후에도 살아남을 수 있게 해준다.

예를 들어 유선 LAN에 연결하여 사용하던 노트북을 WiFi로 전환한다고 가정해보자. TCP를 사용하면 연결을 닫고 WiFi IP주소를 사용하여 새 연결을 열어야 한다. QUIC을 사용하면 서버에 Connection ID를 제공하고 아무 것도 변경되지 않은 것처럼 새 IP에서 기존 연결을 계속할 수 있다.

## HTTP에서 HOL Blocking이 발생하는 이유는 뭘까?

QUIC이 어떻게 HOL Blocking을 피했는지 알려면 왜 발생을 하는지 먼저 알아야할 것이다. TCP에서의 HOL Blocking을 알기 전에 HTTP에서의 HOL Blocking을 먼저 알아보자.

### HTTP / 1.0

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066349-098311dc-5710-41ac-b7dd-877ddb984314.png">

클라이언트는 HTML, CSS, JS에 대한 요청을 3번 보내야 한다고 가정한다. 이 때 HTTP1.0은 TCP 연결 하나 당 하나의 요청만 보낼 수 있었다. 심지어 응답을 받은 후에 연결이 종료된다. 때문에 처음 HTML에 대한 요청(TCP connection 1)을 보내고, 그에 대한 응답이 오면 TCP connection 1은 close된다. 이어서 CSS에 대한 요청을 보낼 때 새로운 TCP connetion을 open하고 요청을 보내고 응답을 받아야한다.

이처럼 요청을 순서대로 줄을 서서 보내야 하며, 하나의 요청(HTML)에 대한 응답이 오기 전까지 이후의 요청(CSS, JS)들이 기다릴 수 밖에 없는 현상을 HTTP1.0에서의 HOL Blocking이다.

만약 CSS에 대한 응답이 1초만에 올 수 있는데 HTML에 응답에 10분이 소요 된다면 CSS에 대한 응답은 10분 1초를 기다려야만 자신의 응답을 받을 수 있을 것이다.

### HTTP / 1.1

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066361-7fa654d1-bbcd-41c3-a65d-ee790ccd53a8.png">

클라이언트는 HTML, CSS, JS에 대한 요청을 3번 보내야 한다고 가정한다. HTTP/1.1부터는 하나의 TCP connection에서 여러 번의 요청과 응답을 주고 받을 수 있었다. 이 기술을 파이프라이닝(pipelining)이라고 한다. 덕분에 3-way-handshake와 4-way-handshake 과정이 줄어들어 보다 HTTP/1.0 때보다 빠른 로딩 시간을 보일 수 있었다.

하지만 HOL Blocking은 여전히 해결되지 않았다. 왜냐하면 HTML, CSS, JS의 요청을 한 번에 보냈을 때 클라이언트는 응답을 요청 보낸 순서대로만 받을 수 있었다. 첫번째 요청에 대한 응답이 지연될 경우 이후의 요청들도 대기해야 된다는 것이다. TCP connection만 하나일 뿐이지 HTTP/1.0에서 나타나는 HOL Blocking 현상은 똑같이 나타났다.

## 그럼 TCP에서 발생하는 HOL Blocking은 뭘까?

### HTTP / 2.0

HTTP/1.X에서 발생하던 HOL Blocking을 완화하기 위해 HTTP/2.0에는 스트림이라는 개념이 도입되었다. 이 개념은 멀티플렉싱(multiplecxing)과 연관이 깊다. 이를 통해 하나의 TCP connection으로 여러 요청과 응답을 병렬로 처리할 수 있게 되었다. 각 스트림은 독립적으로 작동하므로 하나의 스트림에서의 지연이 다른 스트림에 직접적인 영향을 주지는 않는다.

하지만 TCP는 전송 계층에서의 패킷의 순서를 보장해야 한다. 따라서 TCP 패킷 중 하나가 손실되면 그 뒤의 패킷들이 해당 패킷이 도착할 때까지 대기해야 한다. 이 현상이 TCP에서의 HOL Blocking이다.

먼저 HTTP/2.0에서 어떻게 데이터들이 전송되는지에 대한 과정을 알아보자.

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066421-54832a91-7ad9-40c0-9ccc-e82b39fbc533.png">

클라이언트는 HTML, CSS, JS에 대한 요청을 3번 보내야 한다고 가정한다. 하나의 요청당 하나의 스트림이 생성된다. 스트림 내에서 요청 데이터의 크기가 클 경우 frame이라는 단위로 분할하게 된다. HTML, CSS, JS 요청 3개에 대한 스트림이 각 각 생성되었다. 모두 frame이 3개로 쪼개질 경우 각 각 병렬적으로 전송계층으로 데이터를 전달할 수 있다. 각 스트림은 병렬적으로 frame을 보낼 수 있었지만 TCP는 패킷의 순서를 보장해야 하는 프로토콜이다. 때문에 그림의 우측 상자에서 처럼 각 frame들은 하나의 TCP connection에서 순서대로 전송되게 된다.

### Frame? packet과 같은 단위일까?

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066447-70de0697-4742-40f5-8893-1b62a7397fe5.png">

결론은 아니다.

그림처럼 하나의 frame이 분할되어 여러 TCP packet에 걸쳐 전송될 수 있고, 반대로 여러 frame이 하나의 packet에 포함되어 전송될 수도 있다. 또한 그림에는 없지만 frame의 크기와 packet의 최대 전송 단위(MTU)에 따라 하나의 frame만이 packet에 포함될 수도 있다.

## HTTP/2.0에서 왜 HOL Blocking이 일어날까?

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066497-227dbcb1-97c0-4120-bb2a-902cb5ef8145.png">

HTTP에서 발생하는 HOL Blocking은 해결 한 HTTP2.0. TCP HOL Blocking에 대해 그림으로 알아보자.

똑같이 클라이언트는 HTML, CSS, JS에 대한 요청을 3번 보내야 한다고 가정한다. 위 설명처럼 HTTP, 응용 계층에서는 각 요청에 대한 stream을 생성하고 병렬적으로 전송 계층으로 frame을 보내 HOL Blocking은 사라졌다. 이제 전송 계층에서의 HOL Blocking을 보자. packet 단위로 전송되는 과정에서 packet 2가 어떠한 이유에서 packet loss가 발생하였다. 그럼 순서를 보장해야되는 TCP 입장에서는 packet 2을 재전송 받기 전까지 기다리게 된다. 이후의 packet에 대해 HOL Blocking이 발생하게 되는 것이다.

## 🌳 QUIC이 어떻게 해결했을까?

QUIC은 하나의 연결로 여러 데이터를 동시에 전송하는 스트림 다중화(Stream Multiplexing)를 제공하여 동일한 스트림에 속하는 모든 데이터는 순서대로 전달되지만, 데이터의 손실이 발생했을 때 다른 스트림의 데이터 전달을 차단하지 않아 HOL Blocking을 방지할 수 있다.

UDP는 상태가 없는 프로토콜로 위와 같은 병렬 처리와 멀티플렉싱에 적합하기 때문에 QUIC은 UDP를 기반으로 설계가 된 것이다. QUIC은 여러 스트림의 데이터는 하나의 연결 내에서 멀티플렉싱 되어 전송된다. 그리고 각 스트림 별로 흐름 제어를 제공하여, 각 스트림에 데이터 전송 속도를 독립적으로 조절할 수 있다.

### HTTP / 3.0

<img width="940" alt="image" src="https://user-images.githubusercontent.com/88878874/268066521-764bea4b-5200-401e-b571-66fd8ed10997.png">

클라이언트는 HTML, CSS, JS에 대한 요청을 3번 보내야 한다고 가정한다. 각 요청에 대한 스트림이 생성된다. TCP와는 다르게 스트림이라는 개념이 전송 계층에도 이어진다. 때문에 각 스트림은 다른 스트림에 영향을 받지 않는다. QUIC 설계 자체가 각 스트림 별로 흐름 제어를 제공할 수 있게 되어 있다. HTTP/2.0에서 응용 계층에서만 적용되던 스트림 다중화 개념이 QUIC을 통해 전송 계층에도 적용됐다고 볼 수 있다.

덕분에 그림처럼 CSS에 요청에 대한 packet 2의 Loss가 발생하여도 HTML, JS 요청에 대한 전송은 blocking 현상 없이 계속될 수 있다.

QUIC에서의 frame도 HTTP/2.0에서처럼 분할되어, 또는 여러개의 frame이 packet에 담길 수 있다.

## 마무리

QUIC에 대해서 공부한 내용은 더 많았지만 HOL Blocking 관점에서만 정리를 했다. QUIC은 여러 측면에서 빠르다는 장점이 특징인 것 같지만 유연성에 더 많은 관심이 생긴다. 빠르게 변화하는 이 시대에서 QUIC의 버전 관리가 기대된다. TCP가 오래된 프로토콜인 만큼 안정성 측면에서 뛰어나지만 더 확장할 수 없는 (그만큼 완벽한?) 프로토콜이라는 것도 이번 기회에 알게 되었다.

_QUIC의 HOL Blocking에 꽂혀 두서 없이 개인이 이해한 내용을 바탕으로 정리를 해보았다. 공부하는 과정에서 작성한 내용이라 틀린 내용이 있을 수 있다._
