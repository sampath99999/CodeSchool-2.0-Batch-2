app.controller("registerCtrl", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",
  function ($scope, $http, $state, $rootScope) {
    $scope.usernameError = "";
    $scope.emailError = "";
    $scope.passwordError = "";
    $scope.emailExists = "";
    $scope.username = "";
    $scope.email = "";
    $scope.password = "";
    $rootScope.navbar = false;

    $scope.register = function () {
      $scope.usernameError = "";
      $scope.emailError = "";
      $scope.passwordError = "";
      $scope.emailExists = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!$scope.username) {
        $scope.usernameError = "Username is required.";
        return;
      }

      if (!$scope.email) {
        $scope.emailError = "Email is required.";
        return;
      }

      if (!emailRegex.test($scope.email)) {
        $scope.emailError = "Invalid email format.";
        return;
      }

      if (!$scope.password) {
        $scope.passwordError = "Password is required.";
        return;
      }
      if ($scope.password.length < 6) {
        $scope.passwordError = "Password must be at least 6 characters long.";
        return;
      }
      $rootScope.loader = true;
      const data = {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password,
      };

      $http({
        method: "POST",
        url: $rootScope.serverUrl + "register",
        data: data,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          $scope.username = "";
          $scope.email = "";
          $scope.password = "";
          $rootScope.loader = false;
          const res = response.data;
          if (res.status) {
            Swal.fire("Success", res.message, "success");
            $state.go("login");
          } else {
            Swal.fire("Error", "Error while creating an account!", "error");
          }
        })
        .catch(function (error) {
          $rootScope.loader = false;
          $scope.emailExists = "Email already exists, Please login";
          Swal.fire("Error", $scope.emailExists, "error");
        });
    };
  },
]);
