# HALE GitHub Pages 구조본

이 폴더는 기존 단일 HTML 파일을 기능 변경 없이 GitHub Pages 배포용 구조로 분리한 버전입니다.

구성:
- `index.html` : 페이지 마크업
- `assets/css/main.css` : 기존 전체 스타일
- `assets/js/vendor/instanced-mouse-effect.bundle.js` : 기존 인스턴싱/렌더링 번들
- `assets/js/app/main.js` : 기존 버튼/초기화 스크립트

GitHub Pages 사용 방법:
1. 이 폴더 내용을 GitHub 저장소 루트 또는 `docs/` 폴더에 업로드
2. GitHub 저장소의 Settings → Pages 에서 배포 경로 선택
3. 배포 후 생성된 링크로 접속

주의:
- 현재 디자인과 기능은 변경하지 않았습니다.
- 상대 경로 기반이라 GitHub Pages 환경에서 그대로 동작하도록 구성했습니다.
