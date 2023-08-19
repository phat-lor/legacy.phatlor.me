var router = require("express").Router();
var fs = require("fs");

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Already have rate limit in the index.js

router.get("/", (req, res) => {
    let curlang = req.query.lang;
    if (curlang == undefined || curlang == null || curlang == "") {
        curlang = "en";
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(curlang) || typeof curlang !== 'string') {
        return res.redirect(`/error?error=Invalid language parameter "${curlang}". Please click the "go back home" button. If the problem still appears, please contact me.`);
    }
    var lang = {};
    try {
        lang = JSON.parse(fs.readFileSync("./assets/lang/" + curlang.toLocaleLowerCase()+".json", "utf8"));
    } catch (error) {
        return res.redirect(`/error?error=Language "${curlang}" not found this error should be automatically fixed. Please click the "go back home" button. If the problem still appears, please contact me.`)
    }

    res.render("maintenance", {lang: lang});
});

router.get("/home" , (req, res) => {
    res.redirect("/");
});

module.exports = router;