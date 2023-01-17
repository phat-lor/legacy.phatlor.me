var router = require("express").Router();

router.get("/page", (req, res) => {
    // get query string
    var query = req.query;
    // redirect to specific page
    res.redirect("/"+ query.to);
});

module.exports = router;