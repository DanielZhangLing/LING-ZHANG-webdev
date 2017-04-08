/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("SpotListController", SpotListController);
    function SpotListController(spotService, $location, currentUser) {
        var vm = this;
        vm.user = currentUser;
        vm.rows = 10;
        vm.search = search;
        vm.showMore = showMore;
        function init() {
            if (vm.user) {
                console.log("1");
                vm.search(vm.user.state);
            } else {
                console.log("2");
                vm.search('Boston');
            }
        }

        init();

        function search(keyword) {
            vm.keyword = keyword;
            spotService
                .searchSpotByKeyword(keyword, vm.rows)
                .then(function (data) {
                    if (data && data.geonames.length > 0) {
                        vm.spots = data.geonames;
                    }
                    else {
                        vm.error = "Please check your keyword and try again!"
                    }
                })
        }

        function showMore() {
            vm.rows = vm.rows + 10;
            console.log(vm.rows)
            search(vm.keyword);
        }

    }
})();