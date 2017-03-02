/**
 * Created by LingZhang on 3/1/17.
 */
(function () {
    angular
        .module('wbdvDirectives', [])
        .directive('wbdvDraggable', wbdvDraggableDir)
        .directive('wbdvSortable', wbdvSortableDir);

    function wbdvSortableDir($http, $routeParams) {
        function linkFunction(scope, element) {
            var pageId = $routeParams['pid'];
            var index1 = -1;
            var index2 = -1;
            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    index1 = ui.item.index();
                },
                stop: function (event, ui) {
                    index2 = ui.item.index();
                    $http.put("/api/page/"+pageId+"/widget?initial="+index1+"&final="+index2);
                }
        });

        }

        return {
            link: linkFunction
        }
    }

    function wbdvDraggableDir() {
        function linkFunction(scope, element) {
            element.draggable();
        }

        return {
            link: linkFunction
        }
    }

})();