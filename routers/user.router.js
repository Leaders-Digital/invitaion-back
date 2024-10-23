const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  validateInvitation,
  acceptInvitation,
  getAllInvitations,
  userSendEmail,
} = require("../Controllers/user.controller");

userRouter.post("/createUser", createUser);
userRouter.get("/validateInvitation/:userId", validateInvitation);
userRouter.put("/acceptInvitation/:userId", acceptInvitation);
userRouter.get("/getAll", getAllInvitations);
userRouter.put("/valideInvitation", userSendEmail);

module.exports = userRouter;
