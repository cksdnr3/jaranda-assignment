# Team Project
PreOnBoading-Assignment3-Jaranda

[자란다](https://jaranda.kr/)

## 소개
***
​    - 사용자로부터 정보(이름,주소,카드정보,나이등)를 입력받아 회원가입, 로그인, 로그아웃 기능을 구현

​    - 사용자의 권한(role 설정에 따른)에 접근 가능한 메뉴 구현

​    - 관리자 계정 로그인 시 관리자 전용페이지 구현


-**팀원** : 강동휘, 강준희, 노찬욱, 박세리, 이승열, 장윤호, 채준형

-**기술 스택**: React, styled-components, react-daum-postcode

-**배포 주소**: https://peaceful-wilson-9e6512.netlify.app/

-**권한별 ID/PW** : admin/a(관리자), frontend/a(프론트엔드), backend/a(백엔드), server/a(서버), customservice/a(고객관리), HRresource/a(인사관리)

-**협업 도구**: slack, notion, github, visual studio code


## 요구사항
***
* [공통]
  Data는 Local Storage에 저장
  관리자 계정 임의 설정가능

* [회원가입페이지]
  사용자로 부터 이름, 주소(Daum API), 카드정보, 나이등의 정보를 입력받아 회원가입 기능이 되는 회원가입 페이지를 구현하기

* [로그인페이지]
  계정과 비밀번호만 입력하여 로그인이 기능이 되는 페이지 구현하기

* [메인페이지]
  로그인된 계정은 자신에게 허용된 메뉴만 보이기

* [관리자페이지]
  관리자 로그인시, 계정정보 시각화 하기(테이블 Component페이지 만들기, Data Table 구현, 페이지네이션 구현)

## 구현사항
***

**강동휘**
[login, main페이지]  
login 모달 및 동작 구현

**박세리**
[login, main페이지]  
main header 버튼 , 링크 기능  
main navigation bar  

**장윤호**
[signup페이지]  
localstorage utils,  
signUp form 구현,  
signUp input validataion

**채준형**
[signup페이지]  
signUp layout  
signUp 페이지 컴포넌트 리팩토링  
signup 다음 주소 api 연결 및 팝업 페이지  

**강준희**
[admin페이지]  
전역 스타일링  
admin layout  
admin 유저 검색 필터링  

**노찬욱**
[admin페이지]  
Git Main Owner  
admin 페이지네이션 기본설정  
admin 접근 제한 Error 페이지 구현  
admin 계정 생성 구현  
<span style="color:red">유저 검색 멀티 필터링 추가 구현</span>  
<span style="color:red">페이지 리스트 버튼 리팩토링  </sapn>

**이승열**
[adimin페이지]  
모달, 버튼, 헤더 컴포넌트 구현  
admin 테이블 컴포넌트  
admin 계정 변경, 접근 권한 설정 변경  


------

## 설치 guide

**git 과 npm을 사용하여 설치해주세요**

> git clone https://github.com/gugudanAssginment/jaranda-assignment.git

> npm install

------
## 로그인
권한 별 페이지 확인을 위한, 로그인
> **ID / password** <br>
admin / a -> 관리자 <br>
frontend / a -> 프론트엔드 <br>
backend / a -> 백엔드 <br>
server / a -> 서버 <br>
customservice / a -> 고객지원 <br>
HRresource / a -> 인사관리 <br>
