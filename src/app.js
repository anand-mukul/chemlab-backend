import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";

const app = express();

const mongoUrl = process.env.MONGODB_URI;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (corsOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes import
import userRouter from "./routes/user.route.js";
import labRouter from "./routes/lab.route.js";
import workspaceRouter from "./routes/workspace.route.js";
import reactionRouter from "./routes/reaction.route.js";

// routes use
app.use("/api/v1/users", userRouter);
app.use("/api/v1/labs", labRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/reactions", reactionRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("💥 Something broke! 🤯");
});

export default app;
