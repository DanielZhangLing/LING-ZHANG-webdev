module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var w in websites){
            var website = websites[w];
            if(website._id == websiteId){
                website.name = newWebsite.name;
                website.description = newWebsite.description;
                res.json(website);
                return
            }
        }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var w in websites){
            var website = websites[w];
            if(website._id == websiteId){
                res.json(website);
                return;
            }
        }
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        result = [];
        for (var w in websites){
            var website = websites[w];
            if(website.developerId == userId){
                result.push(website);
            }
        }
        res.json(result);
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website.developerId = userId;
        website._id = websites.length + 1;
        console.log(website);
        websites.push(website);
        res.json(website);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    websites.splice(w,1);
                    return res.json(websiteId);//can i return nothing?
                }
            }
    }
};