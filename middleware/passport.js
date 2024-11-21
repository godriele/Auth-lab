const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");

// ------------------------------- Adding Github Authorization ------------------------------------------
const GithubStrategy = require('passport-github2').Strategy;
// ----------------------------------------------------------------------------------------------------


// ----------------------------- Local Strategy ------------------------------------------------------

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);


// ------------------------ Adding Github Authorization ------------------------------

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID, 
  clientSecret: process.env.GITHUB_CLIENT_SECRET, 
  callbackURL: "http://localhost:8000/auth/github/callback",
  scope: ['user:email']
}, async  (accessToken, refreshToken, profile, done) => {
  console.log('Access Token', accessToken);
  console.log('Refresh Token', refreshToken);
  console.log('GitHub Profile', profile);  

  let user = await userController.getUserByGithubID(profile.id);

  if (user) {
    return done(null, user);
  } else {
    const newUser = {
      githubid: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      photo: profile.photos[0]?.value,
      email: (profile.emails && profile.emails[0] && profile.emails[0].value) 
            ? profile.emails[0].value 
            : `${profile.username}@github.com`
    };

    console.log("New User details", newUser)
    userController.createUser(newUser, (err, createdUser) => {
      if (err) {
        return done(err);
      }
      return done(null, createdUser);  // Use the createdUser here
    });
  }
}));


// ----------------------------- Serialize and Deserialize User ---------------------------------------

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
