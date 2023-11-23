testApp.controller("MainController", function ($http, $state, $scope, $rootScope) {
    var token = localStorage.getItem('token')
    if (!token) {
        $state.go("login")
        return
    }

})