var testApp = angular.module("testApp", ['ui.router']);

testApp.run(function ($rootScope, $http) {
    $rootScope.serverUrl = 'http://127.0.0.1:8000/api/'
    $rootScope.showLoader = false
    $rootScope.users = []


    $http({
        method: "GET",
        url: $rootScope.serverUrl + 'getAllUsers'
    }).then(function (res) {
        if (res.data.status) {
            $rootScope.users = res.data.data
        }
    }).catch(function (response) {

    })
})

testApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
})