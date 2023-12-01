const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('Post', 'posts');
        await cleanDB('User', 'users');

        const users = await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const { postText, postAuthor, comments } = postSeeds[i];

            // Find the user by username
            const user = users.find(user => user.username === postAuthor);
            if (!user) {
                console.error(`User not found for postAuthor: ${postAuthor}`);
                continue;  // Skip to the next iteration
            }

            // Create the post with the user's _id as postAuthor
            const { _id: postId } = await Post.create({ postText, postAuthor: user._id });

            // Check if there are comments
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

            // Add the postId to the user's thoughts
            await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        posts: postId,
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