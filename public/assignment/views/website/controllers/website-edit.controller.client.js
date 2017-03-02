/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
    function WebsiteEditController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function(website){
                    vm.website = website;
                });
        }

        init();

        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .success(function (website) {
                    if ( null == website) {
                        vm.error = "unable to update website";
                    } else {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                });
        }
    }
})();