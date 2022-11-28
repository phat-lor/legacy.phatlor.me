var router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});

// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;