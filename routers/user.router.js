const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  validateInvitation,
  acceptInvitation,
} = require("../Controllers/user.controller");

userRouter.post("/createUser", createUser);
userRouter.get("/validateInvitation/:userId", validateInvitation);
userRouter.put("/acceptInvitation/:userId", acceptInvitation);

module.exports = userRouter;
