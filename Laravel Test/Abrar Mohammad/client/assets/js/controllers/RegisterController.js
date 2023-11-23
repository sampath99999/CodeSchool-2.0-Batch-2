testApp.controller("RegisterController", function ($rootScope, $scope, $state, $http) {

    var token = localStorage.getItem('token')
    if (token) {
        $state.go("home")
        return
    }

    $scope.username = ''
    $scope.email = ''
    $scope.mobile = ''
    $scope.password = ''
    $scope.confirmPassword = ''
    $scope.validateUserName = function () {
        if ($scope.username === "") {
            $scope.nameErrMsg = "*First Name is a required field"
            return false
        } else if ($scope.username.match(/[^A-z]/)) {
            $scope.nameErrMsg = "*Please Enter Valid Name"
            return false
        } else {
            $scope.nameErrMsg = ''
            return true
        }
    }
    $scope.validateEmail = function () {
        if ($scope.email === "") {
            $scope.emailErrMsg = "*Please enter email.."
            return false
        } else if (
            !$scope.email.endsWith(".com") ||
            !$scope.email.match(/[@]/)
        ) {
            $scope.emailErrMsg = "*Please enter valid email.."
            return false
        } else {
            $scope.emailErrMsg = ''
            return true
        }
    }

    $scope.validateMobile = function () {
        if ($scope.mobile) {
            $scope.mobile = $scope.mobile.replace(/[^\d]/, "");
        }
        if ($scope.mobile == '') {
            $scope.mobileErrMsg = '*Please enter mobile number'
            return false
        } else if ($scope.mobile.length < 10) {
            $scope.mobileErrMsg = "*Mobile Number Should Contain 10 Numbers"
            return false
        } else {
            $scope.mobileErrMsg = ''
            return true
        }
    }

    $scope.validatePassword = function () {
        if ($scope.password === "") {
            $scope.passwordErrMsg = "*Password is a required field"
            return false;
        } else if (!($scope.password.match(/\w/) && $scope.password.match(/\W/))) {
            $scope.passwordErrMsg = "*Password must contain special characters"
            return false
        } else {
            $scope.passwordErrMsg = ''
            return true
        }
    }

    $scope.validateConfirmPassword = function () {
        if ($scope.password !== $scope.confirmPassword) {
            $scope.confirmPasswordErrMsg = "*Please Re-Enter Same Password"
            return false
        } else {
            $scope.confirmPasswordErrMsg = ''
            return true
        }
    }
    $scope.register = function () {
        $scope.validateUserName()
        $scope.validateEmail()
        $scope.validateMobile()
        $scope.validatePassword()
        $scope.validateConfirmPassword()
        if ($scope.nameErrMsg == '' && $scope.emailErrMsg == '' && $scope.mobileErrMsg == '' && $scope.passwordErrMsg == '' && $scope.confirmPasswordErrMsg == '') {
            $http({
                method: "POST",
                url: $rootScope.serverUrl + "register",
                data: { name: $scope.username, email: $scope.email, mobile_no: $scope.mobile, password: $scope.password }
            }).then(function (response) {
                if (response.data.status) {
                    Swal.fire({
                        icon: "success",
                        text: `${response.data.message}`
                    })
                    $scope.email = ''
                    $scope.username = ''
                    $scope.password = ''
                    $scope.confirmPassword = ''
                    $scope.mobile = ''
                }
            }).catch(function (response) {
                console.log(response.data[0].message)
                Swal.fire({
                    icon: 'error',
                    text: `${response.data[0].message}`
                })
            })
        } else {
            Swal.fire({
                icon: "warning",
                text: "*Please Fill The Details!"
            })
        }
    }
})