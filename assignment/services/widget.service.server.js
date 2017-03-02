/**
 * Created by LingZhang on 2/18/17.
 */
module.exports = function (app) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", switchWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        {"_id": "123", "widgetType": "heading", "pageId": "321", "size": 2, "text": "GIZMODO", "order": "1"},
        {"_id": "234", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": "0"},
        {
            "_id": "345", "widgetType": "image", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "order": "2"
        },
        {"_id": "456", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": "3"},
        {"_id": "567", "widgetType": "heading", "pageId": "321", "size": 4, "text": "Lorem ipsum", "order": "4"},
        {
            "_id": "678", "widgetType": "youtube", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "order": "5"
        },
        {"_id": "789", "widgetType": "html", "pageId": "321", "text": "<p>Lorem ipsum</p>", "order": "6"}
    ];

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;

        var callbackUrl   = "#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        console.log(callbackUrl);
        res.redirect(callbackUrl);
    }

    function switchWidget(req, res) {
        var index1 = req.query.initial;
        var index2 = req.query.final;
        var pageId = req.params.pageId;
        result = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget.pageId == pageId) {
                if (widget.order > index1 && widget.order <= index2)
                    widget.order--;
                else if (widget.order < index1 && widget.order >= index2)
                    widget.order++;
                else if (widget.order == index1)
                    widget.order = index2;
            }
        }
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id == widgetId) {
                widget.type = newWidget.type;
                widget.size = newWidget.size;
                widget.text = newWidget.text;
                widget.url = newWidget.url;
                widget.width = newWidget.width;
                res.json(widget);
                return;
            }
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        console.log("im here");
        console.log(widgetId);
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id == widgetId) {
                console.log("im here2");
                console.log(widget);
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        result = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget.pageId == pageId) {
                result.push(widget);
            }
        }
        res.json(result);
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widgetType = req.body.widgetType;
        var widget = req.body.widget;
        widget.pageId = pageId;
        widget.widgetType = widgetType;
        widget._id = widgets.length + 1;
        result = [];
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget.pageId == pageId) {
                result.push(widget);
            }
        }
        widget.order = result.length;
        widgets.push(widget);
        res.json(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id == widgetId) {
                widgets.splice(w, 1);
                res.json(widgetId);
            }
        }
    }
};