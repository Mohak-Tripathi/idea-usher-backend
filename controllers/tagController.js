// tags.controller.js
const Tag = require('../models/tagModel');

exports.createTag = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the tag with the same name already exists
    const existingTag = await Tag.findOne({ name });

    if (existingTag) {
      return res.status(400).json({ error: 'Tag with the same name already exists' });
    }

    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
