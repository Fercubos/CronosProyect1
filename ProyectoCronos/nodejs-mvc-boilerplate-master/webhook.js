import express from 'express';
import { exec } from 'child_process';
import pm2 from 'pm2';


const app = express();
const port = 4000;

app.use(express.json());


// pm2.connect(err => {
//   if (err) {
//     console.error(err);
//     process.exit(2);
//   }

//   pm2.restart('all', (err, proc) => {
//     if (err) {
//       throw err;
//     }

//     console.log('Processes restarted!');
//     pm2.disconnect(); // disconnects from PM2
//   });
// });


app.post('/webhook', (req, res) => {
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
