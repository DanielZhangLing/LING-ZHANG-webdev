/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("SpotDetailController", SpotDetailController);
    function SpotDetailController(spotService, $routeParams, $location) {
        var vm = this;
        vm.spotId = $routeParams["pid"];
        function init() {
            spotService
                .findSpotById(vm.spotId)
                .then(function (spot) {
                    if(spot) {
                        vm.spot = spot;
                    }
                    else{
                        vm.error = "can't find select spot, please try again!"
                    }
                })
        }

        init();
    }
})();