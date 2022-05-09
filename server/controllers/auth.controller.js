import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";
const logger = require("../../utils/logger");

const signin = async (req, res) => {
  logger.log({
    level: "info",
    message: "Signin Called",
  });
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      logger.log({
        level: "error",
        message: "Signin Unsuccessful",
      });
      return res.status("401").json({
        error: "User not found",
      });
    }

    if (!user.authenticate(req.body.password)) {
      logger.log({
        level: "error",
        message: "Signin Unsuccessful",
      });
      return res.status("401").send({
        error: "Email and password don't match.",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret
    );
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });
    logger.log({
      level: "info",
      message: "Signin Successful",
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    logger.log({
      level: "error",
      message: "Signin Unsuccessful" + err,
    });
    return res.status("401").json({
      error: "Could not sign in",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  logger.log({
    level: "info",
    message: "Sigout Called",
  });
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
};
