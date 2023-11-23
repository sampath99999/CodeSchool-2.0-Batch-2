testApp.controller('AdminHeaderController', function ($scope, $rootScope, $http, $state) {
    var token = localStorage.getItem('token')
    if (!token) {
        $state.go("login")
        return
    }

    $scope.logout = function () {
        $http({
            method: "POST",
            url: $rootScope.serverUrl + 'logout'
        }).then(function (res) {
            if (res.data.status) {
                localStorage.removeItem('token')
                Swal.fire({
                    icon: 'success',
                    text: `${res.data.message}`
                })
                $state.go("login")
            }
        })
    }
})