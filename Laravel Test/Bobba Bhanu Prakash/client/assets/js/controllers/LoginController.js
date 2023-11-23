app.controller("LoginController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    $scope.email = "";
    $scope.password = "";
    $scope.emailErr = "";
    $scope.passwordErr = "";
    $scope.token = localStorage.getItem("token");
    if ($scope.token) {
      $state.go("home");
    }

    $scope.login = function () {
      $scope.emailErr = "";
      $scope.passwordErr = "";
      if ($scope.email == "") {
        $scope.emailErr = "Email is required";
      }
      if ($scope.password == "") {
        $scope.passwordErr = "Password is required";
      }

      if ($scope.emailErr == "" && $scope.passwordErr == "") {
        $http({
          method: "POST",
          url: $rootScope.serverUrl + "/login",
          data: {
            email: $scope.email,
            password: $scope.password,
          },
        }).then(
          function (response) {
            if (response.data.status == true) {
              localStorage.setItem("token", response.data.data[0]);
              if (response.data.data[1] == 1) {
                $state.go("adminHome");
              } else {
                $state.go("userHome");
              }
            } else if (response.data.status == false) {
              swal.fire("Oops", "Enter valid email or password", "error");
            }
          },
          function (reject) {
            swal.fire(String(reject.status), reject.data.message, "warning");
          }
        );
      }
    };
  },
]);
