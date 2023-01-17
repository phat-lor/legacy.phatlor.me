var router = require("express").Router();
// preload language files
var enlang = require("../lang/en.json");
var thlang = require("../lang/th.json");

router.get("/", (req, res) => {

    // get cookie
    var curlang = req.cookies.languge;
    if (curlang == undefined) {
        curlang = "en";
        res.cookie("languge", curlang);
    }
    // write cookie
    const lang = curlang == "en" ? enlang : thlang;

    // console.log(lang);

    res.render("index", {lang: lang});
});

router.get("/home" , (req, res) => {
    res.redirect("/");
});

// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;