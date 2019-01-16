import mongoose from 'mongoose';

mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1
    },
    allLikes: {
        type: Number,
        default: 0
    },
    allComments: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        min: 1
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    },
                }
            ],
            text: {
                type: String,
                required: true,
                min: 1
            }
        }
    ],

}));


export default mongoose.model('Post');
