const express = require('express');
const app = express();
const PORT = 5050;

app.get('/api', (req, res) => {
  res.json({ message: 'API is working!', status: 'OK' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('✅ Simple server running on port', PORT);
  console.log('📍 Test with: curl http://localhost:5050/api');
});
