 const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getMyPosts,
  searchPosts
} = require("../controllers/postControllers");

const protect = require("../middleware/authMiddlleware");

const router = express.Router();

router.get("/", getPosts);
router.get("/me", protect, getMyPosts);
router.get("/searchpost",protect ,searchPosts)
router.get("/:id", getPost);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
