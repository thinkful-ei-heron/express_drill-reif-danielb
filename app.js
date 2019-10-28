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

// #3
app.get('/lotto', (req, res) => {
  const numbers = req.query.arr;
  let count = 0;
  winningNums = Array(20)
    .fill(1)
    .map((x, i) => i + 1);

  for (let i = winningNums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = winningNums[i];
    winningNums[i] = winningNums[j];
    winningNums[j] = temp;
  }
  let winningSplice = winningNums.splice(0, 6);

  let doStuff = () => {
    console.log(numbers);
    console.log(winningSplice);
    numbers.forEach(num => {
      if (winningSplice.some(item => item === parseInt(num))) {
        count += 1;
        console.log(count);
      }
    });
    return count.toString();
  };

  let didYouWin = () => {
    doStuff();
    switch (count) {
      case 4:
        return 'Congratulations, you win a free ticket';
        break;
      case 5:
        return 'Congratulations! You win $100!';
        break;
      case 6:
        return 'Wow! Unbelievable! You could have won the mega millions!';
        break;
      default:
        return 'Sorry, you lose';
    }
  };

  res.status(200);
  res.send(didYouWin());
});

app.listen(9001, () => {
  console.log('listening to port 9001');
});
