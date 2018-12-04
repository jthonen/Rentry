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
        console.log("entered api/users post", req.body);

        pw.hash(req.body.password, function(err, hash){
            if(err) {throw err;}
            var user= {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                passHash: hash,
                email: req.body.email
            };
            console.log("this is the HASHHHHH ", hash);

            db.User.create(user).then(function(user) {
                localStorage.userID = user.id;
                res.json(true);
            });
        })
        
    });

    app.put("/api/users/:id", function(req, res) {
        db.User.update(
            req.body, {
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
    app.post("/api/users/login/:email", function(req, res) {

        // console.log(req)
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(user) {
            console.log("\nUSERRRRR\n", user, " \n");
            
            pw.verify(user.dataValues.passHash, req.body.password, function(err, isValid) {
                if(err) {
                    throw err;
                }
                // if (isValid) window.localStorage.userID = user.id;
                msg = isValid ? 'Passwords match!' : 'Wrong password';
                // var isValid = isValid ? true : false;
                // console.log(msg);
                res.json({ 
                    isValid: isValid, 
                    userID: user.id });
            });
        });
    });
}