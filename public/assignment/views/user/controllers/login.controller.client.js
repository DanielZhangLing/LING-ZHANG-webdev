/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;
        function init() {
        }
        init();

        function login(user) {
            var promise = UserService.
                findUserByCredentials(user.username, user.password);
            promise.success(function(user){
                if (user != null) {
                    $location.url("/profile/" + user._id)
                }
                else {
                    vm.error = "user not found, either username or password could be incorrect!"
                }
            });

        }

    }
})();