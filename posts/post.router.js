const { createPost, updatePost, getAllPosts, getPostAuthor, deletePost } = require("./post.controller");
const { authorization } = require("../users/users.controller");
const { Router } = require("express");
const postRouter = Router();

postRouter.post("/", authorization, createPost);
postRouter.patch("/:postId", authorization, updatePost);
postRouter.get("/", authorization, getAllPosts);
// postRouter.get("/:postId", authorization);
postRouter.get("/:postAuthor", authorization, getPostAuthor);
postRouter.delete("/:postId", authorization, deletePost);

module.exports = postRouter;
