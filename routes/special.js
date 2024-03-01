var router = require("express").Router();
var fs = require("fs");

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Already have rate limit in the index.js

router.get("/special", (req, res) => {
  const { person } = req.query;
  // Path Traversal: Unsanitized input from an HTTP parameter flows into render, where it is used as a pa...Snyk Codejavascript/PT
  if (!person) return res.send("Please provide a person name");
  // filter path traversal
  if (person.includes(".."))
    return res.send("Please provide a valid person name");
  if (!fs.existsSync("views/special/" + person + ".ejs"))
    return res.send("Please provide a valid person name");
  res.render("special/" + person);
});

// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;
