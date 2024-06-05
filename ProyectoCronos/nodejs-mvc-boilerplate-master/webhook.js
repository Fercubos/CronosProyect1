const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 80;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received!');
  const { ref } = req.body;
  if (ref === 'refs/heads/main') {  // Cambia 'main' por tu rama principal si es diferente
    exec('git pull && npm install && pm2 restart all', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return res.sendStatus(500);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});