// /**
//  * Created by LingZhang on 4/7/17.
//  */
//
// /**
//  * Created by LingZhang on 4/3/17.
//  */
// module.exports = function (app, model) {
//
//     // app.get("/api/user", findUser);
//     app.get("/api/spot/:spotId", findSpotById);
//     // app.post("/api/user", createUser);
//     // app.put("/api/user/:userId", updateUser);
//     // app.delete("/api/user/:userId", deleteUser);
//
//     spotModel = model.spotModel;
//
//     function localStrategy(username, password, done) {
//         console.log("fkme");
//         userModel
//             .findUserByCredentials({username: username, password: password})
//             .then(
//                 function (user) {
//                     if (!user) {
//                         console.log("haha");
//                         return done(null, false);
//                     }
//                     return done(null, user);
//                 },
//                 function (err) {
//                     if (err) {
//                         return done(err);
//                     }
//                 }
//             );
//     }
//
//     function register(req, res) {
//         var newUser = req.body;
//         newUser.type = ['user'];
//
//         console.log('register');
//         console.log(newUser);
//
//         userModel
//             .findUserByUsername(newUser.username)
//             .then(
//                 function (user) {
//                     console.log(user);
//                     if (user) {
//                         res.json(null);
//                     } else {
//                         console.log("aaa");
//                         return userModel.createUser(newUser);
//                     }
//                 },
//                 function (err) {
//                     res.status(500).send(err);
//                 }
//             )
//             .then(
//                 function (user) {
//                     console.log("now im here")
//                     if (user) {
//                         req.login(user, function (err) {
//                             user.password = '';
//                             if (err) {
//                                 res.status(500).send(err);
//                             } else {
//                                 console.log("now im here2")
//                                 res.json(user);
//                             }
//                         });
//                     }
//                 },
//                 function (err) {
//                     res.status(500).send(err);
//                 }
//             );
//     }
//
//     function login(req, res) {
//         console.log("aaa");
//         var user = req.user;
//         res.json(user);
//     }
//
//     function logout(req, res) {
//         req.logOut();
//         res.send(200);
//     }
//
//     function loggedIn(req, res) {
//         res.send(req.isAuthenticated() ? req.user : '0');
//     }
//
//     function isAdmin(req, res) {
//         res.send(req.isAuthenticated() && req.user.roles && req.user.roles.indexOf('ADMIN') > -1 ? req.user : '0');
//     }
//
//     function findUserById(req, res) {
//         userModel
//             .findUserById(req.params.userId)
//             .then(function (user) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(user);
//                 }
//             });
//     }
//
//     function findUserByUsername(req, res) {
//         userModel
//             .findUserByUsername(req.params.username)
//             .then(function (user) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(user);
//                 }
//             });
//     }
//
//     function createUser(req, res) {
//         userModel
//             .createUser(req.body)
//             .then(function (user) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(user);
//                 }
//             });
//     }
//
//     function findAllUsers(req, res) {
//         userModel
//             .findAllUsers()
//             .then(function (users) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(users);
//                 }
//             });
//     }
//
//     function updateUser(req, res) {
//         userModel
//             .updateUser(req.params.userId, req.body)
//             .then(function (status) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(status);
//                 }
//             });
//     }
//
//     function deleteUser(req, res) {
//         userModel
//             .deleteUser(req.params.userId)
//             .then(function (status) {
//                 if (err) {
//                     res.send(500);
//                 } else {
//                     res.json(status);
//                 }
//             });
//     }
//
//     function serializeUser(user, done) {
//         done(null, user);
//     }
//
//     function deserializeUser(user, done) {
//         console.log("bbboom");
//         userModel
//             .findUserById(user._id)
//             .then(
//                 function (user) {
//                     done(null, user);
//                 },
//                 function (err) {
//                     done(err, null);
//                 }
//             );
//     }
//
//     function authorized(req, res, next) {
//         if (!req.isAuthenticated()) {
//             console.log("lala");
//             res.send(401);
//         } else {
//             next();
//         }
//     }
//
//     function updateUser(req, res) {
//         var userId = req.params.userId;
//         var newUser = req.body;
//         userModel.updateUser(userId, newUser)
//             .then(
//                 function (status) {
//                     res.json(status);
//                 },
//                 function (error) {
//                     res.sendStatus(400);
//                 }
//             );
//     }
// };