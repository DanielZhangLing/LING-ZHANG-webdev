/**
 * Created by LingZhang on 4/4/17.
 */
module.exports = function () {

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        updateUser: updateUser,
    };

    var q = require("q");
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', userSchema);

    return api;

    function createUser(user) {
        var d = q.defer();
        UserModel
            .create(user,
                function (err, user) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(user);
                    }
                });
        return d.promise;
    }

    function findAllUsers() {
        var d = q.defer();
        UserModel
            .find(function (err, users) {
                if (err) {
                    d.abort(err);
                } else {
                    d.resolve(users);
                }
            });
        return d.promise;
    }

    function findUserById(userId) {
        var d = q.defer();
        UserModel.findById(userId,
            function (err, user) {
                if (err) {
                    d.abort(err)
                } else {
                    d.resolve(user);
                }
            });
        return d.promise;
    }

    function findUserByUsername(userName) {
        console.log("wawawa");
        var d = q.defer();
        UserModel.findOne({username: userName}, function (err, user) {
            console.log("wawawawa");
            if (err) {
                d.reject(err);
            }
            else {
                d.resolve(user);
            }
        });
        return d.promise;
    }

    function findUserByCredentials(credentials) {
        var d = q.defer();
        UserModel
            .findOne({
                    username: credentials.username,
                    password: credentials.password
                },
                function (err, user) {
                    if (err) {
                        console.log("heheh5");
                        d.abort(err)
                    } else {
                        console.log("heheh6");
                        d.resolve(user);
                    }
                });
        return d.promise;
    }

    function deleteUser(userId) {
        var d = q.defer();
        UserModel.remove({_id: userId},
            function (err, status) {
                if (err) {
                    d.abort(err);
                }
                else {
                    d.resolve(status);
                }
            });
    }

    function updateUser(userId, user) {
        var d = q.defer();
        UserModel
            .update({
                    _id: userId
                }, {
                    $set: user
                },
                function (err, user) {
                    if (err) {
                        d.abort()
                    } else {
                        d.resolve(user);
                    }
                });
        return d.promise;
    }
};