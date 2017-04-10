/**
 * Created by LingZhang on 4/9/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("StoryAddController", StoryAddController);
    function StoryAddController(currentUser, spotService, storyService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.spotId = $routeParams["pid"];
        console.log(vm.spotId);
        vm.createStory = createStory;
        // vm.getTrustedHtml = getTrustedHtml;
        function init() {
            spotService
                .findSpotByGeoId(vm.spotId)
                .then(function (spot) {
                    if(spot) {
                        console.log(spot);
                        vm.spot = spot;
                    }
                    else{
                        vm.error = "can't find select spot, please try again!"
                    }
                })
        }

        init();

        function createStory(story){
            story["author"] = vm.user._id;
            story["geoNameId"] = vm.spotId;
            story["spot"] = vm.spotId.title;
            console.log(story);
            storyService.createStory(story)
                .then(function(story){
                    if(story){
                        $location.url("/story/" + story._id);
                    }else{
                        vm.error = "Posting Failed, Please try again!"
                    }
                })

        }
    }
})();