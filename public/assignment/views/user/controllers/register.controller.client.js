/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)
    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user){
            if(user==null||user.username==null||user.password==null){
                vm.error = "username and password are required"
            }
            else if(UserService.findUserByUsername(user.username)== null){
                UserService.createUser(user);
                $location.url("/profile/" + user._id)
            }
            else{
                vm.error = "username has been used, please change another name"
            }


        }
    }
})();