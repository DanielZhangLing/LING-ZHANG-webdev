/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user) {
                vm.user = user;
            });
        }

        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if (user == null) {
                        vm.error = "unable to update user";
                    } else {
                        vm.message = "user successfully updated"
                    }
                });

        }
    }
})();