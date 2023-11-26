const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Post', 'posts');
        await cleanDB('User', 'users');
        
        await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const { postText, postAuthor, comments } = postSeeds[i];
            const { _id: postId } = await Post.create({ postText, postAuthor });
            if (comments && comments.length > 0) {
                await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $push: {
                            comments: comments.map(({ commentText, commentAuthor }) => ({
                                commentText,
                                commentAuthor,
                            })),
                        },
                    }
                );
            }
            await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        thoughts: postId,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('all done!');
    process.exit(0);
});