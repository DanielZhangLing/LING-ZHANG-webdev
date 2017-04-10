/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular.module('ZipStory')
        .factory('spotService', spotService);
    function spotService($http) {
        var api = {
            "searchSpotByKeyword": searchSpotByKeyword,
            "findWikiByGeoId": findWikiByGeoId,
            "createSpot": createSpot,
            "findSpotByGeoId": findSpotByGeoId,
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

        function findWikiByGeoId(spotId) {
            var url = 'http://api.geonames.org/getJSON?geonameId=' + spotId + '&username=lingzseed';
            var toponymName = '';
            return $http.get(url)
                .then(function (response) {
                    toponymName = response.data.toponymName;
                    console.log(toponymName);
                })
                .then(function () {
                    var url2 = 'http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&action=query&prop=images%7Cextracts&format=json&exintro=&titles=' + toponymName;
                    return $http.jsonp(url2)
                        .then(function (response) {
                            var obj = response.data.query.pages;
                            return obj[Object.keys(obj)[0]];
                        }, function (err) {
                            return null;
                        });
                });

        }

        function createSpot(spot) {
            return $http.post('/api/spot', spot)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return null;
                });
        }

        function findSpotByGeoId(geoId) {
            return $http.get('/api/spot/' + geoId)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                }, function (err) {
                    console.log("aaaaaaaaaaaa");
                    return null;
                });
        }
    }
})();