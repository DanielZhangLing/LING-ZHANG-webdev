/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        }
        return api;
        function createUser(user) {
            return $http.post("/api/user/",user);
            // user._id = users.length + 1;
            // users.push(user);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
            // for (var u in users) {
            //     var user = users[u];
            //     if (user._id == uid) {
            //         return angular.copy(user);
            //     }
            // }
            // return null;
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
            // for (var u in users) {
            //     var user = users[u];
            //     if (user.username == username) {
            //         return angular.copy(user);
            //     }
            // }
            // return null;

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
            // for (var u in users) {
            //     var user = users[u];
            //     if (user.username == username && user.password == password) {
            //         return angular.copy(user);
            //     }
            // }
            // return null;
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
            // for (var u in users) {
            //     var user = users[u];
            //     if (user._id == userId) {
            //         user.firstName = newUser.firstName;
            //         user.lastName = newUser.lastName;
            //         user.password = newUser.password;
            //         return user;
            //     }
            // }
            // return null;
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
            // for (var u in users) {
            //     var user = users[u];
            //     if (user._id == userId) {
            //         users.splice(u,1);
            //         break;
            //     }
            // }
        }

    }
})();