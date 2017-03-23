module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId/:userId", deleteWebsite);

    websiteModel = model.websiteModel;

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel.updateWebsite(websiteId, newWebsite)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // for (var w in websites){
        //     var website = websites[w];
        //     if(website._id == websiteId){
        //         website.name = newWebsite.name;
        //         website.description = newWebsite.description;
        //         res.json(website);
        //         return
        //     }
        // }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel.findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // for (var w in websites){
        //     var website = websites[w];
        //     if(website._id == websiteId){
        //         res.json(website);
        //         return;
        //     }
        // }
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel.findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website._user = userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (website) {
                    return model
                        .userModel
                        .addWebsiteForUser(userId, website);
                }
            )
            .then(
                function (website) {
                    res.json(website);
                }, function (error) {
                    res.sendStatus(500);
                });
        // website.developerId = userId;
        // website._id = websites.length + 1;
        // console.log(website);
        // websites.push(website);
        // res.json(website);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId
        console.log(websiteId);
        var userId = req.params.userId;
        console.log(userId);
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function () {
                    return model
                        .userModel
                        .deleteWebsiteForUser(userId, websiteId);
                })
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400);
                });
        // for (var w in websites){
        //     var website = websites[w];
        //     if(website._id == websiteId){
        //         websites.splice(w,1);
        //         return res.json(websiteId);//can i return nothing?
        //     }
        // }
    }
};