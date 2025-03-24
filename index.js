const express = require("express");
const app = express();
//config env
require('dotenv').config()

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");


app.use(express.json());

//routing main route
app.use('/user', userRoute)
//user/name
app.use('/post', postRoute)
//post/name


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

