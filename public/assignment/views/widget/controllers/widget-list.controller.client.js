/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
    function WidgetListController($sce, $routeParams, WidgetService, PageService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            PageService
                .findPageById(vm.pageId)
                // .then(function (page, error) {
                //     if (error) {
                //         vm.error = 'no page found!'
                //     } else {
                //         return page.widgets;
                //     }
                // })
                .then(function (page) {
                    console.log(page);
                    var widgets = page.data.widgets;
                    console.log(widgets);
                    var widgetIndex = [];
                    for (w in  widgets) {
                        WidgetService
                            .findWidgetById(widgets[w])
                            .then(function (widget) {
                                widgetIndex.push(widget.data);
                            }, function (err) {
                                vm.error = 'sorting error';
                            });
                    }
                    vm.widgets = widgetIndex;
                    console.log(vm.widgets);
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