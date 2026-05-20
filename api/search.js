module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, cat } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });

  const prompt = cat === 'book'
    ? `"${title}"이라는 책에 대해 알고 있다면 다음 정보를 JSON으로만 답해줘. 모르면 빈 값으로. {"author":"작가명","publisher":"출판사","genres":["장르1","장르2"]}`
    : `"${title}"이라는 영화 또는 드라마에 대해 알고 있다면 다음 정보를 JSON으로만 답해줘. 모르면 빈 값으로. {"director":"감독명","actors":["배우1","배우2","배우3"],"genres":["장르1","장르2"]}`;

  try {
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
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    const text = (data.content || []).map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(text);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(200).json({});
  }
};
