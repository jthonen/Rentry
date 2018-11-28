var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new example
  app.post("/api/items", function(req, res) {
    db.Item.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  app.put("/api/items/:id", function(req,res) {
    db.Item.update({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id
  app.delete("/api/items/:id", function(req, res) {
    db.Item.destroy({ 
      where: { 
        id: req.params.id 
      } 
    }).then(function(result) {
      res.json(result);
    });
  });
};
