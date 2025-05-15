const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) return res.status(400).json({ msg: 'Title is required' });

  const note = await Note.create({ user: req.user, title, content, tags });
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, content, tags },
    { new: true }
  );
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!note) return res.status(404).json({ msg: 'Note not found' });
  res.json({ msg: 'Note deleted' });
};
