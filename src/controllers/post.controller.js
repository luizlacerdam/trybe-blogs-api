const { PostService } = require('../services');

const getAll = async (req, res) => {
    try {
        const posts = await PostService.getAll();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await PostService.getById(id);
        if (type) return res.status(404).json({ message });
        
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const post = req.body;
        const { id } = req.user.message.dataValues;
        const { type, message } = await PostService.createPost({ id, post });
        if (type) return res.status(400).json({ message });
        return res.status(201).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.message.dataValues.id;
        const newPost = req.body;
        const { type, message } = await PostService.editPost({ userId, postId: id, newPost });
        if (type) return res.status(type).json({ message });
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.message.dataValues.id;
        const { type, message } = await PostService.deletePost({ userId, postId: id });
        if (type) return res.status(type).json({ message });
        return res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    createPost,
    editPost,
    deletePost,
};