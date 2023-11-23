app.controller("loginCtrl", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",
  function ($scope, $http, $state, $rootScope) {
    $scope.emailError = "";
    $scope.passwordError = "";

    $scope.email = "";
    $scope.password = "";
    $rootScope.navbar = false;
    $scope.login = function () {
      $scope.emailError = "";
      $scope.passwordError = "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
      $rootScope.loader = true;
      const data = {
        email: $scope.email,
        password: $scope.password,
      };
      $http({
        method: "POST",
        url: $rootScope.serverUrl + "login",
        data: data,
      })
        .then(function (response) {
          $rootScope.loader = false;
          const res = response.data;
          if (res.status) {
            const token = res.authorization.token;
            if (token) {
              $rootScope.username = res.data.user.username;
              $rootScope.email = res.data.user.email;
              localStorage.setItem("token", token);
              $rootScope.login = true;
              Swal.fire("Success", res.message, "success");
              $state.go("root");
            } else {
              Swal.fire("Error", "Invalid Credentials", "error");
              $scope.email = "";
              $scope.password = "";
            }
          } else {
            Swal.fire("Error", "Invalid Credentials", "error");
            $scope.email = "";
            $scope.password = "";
          }
        })
        .catch(function (error) {
          $rootScope.loader = false;
          Swal.fire("Error", "Error While logging in", "error");
        });
    };
  },
]);
