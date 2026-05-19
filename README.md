# 내 목록 📖🎬

독서 & 영화 기록 웹앱

## 기능
- 책 / 영화 / 드라마 기록
- 작가·감독·배우별 목록
- 캘린더 (책 읽기 기간 타임라인 포함)
- AI 취향 분석 & 추천
- 문학 공모전 검색

## 배포 방법 (Vercel)

1. GitHub에 이 저장소를 올린다
2. vercel.com에서 "New Project" → GitHub 저장소 연결
3. Environment Variables에 추가:
   - `ANTHROPIC_API_KEY` = 본인의 Anthropic API 키
4. Deploy!

## 로컬 실행

```bash
npm install -g vercel
vercel dev
```
