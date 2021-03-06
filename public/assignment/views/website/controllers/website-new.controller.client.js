/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)
    function WebsiteNewController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

        function createWebsite(newWebsite) {
            if (newWebsite == null || newWebsite.name == null)
                vm.error = "name is required";
            else {
                WebsiteService
                    .createWebsite(vm.userId, newWebsite)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    });
            }
        }
    }
})();