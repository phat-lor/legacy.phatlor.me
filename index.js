var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

const rateLimit = require("express-rate-limit");

require("dotenv").config();

var app = express().disable("x-powered-by");
const port = process.env.PORT || 3000;

//Static the html folder
app.use(express.static(__dirname + "/assets"));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

//Routes
require("fs")
  .readdirSync(require("path").join(__dirname, "/routes"))
  .forEach((file) => {
    app.use(require("./routes/" + file));
  });

app.get("*", (req, res) => {
  res.render("error", { error: "Page not found (404)" });
});

app.listen(port, () => {
  console.log(`Start Compleate ${port}`);
});
