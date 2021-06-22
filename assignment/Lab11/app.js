const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const path = require('path');


app.use('/public', static);  // tell app to use the /public directory as static. Without this, /public/css/main.css will not have effect
app.use(express.json());  //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined
app.use(express.urlencoded({ extended: true }));  // get form data


app.get("/", async(req, res) => {
  res.sendFile(path.resolve('static/index.html'));
})


app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});