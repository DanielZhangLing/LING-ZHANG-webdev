/**
 * Created by LingZhang on 2/8/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http){
        var api={
            "createWebsite" : createWebsite,
            "findAllWebsitesForUser" : findAllWebsitesForUser,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        }
        return api;
        function createWebsite(userId, website){
            return $http.post("/api/user/"+userId+"/website",website)
            // website.developerId = userId;
            // website._id = websites.length + 1;
            // websites.push(website);// certification modify latter how to create id
        }
        function findAllWebsitesForUser(userId){
            return $http.get("/api/user/"+userId+"/website");
            // res = [];
            // for (var w in websites){
            //     var website = websites[w];
            //     if(website.developerId == userId){
            //         res.push(angular.copy(website));
            //     }
            // }
            // return res;
        }
        function findWebsiteById(websiteId){
            return $http.get("/api/website/"+websiteId);
            // for (var w in websites){
            //     var website = websites[w];
            //     if(website._id == websiteId){
            //         return angular.copy(website);
            //     }
            // }
            // return null;
        }
        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/"+websiteId, newWebsite);
            // for (var w in websites){
            //     var website = websites[w];
            //     if(website._id == websiteId){
            //         website.name = newWebsite.name;
            //         website.description = newWebsite.description;
            //         return website;
            //     }
            // }
            // return null;
        }
        function deleteWebsite(websiteId){
            return $http.delete("/api/website/"+websiteId);
        }
        //     for (var w in websites){
        //         var website = websites[w];
        //         if(website._id == websiteId){
        //             websites.splice(w,1);
        //             break;
        //         }
        //     }
        // }

    }
})();