(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }
        return api;
        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page);
            // page.websiteId = websiteId;
            // page._id = pages.length + 1;
            // pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
            // res = [];
            // for (var p in pages){
            //     var page = pages[p];
            //     if(page.websiteId == websiteId){
            //         res.push(page);
            //     }
            // }
            // return res;
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
            // for (var p in pages){
            //     var page = pages[p];
            //     if(page._id == pageId)
            //         return angular.copy(page);
            // }
            // return null;
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/" + pageId, newPage);
            // for (var p in pages){
            //     var page = pages[p];
            //     if(page._id == pageId){
            //         page.name = newPage.name;
            //         page.description = newPage.description;
            //         return page;
            //     }
            // }
            // return null;
        }

        function deletePage(pageId, websiteId) {
            return $http.delete("/api/page/" + pageId + "/" + websiteId);
            // for (var p in pages){
            //     var page = pages[p];
            //     if(page._id == pageId){
            //         pages.splice(p,1);
            //         break;
            //     }
            // }
        }
    }
})();
