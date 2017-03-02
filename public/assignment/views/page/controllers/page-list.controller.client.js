/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
    function PageListController(PageService, $routeParams) {
        var vm = this;
        vm.userId  = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init(){
            var promise = PageService
                .findPageByWebsiteId(vm.websiteId);
            promise.success(function(pages){
                vm.pages = pages;
            })
        }
        init();
    }
})();