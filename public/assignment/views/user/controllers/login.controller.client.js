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
            var loginUser = UserService.
                findUserByCredentials(user.username, user.password);
            if (loginUser != null) {
                $location.url("/profile/" + loginUser._id)
            }
            else {
                vm.error = "user not found, either username or password could be incorrect!"
            }
        }

    }
})();