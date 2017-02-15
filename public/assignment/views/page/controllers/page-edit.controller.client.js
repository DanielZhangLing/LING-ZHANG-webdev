/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)
    function PageEditController(PageService,$routeParams,$location) {
        var vm = this;
        vm.userId  = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(newPage){
            PageService.updatePage(vm.pageId, newPage);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();