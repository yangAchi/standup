[실행]

https://accidental-smoke.surge.sh



[설치]

(1) git 설치
- https://git-scm.com/

(2) github에서 clone
- git clone https://github/yangAchi/standup.git

(3) node-modules을 프로젝트의 루트 폴더에 붙여넣기
- node-modules는 create-react-app 생성으로 얻는다.

(4) Firebase 프로젝트 만들기
- https://firebase.google.com/
- 웹 앱에 Firebase 추가
- 프로젝트의 루트 폴더에 .env 만들고 Firebase Key 값 넣기

- REACT_APP_FIREBASE_KEY=
- REACT_APP_AUTH_DOMAIN=
- REACT_APP_DB_URL=
- REACT_APP_STRG_BKT=
- REACT_APP_MSG_SENDER_ID=
- REACT_APP_EMBEDLY_KEY=

(5) embedly 프로젝트 만들기
- https://embed.ly
- .env에 embedly API Key 값 넣기

(6) npm 설치
- npm install react-redux --save
- react-router
- firebase
- redux
- react-router-redux
- redux-thunk
- firebaseui
- axios
- react-tag-input

(7) Firebase의 Database 규칙
- read, write 값 true 로 변경

(8) surge
- npm install surge --save
- surge
- 도메인 기억하기

(9) package.json에서 homepage, deploy에 surge로 생성된 도메인 주소로 변경

(10) npm run deploy

(11) Firebase 인증
- authentication -> 로그인 방법 -> 구글 -> 사용설정 -> 저장
- 도메인 추가 -> surge로 생성된 도메인 추가

(12) 웹 브라우저에 도메인 입력

(13) 로그인 -> 구글 -> page not found
- URL에서 login 지우고 엔터
- 다시 로그인
