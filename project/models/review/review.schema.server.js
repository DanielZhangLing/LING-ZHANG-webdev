/**
 * Created by LingZhang on 4/1/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var ReviewSchema = mongoose.Schema({
        story: {type: mongoose.Schema.Types.ObjectId, ref: 'StoryModel'},
        deal: {type: mongoose.Schema.Types.ObjectId, ref: 'DealModel'},
        name: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        email: String,
        rate: Number,
        comments: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'project.review'});

    return ReviewSchema;
};