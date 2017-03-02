/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)
    function PageEditController(PageService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var promise = PageService.findPageById(vm.pageId);
            promise.success(function (page) {
                vm.page = page;
            });

            var promise2 = PageService.findPageByWebsiteId(vm.websiteId);
            promise2.success(function (pages) {
                vm.pages = pages;
            });
        }

        init();

        function updatePage(newPage) {
            PageService
                .updatePage(vm.pageId, newPage)
                .success(function (page) {
                    if (null == page) {
                        vm.error = "unable to update page";
                    }
                    else {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }
})();