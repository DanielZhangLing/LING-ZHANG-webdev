module.exports = function (app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server")(app, model);
    require("./services/spot.service.server")(app, model);
    // require("./services/page.service.server")(app,model);
    // require("./services/widget.service.server")(app, model);
};