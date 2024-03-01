var router = require("express").Router();

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Already have rate limit in the index.js
router.post("/redirect", (req, res) => {
  // get post data
  var data = req.body;
  // redirect to the url
  res.render("redirect", { url: "https://" + data.redirect });
});

module.exports = router;
