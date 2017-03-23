(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetByPageId": findWidgetByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgets": findAllWidgets
        }
        return api;
        function createWidget(pageId, widgetType, widget) {
            return $http.post("/api/page/" + pageId + "/widget"
                , {
                    "widgetType": widgetType,
                    "widget": widget
                });
            // widget.pageId = pageId;
            // widget.widgetType = widgetType;
            // widget._id = widgets.length + 1;
            // widgets.push(widget);
            // return widget;
        }

        function findWidgetByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
            // res = [];
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if(widget.pageId == pageId){
            //         res.push(widget);
            //     }
            // }
            // return res;
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if(widget._id == widgetId)
            //         return angular.copy(widget);
            // }
            // return null;
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/" + widgetId, newWidget);
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if(widget._id == widgetId){
            //         widget.type = newWidget.type;
            //         widget.size = newWidget.size;
            //         widget.text = newWidget.text;
            //         widget.url = newWidget.url;
            //         widget.width = newWidget.width;
            //         return widget;
            //     }
            // }
            // return null;
        }

        function deleteWidget(widgetId, pageId) {
            return $http.delete("/api/widget/" + widgetId + "/" + pageId);
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if(widget._id == widgetId){
            //         widgets.splice(w,1);
            //         break;
            //     }
            // }
        }

        function findAllWidgets() {
            return widgets;
        }
    }
})();
