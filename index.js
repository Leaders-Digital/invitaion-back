const express = require('express')
const app = express()
const port = 3000
require("./Models/index");
const userRouter = require('./routers/user.router');

app.use(express.json());
app.use("/api/user", userRouter);


app.listen(port, () => {
  console.log(`Server is listening on  ${port}`)
})