const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/scripts', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts.html'));
});
app.get('/flags', (req, res) => {
  res.sendFile(path.join(__dirname, 'flags.html'));
});

// Serve data folder
app.use('/data', express.static(path.join(__dirname, 'data')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
