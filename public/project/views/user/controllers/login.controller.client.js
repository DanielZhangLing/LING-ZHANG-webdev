/**
 * Created by LingZhang on 4/3/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("LoginController", LoginController);
    function LoginController(userService, $location) {
        var vm = this;
        vm.login = login;
        function init() {
        }
        init();

        function login(user) {
            console.log("fuck");
            userService
                .login(user)
                .then(function (user) {
                    console.log("im here2");
                    if (user) {
                        $location.url("/user/" + user._id)
                    }
                    else {
                        console.log('asda');
                        vm.error = "user not found, either username or password could be incorrect!"
                    }
                });

        }

    }
})();