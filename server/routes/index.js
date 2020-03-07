const express = require('express');
const notesApi = require('../notes/notesApi.js');

const router = express.Router();

const routesArray = ['addNotes', 'notesAll', 'notesDeleteById', 'notesUpdateById'];

routesArray.forEach((route) => {
  router.all(`/${route}`, (req, res) => {
    console.log(req.query);
    console.log(req.body);
    notesApi[route](req, res);
  });
});

module.exports = router;
