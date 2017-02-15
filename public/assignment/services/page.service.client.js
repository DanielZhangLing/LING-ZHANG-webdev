(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage" : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        }
        return api;
        function createPage(websiteId, page){
            page.websiteId = websiteId;
            page._id = pages.length + 1;
            pages.push(page);
        }
        function findPageByWebsiteId(websiteId){
            res = [];
            for (var p in pages){
                var page = pages[p];
                if(page.websiteId == websiteId){
                    res.push(page);
                }
            }
            return res;
        }
        function findPageById(pageId){
            for (var p in pages){
                var page = pages[p];
                if(page._id == pageId)
                    return angular.copy(page);
            }
            return null;
        }
        function updatePage(pageId, newPage) {
            for (var p in pages){
                var page = pages[p];
                if(page._id == pageId){
                    page.name = newPage.name;
                    page.description = newPage.description;
                    return page;
                }
            }
            return null;
        }
        function deletePage(pageId){
            for (var p in pages){
                var page = pages[p];
                if(page._id == pageId){
                    pages.splice(p,1);
                    break;
                }
            }
        }
    }
})();
