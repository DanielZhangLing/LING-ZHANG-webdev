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
    function ProfileController($routeParams, UserService) {
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