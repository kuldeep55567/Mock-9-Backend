const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
    }]
}, {
    versionKey: false
})

const PostModel = mongoose.model("Post", postSchema);
module.exports = { PostModel }