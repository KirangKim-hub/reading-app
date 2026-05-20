module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, cat } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });

  try {
    if (cat === 'book') {
      // 네이버 책 검색 API
      const query = encodeURIComponent(title);
      const response = await fetch(`https://openapi.naver.com/v1/search/book.json?query=${query}&display=1`, {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      });
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0];
        const author = book.author ? book.author.replace(/\^/g, ', ').trim() : '';
        const publisher = book.publisher || '';
        res.status(200).json({ author, publisher, genres: [] });
      } else {
        res.status(200).json({});
      }
    } else {
      // 영화/드라마는 AI로 폴백
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages: [{ role: 'user', content: `"${title}"이라는 영화 또는 드라마에 대해 알고 있다면 다음 정보를 JSON으로만 답해줘. 모르면 빈 값으로. {"director":"감독명","actors":["배우1","배우2","배우3"],"genres":["장르1","장르2"]}` }],
        }),
      });
      const aiData = await response.json();
      const text = (aiData.content || []).map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      res.status(200).json(parsed);
    }
  } catch (err) {
    res.status(200).json({});
  }
};
