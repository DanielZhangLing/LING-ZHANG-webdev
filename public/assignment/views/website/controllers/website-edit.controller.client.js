/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)
    function WebsiteEditController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init(){
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function updateWebsite(newWebsite){
            WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();