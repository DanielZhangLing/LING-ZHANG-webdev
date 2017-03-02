/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController)
    function PageNewController(PageService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPageById(vm.pageId);
            promise.success(function(page){
                vm.page = page;
            });

            var promise2 = PageService.findPageByWebsiteId(vm.websiteId);
            promise2.success(function(pages){
                vm.pages = pages;
            });
        }

        init();

        function createPage(newPage) {
            if (newPage == null || newPage.name == null || newPage.title == null)
                vm.error = "name and title are required";
            else {
                PageService
                    .createPage(vm.websiteId, newPage)
                    .success(function(){
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    });
            }
        }
    }
})();