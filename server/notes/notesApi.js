/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const $config = require('../config/db.js');
const $sql = require('./notesSql.js');

const pool = mysql.createPool($config.mysql);

module.exports = {
  addNotes: (req, res, next) => {
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
  notesAll: (req, res, next) => {
    pool.getConnection((err, connection) => {
      connection.query($sql.notesAll, [], (error, result) => {
        if (result) {
          res.json({
            code: 200,
            msg: '获取列表成功',
            result,
          });
          connection.release();
        }
      });
    });
  },
  notesDeleteById: (req, res, next) => {
    pool.getConnection((err, connection) => {
      connection.query($sql.notesDeleteById, [req.query.id], (error, result) => {
        if (result) {
          res.json({
            code: 200,
            msg: '删除成功',
            result,
          });
          connection.release();
        }
      });
    });
  },
  notesUpdateById: (req, res, next) => {
    pool.getConnection((err, connection) => {
      connection.query($sql.notesUpdateById, [req.query.content, req.query.id], (error, result) => {
        if (result) {
          res.json({
            code: 200,
            msg: '更新成功',
            result,
          });
          connection.release();
        }
      });
    });
  },
};
