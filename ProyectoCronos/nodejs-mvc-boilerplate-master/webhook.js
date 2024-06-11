import express from 'express';
import { exec } from 'child_process';
import crypto from 'crypto';

const app = express();
const port = 4000;

// Secret que configuraste en GitHub ds dead
const SECRET = 'KillAllHumans';

app.use(express.json());

// Middleware para verificar la firma del webhook
function verifyGitHubSignature(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  const hmac = crypto.createHmac('sha256', SECRET);
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

  if (signature !== digest) {
    console.error('Invalid signature.');
    return res.status(403).send('Signature does not match');
  }

  next();
}

app.post('/webhook', verifyGitHubSignature, (req, res) => {
  console.log('Webhook received!');

  exec('cd /home/aypierre225/ProyectoCronos06/CronosProyect1/ProyectoCronos/nodejs-mvc-boilerplate-master && git fetch --all && git reset --hard origin/master && npm install && pm2 restart all', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return res.sendStatus(500);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
