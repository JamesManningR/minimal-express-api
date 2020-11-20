const HttpError = require("../models/HttpError");
const Post = require("../models/PostModel");

const createPost = async (req, res, next) => {
	const postData = new Post(({ title, body } = req.body));
	
  let createdPost;
  try {
    createdPost = await postData.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create project", 500);
    return next(error);
  }
  res.status(201).json(createdPost);
};

const getPost = async (req, res, next) => {
  const id = req.params.id;

  let post;

  try {
    post = await Post.findById(projectId).exec();
  } catch (err) {
    const error = new HttpError(`Post with ID: ${id} not found`, 404);
    return next(error);
  }
};

const getPosts = async (req, res, next) => {
  let foundPosts;

  try {
    foundPosts = await Post.find().exec();
  } catch (err) {
		const error = new HttpError("Unable to gather projects", 500);
		return next(error)
  }
  if (!foundPosts) {
    const error = new HttpError("Nothing found", 404);
    return next(error);
  }
  res.json(foundPosts);
};

const updatePost = async (req, res, next) => {
  let updatedPost;

  try {
		updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});
  } catch (err) {
		const error = new HttpError("Unable to update project", 500);
		return next(error);
  }
  res.json(updatedPost);
};

const deletePost = async (req, res, next) => {
  let deletedPost;

  try {
		deletedPost = await Post.findByIdAndDelete(req.params.id);
  } catch (err) {
		const error = new HttpError("Unable to delete project", 500);
		return next(error);
  }
  res.json(deletedPost);
};

module.exports = {
  createPost,
  getPost,
	getPosts,
	updatePost,
	deletePost
};
