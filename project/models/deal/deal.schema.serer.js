/**
 * Created by LingZhang on 4/1/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var DealSchema = mongoose.Schema({
        title: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        description: String,
        location: String,
        price: Number,
        rate: Number,
        tags: [{type: String}], // TODO: add tag model
        likeUser: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
        reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReviewModel'}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: 'project.deal'});

    return DealSchema;
};