# Wetube Project Front

## 스토리 라인 (기능명세)

1. Main 화면
   - 비디오 영상들 최신순으로 나열된 화면이 Main에 나타남
   - Header에는 Wetube Logo, 비디오 검색 바, Login page link, Join page link 표시
   - Footer에는 사이트 정보 표시
2. 회원가입
   - 닉네임, 이메일, 비밀번호, 비밀번호 확인 입력창
   - 최소글자 닉네임 5글자, 비밀번호 8글자
   - 이메일 이메일 형식에 맞추기
   - 이메일 중복여부 확인
   - 회원가입에 성공하면 자동 로그인
3. 로그인

   - 이메일, 비밀번호 입력창
   - 비밀번호 8글자
   - 이메일 형식
   - ID, PW 불일치 할 시 화면에 표시
   - 로그인 성공시 Main Page로 Redirect







## Front

|         구분         |            url            | method | parameter   | response |
| :------------------: | :-----------------------: | :----: | ----------- | :------: |
|     index 페이지     |             /             |  GET   |             |          |
|   검색 완료 페이지   | /search?searchingBy=query |  GET   | searchingBy |  videos  |
|     Login 페이지     |          /login           |  GET   |             |          |
|     Join 페이지      |           /join           |  GET   |             |          |
|    Upload 페이지     |          /upload          |  GET   |             |          |
|    Profile 페이지    |         /profile          |  GET   |             |          |
| Profile 수정 페이지  |       /profile/edit       |  GET   |             |          |
| 비밀번호 수정 페이지 |     /profile/password     |  GET   |             |          |
|  개별 비디오 페이지  |        /video/:id         |  GET   |             |          |
|     유저 페이지      |        /video/:id         |   g    |             |          |
|                      |                           |        |             |          |

## DB 구조

- users
  - id
  - comments
  - videos
  - name
  - email
  - password
- videos
  - id
  - views
  - comments
  - fileUrl
  - title
  - description
  - creator
  - createdAt