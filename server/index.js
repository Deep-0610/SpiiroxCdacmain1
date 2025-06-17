const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // So React (port 5173) can talk to it
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Spirox backend!');
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
