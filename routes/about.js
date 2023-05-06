var router = require("express").Router();
var fs = require("fs");

router.get("/about", (req, res) => {

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

    // console.log(lang);

    res.render("about", {lang: lang});
});

// router.post ("/", (request, response) => {
//     var data = request.body;
//     response.send(data);
// });

module.exports = router;