const express = require('express');
const auth = require('../middleware/authMiddleware');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const router = express.Router();

router.use(auth);
router.route('/').get(getNotes).post(createNote);
router.route('/:id').put(updateNote).delete(deleteNote);

module.exports = router;
