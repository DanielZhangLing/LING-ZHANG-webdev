/**
 * Created by LingZhang on 2/8/17.
 */
/**
 * Created by LingZhang on 2/8/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService(){
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        var api={
            "createWebsite" : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        }
        return api;
        function createWebsite(userId, website){
            website.developerId = userId;
            website._id = websites.length + 1;
            websites.push(website);// certification modify latter how to create id
        }
        function findWebsitesByUser(userId){
            res = [];
            for (var w in websites){
                var website = websites[w];
                if(website.developerId == userId){
                    res.push(angular.copy(website));
                }
            }
            return res;
        }
        function findWebsiteById(websiteId){
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    return angular.copy(website);
                }
            }
            return null;
        }
        function updateWebsite(websiteId, newWebsite) {
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    website.name = newWebsite.name;
                    website.description = newWebsite.description;
                    return website;
                }
            }
            return null;
        }
        function deleteWebsite(websiteId){
            for (var w in websites){
                var website = websites[w];
                if(website._id == websiteId){
                    websites.splice(w,1);
                    break;
                }
            }
        }

    }
})();