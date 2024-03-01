require("dotenv").config();

var router = require("express").Router();
var fs = require("fs");
const rateLimit = require("express-rate-limit");

router.get("/management", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.post("/management/validate", (req, res) => {
  const { portToken } = req.body;
  if (portToken != process.env.admin_key) {
    return res.status(401).json({ status: "Unauthorized" });
  }
  res.status(200).json({ status: "ok" });
});

router.get("/management/lang", rateLimit(), (req, res) => {
  // get lang json
  const { lang } = req.query;
  if (lang == undefined || lang == null || lang == "") {
    return res.status(400).json({ status: "Bad Request" });
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(lang) || typeof lang !== "string") {
    return res.status(400).json({ status: "Bad Request" });
  }
  var langJson = {};
  try {
    langJson = JSON.parse(
      fs.readFileSync(
        "./assets/lang/" + lang.toLocaleLowerCase() + ".json",
        "utf8",
      ),
    );
  } catch (error) {
    return res.status(400).json({ status: "Bad Request" });
  }

  if (
    langJson.Projects == undefined ||
    langJson.Projects == null ||
    langJson.Projects == ""
  ) {
    return res.status(400).json({ status: "Bad Request" });
  }
  return res.status(200).json({ data: langJson });
});

router.put("/management/lang", (req, res) => {
  const { portToken } = req.body;
  if (portToken != process.env.admin_key) {
    return res.status(401).json({ status: "Unauthorized" });
  }
  const { lang, newLang } = req.body;
  if (lang == undefined || lang == null || lang == "") {
    return res.status(400).json({ status: "Bad Request" });
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(lang) || typeof lang !== "string") {
    return res.status(400).json({ status: "Bad Request" });
  }

  if (newLang == undefined || newLang == null || newLang == "") {
    return res.status(400).json({ status: "Bad Request" });
  }

  // if(typeof newLang !== 'object') {
  //     return res.status(400).json({status: "Bad Request"});
  // }

  // overwrite lang json file with new projects
  var langJson = {};
  try {
    langJson = JSON.parse(
      fs.readFileSync(
        "./assets/lang/" + lang.toLocaleLowerCase() + ".json",
        "utf8",
      ),
    );
  } catch (error) {
    return res.status(400).json({ status: "Bad Request" });
  }
  // from base64 to json
  langJson = JSON.parse(Buffer.from(newLang, "base64").toString("utf-8"));
  fs.writeFileSync(
    "./assets/lang/" + lang.toLocaleLowerCase() + ".json",
    JSON.stringify(langJson, null, 4),
    "utf8",
  );

  return res.status(200).json({ status: "ok" });
});

module.exports = router;
