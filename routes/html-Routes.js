var db = require("../models");
var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // app.use(function(req, res, next) {
  //   console.log("\nthis is request body: ", req.body.email);
  //   db.User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then(function(data) {
  //     //console.log("\nthis is from the server side: ", data, "\n");
  //     next();
  //   })
  // });

  // Load index page
  app.get("/mainPage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mainPage.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};