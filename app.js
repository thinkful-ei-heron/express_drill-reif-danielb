const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('shit works');
});

app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if (!a || !b) {
    return res.status(400).send('Yuh fucked up kid');
  }

  const sum = `${a + b}`;
  res.send(sum);
});

app.listen(9001, () => {
  console.log('listening to port 9001');
});
