const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');

const tests = require('../routes/tests');
const comments = require('../routes/comments');
const chapters = require('../routes/chapters');

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  app.use('/api/tests', tests);
  app.use('/api/comments', comments);
  app.use('/api/chapters', chapters);

  app.use(error);
}