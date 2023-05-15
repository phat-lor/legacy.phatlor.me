var router = require("express").Router();
var fs = require("fs");

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Already have rate limit in the index.js

router.get("/special", (req, res) => {
    const { person } = req.query;

    res.render("special/" + person );
});


// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;