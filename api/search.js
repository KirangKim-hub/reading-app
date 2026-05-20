module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, cat, mode, authors } = req.body;

  try {
    if (mode === 'newbooks') {
      if (!authors || !authors.length) return res.status(200).json({ books: [] });

      const results = [];
      for (const author of authors) {
        const query = encodeURIComponent(author);
        const response = await fetch(`https://openapi.naver.com/v1/search/book.json?query=${query}&display=5&sort=date`, {
          headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
          },
        });
        const text = await response.text();
        let data;
        try { data = JSON.parse(text); } catch(e) { continue; }
        if (data.items && data.items.length > 0) {
          data.items.forEach(book => {
            results.push({
              author,
              title: book.title.replace(/<[^>]+>/g, ''),
              publisher: book.publisher || '',
              pubdate: book.pubdate || '',
              description: book.description ? book.description.replace(/<[^>]+>/g, '').slice(0, 80) : '',
            });
          });
        }
      }
      results.sort((a, b) => (b.pubdate || '').localeCompare(a.pubdate || ''));
      return res.status(200).json({ books: results.slice(0, 20) });
    }

    if (!title) return res.status(400).json({ error: 'title required' });

    if (cat === 'book') {
      const query = encodeURIComponent(title);
      const response = await fetch(`https://openapi.naver.com/v1/search/book.json?query=${query}&display=1`, {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch(e) { return res.status(200).json({}); }
      if (data.items && data.items.length > 0) {
        const book = data.items[0];
        const author = book.author ? book.author.replace(/\^/g, ', ').trim() : '';
        const publisher = book.publisher || '';
        return res.status(200).json({ author, publisher, genres: [] });
      }
      return res.status(200).json({});
    } else {
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
          messages: [{ role: 'user', content: `"${title}"이라는 영화 또는 드라마에 대해 알고 있다면 다음 정보를 JSON으로만 답해줘. 모르면 빈 값으로. {"director":"감독명","actors":["배우1","배우2","배우3"],"genres":["장르1","장르2"],"country":"제작나라","release_date":"YYYY-MM-DD"}` }],
        }),
      });
      const aiData = await response.json();
      const text = (aiData.content || []).map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
      try {
        const parsed = JSON.parse(text);
        return res.status(200).json(parsed);
      } catch(e) {
        return res.status(200).json({});
      }
    }
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
