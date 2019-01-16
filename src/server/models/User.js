import mongoose from 'mongoose'

mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 120
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 120
    },
    hash: {
        type: String,
        required: true,
        min: 2,
        max: 60
    },
    avatar: {
        type: String,
        required: true,
        min: 2,
        max: 540
    },
    date: {
        type: Date,
        default: Date.now
    }
}))


export default mongoose.model('User')
