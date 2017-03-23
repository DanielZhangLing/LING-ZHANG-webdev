/**
 * Created by LingZhang on 3/22/17.
 */
/**
 * Created by LingZhang on 2/10/17.
 */
(function () {
        angular
            .module("WebAppMaker")
            .controller("WidgetFlickrController", WidgetFlickrController)
        function WidgetFlickrController($sce, $routeParams, WidgetService, FlickrService, $location) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            function init() {
            }

            init();

            vm.searchPhotos = function (searchTerm) {
                FlickrService
                    .searchPhotos(searchTerm)
                    .then(function (response) {
                        data = response.data.replace("jsonFlickrApi(", "");
                        data = data.substring(0, data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
            }
            vm.selectPhoto = function (photo) {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
                WidgetService
                    .updateWidget(vm.widgetId, {url: url})
                    .then(function (res) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                    });
            }

        }
    })();