var db = require("../models");
var credential = require("credential");
var pw = credential();

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
        pw.hash(req.password, function(err, hash){
            if(err) {throw err;}
            var user= {
                firstName: req.firstName,
                lastName: req.lastName,
                password: hash,
                email: req.email
            };

            db.User.create(user).then(function(user) {
            res.json(user);
            });
        })
        
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

    // LOGIN
    app.get("/api/users/:email", function(req, res) {

        db.User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function(user) {
            pw.verify(user.passHash, req.ps, function(err, isValid) {
                if(err) {
                    throw err;
                }
                msg = isValid ? 'Passwords match!' : 'Wrong password';
                console.log(msg);

                res.json(isValid);
            });
        });
    });
}