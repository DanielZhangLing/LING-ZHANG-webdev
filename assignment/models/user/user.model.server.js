module.exports = function () {

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsiteForUser: addWebsiteForUser,
        deleteWebsiteForUser: deleteWebsiteForUser
    };

    var q = require('q');
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function deleteWebsiteForUser(userId, websiteId) {
        var d = q.defer();
        UserModel.findById(userId)
            .then(function (user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                user.save(function (err, user) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function addWebsiteForUser(userId, website) {
        var d = q.defer();
        UserModel.findById(userId)
            .then(function (user) {
                user.websites.push(website._id);
                user.save(function (err, user) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(user);
                    }
                });
            });

        return d.promise;
    }

    function findUserById(userId) {
        var d = q.defer();
        UserModel
            .findById(userId,
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
        var d = q.defer();
        UserModel.findOne({username: userName}, function (err, user) {
            if (err) {
                d.reject(err);
            }
            else {
                d.resolve(user);
            }
        });
        return d.promise;
    }

    function findUserByCredentials(username, password) {
        var d = q.defer();
        UserModel
            .findOne({
                    username: username,
                    password: password
                },
                function (err, user) {
                    if (err) {
                        d.abort(err)
                    } else {
                        d.resolve(user);
                    }
                });
        return d.promise;
    }

    function createUser(user) {
        var d = q.defer();
        console.log(user);
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

    function updateUser(userId, newUser) {
        var d = q.defer();
        UserModel
            .update({
                    _id: userId
                }, {
                    username: newUser.username,
                    password: newUser.password,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone
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
};