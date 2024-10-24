const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
require("./Models/index");
const userRouter = require('./routers/user.router');

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);


app.listen(port, () => {
  console.log(`Server is listening on  ${port}`)
})