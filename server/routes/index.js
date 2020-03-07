const express = require('express');
const multer = require('multer');

const myMulter = multer();
const router = express.Router();

const notesApi = require('../notes/notesApi.js');

const routesArray = ['addNotes', 'notesAll', 'notesDeleteById', 'notesUpdateById'];

routesArray.forEach((route) => {
  router.all(`/${route}`, myMulter.none(), (req, res) => {
    notesApi[route](req, res);
  });
});

module.exports = router;
