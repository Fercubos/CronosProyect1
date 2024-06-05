import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 80;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Webhook received!');
  exec('cd /home/aypierre225/ProyectoCronos05/CronosProyect1/ProyectoCronos/nodejs-mvc-boilerplate-master && git fetch --all && git reset --hard origin/master && npm install && pm2 restart all', (err, stdout, stderr) => {
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
