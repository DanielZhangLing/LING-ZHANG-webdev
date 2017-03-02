/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            var promise = WidgetService
                .findWidgetByPageId(vm.pageId);
            console.log(promise);
            promise.success(function (widgets) {
                vm.widgets = widgets;
            });
        }

        init();

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();