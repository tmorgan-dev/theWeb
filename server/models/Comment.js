const { Schema, Types } = require('mongoose');

function dateFormat(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = date.getHours() >= 12 ? 'p.m.' : 'a.m.';

    return `${hours}:${minutes}${amOrPm} ${month}/${day}/${year}`;
}

const commentSchema = new Schema(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        commentText: {
            type: String,
            required: true,
            maxLength: 280,
        },
        // reactionIcon: {
        //     type: String,
        // },
        commentAuthor: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = commentSchema;