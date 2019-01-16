import express from 'express';
import mongoose from 'mongoose';

import checkCreateEditPost from '../../../validate/createEditPost';
import checkComment from '../../../validate/checkComment';
import { authorizedOnly, notAuthorizedOnly } from '../../../config/passport';
import { runInNewContext } from 'vm';


const router = express.Router();
const User = mongoose.model('User');
const Post = mongoose.model('Post');

router.post('/createPost', authorizedOnly, (req, res) => {
    let errors;
    errors = checkCreateEditPost(req.body);
    if (errors) {
        return res.status(200).json({ type: 'errors checking', payload: { errors } });
    }
    new Post({
        title: req.body.title,
        user: req.user.id,
        text: req.body.text
    }).save()
        .then(post => {
            if (!post) {
                return res.status(200).json({ type: 'server failure', payload: {} });
            }
            return res.status(200).json({ type: 'post success', payload: { id: post.id } });
        })
        .catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        });
});

router.post('/getPostById', (req, res) => {
    Post.findById(req.body.id)
        .populate('user')
        .populate('comments.user')
        .sort({ date: -1 })
        .then(post => {
            if (!post) {
                return res.status(200).json({ type: 'not found', payload: {} });
            }
            return res.status(200).json({ type: 'post found', payload: post });

        }).catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        })
});



router.post('/removeCreateEdit', authorizedOnly, (req, res) => {

});

router.post('/addComment', authorizedOnly, (req, res) => {
    let errors;
    errors = checkComment(req.body);
    if (errors) {
        return res.status(200).json({ type: 'errors checking', payload: { errors } });
    }



    Post.findById(req.body.id)
        .then(post => {
            if (!post) {
                return res.status(200).json({ type: 'not found', payload: {} });
            }

            const comment = {
                user: req.user.id,
                text: req.body.text
            };

            post.comments.unshift(comment);
            post.allComments = post.comments.length;
            const newComment = post.comments[0];

            post.save()
                .then(savedPost => {
                    if (!savedPost) {
                        return res.status(200).json({ type: 'server failure', payload: {} });
                    }
                    return res.status(200).json({ type: 'comment added', payload: { newComment, user: req.user } });
                })
                .catch(err => {
                    return res.status(200).json({ type: 'server failure', payload: {} });
                })
        }).catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        });

});

router.post('/removeComment', authorizedOnly, (req, res) => {
    Post.findById(req.body.postId)
        .then(post => {
            if (!post) {
                return res.status(200).json({ type: 'not found', payload: {} });
            }

            const element = post.comments.find(comm => comm._id == req.body.commentId);

            if ((element.user + '') !== (req.user.id + '')) {
                return res.status(200).json({ type: 'not authorized', payload: {} });
            }

            const index = post.comments.findIndex(comm => comm._id == req.body.commentId);
            post.comments.splice(index, 1);
            post.save()
                .then(savedPost => {
                    if (!savedPost) {
                        return res.status(200).json({ type: 'not found', payload: {} });
                    }
                    return res.status(200).json({ type: 'comment removed', payload: { index } });
                })
                .catch(err => {
                    return res.status(200).json({ type: 'server failure', payload: {} });
                })
        })
        .catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        });
});

router.post('/removePost', authorizedOnly, (req, res) => {
    Post.findByIdAndRemove(req.body.postId)
        .then(post => {
            return res.status(200).json({ type: 'post removed', payload: {} });
        })
        .catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        });
});

router.post('/like', authorizedOnly, (req, res) => {

});

router.post('/unlike', authorizedOnly, (req, res) => {

});

router.post('/all', (req, res) => {

});

router.post('/best', (req, res) => {

});

router.post('/getNewestPosts', (req, res) => {
    const { quantity = 5, from = 0 } = req.body;


    Post.find({})
        .populate('user')
        .populate('comments.user')
        .limit(quantity)
        .skip(from)
        .then(posts => {
            return res.status(200).json({ type: 'get posts success', payload: posts })
        }).catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        })

});

router.post('/getBestPosts', (req, res) => {
    const { quantity = 5, from = 0 } = req.body;


    Post.find({})
        .populate('user')
        .populate('comments.user')
        .limit(quantity)
        .skip(from)
        .then(posts => {
            return res.status(200).json({ type: 'get posts success', payload: posts })
        }).catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        })

});


export default router;
