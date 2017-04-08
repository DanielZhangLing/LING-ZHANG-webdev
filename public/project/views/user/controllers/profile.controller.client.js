/**
 * Created by LingZhang on 3/28/17.
 */
/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("ProfileController", ProfileController);
    function ProfileController($location, userService, currentUser, $timeout) {
        var vm = this;
        vm.user = currentUser;
        vm.editable = false;
        var userId = vm.user._id;
        vm.updateUser = updateUser;
        vm.editUser = editUser;
        vm.cancelUpdate = cancelUpdate;
        vm.logout = logout;
        function init() {
        }

        init();

        function editUser(){
            vm.editable = true;
        }

        function logout() {
            userService
                .logout()
                .then(function (reponse) {
                    $location.url('/login');
                });
        }
        function updateUser(newUser) {
            userService
                .updateUser(userId, newUser)
                .then(function (user) {
                    if (user == null) {
                        vm.error = "unable to update user";
                        $timeout(function() { vm.error = false; }, 3000);
                    } else {
                        vm.message = "user successfully updated";
                        vm.editable = false;
                        $timeout(function() { vm.message = false; }, 3000);
                    }
                });

        }

        function cancelUpdate(){
            vm.editable = false;
        }

        // var vm = this;
        // console.log("aa");
        // jQuery('.nav-link').on('click', function(){
        //     jQuery('.tab-pane').removeClass('active');
        //     // $('#' + $(this).data('tab')').addClass('active');
        // });
        // var userId = $routeParams['uid'];
        // vm.updateUser = updateUser;
        //
        // function init() {
        //     var promise = UserService.findUserById(userId);
        //     promise.success(function (user) {
        //         vm.user = user;
        //     });
        // }
        //
        // init();
        //
        // function updateUser(newUser) {
        //     UserService
        //         .updateUser(userId, newUser)
        //         .success(function (user) {
        //             if (user == null) {
        //                 vm.error = "unable to update user";
        //             } else {
        //                 vm.message = "user successfully updated"
        //             }
        //         });
        //
        // }
    }
})();