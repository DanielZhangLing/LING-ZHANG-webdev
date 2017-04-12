/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("StoryDetailController", StoryDetailController);
    function StoryDetailController(currentUser, $sce, storyService, userService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.storyId = $routeParams["sid"];
        vm.liked = false;
        vm.getTrustedHtml = getTrustedHtml;
        vm.likeStory = likeStory;
        vm.dislikeStory = dislikeStory;
        vm.reviewUrl = $location.absUrl() + '#add-story-reviews-form';

        function init() {

            storyService
                .findStoryById(vm.storyId)
                .then(function (story) {
                    if (story) {
                        vm.story = story;
                        for (i in story.likeUser)
                            if (story.likeUser[i] = vm.user._id)
                                vm.liked = true;
                        vm.likes = story.likeUser.length;
                        userService
                            .findUserById(story.author)
                            .then(function (author) {
                                console.log("aaa");
                                if (author) {
                                    console.log(author)
                                    vm.author = author.username;
                                }
                                else {
                                    vm.error = "can't find select author, please try again!"
                                }
                            })
                    }
                    else {
                        vm.error = "can't find select story, please try again!"
                    }
                });
            // storyService
            //     .findReviewsForStory(vm.storyId)
            //     .then(function (reviews) {
            //         if (num) {
            //             console.log(reviews);
            //             vm.reviews = reviews;
            //         }
            //         else {
            //             vm.error = "can't find select review, please try again!"
            //         }
            //     });

        }

        init();

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function likeStory() {
            if (!vm.user)
                $location.url('/login');
            else {
                console.log("1");
                storyService
                    .likeStory(vm.storyId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            console.log(data)
                            vm.likes = data.likeUser.length;
                            vm.liked = true;
                        } else {
                            vm.error = "adding failed, please try again!"
                        }
                    })
            }
        }

        function dislikeStory() {
            if (!vm.user)
                $location.url('/login');
            else {
                storyService
                    .dislikeStory(vm.storyId, vm.user._id)
                    .then(function (data) {
                        if (data) {
                            vm.likes = data.likeUser.length;
                            vm.liked = false;
                        } else {
                            vm.error = "cancelling failed, please try again!"
                        }
                    })
            }
        }
    }
})();