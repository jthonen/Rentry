var db = require("../models");

module.exports = function(app) {
    // view all 
    app.get("/api/users", function(req, res) {
        db.User.findAll({
            include: [db.Item]
        }).then(function(users) {
            res.json(users);
        });
    });

    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Item]
        }).then(function(user) {
            res.json(user);
        });
    });

    app.post("/api/users", function(req, res) {
        db.User.create(req.body).then(function(user) {
            res.json(user);
        });
    });

    app.put("/api/users/:id", function(req, res) {
        db.User.update({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            res.json(user);
        });
    });

    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            },
            include: [db.Item]
        }).then(function(user) {
            res.json(user);
        });
    });
}