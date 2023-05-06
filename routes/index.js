var router = require("express").Router();
var fs = require("fs");

router.get("/", (req, res) => {

    // get cookie
    var curlang = req.cookies.languge;
    if (curlang == undefined) {
        curlang = "en";
        res.cookie("languge", curlang);
    }

    // loop through the languages from ../lang/**.json abd return the json data
    var lang = {};
    fs.readdirSync("./assets/lang").forEach(file => {
        if (file == curlang + ".json") {
            lang = JSON.parse(fs.readFileSync("./assets/lang/" + file, "utf8"));
        }
    });
    // console.log("Language: " + curlang);
    // check if the language is not found
    if (Object.keys(lang).length === 0) {
        res.cookie("languge", "en");
        return res.redirect(`/error?error=Language "${curlang}" not found this error should be automatically fixed. Please click the "go back home" button. If the problem still appears, please contact me.`)
    }
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