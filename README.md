## 헬밀 서버 with node, koa

## REST API 목록

### user

### GET /users

- 내 로그인 정보를 가져옴, 로그인되어있지 않으면 false
- return: IUser | false

### GET /workspaces/:workspace/users/:id

- :workspace의 멤버인 특정 :id 사용자 정보를 가져옴
- return: IUser

### POST /users

- 회원가입
- body: { email: string(이메일), nickname: string(닉네임), password: string(비밀번호) }
- return: 'ok'

### POST /users/login

- 로그인
- body: { email: string(이메일), password: string(비밀번호) }
- return: IUser

### POST /users/logout

- 로그아웃
- return: 'ok'

