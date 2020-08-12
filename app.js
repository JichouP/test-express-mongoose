const http = require('http');
const express = require('express');
const User = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/user', User.findList);
app.get('/user/:id', User.find);
app.post('/user', User.create);

app.use('/', (req, res, next) => {
  res.status(404).send('Not Found');
  next();
});
app.use((err, req, res, next) => {
  res.status(500);
  res.json({ message: err.message });
});

http.createServer(app).listen(3000, () => {
  console.log('listening at 3000');
});
