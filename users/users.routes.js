const {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  authorization,
} = require("./users.controller");
const { Router } = require("express");
const cors = require("cors");

const userRouter = Router();

userRouter.post("/", cors(), createUser);
userRouter.put("/", cors(), loginUser);
userRouter.patch("/", cors(), logoutUser);
userRouter.get("/", cors(), authorization, currentUser);

module.exports = userRouter;
