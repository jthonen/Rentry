var db = require("../models");

module.exports = function(app) {
    app.get("/api/groups", function(req, res) {
        db.Group.findAll({
            include: [db.User]
        }).then(function(groups) {
            res.json(groups);
        });
    });

    app.get("/api/groups/:id", function(req, res) {
        db.Group.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(group) {
            res.json(group);
        });
    });

    app.post("/api/groups", function(req, res) {
        db.Group.create(req.body).then(function(result) {
            res.json(result);
        });
    });

    app.delete("/api/groups/:id", function(req, res) {
        db.Group.destroy({
            where: {
                id: req.params.id
            },
            include: [db.User]
        }).then(function(group) {
            res.json(group);
        });
    });
}