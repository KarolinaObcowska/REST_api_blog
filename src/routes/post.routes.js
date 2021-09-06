import { Router } from 'express';
import { check } from 'express-validator';
import { getPost, getPosts, createPost, updatePost, deletePost, createComment, deleteComment } from '../controllers/post.controllers';
import { protect } from '../middleware/protect';
const router = Router();

router
    .route('/')
    .get(getPosts)
    .post([
        check('content', 'Content is required')
            .not()
            .isEmpty(),
        check( 'title', 'Title is required')
    ], protect, createPost);

router
    .route('/:id')
    .get(protect, getPost)
    .put([
        check('content', 'Content is required')
            .not()
            .isEmpty(),
        check( 'title', 'Title is required')
    ], protect, updatePost)
    .delete(protect, deletePost);

router
    .route('/comment/:id')
    .post([
        check('text', 'Text is required')
            .not()
            .isEmpty()
        ], protect, createComment);

router
    .route('/comment/:id/:commentId')
    .delete(protect, deleteComment);

export default router;