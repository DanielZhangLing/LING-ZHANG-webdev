/**
 * Created by LingZhang on 4/10/17.
 */
/**
 * Created by LingZhang on 4/4/17.
 */
module.exports = function () {

    var api = {
        // createUser: createUser,
        // findUserByCredentials: findUserByCredentials,
        // findUserById: findUserById,
        // findUserByUsername: findUserByUsername,
        // findAllUsers: findAllUsers,
        // deleteUser: deleteUser,
        // updateUser: updateUser,
        // findSpotByGeoId: findSpotByGeoId,
        createStory: createStory,
    };

    var q = require("q");
    var mongoose = require('mongoose');
    var storySchema = require('./story.schema.server')();
    var StoryModel = mongoose.model('StoryModel', storySchema);

    return api;

    // function findSpotByGeoId(spotGeoId) {
    //     var d = q.defer();
    //     console.log(spotGeoId)
    //     SpotModel
    //         .findOne({geoNameId: spotGeoId},
    //             function (err, spot) {
    //                 if (err) {
    //                     console.log('1')
    //                     d.reject(err);
    //                 }
    //                 else {
    //                     console.log(spot)
    //                     d.resolve(spot);
    //                 }
    //             });
    //     return d.promise;
    // }

    function createStory(story) {
        var d = q.defer();
        StoryModel
            .create(story,
                function (err, story) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(story);
                    }
                });
        return d.promise;
    }

    // function findAllUsers() {
    //     var d = q.defer();
    //     UserModel
    //         .find(function (err, users) {
    //             if (err) {
    //                 d.abort(err);
    //             } else {
    //                 d.resolve(users);
    //             }
    //         });
    //     return d.promise;
    // }
    //
    // function findUserById(userId) {
    //     var d = q.defer();
    //     UserModel.findById(userId,
    //         function (err, user) {
    //             if (err) {
    //                 d.abort(err)
    //             } else {
    //                 d.resolve(user);
    //             }
    //         });
    //     return d.promise;
    // }
    //
    // function findUserByUsername(userName) {
    //     console.log("wawawa");
    //     var d = q.defer();
    //     UserModel.findOne({username: userName}, function (err, user) {
    //         console.log("wawawawa");
    //         if (err) {
    //             d.reject(err);
    //         }
    //         else {
    //             d.resolve(user);
    //         }
    //     });
    //     return d.promise;
    // }
    //
    // function findUserByCredentials(credentials) {
    //     var d = q.defer();
    //     UserModel
    //         .findOne({
    //                 username: credentials.username,
    //                 password: credentials.password
    //             },
    //             function (err, user) {
    //                 if (err) {
    //                     console.log("heheh5");
    //                     d.abort(err)
    //                 } else {
    //                     console.log("heheh6");
    //                     d.resolve(user);
    //                 }
    //             });
    //     return d.promise;
    // }
    //
    // function deleteUser(userId) {
    //     var d = q.defer();
    //     UserModel.remove({_id: userId},
    //         function (err, status) {
    //             if (err) {
    //                 d.abort(err);
    //             }
    //             else {
    //                 d.resolve(status);
    //             }
    //         });
    // }
    //
    // function updateUser(userId, user) {
    //     var d = q.defer();
    //     UserModel
    //         .update({
    //                 _id: userId
    //             }, {
    //                 $set: user
    //             },
    //             function (err, user) {
    //                 if (err) {
    //                     d.abort()
    //                 } else {
    //                     d.resolve(user);
    //                 }
    //             });
    //     return d.promise;
    // }
};