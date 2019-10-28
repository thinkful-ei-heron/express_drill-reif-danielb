const express = require('express');
const morgan = require('morgan');

// is this cheating?
const { encrypt } = require('caesar-encrypt');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('shit works');
});

//  #1
app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if (!a || !b) {
    return res.status(400).send('Yuh fucked up kid');
  }

  const sum = `${a + b}`;
  res.send(sum);
});

// #2
app.get('/cipher', (req, res) => {
  const text = req.query.text.toString();
  const shift = req.query.shift;

  if (!text || !shift) {
    return res.status(400).send('Yuh fucked up kid');
  }

  const encrypted = encrypt(text, shift);
  res.send(encrypted);
});

app.listen(9001, () => {
  console.log('listening to port 9001');
});
