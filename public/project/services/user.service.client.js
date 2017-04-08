(function () {
    angular
        .module("ZipStory")
        .factory("userService", userService);

    function userService($http) {
        var api = {
            // "createUser": createUser,
            "updateUser": updateUser,
            // "deleteUser": deleteUser,
            "findUserById": findUserById,
            // "findUserByUsername": findUserByUsername,
            // "findUserByCredentials": findUserByCredentials,
            "register": register,
            "loggedIn": loggedIn,
            "login": login,
            "logout": logout,
            "sAdmin": isAdmin,
            "findAllUsers": findAllUsers
        };
        return api;

        function findUserById(userId) {
            return $http.get('/api/user', userId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            return $http.get('/api/admin/user')
                .then(function (response) {
                    return response.data;
                });
        }

        function isAdmin() {
            return $http.get('/api/isAdmin')
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post('/api/logout')
                .then(function (response) {
                    return response.data;
                });
        }

        function login(user) {
            console.log("fk2");
            return $http.post('/api/login', user)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                }, function (err) {
                    return null;
                });
        }

        function loggedIn() {
            return $http.get('/api/loggedIn')
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            return $http.post('/api/register', user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            return $http.put('/api/user/' + userId, user)
                .then(function (response) {
                    return response.data;
                },function(err){
                    return null;
                });
        }
    }
})();