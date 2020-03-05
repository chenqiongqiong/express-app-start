module.exports = {
  notesInsert: 'INSERT INTO `notes` (`content`) VALUES (?)',
  notesAll: 'SELECT * FROM `notes`',
  notesDeleteById: 'DELETE FROM `notes` WHERE `id` = ?',
  notesUpdateById: 'UPDATE `notes` SET `content` = ?  WHERE `id` = ?',
};
