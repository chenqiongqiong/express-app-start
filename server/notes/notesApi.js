/* eslint-disable no-unused-vars */

const mysql = require('mysql');
const $config = require('../config/db.js');
const $sql = require('./notesSql.js');

const pool = mysql.createPool($config.mysql);

module.exports = {
  addNotes: (req, res, next) => {
    pool.getConnection((err, connection) => {
      const { content } = req.query;
      if (!content) {
        return res.json({
          code: 201,
          msg: 'fail, no centent got',
        });
      }
      return connection.query($sql.notesInsert, [req.query.contenT], (error, result) => {
        if (result) {
          res.json({
            code: 200,
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
      const offset = (req.query.pageSize || 15) * (req.query.currentPage - 1);
      const fetchList = new Promise((resolve, reject) => {
        connection.query($sql.notesAll, [offset, Number(req.query.pageSize)], (error, result) => {
          if (result) {
            resolve(result);
          }
        });
      });
      const fetchTotal = new Promise((resolve, reject) => {
        connection.query($sql.notesTotal, [], (error, result) => {
          if (result) {
            resolve(result[0].total);
          }
        });
      });
      Promise.all([fetchList, fetchTotal]).then(([list, total]) => {
        res.json({
          code: 200,
          msg: 'success',
          list,
          total,
        });
        connection.release();
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
