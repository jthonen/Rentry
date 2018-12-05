var db = require("../models");

module.exports = function(app) {
    app.get("/api/category/all", function(req,res) {
        db.Item.findAll({}).then(function(result) {
            res.json(result);
        });
    });

    app.get("/api/category/:category", function(req,res) {

        console.log("this is category searched: \n", req.params.category, "\n");

        db.Item.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(result) {
            res.json(result);
        });
    });
};