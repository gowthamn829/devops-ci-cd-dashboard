const express = require('express');
const app = express();
const PORT = 6060;  // Different port

app.get('/api', (req, res) => {
  console.log('API endpoint hit!');
  res.json({ message: 'API is working!', status: 'OK' });
});

app.listen(PORT, () => {
  console.log('✅ Test server running on port', PORT);
  console.log('📍 Test with: curl http://localhost:6060/api');
});
