# Cloudflare R2 CORS 및 캐시 문제 정리

## 문제 상황

-   Cloudflare R2에 정적 파일을 올리고, 프론트엔드(vite dev server 등)에서 CORS 요청을 보낼 때
-   curl 등으로는 Access-Control-Allow-Origin 헤더가 잘 보이지만, 브라우저에서는 CORS 에러가 발생
-   브라우저 콘솔에는 다음과 같은 에러가 출력됨:
    -   `No 'Access-Control-Allow-Origin' header is present on the requested resource`

## 원인 분석

-   Cloudflare(R2 포함)는 기본적으로 정적 파일을 캐싱함
-   최초 캐시 시점에 Origin 없는 요청(혹은 다른 Origin)으로 응답이 저장되면, 이후 CORS 요청에도 CORS 헤더 없는 응답이 반환됨
-   Vary: Origin, Vary: Access-Control-Request-Headers, Access-Control-Request-Method 등 Vary 헤더가 없거나, 이미 잘못된 캐시가 있으면 문제 지속
-   실제로는 Access-Control-Allow-Origin 헤더가 응답에 반드시 포함되어야 하며, Vary 헤더는 캐시 분리용임

## 해결 방법

1. **Vary 헤더 추가**
    - Transform Rule 등으로 Vary: Access-Control-Request-Headers, Access-Control-Request-Method, Origin 추가
2. **Access-Control-Allow-Origin 헤더가 실제 응답에 포함되는지 확인**
    - curl -I -H "Origin: ..." ... 으로 직접 확인
3. **Cloudflare 캐시 완전 삭제(Purge Everything 또는 URL별 Purge)**
    - 이미 잘못된 캐시가 있으면 Vary 헤더를 추가해도 문제 해결 안 됨
4. **Cache Rule에서 'bypass cache'로 설정**
    - 캐시를 우회하면 항상 원본(R2)에서 응답을 받아오므로, CORS 헤더가 정상적으로 붙음
5. **Worker/Transform Rule에서 Access-Control-Allow-Origin 헤더를 건드리지 않도록 주의**

## 실무 팁

-   캐시를 사용하면서도 CORS 문제를 방지하려면, 반드시 Vary 헤더와 CORS 헤더가 올바르게 붙는지 확인
-   캐시를 다시 활성화할 경우, 캐시를 완전히 비운 뒤 새로 캐싱이 시작되어야 함
-   브라우저에서 강력 새로고침(Shift+F5)도 병행
-   문제 해결 후에도 curl, 브라우저 네트워크 탭 등으로 헤더를 직접 확인할 것

## 참고

-   이 문서는 2025년 6월 footballay-main-page 프로젝트에서 실제로 발생한 이슈와 해결 경험을 바탕으로 작성됨
