const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E3)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});


const myMulter = multer({ storage });
const router = express.Router();

const notesApi = require('../notes/notesApi.js');

const routesArray = ['addNotes', 'notesAll', 'notesDeleteById', 'notesUpdateById'];

routesArray.forEach((route) => {
  router.all(`/${route}`, myMulter.none(), (req, res) => {
    notesApi[route](req, res);
  });
});

router.post('/upload', myMulter.single('avatar'), (req, res) => {
  res.json({ msg: 123 });
});

module.exports = router;
