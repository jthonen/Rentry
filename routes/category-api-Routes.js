var db = require("../models");

module.exports = function(app) {
    app.get("/api/category/all", function(req,res) {
        db.Item.findAll({}).then(function(result) {
            res.json(result);
        });
    });

    app.get("/api/category/:category", function(req,res) {

        console.log("this is category searched: \n", req.params.category, "\n");

        console.log("\nthis is when category is uid", req.params.category);

        console.log("check see if it is not a number " + isNaN(req.params.category));

        if(isNaN(req.params.category)) {
            db.Item.findAll({
                where: {
                    category: req.params.category
                }
            }).then(function(result) {
                res.json(result);
            });
        }
        else {
            db.Item.findAll({
                where: {
                    currentUserID: req.params.category
                }
            }).then(function(result) {
                res.json(result);
            });
        }
    });

    app.get("/api/category/myItems/:id", function(req, res) {
        db.Item.findAll({
            where: {
                ownerID: req.params.id
            }
        }).then(function(result) {
            res.json(result);
        })
    })

    app.get("/api/category/borrowed/:userID", function(req,res) {

        console.log("this is category searched: \n", req.params.category, "\n");

        db.Item.findAll({
            where: {
                category: req.params.userID
            }
        }).then(function(result) {
            res.json(result);
        });
    });
};