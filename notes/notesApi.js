/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const $config = require('../config/db.js');
const $sql = require('./notesSql.js');

const pool = mysql.createPool($config.mysql);

module.exports = {
  notesAdd: (req, res, next) => {
    pool.getConnection((err, connection) => {
      connection.query($sql.notesInsert, [req.query.content], (error, result) => {
        if (result) {
          res.json({
            msg: 'success',
            result,
          });
          connection.release();
        }
      });
    });
  },
};
