module.exports = {
  notesInsert: 'INSERT INTO `notes` (`content`) VALUES (?)',
  notesAll: 'SELECT * FROM `notes` LIMIT ?, ?',
  notesTotal: 'SELECT COUNT(*) AS `total` FROM `notes`',
  notesDeleteById: 'DELETE FROM `notes` WHERE `id` = ?',
  notesUpdateById: 'UPDATE `notes` SET `content` = ?  WHERE `id` = ?',
};
