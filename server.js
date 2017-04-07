var express = require('express');
var app = express();
var path = require('path');

app.get('/:inp', (req, res) => {
  res.send(req.params.inp);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});