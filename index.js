const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");


app.use(express.json());

//routing main route
app.use('/user', userRoute)
app.use('/post', postRoute)

// localhost:3000/user/getallusers
// localhost:3000/post/



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

