# React Shop App

Zustand + TanStack React Query 기반 쇼핑몰 데모 앱입니다.

**데모:** https://vonovo123.github.io/react-shop-app-zustand-reactQuery/

## 기술 스택

| 구분 | 사용 |
|------|------|
| UI | React 19, TypeScript, Vite, Sass |
| 라우팅 | React Router |
| 클라이언트 상태 | Zustand (`persist` → `localStorage`) |
| 서버 상태 | TanStack React Query |
| HTTP | Axios |
| 인증 | Firebase Authentication |
| 폼 | React Hook Form |

## 사용 API

### 1. Fake Store API — 상품 데이터

- **Base URL:** `https://fakestoreapi.com`
- **용도:** 상품 목록 · 카테고리별 목록 · 상품 상세

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| `GET` | `/products` | 전체 상품 |
| `GET` | `/products/category/:category` | 카테고리별 상품 |
| `GET` | `/products/:id` | 상품 상세 |

코드: `src/api/products.api.ts`

### 2. MockAPI — 주문 데이터

- **Base URL:** `https://6a0519bdaa826ca75c097812.mockapi.io`
- **용도:** 주문 생성 · 유저별 주문 히스토리 조회

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| `POST` | `/orders` | 주문 생성 (`products`, `totalPrice`, `userId`) |
| `GET` | `/orders?search={userId}` | 해당 유저 주문 검색 |

코드: `src/api/orders.api.ts`

> MockAPI는 검색 결과가 없을 때 빈 배열 대신 **404**를 반환할 수 있어, 클라이언트에서 404를 빈 목록(`[]`)으로 처리합니다.

### 3. Firebase Authentication — 로그인

- **방식:** Email / Password
- **사용 API:** `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signOut`
- 설정값은 `.env`의 `VITE_FIREBASE_*`로 주입 (`src/firebase.ts`)

## 데이터 관리 방식

서버에서 가져오는 데이터와 클라이언트에서만 다루는 상태를 분리합니다.

```
UI
 ├─ Zustand          → 장바구니 / 로그인 유저 / 카테고리 필터
 └─ React Query      → 상품 조회 / 주문 조회·생성
      └─ Axios API   → Fake Store / MockAPI
```

### Zustand (클라이언트 상태)

| 스토어 | 경로 | 역할 | persist |
|--------|------|------|---------|
| `useCartStore` | `src/store/cart/` | 장바구니 상품, 수량, 합계, 담기/삭제/주문 후 비우기 | `localStorage` (`cart`) |
| `useUserStore` | `src/store/user/` | 로그인 유저 `email`, `token`, `id` | `localStorage` (`user`) |
| `useCategoriesStore` | `src/store/categories/` | 홈 카테고리 필터 선택값 | 없음 (새로고침 시 초기화) |

- 장바구니·로그인 정보는 새로고침 후에도 유지됩니다.
- 로그아웃 시 `removeUser()`로 유저 스토어를 비웁니다.

### React Query (서버 상태)

| 훅 | 경로 | 역할 |
|----|------|------|
| `useProductsQuery` / `useProductQuery` | `src/queries/products.query.ts` | 상품 목록 · 상세 캐싱 |
| `useOrdersQuery` | `src/queries/orders.query.ts` | 유저별 주문 목록 |
| `usePostOrderMutation` | `src/queries/orders.query.ts` | 주문 생성 후 장바구니 비우기 + 주문 쿼리 invalidate |

기본 옵션 (`src/main.tsx`):

- `staleTime`: 1분
- `retry`: 1
- `refetchOnWindowFocus`: `false`

## 로그인 · 인증 흐름

1. **회원가입** (`/register`)  
   Firebase로 계정 생성 → 성공 시 `setUser({ email, token, id })` → 홈으로 이동
2. **로그인** (`/login`)  
   Firebase 이메일/비밀번호 인증 → 성공 시 동일하게 `setUser` → 홈으로 이동
3. **세션 유지**  
   Zustand `persist`로 `user`를 `localStorage`에 저장해 새로고침 후에도 로그인 유지
4. **로그아웃**  
   Firebase `signOut` + `removeUser()`
5. **권한**  
   - 주문 히스토리(`/order`): 미로그인 시 로그인 페이지로 이동  
   - 결제: 로그인 시 주문 생성, 미로그인 시 로그인 유도

폼 유효성(이메일 필수, 비밀번호 최소 8자)은 React Hook Form으로 처리하고, Firebase 오류는 화면에 메시지로 표시합니다.

## 구현 기능

### 인증
- 이메일/비밀번호 로그인 · 회원가입
- 로그아웃 · 로그인 상태 유지
- 폼 유효성 검사 및 오류 메시지

### 상품
- 상품 목록 / 상세
- 카테고리 필터 (전체, 전자기기, 쥬얼리, 남성/여성 의류)
- 장바구니 담기 (이미 담긴 상품 중복 방지)
- 로딩 · 에러 UI (재시도)

### 장바구니
- 수량 조절 · 삭제 · 합계
- 헤더 호버 미리보기
- `localStorage` 유지
- 로그인 시 결제(주문 생성)

### 주문
- 주문 히스토리 조회 (로그인 필요)
- 결제 성공 시 장바구니 자동 비우기

### 기타
- 공통 헤더/푸터, 장바구니 뱃지, 404 페이지

## 라우트

| 경로 | 화면 |
|------|------|
| `/` | 상품 목록 |
| `/product/:id` | 상품 상세 |
| `/cart` | 장바구니 |
| `/login` | 로그인 |
| `/register` | 회원가입 |
| `/order` | 주문 히스토리 |
| `*` | 404 |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수

프로젝트 루트에 `.env` 파일을 만들고 Firebase 웹 앱 설정을 넣습니다.  
(`.env.example` 참고)

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 3. 실행

```bash
npm run dev
```

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run lint` | ESLint |
