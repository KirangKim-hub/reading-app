module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, cat, mode, authors } = req.body;

  try {
    // 신간 검색 모드
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
        const data = await response.json();
        if (!response.ok) return res.status(200).json({ error: JSON.stringify(data) });
        if (data.items && data.items.length > 0) {
          data.items.forEach(book => {
            results.push({
              author,
              title: book.title.replace(/<[^>]+>/g, ''),
              publisher: book.publisher || '',
