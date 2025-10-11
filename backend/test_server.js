const express = require('express');
const app = express();
app.get('/api', (req, res) => res.json({message: 'Working!'}));
app.listen(5050, () => console.log('Test server running'));
