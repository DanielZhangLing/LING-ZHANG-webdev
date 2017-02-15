/**
 * Created by LingZhang on 2/10/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)
    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.widget = WidgetService.findWidgetById(vm.widgetId);
        if(vm.widget != null )
            vm.widgetType = vm.widget.widgetType;
        else {
            vm.widgetType = $routeParams.wgt;
        }
        vm.createOrUpdateWidget = createOrUpdateWidget;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function getEditorTemplateUrl(widgetType) {
            var url = 'views/widget/templates/editors/widget-'+widgetType+'-editor.view.client.html';
            return url;
        }
        function createOrUpdateWidget(newWidget) {
            if(vm.widgetId == null)
                WidgetService.createWidget(vm.pageId, vm.widgetType, newWidget);
            else
                WidgetService.updateWidget(vm.widgetId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
        function updateWidget(newWidget){
            WidgetService.updateWidget(vm.widgetId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();