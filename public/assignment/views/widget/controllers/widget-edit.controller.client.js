/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
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
        vm.createOrUpdateWidget = createOrUpdateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.widgetType = vm.widget.type;

                })
                .error(function () {
                    vm.widgetType = $routeParams.wgt;
                });
            // console.log(vm.widget);
            // if (vm.widget != null)
            //     vm.widgetType = vm.widget.widgetType;
            // else {
            //     vm.widgetType = $routeParams.wgt;
            // }
            // console.log(vm.widgetType);
        }

        init();

        function getEditorTemplateUrl(widgetType) {
            var url = 'views/widget/templates/editors/widget-' + widgetType + '-editor.view.client.html';
            return url;
        }

        function createOrUpdateWidget(newWidget) {
            if (vm.widgetId == null)
                WidgetService
                    .createWidget(vm.pageId, vm.widgetType, newWidget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {
                        vm.error = "Adding failed!"
                    });
            else
                WidgetService
                    .updateWidget(vm.widgetId, newWidget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function () {
                        vm.error = "updating failed!"
                    });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId, vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    vm.error = "Adding failed!"
                });
        }

    }
})();