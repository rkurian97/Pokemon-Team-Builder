const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Users = require("../models/Users")


module.exports=(passport) => {
  // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
  passport.use('local', new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email",
      passwordField: "pw"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      Users.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // checking to see if the password and eamil meet the requirements
        // console.log (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email))
        //   if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
        //     return done(null, false, {
        //       message: "In correct format."
        //     });
        //   }

        // If thesre's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "No account with that email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        // console.log ()
        if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  ));
  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}
