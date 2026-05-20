module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, useWebSearch } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt required' });

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
  };

  const body = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  };

  if (useWebSearch) {
    headers['anthropic-beta'] = 'web-search-2025-03-05';
    body.model = 'claude-sonnet-4-5';
    body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const text = await response.text();
    if (!response.ok) return res.status(200).json({ result: '오류: ' + text });
    const data = JSON.parse(text);
    const result = (data.content || []).filter(c => c.type === 'text').map(c => c.text || '').join('');
    res.status(200).json({ result });
  } catch (err) {
    res.status(200).json({ result: '오류: ' + err.message });
  }
};
