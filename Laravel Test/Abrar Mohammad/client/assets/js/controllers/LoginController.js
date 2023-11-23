testApp.controller("LoginController", function ($scope, $rootScope, $state, $http) {
    var token = localStorage.getItem('token')
    if (token) {
        $state.go("home")
        return
    }
    $scope.email = ''
    $scope.password = ''
    $scope.validateEmail = function () {
        if ($scope.email === "") {
            $scope.emailErrMsg = "*Please enter email.."
            return false
        } else {
            $scope.emailErrMsg = ''
            return true
        }
    }

    $scope.validatePassword = function () {
        if ($scope.password === "") {
            $scope.passwordErrMsg = "*Password is a required field"
            return false;
        } else {
            $scope.passwordErrMsg = ''
            return true
        }
    }

    $scope.value = false

    $scope.viewPassword = function () {
        $scope.value = !$scope.value
    }
    $scope.hideCont = true
    $scope.login = function () {
        $scope.validateEmail()
        $scope.validatePassword()
        if ($scope.emailErrMsg == '' && $scope.passwordErrMsg == '') {
            $rootScope.showLoader = true
            $scope.hideCont = false
            $http({
                method: "POST",
                url: $rootScope.serverUrl + 'login',
                data: { email: $scope.email, password: $scope.password }
            }).then(function (response) {
                if (response.data.status) {
                    console.log(response.data.roleId)
                    if (response.data.roleId == 2) {
                        $scope.email = ''
                        $scope.password = ''
                        localStorage.setItem('token', response.data.data)
                        $state.go("home")
                    } else {
                        $scope.email = ''
                        $scope.password = ''
                        localStorage.setItem('token', response.data.data)
                        $state.go("admin")
                    }

                }
            }).catch(function (response) {
                Swal.fire({
                    icon: 'error',
                    text: `${response.data[0].message}`
                })
            }).finally(function () {
                $rootScope.showLoader = false
                $scope.hideCont = true
            })
        }
    }
})