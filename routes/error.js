var router = require("express").Router();
var fs = require("fs");

router.get("/error", (req, res) => {
    const error = req.query.error;

    res.render("error", {error: error});
});


// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;