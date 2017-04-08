/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular.module('ZipStory')
        .factory('spotService', spotService);
    function spotService($http) {
        var api = {
            "searchSpotByKeyword": searchSpotByKeyword,
            "findSpotById": findSpotById,
        };
        return api;

        function searchSpotByKeyword(keyword, rows) {
            var url = 'http://api.geonames.org/wikipediaSearchJSON?q=' + keyword + '&maxRows=' + rows + '&username=lingzseed';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return null;
                });
        }

        function findSpotById(spotId) {
            var url = 'http://api.geonames.org/getJSON?geonameId=' + spotId + '&username=lingzseed';
            var toponymName = '';
            $http.get(url)
                .then(function (response) {
                    toponymName = response.data.toponymName;
                    console.log(toponymName);
                })
                .then(function () {
                    var url2 = 'http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=images%7Cextracts&format=json&exintro=&titles=' + toponymName;
                    $http.jsonp(url2)
                        .then(function (response) {
                            var obj = response.data.query.pages;
                            console.log(obj[Object.keys(obj)[0]]);
                            return obj[Object.keys(obj)[0]];
                        }, function (err) {
                            return null;
                        });
                });

        }
    }
})();