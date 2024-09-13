const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// 게시글 작성
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({ title, content });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 게시글 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
