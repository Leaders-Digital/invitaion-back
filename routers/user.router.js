const express = require('express');
const userRouter = express.Router();
const { createUser,validateInvitation } = require('../Controllers/user.controller');


userRouter.post('/createUser', createUser);
userRouter.get('/validateInvitation/:userId', validateInvitation);

module.exports = userRouter;