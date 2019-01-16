import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import checkRegisterErrors from '../../../validate/register';
import checkLoginErrors from '../../../validate/login';
import { passport_secretOrKey } from '../../../config/keys';
import { authorizedOnly, notAuthorizedOnly } from '../../../config/passport';


const router = express.Router();
const User = mongoose.model('User');

router.post('/register', notAuthorizedOnly, (req, res) => {
    let errors;
    errors = checkRegisterErrors(req.body);
    if (errors) {
        return res.status(200).json({ type: 'errors checking', payload: { errors } });
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(200).json({ type: 'errors checking', payload: { errors: { email: 'email is already taken' } } });
            }
            bcrypt
                .hash(req.body.password1, 10)
                .then(hashed => {
                    new User({
                        username: req.body.username,
                        email: req.body.email,
                        hash: hashed,
                        avatar: 'https://cdn2.iconfinder.com/data/icons/lin/128/1.png'
                    })
                        .save()
                        .then(savedUser => {
                            if (!savedUser) {
                                return res.status(200).json({ type: 'server failure', payload: {} });
                            }
                            return res.status(200).json({ type: 'registration success', payload: {} });
                        })
                        .catch(err => {
                            return res.status(200).json({ type: 'server failure', payload: {} })
                        });
                })
                .catch(err => {
                    return res.status(200).json({ type: 'server failure', payload: {} });
                });

        })
        .catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} });
        });
});

router.post('/login', notAuthorizedOnly, (req, res) => {
    let errors;
    errors = checkLoginErrors(req.body);

    if (errors) {
        return res.status(200).json({ type: 'errors checking', payload: { errors } });
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(200).json({ type: 'errors checking', payload: { errors: { email: 'no user found by this email' } } });
            }
            bcrypt.compare(req.body.password, user.hash).then(isMatch => {
                if (!isMatch) {
                    return res.status(200).json({ type: 'errors checking', payload: { errors: { password: 'wrong password' } } });
                }
                jwt.sign(
                    { id: user.id, username: user.username, avatar: user.avatar },
                    passport_secretOrKey,
                    { expiresIn: '1d' },
                    (err, token) => {
                        if (err) {
                            return res.status(200).json({ type: 'server failure', payload: {} })
                        }
                        res.status(200).json({ type: 'login success', payload: { token: 'Bearer ' + token } })
                    }
                );

            })
                .catch(err => {
                    return res.status(200).json({ type: 'server failure', payload: {} })
                })


        })
        .catch(err => {
            return res.status(200).json({ type: 'server failure', payload: {} })
        })
});


router.post('/current', authorizedOnly, (req, res) => {
    res.status(200).json({ type: 'current user', payload: { user: { username: req.user.username, email: req.user.email, id: req.user.id } } })
});

export default router


