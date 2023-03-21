const mongoose = require('mongoose');
const { connect } = require('./db');

const Accommodation = require('./models/Accommodation');
const User = require('./models/User');
const Forum = require('./models/Forum');

// Create a forum post
const createPost = async () => {
    await connect();
    try {
        const user = await User.findById('user-id-here');
        const accommodation = await Accommodation.findById('accommodation-id-here');
        const post = new Forum({
            accommodation_id: accommodation._id,
            user_id: user._id,
            title: 'Sample post title',
            content: 'Sample post content',
            likes: [],
            replies: [],
            status: 'active'
        });
        await post.save();
        console.log('Post created: ', post);
    } catch (err) {
        console.log('Error creating post: ', err);
    }
};

// Read all forum posts
const readAllPosts = async () => {
    try {
        const posts = await Forum.find().populate('user_id').populate('accommodation_id');
        console.log('All posts: ', posts);
    } catch (err) {
        console.log('Error reading posts: ', err);
    }
};

// Update a forum post
const updatePost = async () => {
    try {
        const post = await Forum.findById('post-id-here');
        post.title = 'New post title';
        post.content = 'New post content';
        await post.save();
        console.log('Post updated: ', post);
    } catch (err) {
        console.log('Error updating post: ', err);
    }
};

// Delete a forum post
const deletePost = async () => {
    try {
        const post = await Forum.findByIdAndDelete('post-id-here');
        console.log('Post deleted: ', post);
    } catch (err) {
        console.log('Error deleting post: ', err);
    }
};

// Create a like for a forum post
const createLike = async () => {
    try {
        const post = await Forum.findById('post-id-here');
        const user = await User.findById('user-id-here');
        const like = {
            user_id: user._id
        };
        post.likes.push(like);
        await post.save();
        console.log('Like created: ', like);
    } catch (err) {
        console.log('Error creating like: ', err);
    }
};

// Delete a like for a forum post
const deleteLike = async () => {
    try {
        const post = await Forum.findById('post-id-here');
        const like = post.likes.id('like-id-here');
        like.remove();
        await post.save();
        console.log('Like deleted: ', like);
    } catch (err) {
        console.log('Error deleting like: ', err);
    }
};

// Create a reply for a forum post
const createReply = async () => {
    try {
        const post = await Forum.findById('post-id-here');
        const user = await User.findById('user-id-here');
        const reply = {
            user_id: user._id,
            content: 'Sample reply content'
        };
        post.replies.push(reply);
        await post.save();
        console.log('Reply created: ', reply);
    } catch (err) {
        console.log('Error creating reply: ', err);
    }
};

// Delete a reply for a forum post
const deleteReply = async () => {
    try {
        const post = await Forum.findById('post-id-here');
        const reply = post.replies.id('reply-id-here');
        reply.remove();
        await post.save();
        console.log('Reply deleted: ', reply);
    } catch (err) {
        console.log('Error deleting reply: ', err);
    }
};

// Call the functions
createPost();
readAllPosts();
updatePost();
deletePost();
createLike();
deleteLike();
createReply();
deleteReply();
