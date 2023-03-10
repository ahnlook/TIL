# Code Squad - WEEK 01

## 📝 회고

### 기억나는 고민거리

`keyframe`으로 에니매이션을 만들어서 적용하는데, 어떤 요소에는 잘 작동이 되었는데 되지 않는 요소가 있었다. 다른 크루와 비교해봤을 때 html 구조에서 오는 문제였던 것 같은데 내 코드에선 아직 해결하지 못했다.

### 기억해야 할 것

동영상 강의를 보고 따라 치는 클론 코딩만의 경험만 있는 나는 캐스캐이딩에 대한 중요성을 몰랐다. html 구조는 단순히 눈에 보이는 UI를 만들지 그 이상의 중요성을 몰랐는데, 직접 0부터 구현을 하다보니 캐스캐이딩의 영향으로 CSS가 적용되지 않는 현상을 많이 겪었다.  
현재는 nav bar, side bar만 있는 코드이지만 요소들과 페이지가 많아질 것들을 고려하고 고민해서 코드를 짜보도록 해야겠다.

## ✏️ 학습 내용

###

## git

- pull request

  1. Fork  
     Upstream Repository를 자신의 저장소로 Fork(Origin Repository)한다.
  2. Clone & remote 설정

  ```
  $ git clone {복사한 URL}
  ```

  3. 내 컴퓨터에 생성된 로컬저장소에 원격저장소를 추가

  ```
  $ git remote add post{별명} {복사한 URL}
  ```

  4. branch 생성

  ```
  $ git switch -c {브랜치 명}

  // branch 확인
  $ git branch
  ```

  5. 수정 후 add, commit, push

  - editor를 통해 코드 수정한다.
  - 작업이 완료되면 Github Repository(origin)에 add, commit, push한다.

  ```
  $ git push origin {브랜치 명}
  ```

  6. pull request

  - push 완료후 자신의 github 저장소에서 **Compare & pull request** 버튼이 활성화 되어있는걸 확인할 수 있다.
  - 버튼을 클릭해 Pull Request를 생성한다.

  7. Merge pull request

  - pr을 받은 관리자는 코드 변경 내역을 확인하고 merge를 결정한다.

  8. Merge 이후 동기화 및 branch 삭제

  - Merge가 완료되면 로컬 코드와 원본의 코드를 병합하고 최신의 상태를 유지하게 위해 동기화한다.
  - upstream 확인

  ```
  $ git remote -v
  ```

  - upstream 추가

  ```
  $ git remote add upstream
  $ git fetch upstream
  $ git merge upstream/master
  $ git branch -d {브랜치 명}
  ```

- 위 명령어를 통해 동기화하고, 브랜치를 삭제한다.
- 나중에 추가적으로 작업이 또 필요하다면, 동기화를 한 뒤 3-7번을 반복하면서 작업하면 된다.

- pull request를 하는 이유
  - 자연스러운 코드 리뷰를 위해
  - push 권한이 없는 오픈 소스 프로젝트에 기여할 때
- pull request와 merge request의 차이  
  사실상 같은 용어이며 아래와 같은 차이가 있다.
  - [github] pull request : 내가 작업한 branch를 master 입장에서 pull 하는 것
  - [gitlab] merge request :내가 작업한 branch 입장에서 master에 merge 하는 것
- draft  
  [full request] - [Reviewers] - [still in progress?] - [Convert to draft] click  
  <img width="320" alt="image" src="https://user-images.githubusercontent.com/88878874/223031668-051e4067-d4b9-4aae-82e0-567ccef22166.png">
  - 아직 작업 중인 것을 알릴 수 있으며 코드 리뷰는 받을 수 없다.
  - merge도 불가능하다.
  - [Ready for review] : 보통의 pull request 상태로 변경된다.

## html

### sementic tag

- div
- header
- section
- nav
- footer
- aside
