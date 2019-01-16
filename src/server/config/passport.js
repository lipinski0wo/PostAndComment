import passportJWT from 'passport-jwt'
import passport from 'passport'
import mongoose from 'mongoose'


import { passport_secretOrKey } from './keys'

export const initialize = () => {
    const User = mongoose.model('User')

    const options = {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: passport_secretOrKey
    }

    passport.use(new passportJWT.Strategy(options, (payload, done) => {
        User.findById(payload.id)
            .then(user => {
                if (!user) return done(null, false)
                return done(null, user)
            })
            .catch(err => {
                return done(err, false)
            })
    }))
}

export const authorizedOnly = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(200).json({ type: 'server failure', payload: {} });
        }
        if (!user) {
            return res.status(200).json({ type: 'not authorized', payload: {} });
        }
        req.user = user;
        next();
    })(req, res, next)
}

export const notAuthorizedOnly = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(200).json({ type: 'server failure', payload: {} });
        }
        if (user) {
            return res.status(200).json({ type: 'over authorized', payload: {} });
        }
        next();
    })(req, res, next)
}