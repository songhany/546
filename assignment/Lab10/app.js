const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');  // serve static assets. All of our static assets, like css file, any client side javascript and any images website use will be stored in serve of public directory
const configRoutes = require('./routes');  // configure routes


const exphbs = require('express-handlebars');  //create instance of express-handlebars
const session = require('express-session');


const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',  // 'main' is main template, like a master page, which is rapper contain every page
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.use;
app.use('/public', static);  // tell app to use the /public directory as static. Without this, /public/css/main.css will not have effect
app.use(express.json());  //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined
app.use(express.urlencoded({ extended: true }));  // get form data
app.use(async (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  // let the next middleware run:
  next();
});

app.engine('handlebars', handlebarsInstance.engine);;  // set up the engine by instance of handlebars. 'main' in { defaultLayout: 'main' } is main template, like a master page, which is rapper contain every page
app.set('view engine', 'handlebars');  // set 'view engine' to be 'handlebars'
const userData = require('./users');  // ❤ ./users.js

app.use(session({
  name: 'Build Session',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

// 1. One which will deny users who don't log in to access the /private path.
let admin = false;
app.use('/private', (req, res, next) => {
  if (!admin) {  // If user is not authenticated
    req.session.isLogIn = false;
    res.status(403).render('others/error', { errorDescription: "User is not logged in" , title: "error" })
  } else {
    req.session.isLogIn = true;
    next();  // hit /private route
  }
});

// 2. One which verify whether user is authenticated
const bcrypt = require('bcryptjs');
const saltRounds = 16;
app.use('/login', async (req, res, next) => {
  const aUserInfo = req.body;
  const { username, password } = aUserInfo;

  let userHashedPassword;
  let fN;
  let lN;
  let pro;
  let b;
  let id;

  for (let user of userData) {  // traverse authenticated user
    if (user.username === username) {
      userHashedPassword = user.hashedPassword;
      fN =  user.firstName;
      lN = user.lastName;
      pro = user.profession;
      b = user.bio;
      id = user._id;
      break;
    }
  }
  try {
    let match = await bcrypt.compare(password, userHashedPassword);
    if (match) {
      admin = true;
      req.session.isLogIn = true;
      req.session.user = { id: id, username: username, firstname: fN, lastname: lN, profession: pro, bio: b};  //store current user info in session
      res.cookie('AuthCookie');  //If the user provides a successful username / password combination, you will set a cookie named AuthCookie
    } else {
      admin = false;
      req.session.isLogIn = false;
    }
  } catch (e) {
    // console.log(e);
  }

  // log to your console for every request made to the server
  let crtTimeStamp = new Date().toUTCString();

  if (admin && req.session.isLogIn) {
    console.log(`[${crtTimeStamp}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
    res.redirect('/private');
  } else {
    console.log(`[${crtTimeStamp}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`)
    req.method = 'POST'; 
    next();
  }
})


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});