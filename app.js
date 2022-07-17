var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var session = require("express-session");
var fileUpload = require("express-fileupload");
var cors = require("cors");

var loginRouter = require("./routes/admin/login");
var novedadesRouter = require("./routes/admin/novedades");
var principalRouter = require("./routes/admin/principal");
var subirRouter = require("./routes/admin/subirpdf");
var cortesRouter = require("./routes/admin/cortesprogramados");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "juan1234",
    resave: false,
    saveUninitialized: true,
  })
);

secured = async (req, res, next) => {
  try {
    console.log(req.session.nombre);
    if (req.session.nombre) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

app.use("/admin/login", loginRouter);
app.use("/admin/novedades", secured, novedadesRouter);
app.use("/admin/principal", secured, principalRouter);
app.use("/admin/subirpdf", secured, subirRouter);
app.use("/admin/cortesprogramados", secured, cortesRouter);
app.use("/api", cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
