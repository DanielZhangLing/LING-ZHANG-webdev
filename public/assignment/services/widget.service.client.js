(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService(){
        var widgets = [
            { "_id": "123", "widgetType": "heading", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "image", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "youtube", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget" : createWidget,
            "findWidgetByPageId" : findWidgetByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget,
            "findAllWidgets" : findAllWidgets
        }
        return api;
        function createWidget(pageId, widgetType, widget){
            widget.pageId = pageId;
            widget.widgetType = widgetType;
            widget._id = widgets.length + 1;
            widgets.push(widget);
            return widget;
        }
        function findWidgetByPageId(pageId){
            res = [];
            for (var w in widgets){
                var widget = widgets[w];
                if(widget.pageId == pageId){
                    res.push(widget);
                }
            }
            return res;
        }
        function findWidgetById(widgetId){
            for (var w in widgets){
                var widget = widgets[w];
                if(widget._id == widgetId)
                    return angular.copy(widget);
            }
            return null;
        }
        function updateWidget(widgetId, newWidget) {
            for (var w in widgets){
                var widget = widgets[w];
                if(widget._id == widgetId){
                    widget.type = newWidget.type;
                    widget.size = newWidget.size;
                    widget.text = newWidget.text;
                    widget.url = newWidget.url;
                    widget.width = newWidget.width;
                    return widget;
                }
            }
            return null;
        }
        function deleteWidget(widgetId){
            for (var w in widgets){
                var widget = widgets[w];
                if(widget._id == widgetId){
                    widgets.splice(w,1);
                    break;
                }
            }
        }
        function findAllWidgets(){
            return widgets;
        }
    }
})();
