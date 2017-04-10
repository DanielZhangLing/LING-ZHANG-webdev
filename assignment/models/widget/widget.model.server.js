module.exports = function () {

    var api = {
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget: createWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        uploadImage: uploadImage,
    };

    var q = require('q');
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;

    function uploadImage(widgetId, newUrl) {
        var d = q.defer();
        WidgetModel
            .update({
                _id: widgetId
            }, {
                url: newUrl
            },function (err, widget) {
                if (err) {
                    d.reject(err);
                } else {
                    d.resolve(widget);
                }
            });
        return d.promise;
    }

    function findWidgetById(widgetId) {
        var d = q.defer();
        WidgetModel
            .findById(widgetId,
                function (err, widget) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(widget);
                    }
                });
        return d.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var d = q.defer();
        WidgetModel
            .find({
                _page: pageId
            }, function (err, widgets) {
                if (err) {
                    d.reject(err)
                } else {
                    d.resolve(widgets);
                }
            });
        return d.promise;
    }

    function createWidget(pageId, widget) {
        var d = q.defer();
        WidgetModel
            .find({_page: pageId})
            .then(function (widgets) {
                widget.index = widgets.length;
                WidgetModel.create(widget,
                    function (err, widget) {
                        if (err) {
                            d.reject(err);
                        } else {
                            d.resolve(widget);
                        }
                    });
            });

        return d.promise;
    }

    function updateWidget(widgetId, widget) {
        var d = q.defer();
        WidgetModel
            .update({
                    _id: widgetId
                }, {$set: widget},
                function (err, widget) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(widget);
                    }
                });
        return d.promise;
    }

    function deleteWidget(widgetId) {
        var d = q.defer();
        WidgetModel.remove({_id: widgetId},
            function (err, status) {
                if (err) {
                    d.reject(err);
                }
                else {
                    d.resolve(status);
                }
            });
        return d.promise;
    }

    function reorderWidget(pageId, start, end) {
        var d = q.defer();
        WidgetModel
            .update({
                    _page: pageId,
                    index: start
                }, {
                    index: end,
                },
                function (err, widget) {
                    if (err) {
                        d.reject()
                    } else {
                        d.resolve(widget);
                    }
                });
        return d.promise;
    }

    // function countWidget(pageId) {
    //     WidgetModel.count({
    //         _page: pageId,
    //     }, function (err, count) {
    //         console.log(count);
    //         return count;
    //     });
    // }
};