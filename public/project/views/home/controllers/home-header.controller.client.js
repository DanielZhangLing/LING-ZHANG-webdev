/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("HeaderController", HeaderController);
    function HeaderController(spotService, $sce, $routeParams, $location) {
        var vm = this;
        function init() {

        }

        init();

        function search(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();