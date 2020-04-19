const app = require('express').Router();
const { Student } = require('./db').models;
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', (req, res, next)=> {
  Student.authenticate(req.body)
    .then( token => res.send({token}))
    .catch(next);
});

app.get('/', isLoggedIn, (req, res, next)=> {
  res.send(req.user);
});
