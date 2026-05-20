module.exports = async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="내 목록" />
<title>내 목록</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
<style>
:root {
  --color-bg: #ffffff; --color-bg2: #f5f5f4; --color-bg3: #e8e7e4;
  --color-text: #1c1917; --color-text2: #78716c; --color-text3: #a8a29e;
  --color-border: #e7e5e4; --color-border2: #d6d3d1;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --radius: 12px; --radius-sm: 8px;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1c1917; --color-bg2: #292524; --color-bg3: #3c3836;
    --color-text: #fafaf9; --color-text2: #a8a29e; --color-text3: #78716c;
    --color-border: #3c3836; --color-border2: #57534e;
  }
}
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body { font-family: var(--font); background: var(--color-bg); color: var(--color-text); min-height: 100dvh; }
input, select, textarea, button { font-family: var(--font); color: var(--color-text); background: var(--color-bg2); border: 0.5px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 10px; outline: none; }
input:focus, select:focus, textarea:focus { border-color: var(--color-border2); }
.app { padding: 1rem; max-width: 780px; margin: 0 auto; }
.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
.header h1 { font-size: 18px; font-weight: 600; }
.add-btn { background: none; border: none; cursor: pointer; color: var(--color-text2); font-size: 24px; padding: 0; }
.tab-row { display: flex; border-bottom: 0.5px solid var(--color-border); margin-bottom: 1.25rem; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.tab-row::-webkit-scrollbar { display: none; }
.tab { flex-shrink: 0; padding: 8px 10px; font-size: 13px; font-weight: 500; color: var(--color-text2); background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -0.5px; white-space: nowrap; }
.tab.active { color: var(--color-text); border-bottom-color: var(--color-text); }
.search-wrap { position: relative; margin-bottom: 1rem; }
.search-input { width: 100%; font-size: 14px; padding-left: 36px; padding-right: 36px; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--color-text3); font-size: 16px; pointer-events: none; }
.search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--color-text3); font-size: 16px; padding: 0; display: none; }
.filter-row { display: flex; gap: 8px; margin-bottom: 1rem; flex-wrap: wrap; }
.chip { padding: 5px 12px; border-radius: 999px; font-size: 13px; border: 0.5px solid var(--color-border); background: var(--color-bg); color: var(--color-text2); cursor: pointer; }
.chip.active { background: var(--color-bg2); color: var(--color-text); border-color: var(--color-border2); font-weight: 500; }
.count-row { display: flex; gap: 8px; margin-bottom: 1.25rem; }
.count-box { flex: 1; background: var(--color-bg2); border-radius: var(--radius-sm); padding: 10px 12px; }
.count-label { font-size: 11px; color: var(--color-text2); margin-bottom: 2px; pointer-events: none; }
.count-num { font-size: 20px; font-weight: 600; pointer-events: none; }
.card { background: var(--color-bg); border: 0.5px solid var(--color-border); border-radius: var(--radius); padding: 14px 16px; margin-bottom: 10px; }
.card-top { display: flex; gap: 10px; align-items: flex-start; }
.cat-badge { flex-shrink: 0; font-size: 11px; font-weight: 500; padding: 3px 8px; border-radius: 999px; }
.cat-book { background: #E6F1FB; color: #0C447C; }
.cat-movie { background: #EEEDFE; color: #3C3489; }
.cat-drama { background: #E1F5EE; color: #085041; }
.card-body { flex: 1; min-width: 0; }
.card-title { font-size: 15px; font-weight: 500; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-title mark { background: #FAEEDA; color: #854F0B; border-radius: 2px; padding: 0 1px; }
.card-sub { font-size: 12px; color: var(--color-text2); display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
.card-genres { display: flex; gap: 4px; flex-wrap: wrap; }
.genre-tag { font-size: 11px; padding: 1px 7px; border-radius: 999px; border: 0.5px solid var(--color-border); }
.genre-tag-book { background: #E6F1FB; color: #185FA5; }
.genre-tag-video { background: #F1EFE8; color: #5F5E5A; }
.card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
.status-badge { font-size: 11px; padding: 2px 8px; border-radius: 999px; white-space: nowrap; }
.st-done { background: #EAF3DE; color: #3B6D11; }
.st-reading { background: #FAEEDA; color: #854F0B; }
.st-want { background: #F1EFE8; color: #5F5E5A; }
.card-actions { display: flex; gap: 8px; }
.edit-btn, .delete-btn { background: none; border: none; cursor: pointer; color: var(--color-text3); font-size: 16px; padding: 0; }
.card-review { margin-top: 10px; padding-top: 10px; border-top: 0.5px solid var(--color-border); font-size: 13px; color: var(--color-text2); line-height: 1.7; white-space: pre-wrap; }
.empty { text-align: center; padding: 3rem 1rem; color: var(--color-text2); font-size: 14px; line-height: 1.7; }
.search-result-count { font-size: 12px; color: var(--color-text2); margin-bottom: 10px; }
.status-section { margin-bottom: 1.5rem; }
.status-section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.status-section-title { font-size: 14px; font-weight: 500; }
.status-section-count { font-size: 12px; color: var(--color-text2); background: var(--color-bg2); padding: 2px 8px; border-radius: 999px; }
.ai-btn-row { display: flex; flex-direction: column; gap: 10px; }
.ai-btn { width: 100%; padding: 12px; border-radius: var(--radius); border: 0.5px solid var(--color-border); background: var(--color-bg2); font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.ai-result { margin-top: 1rem; background: var(--color-bg2); border-radius: var(--radius); padding: 16px; font-size: 14px; line-height: 1.8; white-space: pre-wrap; }
.ai-result-label { font-size: 11px; color: var(--color-text2); margin-bottom: 8px; }
.loading-dots { display: inline-flex; gap: 4px; align-items: center; }
.loading-dots span { width: 5px; height: 5px; border-radius: 50%; background: var(--color-text2); animation: dot 1.2s infinite; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dot { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
.creator-tabs { display: flex; gap: 6px; margin-bottom: 1rem; }
.creator-tab { flex: 1; padding: 7px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; border: 0.5px solid var(--color-border); background: var(--color-bg); color: var(--color-text2); cursor: pointer; text-align: center; }
.creator-tab.active { background: var(--color-bg2); color: var(--color-text); border-color: var(--color-border2); }
.creator-group { margin-bottom: 1.25rem; }
.creator-name { font-size: 13px; font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.creator-name-count { font-size: 11px; background: var(--color-bg2); padding: 2px 8px; border-radius: 999px; color: var(--color-text2); font-weight: 400; }
.creator-card { background: var(--color-bg); border: 0.5px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px; margin-bottom: 6px; }
.creator-card-top { display: flex; align-items: center; gap: 10px; }
.creator-card-title { font-size: 14px; font-weight: 500; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.creator-card-review { margin-top: 7px; font-size: 12px; color: var(--color-text2); line-height: 1.6; white-space: pre-wrap; }
.no-result { text-align: center; padding: 2rem 1rem; color: var(--color-text2); font-size: 13px; line-height: 1.6; }
.cal-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.cal-nav-btn { background: none; border: none; cursor: pointer; color: var(--color-text2); font-size: 20px; padding: 4px 8px; }
.cal-title-txt { font-size: 15px; font-weight: 600; }
.cal-dow { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); margin-bottom: 2px; }
.cal-dow-cell { text-align: center; font-size: 11px; color: var(--color-text2); padding: 4px 0; }
.cal-dow-cell:first-child { color: #A32D2D; }
.cal-dow-cell:last-child { color: #185FA5; }
.cal-grid { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); gap: 1px; margin-bottom: 1.25rem; }
.cal-cell { min-height: 52px; padding: 3px 2px 2px; position: relative; border-radius: 4px; overflow: hidden; }
.cal-cell.clickable { cursor: pointer; }
.cal-cell.other-month { opacity: 0.3; }
.cal-num { font-size: 11px; color: var(--color-text2); width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border-radius: 50%; position: relative; z-index: 2; margin-bottom: 1px; }
.cal-cell.sun .cal-num { color: #A32D2D; }
.cal-cell.sat .cal-num { color: #185FA5; }
.cal-cell.today .cal-num { background: var(--color-text); color: var(--color-bg); }
.cal-dot-row { display: flex; flex-wrap: wrap; gap: 1px; position: relative; z-index: 2; }
.cal-dot { width: 5px; height: 5px; border-radius: 50%; }
.dot-movie { background: #7F77DD; }
.dot-drama { background: #1D9E75; }
.tl-stripe { position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; gap: 1px; padding: 0 0 2px; }
.tl-stripe-bar { height: 5px; }
.tl-start { border-radius: 4px 0 0 4px; margin-left: 2px; }
.tl-end { border-radius: 0 4px 4px 0; margin-right: 2px; }
.tl-solo { border-radius: 4px; margin: 0 2px; }
.cal-legend { display: flex; gap: 8px; margin-bottom: 1rem; flex-wrap: wrap; }
.cal-legend-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--color-text2); }
.cal-legend-bar { width: 16px; height: 5px; border-radius: 2px; }
.cal-detail { background: var(--color-bg); border: 0.5px solid var(--color-border); border-radius: var(--radius); padding: 14px 16px; margin-bottom: 1rem; }
.cal-detail-date { font-size: 13px; font-weight: 500; color: var(--color-text2); margin-bottom: 10px; }
.cal-detail-item { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 0.5px solid var(--color-border); }
.cal-detail-item:last-child { border-bottom: none; padding-bottom: 0; }
.cal-detail-body { flex: 1; min-width: 0; }
.cal-detail-title { font-size: 14px; font-weight: 500; }
.cal-detail-meta { font-size: 12px; color: var(--color-text2); margin-top: 2px; }
.cal-detail-review { font-size: 12px; color: var(--color-text2); margin-top: 5px; line-height: 1.6; }
.genre-picker { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.genre-pill { padding: 5px 11px; border-radius: 999px; font-size: 12px; border: 0.5px solid var(--color-border); background: var(--color-bg); color: var(--color-text2); cursor: pointer; }
.genre-pill.selected-book { background: #E6F1FB; color: #185FA5; border-color: #85B7EB; font-weight: 500; }
.genre-pill.selected-video { background: #EEEDFE; color: #3C3489; border-color: #AFA9EC; font-weight: 500; }
.contest-intro { font-size: 13px; color: var(--color-text2); line-height: 1.7; margin-bottom: 1.25rem; }
.contest-btn-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.5rem; }
.contest-btn { width: 100%; padding: 12px; border-radius: var(--radius); border: 0.5px solid var(--color-border); background: var(--color-bg2); font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
.contest-notice { background: var(--color-bg2); border-radius: var(--radius-sm); padding: 12px 14px; font-size: 12px; color: var(--color-text2); line-height: 1.6; }
.contest-notice-title { font-size: 12px; font-weight: 500; color: var(--color-text); margin-bottom: 6px; }
.modal-bg { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; align-items: flex-end; justify-content: center; }
.modal-bg.open { display: flex; }
.modal { background: var(--color-bg); border-radius: 20px 20px 0 0; padding: 1.25rem 1.25rem 2.5rem; width: 100%; max-width: 780px; height: 90dvh; overflow-y: auto; }
.modal h2 { font-size: 16px; font-weight: 600; margin-bottom: 1rem; }
.field { margin-bottom: 12px; }
.field label { font-size: 12px; color: var(--color-text2); display: block; margin-bottom: 4px; }
.field input, .field select, .field textarea { width: 100%; }
.field textarea { resize: none; height: 80px; line-height: 1.6; }
.field-hint { font-size: 11px; color: var(--color-text3); margin-top: 4px; }
.field-group { background: var(--color-bg2); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 12px; }
.field-group-label { font-size: 11px; font-weight: 500; color: var(--color-text2); margin-bottom: 8px; }
.title-row { display: flex; gap: 8px; }
.title-row input { flex: 1; }
.autofill-btn { flex-shrink: 0; padding: 8px 12px; font-size: 12px; cursor: pointer; white-space: nowrap; }
.modal-actions { display: flex; gap: 8px; margin-top: 1rem; }
.modal-actions button { flex: 1; padding: 11px; border-radius: var(--radius-sm); font-size: 15px; cursor: pointer; font-weight: 500; }
.btn-cancel { background: var(--color-bg2); border: 0.5px solid var(--color-border); color: var(--color-text2); }
.btn-save { background: var(--color-text); border: none; color: var(--color-bg); }
.sync-status { font-size: 11px; color: var(--color-text3); text-align: center; padding: 4px 0 8px; }
</style>
</head>
<body>
<div class="app">
  <div class="header">
    <h1>내 목록</h1>
    <button class="add-btn" id="open-modal-btn"><i class="ti ti-plus"></i></button>
  </div>
  <div class="sync-status" id="sync-status">동기화 중...</div>
  <div class="tab-row" id="tab-row">
    <button class="tab active" data-tab="list">전체 목록</button>
    <button class="tab" data-tab="status">상태별</button>
    <button class="tab" data-tab="diary">캘린더</button>
    <button class="tab" data-tab="creator">작가 · 감독 · 배우</button>
    <button class="tab" data-tab="contest">공모전</button>
    <button class="tab" data-tab="ai">AI 분석</button>
  </div>

  <div id="view-list">
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input type="text" class="search-input" id="list-search" placeholder="제목, 작가, 감독, 배우, 장르 검색" />
      <button class="search-clear" id="list-search-clear"><i class="ti ti-x"></i></button>
    </div>
    <div class="filter-row" id="filter-row">
      <button class="chip active" data-filter="all">전체</button>
      <button class="chip" data-filter="book">📖 책</button>
      <button class="chip" data-filter="movie">🎬 영화</button>
      <button class="chip" data-filter="drama">📺 드라마</button>
    </div>
    <div class="count-row" id="counts"></div>
    <div id="list"></div>
  </div>

  <div id="view-status" style="display:none;">
    <div class="count-row" id="status-counts"></div>
    <div id="status-list"></div>
  </div>

  <div id="view-diary" style="display:none;">
    <div class="cal-nav">
      <button class="cal-nav-btn" id="cal-prev"><i class="ti ti-chevron-left"></i></button>
      <span class="cal-title-txt" id="cal-title"></span>
      <button class="cal-nav-btn" id="cal-next"><i class="ti ti-chevron-right"></i></button>
    </div>
    <div class="cal-legend" id="cal-legend"></div>
    <div class="cal-dow">
      <div class="cal-dow-cell">일</div><div class="cal-dow-cell">월</div><div class="cal-dow-cell">화</div>
      <div class="cal-dow-cell">수</div><div class="cal-dow-cell">목</div><div class="cal-dow-cell">금</div>
      <div class="cal-dow-cell">토</div>
    </div>
    <div class="cal-grid" id="cal-grid"></div>
    <div id="cal-detail-box"></div>
  </div>

  <div id="view-creator" style="display:none;">
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input type="text" class="search-input" id="creator-search" placeholder="이름으로 검색" />
      <button class="search-clear" id="creator-search-clear"><i class="ti ti-x"></i></button>
    </div>
    <div class="creator-tabs" id="creator-tabs">
      <button class="creator-tab active" data-ctab="all">전체</button>
      <button class="creator-tab" data-ctab="author">✍️ 작가</button>
      <button class="creator-tab" data-ctab="director">🎬 감독</button>
      <button class="creator-tab" data-ctab="actor">🌟 배우</button>
    </div>
    <div id="creator-list"></div>
  </div>

  <div id="view-contest" style="display:none;">
    <p class="contest-intro">버튼을 누르면 AI가 현재 진행 중인 공모전을 정리해드려요.</p>
    <div class="contest-btn-row">
      <button class="contest-btn" data-contestbtn="all"><i class="ti ti-trophy"></i> 전국 문학 공모전 전체</button>
      <button class="contest-btn" data-contestbtn="novel"><i class="ti ti-book"></i> 소설 · 단편 공모전</button>
      <button class="contest-btn" data-contestbtn="essay"><i class="ti ti-writing"></i> 수필 · 에세이 공모전</button>
      <button class="contest-btn" data-contestbtn="poem"><i class="ti ti-feather"></i> 시 · 시조 공모전</button>
      <button class="contest-btn" data-contestbtn="youth"><i class="ti ti-school"></i> 청소년 · 어린이 문학대회</button>
    </div>
    <div id="contest-result"></div>
    <div class="contest-notice">
      <div class="contest-notice-title">안내</div>
      정확한 마감일은 각 기관 공식 사이트에서 꼭 확인하세요.
    </div>
  </div>

  <div id="view-ai" style="display:none;">
    <div class="ai-btn-row">
      <button class="ai-btn" data-aibtn="recommend"><i class="ti ti-sparkles"></i> 취향 기반 추천받기</button>
      <button class="ai-btn" data-aibtn="report"><i class="ti ti-user-search"></i> 내 취향 리포트 만들기</button>
      <button class="ai-btn" data-aibtn="now"><i class="ti ti-heartbeat"></i> 요즘 나는 뭘 찾고 있을까</button>
      <button class="ai-btn" data-aibtn="pattern"><i class="ti ti-writing"></i> 내 감상 속 패턴 분석</button>
      <button class="ai-btn" data-aibtn="newbook"><i class="ti ti-bell"></i> 목록 작가 신간 검색</button>
    </div>
    <div id="ai-result-box"></div>
  </div>
</div>

<div class="modal-bg" id="modal-bg">
  <div class="modal">
    <h2 id="modal-title">새 항목 추가</h2>
    <div class="field">
      <label>제목</label>
      <div class="title-row">
        <input type="text" id="inp-title" placeholder="제목을 입력하세요" />
        <button type="button" class="autofill-btn" id="autofill-btn">🔍 자동완성</button>
      </div>
      <div class="field-hint">제목 입력 후 🔍 버튼으로 작가·장르를 자동으로 채울 수 있어요</div>
    </div>
    <div class="field"><label>카테고리</label>
      <select id="inp-cat"><option value="book">📖 책</option><option value="movie">🎬 영화</option><option value="drama">📺 드라마</option></select>
    </div>
    <div class="field"><label>상태</label>
      <select id="inp-status"><option value="want">보고싶다</option><option value="reading">보는중</option><option value="done">다봤다</option></select>
    </div>
    <div class="field"><label>날짜</label><input type="date" id="inp-date" /></div>
    <div class="field" id="field-date-end">
      <label>완료 날짜 <span style="color:var(--color-text3);font-weight:400;">(선택)</span></label>
      <input type="date" id="inp-date-end" />
      <div class="field-hint">책일 때 입력하면 달력에 읽기 기간이 표시돼요</div>
    </div>
    <div class="field-group" id="group-book">
      <div class="field-group-label">📖 책 정보</div>
      <div class="field"><label>작가</label><input type="text" id="inp-author" placeholder="예: 한강" /></div>
      <div class="field"><label>출판사</label><input type="text" id="inp-publisher" placeholder="예: 문학동네" /></div>
      <div class="field" style="margin-bottom:0;"><label>장르</label><div class="genre-picker" id="genre-picker-book"></div></div>
    </div>
    <div class="field-group" id="group-video" style="display:none;">
      <div class="field-group-label">🎬 영상 정보</div>
      <div class="field">
        <label>제목</label>
        <div class="title-row">
          <input type="text" id="inp-video-title-search" placeholder="제목 입력 후 자동완성" style="flex:1;" />
          <button type="button" id="autofill-video-btn" style="flex-shrink:0;padding:8px 12px;font-size:12px;cursor:pointer;white-space:nowrap;">🔍 자동완성</button>
        </div>
      </div>
      <div class="field"><label>감독</label><input type="text" id="inp-director" placeholder="예: 봉준호" /></div>
      <div class="field"><label>출연 배우</label>
        <input type="text" id="inp-actors" placeholder="예: 송강호, 이병헌" />
        <div class="field-hint">쉼표로 구분해서 입력하세요</div>
      </div>
      <div class="field"><label>나라</label><input type="text" id="inp-country" placeholder="예: 한국, 미국" /></div>
      <div class="field"><label>개봉일자</label><input type="date" id="inp-release-date" /></div>
      <div class="field" style="margin-bottom:0;"><label>장르</label><div class="genre-picker" id="genre-picker-video"></div></div>
    </div>
    <div class="field"><label>감상</label>
      <textarea id="inp-review" placeholder="읽고 나서 느낀 점, 기억에 남는 장면 등 자유롭게"></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn-cancel" id="cancel-btn">취소</button>
      <button class="btn-save" id="save-btn">저장</button>
    </div>
  </div>
</div>

<script>
(function() {
  const BOOK_COLORS=['#378ADD','#1D9E75','#7F77DD','#D85A30','#BA7517','#993556'];
  const BOOK_GENRES=['소설','수필','시','자기계발','인문','역사','과학','철학','경제경영','사회','여행','아동','만화','기타'];
  const VIDEO_GENRES=['드라마','로맨스','코미디','스릴러','공포','액션','SF','판타지','미스터리','다큐','애니','범죄','역사','전쟁','가족'];

  let items=[];
  let filter='all',activeTab='list',creatorTab='all',listQ='',creatorQ='';
  let calYear=new Date().getFullYear(),calMonth=new Date().getMonth(),selectedDate=null;
  let selectedGenres=[],editingId=null;

  const catLabel={book:'📖 책',movie:'🎬 영화',drama:'📺 드라마'};
  const catClass={book:'cat-book',movie:'cat-movie',drama:'cat-drama'};
  const dotClass={movie:'dot-movie',drama:'dot-drama'};
  const stLabel={done:'다봤다',reading:'보는중',want:'보고싶다'};
  const stClass={done:'st-done',reading:'st-reading',want:'st-want'};
  const stOrder=['want','reading','done'];
  const stIcon={want:'🔖',reading:'📖',done:'✅'};
  const monthNames=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  function setSyncStatus(msg){document.getElementById('sync-status').textContent=msg;}

  async function apiFetch(method,body){
    const res=await fetch('/api/items',{method,headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
    if(!res.ok)throw new Error(await res.text());
    return res.json();
  }

  async function loadItems(){
    try{
      setSyncStatus('동기화 중...');
      const data=await apiFetch('GET');
      items=data.map(normalizeItem);
      setSyncStatus('✓ 동기화 완료');
      render();
    }catch(e){
      setSyncStatus('⚠ 서버 연결 실패');
      items=[];
      render();
    }
  }

  function normalizeItem(d){
    return{
      id:d.id,title:d.title||'',cat:d.cat||'book',status:d.status||'want',
      author:d.author||'',publisher:d.publisher||'',director:d.director||'',country:d.country||'',releaseDate:d.release_date||d.releaseDate||'',
      actors:Array.isArray(d.actors)?d.actors:(d.actors?JSON.parse(d.actors):[]),
      genres:Array.isArray(d.genres)?d.genres:(d.genres?JSON.parse(d.genres):[]),
      date:d.date||'',dateEnd:d.date_end||d.dateEnd||'',review:d.review||'',
    };
  }

  function fmtDate(d){if(!d)return'';const[y,m,day]=d.split('-');return\`\${y}.\${m}.\${day}\`;}
  function dateStr(y,m,d){return\`\${y}-\${String(m+1).padStart(2,'0')}-\${String(d).padStart(2,'0')}\`;}
  function getCreatorDisplay(i){return[i.author,i.publisher,i.director,...(i.actors||[])].filter(Boolean).join(', ');}
  function highlight(text,q){if(!q)return text;const idx=text.toLowerCase().indexOf(q.toLowerCase());if(idx<0)return text;return text.slice(0,idx)+\`<mark>\${text.slice(idx,idx+q.length)}</mark>\`+text.slice(idx+q.length);}
  function isBookCat(cat){return cat==='book';}
  function getBookColor(id){const books=items.filter(i=>i.cat==='book'&&(i.date||i.dateEnd));const idx=books.findIndex(i=>i.id===id);return BOOK_COLORS[idx%BOOK_COLORS.length];}
  function buildListText(src){return(src||items).map(i=>\`- \${i.title} (\${catLabel[i.cat]}, \${stLabel[i.status]}\${i.author?', 작가:'+i.author:''}\${i.director?', 감독:'+i.director:''}\${i.actors&&i.actors.length?', 출연:'+i.actors.join('·'):''}\${i.genres&&i.genres.length?', 장르:'+i.genres.join('·'):''}\${i.date?', '+fmtDate(i.date):''}\${i.review?'\\n  감상: '+i.review:''})\`).join('\\n');}
  function matchesQ(i,q){if(!q)return true;const lq=q.toLowerCase();return i.title.toLowerCase().includes(lq)||(i.author||'').toLowerCase().includes(lq)||(i.director||'').toLowerCase().includes(lq)||(i.actors||[]).some(a=>a.toLowerCase().includes(lq))||(i.genres||[]).some(g=>g.toLowerCase().includes(lq));}

  function cardHTML(item,hideStatus,q){
    const creator=getCreatorDisplay(item);
    const genres=item.genres||[];
    const tagCls=isBookCat(item.cat)?'genre-tag-book':'genre-tag-video';
    return\`<div class="card"><div class="card-top">
      <div class="cat-badge \${catClass[item.cat]}">\${catLabel[item.cat]}</div>
      <div class="card-body">
        <div class="card-title">\${q?highlight(item.title,q):item.title}</div>
        <div class="card-sub">
          \${creator?\`<span>\${creator}</span>\`:''}
          \${creator&&item.date?\`<span>·</span>\`:''}
          \${item.date?\`<span>\${fmtDate(item.date)}\${item.dateEnd?' ~ '+fmtDate(item.dateEnd):''}</span>\`:''}          \${!isBookCat(item.cat)&&item.country?\`<span>· \${item.country}</span>\`:''}          \${!isBookCat(item.cat)&&item.releaseDate?\`<span>· 개봉 \${fmtDate(item.releaseDate)}</span>\`:''}
        </div>
        \${genres.length?\`<div class="card-genres">\${genres.map(g=>\`<span class="genre-tag \${tagCls}">\${g}</span>\`).join('')}</div>\`:''}
      </div>
      <div class="card-right">
        \${!hideStatus?\`<span class="status-badge \${stClass[item.status]}">\${stLabel[item.status]}</span>\`:''}
        <div class="card-actions">
          <button class="edit-btn" data-edit="\${item.id}"><i class="ti ti-pencil"></i></button>
          <button class="delete-btn" data-id="\${item.id}"><i class="ti ti-trash"></i></button>
        </div>
      </div>
    </div>\${item.review?\`<div class="card-review">\${item.review}</div>\`:''}</div>\`;
  }

  function render(){
    const q=listQ.trim();
    let filtered=filter==='all'?items:items.filter(i=>i.cat===filter);
    if(q)filtered=filtered.filter(i=>matchesQ(i,q));
    if(q){
      document.getElementById('counts').innerHTML='';
      document.getElementById('list').innerHTML=!filtered.length?\`<div class="empty">"\${q}" 검색 결과가 없어요</div>\`:\`<div class="search-result-count">\${filtered.length}건 검색됨</div>\`+filtered.map(i=>cardHTML(i,false,q)).join('');
    }else{
      document.getElementById('counts').innerHTML=\`
        <div class="count-box"><div class="count-label">전체</div><div class="count-num">\${items.length}</div></div>
        <div class="count-box"><div class="count-label">📖 책</div><div class="count-num">\${items.filter(i=>i.cat==='book').length}</div></div>
        <div class="count-box"><div class="count-label">🎬 영화</div><div class="count-num">\${items.filter(i=>i.cat==='movie').length}</div></div>
        <div class="count-box"><div class="count-label">📺 드라마</div><div class="count-num">\${items.filter(i=>i.cat==='drama').length}</div></div>\`;
      document.getElementById('list').innerHTML=!filtered.length?'<div class="empty">항목이 없어요<br>+ 버튼으로 추가해보세요</div>':filtered.map(i=>cardHTML(i,false,'')).join('');
    }
    document.getElementById('list-search-clear').style.display=q?'block':'none';
  }

  function renderStatus(){
    const activeStatus=window._activeStatus||null;
    document.getElementById('status-counts').innerHTML=stOrder.map(st=>\`
      <div class="count-box" data-status-filter="\${st}" style="cursor:pointer;\${activeStatus===st?'outline:2px solid var(--color-border2);':''}" >
        <div class="count-label">\${stIcon[st]} \${stLabel[st]}</div>
        <div class="count-num">\${items.filter(i=>i.status===st).length}</div>
      </div>\`).join('');
    const filtered=activeStatus?stOrder.filter(s=>s===activeStatus):stOrder;
    document.getElementById('status-list').innerHTML=filtered.map(st=>{
      const group=items.filter(i=>i.status===st);if(!group.length)return'';
      return\`<div class="status-section"><div class="status-section-header"><span>\${stIcon[st]}</span><span class="status-section-title">\${stLabel[st]}</span><span class="status-section-count">\${group.length}편</span></div>\${group.map(i=>cardHTML(i,true,'')).join('')}</div>\`;
    }).join('');
  }

  function renderCreator(){
    const q=creatorQ.trim().toLowerCase();
    const grouped={};
    items.forEach(i=>{
      const roles=[];
      if(creatorTab==='all'||creatorTab==='author'){if(i.author)roles.push({name:i.author,role:'작가',item:i});}
      if(creatorTab==='all'||creatorTab==='director'){if(i.director)roles.push({name:i.director,role:'감독',item:i});}
      if(creatorTab==='all'||creatorTab==='actor'){(i.actors||[]).forEach(a=>roles.push({name:a,role:'배우',item:i}));}
      roles.forEach(({name,role,item})=>{if(q&&!name.toLowerCase().includes(q))return;if(!grouped[name])grouped[name]={role,works:[]};grouped[name].works.push(item);});
    });
    const roleIcon={작가:'✍️',감독:'🎬',배우:'🌟'};
    const entries=Object.entries(grouped).sort((a,b)=>b[1].works.length-a[1].works.length);
    if(!entries.length){document.getElementById('creator-list').innerHTML=\`<div class="no-result">\${q?\`"\${q}" 검색 결과가 없어요\`:'정보가 없어요<br><br>항목 추가 시 작가·감독·배우를<br>입력하면 여기서 볼 수 있어요'}</div>\`;return;}
    document.getElementById('creator-list').innerHTML=entries.map(([name,{role,works}])=>\`
      <div class="creator-group"><div class="creator-name"><span>\${roleIcon[role]||''}</span>\${name}<span class="creator-name-count">\${works.length}편</span></div>
      \${works.map(w=>\`<div class="creator-card"><div class="creator-card-top">
        <div class="cat-badge \${catClass[w.cat]}">\${catLabel[w.cat]}</div>
        <div class="creator-card-title">\${w.title}</div>
        <span class="status-badge \${stClass[w.status]}">\${stLabel[w.status]}</span>
      </div>\${w.review?\`<div class="creator-card-review">\${w.review}</div>\`:''}</div>\`).join('')}
      </div>\`).join('');
    document.getElementById('creator-search-clear').style.display=q?'block':'none';
  }

  function renderCalendar(){
    document.getElementById('cal-title').textContent=\`\${calYear}년 \${monthNames[calMonth]}\`;
    const todayStr=new Date().toISOString().split('T')[0];
    const firstDay=new Date(calYear,calMonth,1).getDay();
    const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
    const prevDays=new Date(calYear,calMonth,0).getDate();
    const booksThisMonth=items.filter(i=>i.cat==='book'&&i.date);
    const dotMap={};
    items.forEach(i=>{if(!i.date||i.cat==='book')return;const[y,m,d]=i.date.split('-').map(Number);if(y===calYear&&m-1===calMonth){if(!dotMap[d])dotMap[d]=[];dotMap[d].push(i);}});
    function getBars(ds){const bars=[];booksThisMonth.forEach(b=>{const end=b.dateEnd||(b.status==='reading'?todayStr:b.date);if(ds>=b.date&&ds<=end)bars.push({color:getBookColor(b.id),isStart:ds===b.date,isEnd:ds===end,solo:ds===b.date&&ds===end});});return bars;}
    let cells='';
    for(let i=0;i<firstDay;i++)cells+=\`<div class="cal-cell other-month"><div class="cal-num">\${prevDays-firstDay+1+i}</div></div>\`;
    for(let d=1;d<=daysInMonth;d++){
      const dow=(firstDay+d-1)%7,ds=dateStr(calYear,calMonth,d),isToday=ds===todayStr;
      const dots=dotMap[d]||[],bars=getBars(ds),hasClick=dots.length>0||bars.length>0;
      const stripes=bars.map(b=>\`<div class="tl-stripe-bar \${b.solo?'tl-solo':b.isStart?'tl-start':b.isEnd?'tl-end':''}" style="background:\${b.color};opacity:0.55;"></div>\`).join('');
      cells+=\`<div class="cal-cell \${hasClick?'clickable':''} \${isToday?'today':''} \${dow===0?'sun':dow===6?'sat':''}" data-date="\${ds}">
        <div class="cal-num">\${d}</div>
        \${dots.length?\`<div class="cal-dot-row">\${dots.map(i=>\`<div class="cal-dot \${dotClass[i.cat]}"></div>\`).join('')}</div>\`:''}
        \${stripes?\`<div class="tl-stripe">\${stripes}</div>\`:''}
      </div>\`;
    }
    const rem=7-((firstDay+daysInMonth)%7);if(rem<7)for(let i=1;i<=rem;i++)cells+=\`<div class="cal-cell other-month"><div class="cal-num">\${i}</div></div>\`;
    document.getElementById('cal-grid').innerHTML=cells;
    const mStart=dateStr(calYear,calMonth,1),mEnd=dateStr(calYear,calMonth,daysInMonth);
    const bv=booksThisMonth.filter(b=>{const end=b.dateEnd||(b.status==='reading'?todayStr:b.date);return b.date<=mEnd&&end>=mStart;});
    document.getElementById('cal-legend').innerHTML=bv.map(b=>\`<div class="cal-legend-item"><div class="cal-legend-bar" style="background:\${getBookColor(b.id)};"></div>\${b.title}</div>\`).join('')+'<div class="cal-legend-item"><div class="cal-dot dot-movie" style="width:10px;height:10px;border-radius:2px;"></div>영화/드라마</div>';
    renderCalDetail();
  }

  function renderCalDetail(){
    const box=document.getElementById('cal-detail-box');if(!selectedDate){box.innerHTML='';return;}
    const todayStr=new Date().toISOString().split('T')[0];
    const point=items.filter(i=>i.date===selectedDate);
    const span=items.filter(i=>i.cat==='book'&&i.date&&selectedDate>i.date&&selectedDate<=(i.dateEnd||(i.status==='reading'?todayStr:i.date)));
    const all=[...new Map([...point,...span].map(i=>[i.id,i])).values()];
    if(!all.length){box.innerHTML='';return;}
    const[y,m,d]=selectedDate.split('-');
    box.innerHTML=\`<div class="cal-detail"><div class="cal-detail-date">\${y}년 \${parseInt(m)}월 \${parseInt(d)}일</div>
      \${all.map(i=>\`<div class="cal-detail-item">
        <div class="cat-badge \${catClass[i.cat]}">\${catLabel[i.cat]}</div>
        <div class="cal-detail-body"><div class="cal-detail-title">\${i.title}</div>
        <div class="cal-detail-meta">\${[getCreatorDisplay(i),stLabel[i.status]].filter(Boolean).join(' · ')}</div>
        \${i.review?\`<div class="cal-detail-review">\${i.review}</div>\`:''}
        </div><button class="delete-btn" data-id="\${i.id}"><i class="ti ti-trash"></i></button>
      </div>\`).join('')}</div>\`;
  }

  function renderGenrePicker(cat){
    const genres=isBookCat(cat)?BOOK_GENRES:VIDEO_GENRES;
    const selCls=isBookCat(cat)?'selected-book':'selected-video';
    const pickerId=isBookCat(cat)?'genre-picker-book':'genre-picker-video';
    document.getElementById(pickerId).innerHTML=genres.map(g=>\`<button class="genre-pill \${selectedGenres.includes(g)?selCls:''}" data-genre="\${g}">\${g}</button>\`).join('');
  }

  async function callAI(prompt,resultBoxId,label,useWebSearch=false){
    const box=document.getElementById(resultBoxId);
    box.innerHTML=\`<div class="ai-result"><div class="ai-result-label">\${label}</div><div class="loading-dots"><span></span><span></span><span></span></div></div>\`;
    try{
      const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,useWebSearch})});
      if(!res.ok)throw new Error(await res.text());
      const text=await res.text();
      if(!text||text.trim()==='')throw new Error('응답이 비어있어요');
      const data=JSON.parse(text);
      box.innerHTML=\`<div class="ai-result"><div class="ai-result-label">\${label}</div>\${data.result}</div>\`;
    }catch(e){box.innerHTML=\`<div class="ai-result" style="color:var(--color-text2);">오류: \${e.message}</div>\`;}
  }

  async function handleAiBtn(type){
    const lt=buildListText();const ri=items.filter(i=>i.review&&i.review.trim());
    if(type==='recommend')callAI(\`내 독서/영화/드라마 목록이야:\\n\${lt}\\n\\n취향 분석해서 책 3개, 영화 또는 드라마 3개 추천해줘. 각 항목마다 제목, 장르, 추천 이유를 간결하게.\`,'ai-result-box','✨ 취향 기반 추천');
    else if(type==='report')callAI(\`내 독서/영화/드라마 목록이야:\\n\${lt}\\n\\n취향 리포트를 써줘. 주제, 분위기, 인물 유형, 감정. 나라는 사람에 대한 통찰이 담긴 글로.\`,'ai-result-box','📊 내 취향 리포트');
    else if(type==='now'){const r=[...items].sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,4);callAI(\`최근 기록:\\n\${buildListText(r)}\\n\\n전체:\\n\${lt}\\n\\n요즘 내가 무엇을 찾고 있는지 조용하고 따뜻한 시선으로 읽어줘.\`,'ai-result-box','💭 요즘 나는');}
    else if(type==='pattern'){if(!ri.length){document.getElementById('ai-result-box').innerHTML='<div class="ai-result">아직 감상을 적은 항목이 없어요.</div>';return;}callAI(\`감상들:\\n\${ri.map(i=>\`- \${i.title}: "\${i.review}"\`).join('\\n')}\\n\\n패턴 분석해줘. 담담하고 문학적인 문체로.\`,'ai-result-box','🔍 감상 패턴 분석');}
    else if(type==='newbook'){
      const authors=[...new Set(items.filter(i=>i.cat==='book'&&i.author).map(i=>i.author))];
      if(!authors.length){document.getElementById('ai-result-box').innerHTML='<div class="ai-result">목록에 작가 정보가 없어요.</div>';return;}
      const box=document.getElementById('ai-result-box');
      box.innerHTML=\`<div class="ai-result"><div class="ai-result-label">📚 목록 작가 신간 검색</div><div class="loading-dots"><span></span><span></span><span></span></div></div>\`;
      try{
        const res=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:'newbooks',authors})});
        const data=await res.json();
        const books=data.books||[];
        if(!books.length){box.innerHTML='<div class="ai-result">최근 신간 정보를 찾지 못했어요.</div>';return;}
        const today=new Date();
        const oneYearAgo=new Date();oneYearAgo.setFullYear(today.getFullYear()-1);
        const fmt=(d)=>{if(!d||d.length<8)return d;return\`\${d.slice(0,4)}.\${d.slice(4,6)}.\${d.slice(6,8)}\`;};
        const rows=books.map((b,idx)=>\`<div style="padding:10px 0;border-bottom:0.5px solid var(--color-border);display:flex;align-items:flex-start;gap:10px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:500;">\${b.title}</div>
            <div style="font-size:12px;color:var(--color-text2);margin-top:3px;">\${b.author} · \${b.publisher} · \${fmt(b.pubdate)}</div>
            \${b.description?\`<div style="font-size:12px;color:var(--color-text2);margin-top:4px;line-height:1.5;">\${b.description}</div>\`:''}
          </div>
          <button data-newbook-add="\${idx}" data-title="\${(b.title||'').replace(/"/g,'&quot;')}" data-author="\${(b.author||'').replace(/"/g,'&quot;')}" data-publisher="\${(b.publisher||'').replace(/"/g,'&quot;')}" style="flex-shrink:0;padding:4px 10px;font-size:11px;border-radius:999px;background:var(--color-bg2);border:0.5px solid var(--color-border);cursor:pointer;white-space:nowrap;">+ 추가</button>
        </div>\`).join('');
        box.innerHTML=\`<div class="ai-result"><div class="ai-result-label">📚 목록 작가 신간 (최신순)</div>\${rows}</div>\`;
      }catch(e){box.innerHTML=\`<div class="ai-result" style="color:var(--color-text2);">오류: \${e.message}</div>\`;}
    }
  }

  function handleContestBtn(type){
    const today=new Date().toLocaleDateString('ko-KR',{year:'numeric',month:'long',day:'numeric'});
    const labels={all:'🏆 전국 문학 공모전',novel:'📖 소설 · 단편 공모전',essay:'✍️ 수필 · 에세이 공모전',poem:'🪶 시 · 시조 공모전',youth:'🏫 청소년 · 어린이 문학대회'};
    const prompts={
      all:\`오늘(\${today}) 기준 현재 접수 중인 전국 문학 공모전을 정리해줘.\`,
      novel:\`오늘(\${today}) 기준 현재 접수 중인 소설·단편 공모전을 정리해줘.\`,
      essay:\`오늘(\${today}) 기준 현재 접수 중인 수필·에세이 공모전을 정리해줘.\`,
      poem:\`오늘(\${today}) 기준 현재 접수 중인 시·시조 공모전을 정리해줘.\`,
      youth:\`오늘(\${today}) 기준 현재 접수 중인 청소년·어린이 문학대회를 정리해줘.\`,
    };
    callAI(prompts[type],'contest-result',labels[type],true);
  }

  function switchTab(tab){
    activeTab=tab;
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
    ['list','status','diary','creator','contest','ai'].forEach(v=>{document.getElementById('view-'+v).style.display=v===tab?'':'none';});
    if(tab==='creator')renderCreator();
    if(tab==='status'){window._activeStatus=null;renderStatus();}
    if(tab==='diary')renderCalendar();
  }

  function updateModalFields(){
    const cat=document.getElementById('inp-cat').value;
    document.getElementById('group-book').style.display=isBookCat(cat)?'':'none';
    document.getElementById('group-video').style.display=!isBookCat(cat)?'':'none';
    document.getElementById('field-date-end').style.display=isBookCat(cat)?'':'none';
    renderGenrePicker(cat);
  }

  function openModal(){
    editingId=null;
    document.getElementById('modal-title').textContent='새 항목 추가';
    ['inp-title','inp-review','inp-date-end','inp-author','inp-publisher','inp-director','inp-actors','inp-country','inp-release-date','inp-video-title-search'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('inp-cat').value='book';
    document.getElementById('inp-status').value='want';
    document.getElementById('inp-date').value=new Date().toISOString().split('T')[0];
    selectedGenres=[];
    updateModalFields();
    document.getElementById('modal-bg').classList.add('open');
    document.getElementById('inp-title').focus();
  }

  function openEditModal(id){
    const item=items.find(i=>i.id===id);if(!item)return;
    editingId=id;
    document.getElementById('modal-title').textContent='항목 수정';
    document.getElementById('inp-title').value=item.title;
    document.getElementById('inp-cat').value=item.cat;
    document.getElementById('inp-status').value=item.status;
    document.getElementById('inp-date').value=item.date||'';
    document.getElementById('inp-date-end').value=item.dateEnd||'';
    document.getElementById('inp-author').value=item.author||'';
    document.getElementById('inp-publisher').value=item.publisher||'';
    document.getElementById('inp-director').value=item.director||'';
    document.getElementById('inp-country').value=item.country||'';
    document.getElementById('inp-release-date').value=item.releaseDate||'';
    document.getElementById('inp-video-title-search').value='';

    document.getElementById('inp-actors').value=(item.actors||[]).join(', ');
    document.getElementById('inp-review').value=item.review||'';
    selectedGenres=[...(item.genres||[])];
    updateModalFields();
    document.getElementById('modal-bg').classList.add('open');
    document.getElementById('inp-title').focus();
  }

  function closeModal(){document.getElementById('modal-bg').classList.remove('open');}

  async function saveItem(){
    const title=document.getElementById('inp-title').value.trim();if(!title){document.getElementById('inp-title').focus();return;}
    const cat=document.getElementById('inp-cat').value;
    const actors=document.getElementById('inp-actors').value.split(',').map(a=>a.trim()).filter(Boolean);
    const data={
      title,cat,status:document.getElementById('inp-status').value,
      author:isBookCat(cat)?document.getElementById('inp-author').value.trim():'',
      publisher:isBookCat(cat)?document.getElementById('inp-publisher').value.trim():'',
      director:!isBookCat(cat)?document.getElementById('inp-director').value.trim():'',
      country:!isBookCat(cat)?document.getElementById('inp-country').value.trim():'',
      release_date:!isBookCat(cat)?document.getElementById('inp-release-date').value:'',
      actors:!isBookCat(cat)?actors:[],
      genres:[...selectedGenres],
      date:document.getElementById('inp-date').value,
      date_end:isBookCat(cat)?document.getElementById('inp-date-end').value:'',
      review:document.getElementById('inp-review').value.trim(),
    };
    const savedEditingId=editingId;
    closeModal();
    editingId=null;
    try{
      if(savedEditingId){
        setSyncStatus('저장 중...');
        const updated=await apiFetch('PUT',{id:savedEditingId,...data});
        const idx=items.findIndex(i=>i.id===savedEditingId);
        if(idx>-1)items[idx]=normalizeItem(updated);
      }else{
        setSyncStatus('저장 중...');
        const created=await apiFetch('POST',data);
        items.unshift(normalizeItem(created));
      }
      setSyncStatus('✓ 저장 완료');
    }catch(e){setSyncStatus('⚠ 저장 실패: '+e.message);}
    render();
    if(activeTab==='status')renderStatus();
    if(activeTab==='creator')renderCreator();
    if(activeTab==='diary')renderCalendar();
  }

  async function deleteItem(id){
    items=items.filter(i=>i.id!==id);render();
    if(activeTab==='status')renderStatus();
    if(activeTab==='creator')renderCreator();
    if(activeTab==='diary')renderCalendar();
    try{
      setSyncStatus('삭제 중...');
      await apiFetch('DELETE',{id});
      setSyncStatus('✓ 삭제 완료');
    }catch(e){setSyncStatus('⚠ 삭제 실패: '+e.message);}
  }

  document.getElementById('open-modal-btn').addEventListener('click',openModal);
  document.getElementById('cancel-btn').addEventListener('click',closeModal);
  document.getElementById('save-btn').addEventListener('click',saveItem);
  // 바깥 클릭으로 닫히지 않음
  document.getElementById('inp-cat').addEventListener('change',updateModalFields);

  document.getElementById('autofill-video-btn').addEventListener('click',async function(){
    const title=document.getElementById('inp-video-title-search').value.trim();
    const cat=document.getElementById('inp-cat').value;
    if(!title){document.getElementById('inp-video-title-search').focus();return;}
    this.textContent='검색 중...';this.disabled=true;
    try{
      const res=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,cat})});
      const data=await res.json();
      if(data.director)document.getElementById('inp-director').value=data.director;
      if(data.actors&&data.actors.length)document.getElementById('inp-actors').value=data.actors.join(', ');
      if(data.country)document.getElementById('inp-country').value=data.country;
      if(data.release_date)document.getElementById('inp-release-date').value=data.release_date;
      if(data.genres&&data.genres.length){selectedGenres=data.genres;renderGenrePicker(cat);}
    }catch(e){alert('자동완성 실패: '+e.message);}
    this.textContent='🔍 자동완성';this.disabled=false;
  });

  document.getElementById('autofill-btn').addEventListener('click',async function(){
    const title=document.getElementById('inp-title').value.trim();
    const cat=document.getElementById('inp-cat').value;
    if(!title){document.getElementById('inp-title').focus();return;}
    this.textContent='검색 중...';this.disabled=true;
    try{
      const res=await fetch('/api/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,cat})});
      const data=await res.json();
      if(isBookCat(cat)){
        if(data.author)document.getElementById('inp-author').value=data.author;
        if(data.publisher)document.getElementById('inp-publisher').value=data.publisher;
        if(data.genres&&data.genres.length){selectedGenres=data.genres;renderGenrePicker(cat);}
      }else{
        if(data.director)document.getElementById('inp-director').value=data.director;
        if(data.actors&&data.actors.length)document.getElementById('inp-actors').value=data.actors.join(', ');
        if(data.genres&&data.genres.length){selectedGenres=data.genres;renderGenrePicker(cat);}
      }
    }catch(e){alert('자동완성 실패: '+e.message);}
    this.textContent='🔍 자동완성';this.disabled=false;
  });

  document.getElementById('tab-row').addEventListener('click',function(e){const t=e.target.closest('.tab');if(t)switchTab(t.dataset.tab);});
  document.getElementById('filter-row').addEventListener('click',function(e){const c=e.target.closest('.chip');if(!c)return;filter=c.dataset.filter;document.querySelectorAll('#filter-row .chip').forEach(x=>x.classList.remove('active'));c.classList.add('active');render();});
  document.getElementById('list-search').addEventListener('input',function(){listQ=this.value;render();});
  document.getElementById('list-search-clear').addEventListener('click',function(){listQ='';document.getElementById('list-search').value='';this.style.display='none';render();});
  document.getElementById('creator-search').addEventListener('input',function(){creatorQ=this.value;renderCreator();});
  document.getElementById('creator-search-clear').addEventListener('click',function(){creatorQ='';document.getElementById('creator-search').value='';this.style.display='none';renderCreator();});
  document.getElementById('creator-tabs').addEventListener('click',function(e){const t=e.target.closest('.creator-tab');if(!t)return;creatorTab=t.dataset.ctab;document.querySelectorAll('.creator-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');renderCreator();});
  document.getElementById('genre-picker-book').addEventListener('click',function(e){const btn=e.target.closest('.genre-pill');if(!btn)return;const g=btn.dataset.genre;selectedGenres=selectedGenres.includes(g)?selectedGenres.filter(x=>x!==g):[...selectedGenres,g];renderGenrePicker('book');});
  document.getElementById('genre-picker-video').addEventListener('click',function(e){const btn=e.target.closest('.genre-pill');if(!btn)return;const g=btn.dataset.genre;selectedGenres=selectedGenres.includes(g)?selectedGenres.filter(x=>x!==g):[...selectedGenres,g];renderGenrePicker(document.getElementById('inp-cat').value);});
  document.getElementById('cal-prev').addEventListener('click',function(){calMonth--;if(calMonth<0){calMonth=11;calYear--;}selectedDate=null;renderCalendar();});
  document.getElementById('cal-next').addEventListener('click',function(){calMonth++;if(calMonth>11){calMonth=0;calYear++;}selectedDate=null;renderCalendar();});
  document.getElementById('cal-grid').addEventListener('click',function(e){const cell=e.target.closest('.cal-cell.clickable');if(!cell)return;const d=cell.dataset.date;selectedDate=selectedDate===d?null:d;renderCalDetail();});
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-id]');if(b)deleteItem(parseInt(b.dataset.id));
    const ed=e.target.closest('[data-edit]');if(ed)openEditModal(parseInt(ed.dataset.edit));
    const a=e.target.closest('[data-aibtn]');if(a)handleAiBtn(a.dataset.aibtn);
    const cb=e.target.closest('[data-contestbtn]');if(cb)handleContestBtn(cb.dataset.contestbtn);
    const sf=e.target.closest('[data-status-filter]');
    if(sf&&document.getElementById('view-status').style.display!=='none'){
      const st=sf.dataset.statusFilter;
      window._activeStatus=(window._activeStatus===st)?null:st;
      renderStatus();
    }
    const nb=e.target.closest('[data-newbook-add]');
    if(nb){
      const title=nb.dataset.title;
      const author=nb.dataset.author;
      const publisher=nb.dataset.publisher;
      nb.textContent='✓ 추가됨';
      nb.disabled=true;
      nb.style.color='var(--color-text2)';
      const data={
        title,cat:'book',status:'want',
        author,publisher,director:'',actors:[],genres:[],
        date:new Date().toISOString().split('T')[0],date_end:'',review:''
      };
      fetch('/api/items',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(r=>r.json()).then(d=>{items.unshift(normalizeItem(d));render();})
        .catch(e=>{nb.textContent='+ 추가';nb.disabled=false;});
    }
  });

  loadItems();
})();
</script>
</body>
</html>
`;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.status(200).end(html);
};
