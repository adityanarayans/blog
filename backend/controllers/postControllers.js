const Post = require("../models/postmodel");
const slugify = require("slugify");

// CREATE
exports.createPost = async (req, res) => {
  const { title, imageURL, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const post = await Post.create({
    title,
    imageURL,
    content,
    slug: slugify(title, { lower: true, strict: true }),
    username: req.user.id,
  });

  res.status(201).json(post);
};

// GET ALL
exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

// GET ONE
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};

// UPDATE
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.username.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not owner" });
  }

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true, strict: true });
  }

  Object.assign(post, req.body);
  await post.save();

  res.json(post);
};

// DELETE
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Not found" });

  if (post.username.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not owner" });
  }

  await post.deleteOne();
  res.status(200).json({ message: "Deleted" });
};

// MY POSTS
exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({ username: req.user.id });
  res.json(posts);
};

exports.searchPosts =  async(req , res) =>{
  try{
        const  {title} =  req.query;
        console.log('Title : ', req);
        if(!title) {
         return  res.status(400).json({message:"title required"})
        }
         const posts = await Post.find({title :{$regex: title, $options :"i"}})

         if(posts.length === 0){
          return res.status(404).json({message:"no article found"})
         }
         res.status(200).json(posts)


  }catch(error){
        console.log('Title : ', error.message);
        res.status(500).json({message:error.message})
  }
  
}