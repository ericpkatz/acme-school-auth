const express = require('express');
const path = require('path');
const app = express();
const { Student } = require('./db').models;

app.use(express.json());

module.exports = app;

app.use((req, res, next)=> {
  if(!req.headers.authorization){
    return next();
  }
  Student.findFromToken(req.headers.authorization)
    .then( user => {
      req.user = user;
      next();
    })
    .catch(next);
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/api', require('./api'));

app.use((err, req, res, next)=> {
  res.status(err.status || 500).send({ error: err.message });
});
