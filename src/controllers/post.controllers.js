import { validationResult } from "express-validator";
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

export const createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    try {
      const title = req.body.title;
      const content = req.body.content;
      let post = new Post({
        title: title,
        content: content,
        user: req.userId
      });

      await post.save();
      const user = await User.findById(req.userId);
      user.posts.push(post);
      await user.save();
      res.status(201).json({ msg: 'Post created successfully!', post: post });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
}

export const getPost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  try {
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ msg: 'Post fetched.', post: post });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    .populate('user')
    .sort({ createdAt: -1 });

    res.status(200).json({ msg: 'Fetched posts', posts: posts })
  } catch (err) {
    if (!err.statusCode){
      err.statusCode = 500;
    }
    next(err)
  }

}

export const updatePost = async (req,res, next) => {
  const postId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;

  try {
  const post = await Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.user._id.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
     
      post.title = title;
      post.content = content;
      const result = await post.save();
      res.status(200).json({ msg: 'Post updated!', post: result });
  } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    };
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    const error = new Error('Could not find post.');
    error.statusCode = 404;
    throw error;
  }
  if (post.user.toString() !== req.userId) {
    const error = new Error('Not authorized');
    error.statusCode = 403;
    throw error;
  }
  try {
    await Post.findByIdAndRemove(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    res.status(200).json({ msg: 'Deleted post' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}