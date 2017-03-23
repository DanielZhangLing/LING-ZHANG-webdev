module.exports = function (app) {
    // var userModel = require("./models/user/user.model.server")();
    //var websiteModel = require("./models/website/website.model.server")();
    var model = require("./models/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/website.service.server")(app, model);
    require("./services/page.service.server")(app,model);
    require("./services/widget.service.server")(app, model);
};