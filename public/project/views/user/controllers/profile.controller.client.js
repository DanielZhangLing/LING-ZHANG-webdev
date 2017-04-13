/**
 * Created by LingZhang on 3/28/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("ProfileController", ProfileController);
    function ProfileController(reviewService, storyService, $location, userService, currentUser, $timeout, $routeParams) {
        var vm = this;
        vm.user = currentUser;
        vm.owner = $routeParams["uid"];
        vm.isThisUser = vm.owner == currentUser._id;
        vm.editable = false;
        var userId = vm.user._id;
        vm.rows = 10;
        vm.updateUser = updateUser;
        vm.editUser = editUser;
        vm.cancelUpdate = cancelUpdate;
        vm.logout = logout;
        vm.htmlToPlaintext = htmlToPlaintext;
        vm.showMore = showMore;
        vm.deleteMyStory = deleteMyStory;
        vm.findStoriesByUser = findStoriesByUser;
        vm.findStoriesByLike = findStoriesByLike;
        vm.findReviewsByUser = findReviewsByUser;
        vm.deleteMyReview = deleteMyReview;
        vm.dislikeStory = dislikeStory;

        function init() {
            findUserById();
            findStoriesByUser();
            findStoriesByLike();
            findReviewsByUser();
        }

        function dislikeStory(storyId, userId) {
            storyService
                .dislikeStory(storyId, userId)
                .then(function (user) {
                    if (user){
                        findStoriesByLike();
                        vm.message = "dislike successfully!"
                    }
                    else
                        vm.error = "dislike failed!"
                })
        }

        function findUserById() {
            if (vm.owner) {
                userService
                    .findUserById(vm.owner)
                    .then(function (user) {
                        if (user) {
                            vm.user = user;
                        }
                        else {
                            vm.error = "Cannot find user you want!"
                        }
                    })
            }
        }

        function findReviewsByUser() {
            reviewService
                .findReviewsByUser(userId)
                .then(function (reviews) {
                    if (reviews) {
                        console.log(reviews);
                        vm.allReviews = reviews;
                        vm.reviews = vm.allReviews.slice(0, vm.rows);
                    }
                    else {
                        vm.error = "Cannot find story you want!"
                    }
                })
        }

        function findStoriesByLike() {
            console.log("step 1");
            storyService
                .findStoriesByLike(userId)
                .then(function (stories) {
                    if (stories) {
                        console.log(stories);
                        vm.allLikeStories = stories;
                        vm.likeStories = vm.allLikeStories.slice(0, vm.rows);
                    }
                    else {
                        vm.error = "Cannot find story you want!"
                    }
                })
        }

        function findStoriesByUser() {
            storyService
                .findStoriesByUser(userId)
                .then(function (stories) {
                    if (stories) {
                        console.log(stories);
                        vm.allMyStories = stories;
                        vm.myStories = vm.allMyStories.slice(0, vm.rows);
                    }
                    else {
                        vm.error = "Cannot find story you want!"
                    }
                })
        }

        init();

        function deleteMyReview(reviewId, userId) {
            reviewService
                .deleteMyReview(reviewId, userId)
                .then(function (data) {
                    console.log("s???");
                    findReviewsByUser();
                    vm.message = "Delete successfully!"
                }, function (err) {
                    console.log("miao")
                    vm.error = "Delete failed, please try again!"
                })
        }

        function deleteMyStory(storyId, userId) {
            storyService
                .deleteStory(storyId, userId)
                .then(function (data) {
                    console.log("s???");
                    findStoriesByUser();
                }, function (err) {
                    console.log("miao")
                    vm.error = "Delete failed, please try again!"
                })
        }

        function showMore() {
            vm.rows = vm.rows + 10;
            vm.myStories = vm.allMyStories.slice(0, vm.rows);
            vm.likeStories = vm.allLikeStories.slice(0, vm.rows);
        }

        function htmlToPlaintext(text) {
            text = text ? String(text).replace(/<[^>]+>/gm, '') : '';
            text = text.substring(0, 100) + "...";
            return text;
        }

        function editUser() {
            vm.editable = true;
        }

        function logout() {
            userService
                .logout()
                .then(function (reponse) {
                    rootScope.currentUser = null;
                    $location.url('/login');
                });
        }

        function updateUser(newUser) {
            userService
                .updateUser(userId, newUser)
                .then(function (user) {
                    if (user == null) {
                        vm.error = "unable to update user";
                        $timeout(function () {
                            vm.error = false;
                        }, 3000);
                    } else {
                        vm.message = "user successfully updated";
                        vm.editable = false;
                        $timeout(function () {
                            vm.message = false;
                        }, 3000);
                    }
                });

        }

        function cancelUpdate() {
            vm.editable = false;
        }
    }
})();