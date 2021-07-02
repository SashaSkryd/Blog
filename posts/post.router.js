const { createPost, updatePost } = require("./post.controller");
const { authorization } = require("../users/users.controller");
const { Router } = require("express");
const postRouter = Router();

postRouter.post("/", authorization, createPost);
postRouter.patch("/:postId", authorization, updatePost);
postRouter.get("/", authorization);
postRouter.get("/:postId", authorization);
postRouter.get("/:postAuthor", authorization);
postRouter.delete("/:postId", authorization);

module.exports = postRouter;
