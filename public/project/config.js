/**
 * Created by LingZhang on 3/25/17.
 */
/**
 * Created by LingZhang on 2/8/17.
 */
(function () {
    angular
        .module("ZipStory")
        .config(Config);
    function Config($routeProvider, $locationProvider) {
        // $locationProvider.hashPrefix('!');
        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/profile", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/story/", {
                templateUrl: 'views/story/templates/story-list.view.client.html',
                controller: "StoryListController",
                controllerAs: "model"
            })
            .when("/story/:sid", {
                templateUrl: 'views/story/templates/story-detail.view.client.html',
                controller: "StoryDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/:pid/story", {
                templateUrl: 'views/story/templates/story-detail.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/user/:uid/story/new", {
                templateUrl: 'views/story/templates/story-add.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/spot/:pid/story/new", {
                templateUrl: 'views/story/templates/story-add.view.client.html',
                controller: "StoryAddController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/story/:sid", {
                templateUrl: 'views/story/templates/story-edit.view.client.html',
                controller: "StoryEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/deal/", {
                templateUrl: 'views/deal/templates/deal-list.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/deal/:did", {
                templateUrl: 'views/deal/templates/deal-detail.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/user/:uid/deal/new", {
                templateUrl: 'views/deal/templates/deal-add.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/spot/:pid/deal/new", {
                templateUrl: 'views/deal/templates/deal-add.view.client.html',
                controller: "DealAddController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/user/:uid/deal/:did", {
                templateUrl: 'views/deal/templates/deal-edit.view.client.html',
                // controller: "ProfileController",
                // controllerAs: "model"
            })
            .when("/spot/", {
                templateUrl: 'views/spot/templates/spot-list.view.client.html',
                controller: "SpotListController",
                controllerAs: "model",
                resolve: {
                    currentUser: optionalCheckLogin
                }
            })
            .when("/spot/:pid", {
                templateUrl: 'views/spot/templates/spot-detail.view.client.html',
                controller: "SpotDetailController",
                controllerAs: "model"
            })
        // .when("/user/:uid/website", {
        //     templateUrl: 'views/website/templates/website-list.view.client.html',
        //     controller: "WebsiteListController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/new", {
        //     templateUrl: 'views/website/templates/website-new.view.client.html',
        //     controller: "WebsiteNewController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid", {
        //     templateUrl: 'views/website/templates/website-edit.view.client.html',
        //     controller: "WebsiteEditController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page", {
        //     templateUrl: 'views/page/templates/page-list.view.client.html',
        //     controller: "PageListController",
        //     controllerAs: "model"
        //
        // })
        // .when("/user/:uid/website/:wid/page/new", {
        //     templateUrl: 'views/page/templates/page-new.view.client.html',
        //     controller: "PageNewController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid", {
        //     templateUrl: 'views/page/templates/page-edit.view.client.html',
        //     controller: "PageEditController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget", {
        //     templateUrl: 'views/widget/templates/widget-list.view.client.html',
        //     controller: "WidgetListController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/new", {
        //     templateUrl: 'views/widget/templates/widget-choose.view.client.html',
        //     controller: "WidgetNewController",
        //     controllerAs: "model"
        //
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
        //     templateUrl: 'views/widget/templates/widget-edit.view.client.html',
        //     controller: "WidgetEditController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgt", {
        //     templateUrl: 'views/widget/templates/widget-edit.view.client.html',
        //     controller: "WidgetEditController",
        //     controllerAs: "model"
        // })
        // .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
        //     templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
        //     controller: "WidgetFlickrController",
        //     controllerAs: "model"
        // })
        function checkLogin($q, userService, $location) {
            var deferred = $q.defer();
            userService
                .loggedIn()
                .then(function (user) {
                    if (user != '0') {
                        deferred.resolve(user);
                    } else {
                        $location.url('/login');
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function optionalCheckLogin($q, userService, $location) {
            var deferred = $q.defer();
            userService
                .loggedIn()
                .then(function (user) {
                    if (user != '0') {
                        deferred.resolve(user);
                    } else {
                        deferred.resolve(null);
                    }
                });
            return deferred.promise;
        }
    }
})();