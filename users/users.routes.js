const {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  authorization,
} = require("./users.controller");
const { Router } = require("express");
// const cors = require("cors");

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.put("/", loginUser);
userRouter.patch("/", logoutUser);
userRouter.get("/", authorization, currentUser);

module.exports = userRouter;
