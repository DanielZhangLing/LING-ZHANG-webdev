/**
 * Created by LingZhang on 2/18/17.
 */
module.exports = function (app, model) {

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", switchWidget);
    app.delete("/api/widget/:widgetId/:pageId", deleteWidget);

    widgetModel = model.widgetModel;

    // var widgets = [
    //     {"_id": "123", "widgetType": "heading", "pageId": "321", "size": 2, "text": "GIZMODO", "order": 1},
    //     {"_id": "234", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 0},
    //     {
    //         "_id": "345", "widgetType": "image", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/", "order": 2
    //     },
    //     {"_id": "456", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 3},
    //     {"_id": "567", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": 4},
    //     {
    //         "_id": "678", "widgetType": "youtube", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E", "order": 5
    //     },
    //     {"_id": "789", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": 6}
    // ];

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var myFile = req.file;

        var filename = myFile.filename;
        var path = "/uploads/" + req.file.filename;

        widgetModel.uploadImage(widgetId, path)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // for (var w in widgets) {
        //     wid = widgets[w];
        //     if (wid._id == widgetId) {
        //         wid.url = path;
        //         break;
        //     }
        // }

        var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
    }

    function switchWidget(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;
        model.pageModel.reorderWidgetForPage(pageId, start, end)
            .then(
                function (page) {
                    res.json(page);
                }, function (error) {
                    res.sendStatus(500);
                });
        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget.pageId == pageId) {
        //         if (widget.order > index1 && widget.order <= index2)
        //             widget.order--;
        //         else if (widget.order < index1 && widget.order >= index2)
        //             widget.order++;
        //         else if (widget.order == index1)
        //             widget.order = index2;
        //     }
        // }
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel.updateWidget(widgetId, newWidget)
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget._id == widgetId) {
        //         widget.type = newWidget.type;
        //         widget.size = newWidget.size;
        //         widget.text = newWidget.text;
        //         widget.url = newWidget.url;
        //         widget.width = newWidget.width;
        //         res.json(widget);
        //         return;
        //     }
        // }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    console.log(widgets);
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widgetType = req.body.widgetType;
        var widget = req.body.widget;
        // var row = widgetModel
        //     .countWidget(pageId);
        // console.log('row='+ row);
        // row = row+1;
        widget._page = pageId;
        widget.type = widgetType;
        // widget.row = row;
        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    return model
                        .pageModel
                        .addWidgetForPage(pageId, widget);
                }
            )
            .then(
                function (widget) {
                    res.json(widget);
                }, function (error) {
                    res.sendStatus(500);
                });
        // result = [];
        // for (var w in widgets) {
        //     var wid = widgets[w];
        //     if (wid.pageId == pageId) {
        //         result.push(wid);
        //     }
        // }
        // var widgetType = req.body.widgetType;
        // var widget = req.body.widget;
        // widget.pageId = pageId;
        // widget.widgetType = widgetType;
        // widget._id = widgets.length + 1;
        // widget.order = result.length;
        // widgets.push(widget);
        // return res.json(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var pageId = req.params.pageId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    return model
                        .pageModel
                        .deleteWidgetForPage(pageId, widgetId);
                })
            .then(
                function (status) {
                    res.send(status);
                },
                function (error) {
                    res.sendStatus(400);
                });
        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget._id == widgetId) {
        //         widgets.splice(w, 1);
        //         res.json(widgetId);
        //     }
        // }
    }
};