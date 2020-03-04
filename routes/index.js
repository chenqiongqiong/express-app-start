const express = require('express');
const notesApi = require('../notes/notesApi.js');

const router = express.Router();

router.get('/notesAdd', (req, res) => {
  notesApi.notesAdd(req, res);
});

module.exports = router;
