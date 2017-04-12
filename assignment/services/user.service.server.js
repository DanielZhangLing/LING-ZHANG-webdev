module.exports = function (app, model) {


    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);
    userModel = model.userModel;
    storyModel = model.storyModel;

    function findStoriesByUser(req, res) {
        storyModel.findStoriesByUser(req.params.userId)
            .then(
                function (stories) {
                    console.log("1");
                    res.json(stories);
                },
                function (error) {
                    console.log("2");
                    res.sendStatus(404);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel.updateUser(userId, newUser)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // console.log(newUser);
        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users[u].firstName = newUser.firstName;
        //         users[u].lastName = newUser.lastName;
        //         users[u].email = newUser.email;
        //         res.json(users[u]);
        //         return;
        //     }
        //}
    }

    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        userModel.findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var userName = req.query.username;
        console.log(userName);
        userModel.findUserByUsername(userName)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // var user = users.find(function (u) {
        //     return u.username == req.query.username;
        // });
        // if(user) {
        //     res.json(user);
        // } else {
        //     res.sendStatus(404);
        //}
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        console.log("find user by credentials HTTP service");
        userModel.findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(user);
                    return res.json(user);
                },
                function (error) {
                    console.log("bbb");
                    res.sendStatus(403);
                }
            );
        // var user = users.find(function(user){
        //     return user.password == password && user.username == username;
        // });
        // res.json(user);
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                }, function (error) {
                    res.sendStatus(500).send(error);
                });
        // newUser._id = users.length+1;
        // users.push(newUser);
        // return res.json(newUser);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        // for (var u in users) {
        //     var user = users[u];
        //     if (user._id == userId) {
        //         users.splice(u, 1);
        //         return res.json(userId);
        //     }
        // }
        userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            )
    }
}