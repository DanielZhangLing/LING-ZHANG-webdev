/**
 * Created by LingZhang on 3/11/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: ['heading', 'image', 'youtube', 'html', 'input', 'text']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        index: Number,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'widget'});

    return WidgetSchema;
};