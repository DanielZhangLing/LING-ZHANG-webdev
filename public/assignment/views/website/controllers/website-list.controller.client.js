/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
    function WebsiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.userId  = $routeParams["uid"];

        function init(){
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();

    }
})();