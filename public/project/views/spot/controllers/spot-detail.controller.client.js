/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("SpotDetailController", SpotDetailController);
    function SpotDetailController(storyService, $sce, spotService, $routeParams, $location) {
        var vm = this;
        vm.spotId = $routeParams["pid"];
        vm.getTrustedHtml = getTrustedHtml;
        function init() {
            spotService
                .findSpotByGeoId(vm.spotId)
                .then(function (spot) {
                    if(spot) {
                        console.log(spot);
                        vm.spot = spot;
                        storyService
                            .findStoryBySpot(vm.spot.title)
                            .then(function(stories){
                                if(stories) {
                                    console.log(stories);
                                    vm.stories = stories;
                                }
                                else{
                                    vm.error = "can't find select stories, please try again!"
                                }
                            });
                    }
                    else{
                        vm.error = "can't find select spot, please try again!"
                    }
                });

        }

        init();

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();