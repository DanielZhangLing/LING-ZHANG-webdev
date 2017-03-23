/**
 * Created by LingZhang on 3/11/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});

    return PageSchema;
};