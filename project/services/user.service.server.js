/**
 * Created by LingZhang on 4/3/17.
 */
module.exports = function (app, model) {
    var passport = require('passport');
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;

    // app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    app.post('/api/register', register);
    app.post('/api/login', passport.authenticate('local'), login);
    app.get('/api/loggedIn', loggedIn);
    app.get('/api/isAdmin', isAdmin);
    app.post('/api/logout', logout);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/:username', findUserByUsername);
    // app.post('/api/experiments/passport/admin/user', auth, createUser);
    // app.get('/api/experiments/passport/admin/user', auth, findAllUsers);
    // app.put('/api/experiments/passport/admin/user/:userId', auth, updateUser);
    // app.delete('/api/experiments/passport/admin/user/:userId', auth, deleteUser);

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    userModel = model.userModel;

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.type = ['user'];

        console.log('register');
        console.log(newUser);

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    console.log(user);
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(500).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            user.password = '';
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(500).send(err);
                }
            );
    }

    function login(req, res) {
        console.log("aaa");
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.roles && req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
    }

    function findUserById(req, res) {
        userModel
            .findUserById(req.params.userId)
            .then(function (user) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(user);
                }
            });
    }

    function findUserByUsername(req, res) {
        userModel
            .findUserByUsername(req.params.username)
            .then(function (user) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(user);
                }
            });
    }

    function createUser(req, res) {
        userModel
            .createUser(req.body)
            .then(function (user) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(user);
                }
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(users);
                }
            });
    }

    function updateUser(req, res) {
        userModel
            .updateUser(req.params.userId, req.body)
            .then(function (status) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(status);
                }
            });
    }

    function deleteUser(req, res) {
        userModel
            .deleteUser(req.params.userId)
            .then(function (status) {
                if (err) {
                    res.send(500);
                } else {
                    res.json(status);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("bbboom");
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            console.log("lala");
            res.send(401);
        } else {
            next();
        }
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
    }
};