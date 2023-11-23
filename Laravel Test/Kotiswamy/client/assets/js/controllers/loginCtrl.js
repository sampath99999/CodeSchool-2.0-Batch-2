app.controller("LoginCtrl", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    let token = localStorage.getItem("token");
    if (token) {
      $state.go("home");
      return;
    }
    // email
    $scope.email = null;
    $scope.emailErrMsg = null;
    $scope.emailValidation = function () {
      if (!$scope.email) {
        $scope.emailErrMsg = "Email is required";
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
      } else {
        $scope.passwordErrMsg = null;
      }
    };

    // showPassword

    $scope.showPassword = true;
    $scope.passwordType = "password";
    $scope.showPasswordFun = function (text) {
      $scope.showPassword = !$scope.showPassword;
      $scope.passwordType = text;
    };

    // loginFun
    $scope.loginFun = function () {
      $scope.emailValidation();
      $scope.passwordValidation();
      if ($scope.emailErrMsg == null && $scope.passwordErrMsg == null) {
        $rootScope.showLoader = true;
        $http
          .post($rootScope.serverUrl + "login", {
            email: $scope.email,
            password: $scope.password,
          })
          .then(
            function (response) {
              if (response.data.status) {
                localStorage.setItem("token", response.data.token);
                $state.go("home");
              } else {
                $rootScope.errorSwal(response.data.message);
              }
            },
            function (response) {
              $rootScope.warningSwal(response.data.message);
            }
          )
          .finally(function () {
            $rootScope.showLoader = false;
          });
      }
    };
  },
]);
