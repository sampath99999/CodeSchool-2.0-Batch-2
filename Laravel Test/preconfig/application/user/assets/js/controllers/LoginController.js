userApp.controller("LoginController", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",

  function ($scope, $http, $state, $rootScope) {
    var userId = localStorage.getItem("token");
    if (userId) {
      location.href = "../../../../";
    }
    $scope.email = "";
    $scope.password = "";
    $scope.emailErr = "";
    $scope.passwordErr = "";

    $scope.verifyEmail = function () {
      if ($scope.email == "") {
        $scope.emailErr = "Email Cannot be Empty";
        return false;
      }
      $scope.emailErr = "";
      return true;
    };
    $scope.verifyPassword = function () {
      if ($scope.password == "") {
        $scope.passwordErr = "Password Cannot be Empty";
        return false;
      }
      $scope.passwordErr = "";
      return true;
    };
    $scope.login = function () {
      $scope.verifyEmail();
      $scope.verifyPassword();
      if ($scope.verifyEmail() && $scope.verifyPassword()) {
        $http
          .post($rootScope.serverUrl + "login", {
            email: $scope.email,
            password: $scope.password,
          })
          .then(function (response) {
            console.log(response);
            console.log(response.status);
            if (response.status) {
              localStorage.setItem("token", response.data.data.token);
              location.href = "../../../../";
            }
          })
          .catch(function (error) {
            Swal.fire("", error.data.message, "error");
          });
      }
    };
  },
]);
