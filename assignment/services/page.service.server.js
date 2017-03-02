module.exports = function (app) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId){
                page.name = newPage.name;
                page.description = newPage.description;
                res.json(page);
                return;
            }
        }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId)
                res.json(page);
                return;
        }
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        result = [];
        for (var p in pages){
            var page = pages[p];
            if(page.websiteId == websiteId){
                result.push(page);
            }
        }
        res.json(result);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page.websiteId = websiteId;
        page._id = pages.length + 1;
        pages.push(page);
        res.json(page);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages){
            var page = pages[p];
            if(page._id == pageId){
                pages.splice(p,1);
                res.json(pageId);
                return;
            }
        }
    }
}