import connectDB from "./db/connection.js";
import authController from "./modules/auth/auth.controller.js";
import doctorcontroller from "./modules/doctor/doctor.controller.js";
import appointment from "./modules/appointment/appointment.controller.js";
import { globalErrorHandleing } from "./utils/response/error.response.js";

import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const bootstarb = (app, express) => {

  app.use(express.json());
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.get("/", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  app.get("/profile", (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
  });

  app.get("/logout", (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

  app.use("/auth", authController);
  app.use("/doctors", doctorcontroller);
  app.use("/appointments", appointment);

  app.all("*", (req, res) => {
    res.status(404).json("invalid routing");
  });
  app.use(globalErrorHandleing);

  connectDB();
};

export default bootstarb;
