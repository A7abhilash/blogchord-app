const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./../models/Users");
const Bookmark = require("./../models/Bookmarks");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET_ID = process.env.GOOGLE_CLIENT_SECRET_ID;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID, //It has to be bought from google cloud platform
        clientSecret: GOOGLE_CLIENT_SECRET_ID, //It has to be bought from google cloud platform
        callbackURL: "https://auth.expo.io/@a7abhilash/blogchord-frontend",
        // callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          googleId: profile._json.sub,
          displayName: profile._json.name,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          image: profile._json.picture,
        };
        try {
          let user = await User.findOne({ googleId: profile._json.sub });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            await Bookmark.create({
              user: user._id,
              blogs: [user._id.toString()],
            });
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};
