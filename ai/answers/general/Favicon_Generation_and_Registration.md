# Favicon 생성 및 등록 경험 정리

## 생성 방식

-   footballay 로고를 기반으로 favicon.io 등 favicon generator 사이트를 활용해 다양한 해상도의 favicon 파일(png, ico 등)을 생성함
-   생성된 파일: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png, site.webmanifest 등
-   ico 파일은 16x16, 32x32, 48x48 등 여러 해상도를 포함하도록 생성

## CDN 기반 등록

-   모든 favicon 관련 파일을 서비스 CDN(`https://static.footballay.com/footballay/general/favicon/`)에 업로드
-   index.html의 head 태그에서 환경변수(`VITE_CDN_ORIGIN`, `VITE_FAVICON_PATH`)를 활용해 favicon 경로를 동적으로 지정
-   예시:
    ```html
    <link rel="apple-touch-icon" sizes="180x180" href="%VITE_CDN_ORIGIN%%VITE_FAVICON_PATH%apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="%VITE_CDN_ORIGIN%%VITE_FAVICON_PATH%favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="%VITE_CDN_ORIGIN%%VITE_FAVICON_PATH%favicon-16x16.png" />
    <link rel="manifest" href="%VITE_CDN_ORIGIN%%VITE_FAVICON_PATH%site.webmanifest" />
    <link rel="icon" type="image/x-icon" href="%VITE_CDN_ORIGIN%%VITE_FAVICON_PATH%favicon.ico" />
    ```
-   site.webmanifest의 icons 경로도 CDN 절대경로로 수정

## 환경변수 활용

-   VITE_CDN_ORIGIN, VITE_FAVICON_PATH 환경변수로 CDN base url과 favicon 디렉토리 경로를 분리 관리
-   개발/운영 환경에 따라 환경변수만 바꿔주면 favicon 경로가 자동으로 반영됨

## 실무 팁

-   png, ico 등 다양한 포맷과 해상도를 모두 제공하면 최신/구형 브라우저, 모바일, PWA 등 모든 환경에서 최적의 아이콘 경험 제공 가능
-   favicon.ico는 루트에 두거나, 명시적으로 <link rel="icon" ...> 태그로 지정하는 것이 호환성에 좋음
-   site.webmanifest는 PWA, 모바일 홈화면 추가 등 앱 경험을 위한 메타데이터 제공용임

## 참고

-   이 문서는 2025년 6월 footballay-main-page 프로젝트에서 favicon 생성 및 등록 경험을 바탕으로 작성됨

## Footer 및 문의처 안내 정책

-   개발자 문의 이메일: physickskim@gmail.com (footballay.com 개발자 문의처)
-   깃허브: https://github.com/PhysicksKim
-   Footer에는 위 이메일과 깃허브 주소를 작은 글씨로 하단에 안내
-   예시:
    ```html
    <footer>
        <div style="font-size: 0.8em; color: #888;">
            문의: <a href="mailto:physickskim@gmail.com">physickskim@gmail.com</a> | GitHub:
            <a href="https://github.com/PhysicksKim" target="_blank">PhysicksKim</a>
        </div>
    </footer>
    ```
