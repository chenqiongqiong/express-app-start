const express = require('express');
const notesApi = require('../notes/notesApi.js');

const router = express.Router();

const routesArray = ['addNotes', 'notesAll', 'notesDeleteById', 'notesUpdateById'];

routesArray.forEach((route) => {
  router.get(`/${route}`, (req, res) => {
    notesApi[route](req, res);
  });
});

module.exports = router;
