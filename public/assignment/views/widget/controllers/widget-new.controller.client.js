/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController)
    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetTypes =
            ["heading", "label", "html", "text input", "link", "button", "image", "youtube", "data table", "repeater"];
        // function createWidget(newWidgetType){
        //     var widget = {widgetType : newWidgetType};
        //     var newWidget = WidgetService.createWidget(vm.pageId, widget);
        //     $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        // }
    }
})();