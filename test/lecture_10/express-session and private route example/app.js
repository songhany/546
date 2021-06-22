const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');

app.use(express.json());

app.use(
  session({
    name: 'AwesomeWebApp',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 }
  })
);

app.use('/private', (req, res, next) => {
  console.log(req.session.id);
  if (!req.session.user) {
    return res.redirect('/');  // ❤ if there is no user, we can render() them login page
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {  // ❤They should never see the login form if they're already logged in
  if (req.session.user) {  // in the login router. If they already logged in, we redirect them to /private
    return res.redirect('/private');
  } else {
    //I manually setting the req.method to post since it's usually coming from a form
    req.method = 'POST';  // If they're not logged in, we set up 'post' method which let user enter in their username in the form. After submit, it will hit the post route
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
