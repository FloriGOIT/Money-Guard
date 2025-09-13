
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // so we can read JSON in req.body

// Simple test route
app.get('/api/hello', (req, res) => {
  res.send('Hello from backend 🚀');
});

app.listen(PORT, () => {
  console.log(`Your server is currently running on http://localhost:${PORT}`);
});
