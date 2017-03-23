module.exports = function () {

    var api = {
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetForPage: addWidgetForPage,
        deleteWidgetForPage: deleteWidgetForPage,
        reorderWidgetForPage: reorderWidgetForPage,
    };

    var q = require('q');
    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    return api;

    function reorderWidgetForPage(pageId, start, end) {
        var d = q.defer();
        console.log(start);
        console.log(end);
        PageModel.findById(pageId)
            .then(function (page) {
                console.log(page.widgets);
                var widgets = page.widgets;
                var temp = widgets[start];
                for (var w in widgets) {
                    if (w > start && w <= end)
                        widgets[w - 1] = widgets[w];
                    else if ((widgets.length - w - 1) <= start
                        && (widgets.length - w - 1) > end)
                        widgets[widgets.length - w - 1]
                            = widgets[widgets.length - w - 2];
                }
                widgets[end] = temp;
                page.widgets = widgets;
                console.log(page.widgets);
                page.markModified('widgets');
                page.save(function (err, page) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(page);
                    }
                });
            });
        return d.promise;
    }

    function deleteWidgetForPage(pageId, widgetId) {
        var d = q.defer();
        PageModel.findById(pageId)
            .then(function (page) {
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                page.save(function (err, page) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(page);
                    }
                });
            });
        return d.promise;
    }

    function addWidgetForPage(pageId, widget) {
        console.log(pageId);
        console.log(widget._id);
        var d = q.defer();
        PageModel.findById(pageId)
            .then(function (page) {
                page.widgets.push(widget._id);
                page.save(function (err, page) {
                    if (err) {
                        d.reject();
                    } else {
                        d.resolve(page);
                    }
                });
            });

        return d.promise;
    }

    function findPageById(pageId) {
        var d = q.defer();
        PageModel
            .findById(pageId,
                function (err, page) {
                    if (err) {
                        d.reject(err);
                    } else {
                        d.resolve(page);
                    }
                });
        return d.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var d = q.defer();
        PageModel
            .find({
                _website: websiteId
            })
            .populate('widgets')
            .exec(function (err, page) {
                if (err) {
                    d.abort(err)
                } else {
                    d.resolve(page);
                }
            });
        return d.promise;
    }

    function createPage(websiteId, page) {
        var d = q.defer();
        PageModel
            .create(page,
                function (err, page) {
                    if (err) {
                        d.abort(err);
                    } else {
                        d.resolve(page);
                    }
                });
        return d.promise;
    }

    function updatePage(pageId, page) {
        var d = q.defer();
        PageModel
            .update({
                    _id: pageId
                }, {
                    name: page.name,
                    title: page.title,
                    description: page.description,
                },
                function (err, page) {
                    if (err) {
                        d.abort()
                    } else {
                        d.resolve(page);
                    }
                });
        return d.promise;
    }

    function deletePage(pageId) {
        var d = q.defer();
        PageModel.remove({_id: pageId},
            function (err, status) {
                if (err) {
                    d.abort(err);
                }
                else {
                    d.resolve(status);
                }
            });
        return d.promise;
    }
};