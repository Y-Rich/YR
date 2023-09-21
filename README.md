# ****반도체 공장 매니징 프로젝트****

## 프로젝트 소개

- 프로젝트 명: ****반도체 공장 매니징 프로젝트****
- 팀 명: YR(영앤리치)
- 프로젝트 기간: 2023.09.01 ~ 2023.09.19
- 깃허브 링크: 🔗[깃허브](https://github.com/Y-Rich/YR/tree/dev)
- API 문서: 🔗[PostMan](https://documenter.getpostman.com/view/27544675/2s9YBxZFu6)
- 발표 자료: 🔗[PPT](https://docs.google.com/presentation/d/1ZnGEwxpCYO_GvAWEhkE4orwQhH-mp_oMgTzgx0vxikY/edit?usp=sharing)

## 서비스 소개

- 멀티 지역 반도체 웨이퍼 공장의 통합 제어 & 모니터링을 위한 웹 어플리케이션 개발
- 시나리오 요구사항
    - 현재 반도체 웨이퍼 생산 Facility 두 곳 운영 중
    → **세종**(**fac1**) & **화성**(**fac2**)
    - **클린룸** 시설의 인원 출입이 제한적임.
    → **자동화 공정** 진행중
    - 각 생산시설은 **3개 공정**으로 구성됨.
    → **공정별** 직원 배치 및 **공장별** 통합 관리 구조
- 시나리오 요구사항 분석
    - 두 공장의 **생산 현황 파악 &** **관리**를 위한 **통합 생산 제어** 및 **모니터링 시스템**
    - **관리 권한 및 직급별로** 차등 접근이 가능한 생산 **제어** 및 데이터 **조회** 서비스
    - 설비의 현재 상태를 **원격으로,** 손쉽게 ****조회 및 제어가 가능한 **원격 통합 서비스**

## 기술 스택

- **FE**
React, styled-components, axios, three.js, websocket
- **BE**
NodeJS, Nodemailer, MySQL, mongoDB, postman, swagger
- **Smart-connector**
arduino, C#, mosquitto, MQTT, XG5000, XG-PM

## 구조

![diagram](https://github.com/Y-Rich/YR/assets/112938316/d35e55f8-039e-4338-ab48-2bca88865762)

## 서비스 주요 페이지 및 기능

**👉 Main Page - Login** 

![YR-Login](https://github.com/Y-Rich/YR/assets/112938316/29094d31-f546-4459-bd6d-b18067c9b7d3)

🎈 처음 보이는 메인 페이지는 B2B 프로젝트 특성상 회사 사진을 background에 위치시켰습니다.

🎈 홈페이지에 들어가면 바로 로그인 화면을 보여주고, 로그인 시에는 바로 Chart 페이지로 이동합니다.

🎈 로그인 상태 및 권한에 따라 헤더가 변경됩니다.

---

**👉 Register** 

![YR-Register](https://github.com/Y-Rich/YR/assets/112938316/1a11e230-15bc-4f01-ab3a-7f07ec741b2a)

🎈 유효성 검사

서버로 데이터를 보내기 전, 프론트에서 input 작성 시 유효성 검사를 해주어 서버로 가는 데이터를 줄였습니다.

```jsx
이름: 한글,
이메일: 사내 이메일,
전화번호: 숫자 11자리,
비밀번호: 8자리,
비밀번호확인: 비밀번호와 동일
```

위의 사항을 충족시켜야 회원가입이 가능합니다.

---

**👉 PW Reset & Change**

![YR-PWReset](https://github.com/Y-Rich/YR/assets/112938316/a483d436-bde7-4bef-9c79-261c2ff2ed1f)

🎈 비밀번호를 재설정하기 위해

```jsx
이메일: 사내 이메일,
회신받을이메일: 개인 이메일,
직원고유번호: 입사시받는고유keyString
```

위의 사항들을 정확히 입력하면 개인 이메일로 비밀번호 변경 링크를 보내줍니다.

🎈 받은 링크로 접속 시 비밀번호 재설정을 할 수 있는 화면으로 이동 및 비밀번호 변경이 가능해집니다.

---

**👉 회원 정보 변경 페이지**

![YR-UserModi](https://github.com/Y-Rich/YR/assets/112938316/e36b18c8-f3fe-4b48-9afd-e2a498210eff)

🎈 Header의 MyPage 버튼을 누르면 회원 정보를 수정할 수 있습니다.

🎈 이름, 전화번호, 비밀번호를 변경할 수 있으며, 비밀번호를 변경하지 않을 시엔 입력하지 않으면 됩니다.

**👉 Admin 페이지**

![YR-Admin-EmployeeControl](https://github.com/Y-Rich/YR/assets/112938316/679740cd-785f-4f1a-b774-f003f1cb4c4e)

🎈 직원 관리
직원의 권한을 변경할 수 있습니다.

![YR-Admin-employeeLog](https://github.com/Y-Rich/YR/assets/112938316/fbe18532-1786-4f26-b963-9a429605a872)

🎈 직원 로그 조회
어느 직원이 어떤 동작을 하였는지 로그를 조회할 수 있습니다.

![YR-Admin-facLog](https://github.com/Y-Rich/YR/assets/112938316/7e4f79ce-481b-48ab-acb5-2730d8df127b)

🎈 공정 로그 조회

전체 공정 로그를 조회할 수 있습니다.

**👉 차트 페이지**

![YR-Chart](https://github.com/Y-Rich/YR/assets/112938316/6f2a15e8-8547-4b3e-ab79-e0f0e07fe1cc)

🎈 PLC의 정보를 DB에 전달해 재가공된 데이터를 차트화시켜 사용자에게 보여줍니다.

🎈 Box 형태의 컴포넌트들로 UX를 개선하였습니다.

🎈 manager 권한을 가진 직원은 admin chart, fac1 chart, fac2 chart를 볼 수 있습니다.
supervisor와 worker는 자신이 속한 공장(ex. fac1)의 chart만 볼 수 있습니다. 

**👉 패널 페이지**

![YR-Pannel](https://github.com/Y-Rich/YR/assets/112938316/d8400531-d621-467d-a1c4-8f372991c24b)

🎈 PLC의 현재 상태를 mqtt를 이용하여 실시간으로 전달 받아 보여줍니다.

🎈 마찬가지로 Box 형태의 컴포넌트들로 통일감을 주어 UX를 개선하였습니다.

🎈 manager 권한을 가진 직원은 모든 공장의 pannel을 볼 수 있습니다.
마찬가지로 supervisor와 worker는 자신이 속한 공장의 pannel만 볼 수 있습니다.

**👉 PLC 페이지**

![YR-PLC](https://github.com/Y-Rich/YR/assets/112938316/a45d355d-e890-4d86-8170-f98249e8dc46)

🎈 GUI로 PLC를 제어할 수 있습니다. draggable 합니다.


https://github.com/Y-Rich/YR/assets/112938316/56ed9043-2c18-436a-8d7a-3642651601b8


🎈 PLC 모델링을 canvas에 띄워줍니다. 3호기의 경우, 실제 PLC 3호기와 동일하게 움직이는 것을 볼 수 있습니다.

🎈 manager는 모든 공장의 PLC에 대한 전체 권한을 갖습니다.
supervisor는 자신이 속한 공장의 PLC에 대한 전체 권한을 갖습니다.

worker는 자신이 속한 공장의 PLC에서 자신이 담당한 Line의 공정에 대한 권한만 갖습니다.

🎈 온도 이상 시나리오 발생 시 전체 공정이 중지됩니다.

## 깃 컨벤션

### **깃 브랜치**
`git branch feat/FE/login`

`git branch feat/BE/user`

`git branch feat/IoT/plc`

### **커밋 컨벤션**

**feat**: 기능 추가

**fix**: 버그 고친 경우

**design**: css 등 사용자 UI 디자인 변경

**docs**: 문서 수정한 경우

**style**: 코드 포맷팅, 세미클론 누락, 코드 변경 없는 경우

**rename**: 파일 혹은 폴더명 수정하거나 옮기는 경우

**remove**: 파일을 삭제하는 작업만 수행한 경우

**refactor**: 코드 리팩토링

ex) git commit -m "feat: 로그인 기능"
