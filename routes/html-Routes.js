var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/mainPage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mainPage.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};