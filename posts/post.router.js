const { createPost, updatePost } = require("./post.controller");
const { authorization } = require("../users/users.controller");
const { Router } = require("express");
const postRouter = Router();

postRouter.post("/post", authorization, createPost);
postRouter.patch("/post", authorization, updatePost);

module.exports = postRouter;
