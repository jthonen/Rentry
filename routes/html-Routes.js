var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}