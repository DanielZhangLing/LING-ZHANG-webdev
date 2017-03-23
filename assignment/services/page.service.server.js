module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId/:websiteId", deletePage);

    pageModel = model.pageModel;
    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel.updatePage(pageId, newPage)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // for (var p in pages){
        //     var page = pages[p];
        //     if(page._id == pageId){
        //         page.name = newPage.name;
        //         page.description = newPage.description;
        //         res.json(page);
        //         return;
        //     }
        // }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // for (var p in pages){
        //     var page = pages[p];
        //     if(page._id == pageId)
        //         res.json(page);
        //         return;
        // }
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // result = [];
        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page.websiteId == websiteId) {
        //         result.push(page);
        //     }
        // }
        // res.json(result);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._website = websiteId;
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    return model
                        .websiteModel
                        .addPageForWebsite(websiteId, page);
                }
            )
            .then(
                function (page) {
                    res.json(page);
                }, function (error) {
                    res.sendStatus(500);
                });
        // page.websiteId = websiteId;
        // page._id = pages.length + 1;
        // pages.push(page);
        // res.json(page);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var websiteId = req.params.websiteId;
        pageModel
            .deletePage(pageId)
            .then(
                function () {
                    return model
                        .websiteModel
                        .deletePageForWebsite(websiteId, pageId);
                })
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400);
                });
        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page._id == pageId) {
        //         pages.splice(p, 1);
        //         res.json(pageId);
        //         return;
        //     }
        // }
    }
}