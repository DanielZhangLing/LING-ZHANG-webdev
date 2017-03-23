module.exports = function () {

    var api = {
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsiteForUser: createWebsiteForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        addPageForWebsite: addPageForWebsite,
        deletePageForWebsite: deletePageForWebsite
    };

    var q = require('q');
    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    return api;

    function deletePageForWebsite(websiteId, pageId){
        var d = q.defer();
        WebsiteModel.findById(websiteId)
            .then(function(website){
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                website.save(function(err, website){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(website);
                    }
                });
            });

        return d.promise;
    }

    function addPageForWebsite(websiteId, page){
        var d = q.defer();
        WebsiteModel.findById(websiteId)
            .then(function(website){
                website.pages.push(page._id);
                website.save(function(err, website){
                    if(err){
                        d.reject();
                    }else{
                        d.resolve(website);
                    }
                });
            });

        return d.promise;
    }

    function findWebsiteById(websiteId) {
        var d = q.defer();
        WebsiteModel
            .findById(websiteId,
                function (err, website) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(website);
                    }
                });
        return d.promise;
    }

    function findAllWebsitesForUser(userId) {
        var d = q.defer();
        WebsiteModel
            .find({
                _user: userId
            })
            .populate('pages')
            .exec(function (err, website) {
                if (err) {
                    d.abort(err)
                } else {
                    d.resolve(website);
                }
            });
        return d.promise;
    }

    function createWebsiteForUser(userId, website) {
        var d = q.defer();
        WebsiteModel
            .create(website,
                function (err, website) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(website)
                        // d.then(function (website) {
                        //     console.log(website)
                        //     UserModel
                        //         .findById(userId, function (err, user) {
                        //             user.websites.push(website._id);
                        //             user.save();
                        //             d.resolve(user);
                        //         })
                        // });

                    }
                });
        console.log(d.promise)
        return d.promise;
    }

    function updateWebsite(websiteId, website) {
        var d = q.defer();
        WebsiteModel
            .update({
                    _id: websiteId
                }, {
                    name: website.name,
                    description: website.description,
                },
                function (err, website) {
                    if (err) {
                        d.abort()
                    } else {
                        d.resolve(website);
                    }
                });
        return d.promise;
    }

    function deleteWebsite(websiteId) {
        var d = q.defer();
        WebsiteModel.remove({_id: websiteId},
            function (err, status) {
                if (err) {
                    d.abort(err);
                }
                else {
                    d.resolve(status);
                }
            });
        return d.promise;
    }
};