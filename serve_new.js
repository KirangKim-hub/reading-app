const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).end(html);
};
