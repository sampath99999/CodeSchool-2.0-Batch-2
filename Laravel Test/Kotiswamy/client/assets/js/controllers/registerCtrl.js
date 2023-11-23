app.controller("RegisterCtrl", [
  "$rootScope",
  "$http",
  "$scope",'$state',
  function ($rootScope, $http, $scope,$state) {
    let token=localStorage.getItem('token');
    if(token){
      $state.go('home');
      return
    }
    // name
    $scope.name = null;
    $scope.nameErrMsg = null;
    $scope.nameValidation = function () {
      if ($scope.name) {
        $scope.name = $scope.name.replace(/[^A-z ]/g, "");
      }
      if (!$scope.name) {
        $scope.nameErrMsg = "Name is required";
      } else {
        $scope.nameErrMsg = null;
      }
    };
    // phone
    $scope.phoneNumber = null;
    $scope.phoneNumberErrMsg = null;
    $scope.phoneNumberValidation = function () {
      if ($scope.phoneNumber) {
        $scope.phoneNumber = $scope.phoneNumber.replace(/[^\d]/, "");
      }
      if (!$scope.phoneNumber) {
        $scope.phoneNumberErrMsg = "Phone number is required";
      } else if ($scope.phoneNumber.length < 10) {
        $scope.phoneNumberErrMsg = "Please Enter 10 digits";
      } else {
        $scope.phoneNumberErrMsg = null;
      }
    };
    // email
    $scope.email = null;
    $scope.emailErrMsg = null;
    $scope.emailValidation = function () {
      if (!$scope.email) {
        $scope.emailErrMsg = "Email is required";
      } else if (!$scope.email.match(/^[A-z 0-9]+@[A-z]+\.[A-z]{2,}$/)) {
        $scope.emailErrMsg = "Please provide valid email";
      } else {
        $scope.emailErrMsg = null;
      }
    };

    // password
    $scope.password = null;
    $scope.passwordErrMsg = null;
    $scope.passwordValidation = function () {
      if (!$scope.password) {
        $scope.passwordErrMsg = "Password is required";
      } else if ($scope.password.length < 6) {
        $scope.passwordErrMsg = "Password must contain 6 characters";
      } else if (
        !(
          $scope.password.match(/[A-Z]/) &&
          $scope.password.match(/[a-z]/) &&
          $scope.password.match(/[0-9]/) &&
          $scope.password.match(/\W/)
        )
      ) {
        $scope.passwordErrMsg =
          "Password must contain alpha-numeric & special-characters";
      } else {
        $scope.passwordErrMsg = null;
      }
    };

    // confirmPasswordEl
    $scope.confirmPassword = null;
    $scope.confirmPasswordErrMsg = null;
    $scope.confirmPasswordValidation = function () {
      if (!$scope.confirmPassword) {
        $scope.confirmPasswordErrMsg = "Please enter confirm password";
      } else if ($scope.confirmPassword !== $scope.password) {
        $scope.confirmPasswordErrMsg = "Password didn't match";
      } else {
        $scope.confirmPasswordErrMsg = null;
      }
    };

    // registerBtn
    $scope.registerFun = function () {
      $scope.nameValidation();
      $scope.phoneNumberValidation();
      $scope.emailValidation();
      $scope.passwordValidation();
      $scope.confirmPasswordValidation();
      if (
        $scope.nameErrMsg == null &&
        $scope.emailErrMsg == null &&
        $scope.phoneNumberErrMsg == null &&
        $scope.passwordErrMsg == null &&
        $scope.confirmPasswordErrMsg == null
      ) {
        $http
          .post($rootScope.serverUrl + "register", {
            name: $scope.name,
            email: $scope.email,
            phone: $scope.phoneNumber,
            password: $scope.password,
          })
          .then(
            function (response) {
              if (response.data.status) {
                $state.go('login')
              } else {
                $rootScope.errorSwal(response.data.message);
              }
            },
            function (response) {
              $rootScope.warningSwal(response.data.message);
            }
          );
      }
    };
  },
]);
