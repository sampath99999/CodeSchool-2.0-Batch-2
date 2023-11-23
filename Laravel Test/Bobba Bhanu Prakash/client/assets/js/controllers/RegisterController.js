app.controller("RegisterController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  "$filter",
  function ($scope, $rootScope, $http, $state, $filter) {
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.confirmPassword = "";

    $scope.validateName = function () {
      $scope.nameErr = "";
      $scope.name = $scope.name.trim();
      $scope.name = $scope.name.replace(/[^a-zA-Z]/g, "");
      if ($scope.name == "") {
        $scope.nameErr = "Name can't be empty";
        return false;
      } else {
        return true;
      }
    };

    $scope.validateEmail = function () {
      $scope.emailErr = "";
      $scope.email = $scope.email.trim();
      $scope.email = $filter("lowercase")($scope.email);
      if ($scope.email == "") {
        $scope.emailErr = "Email can't be empty";
        return false;
      } else if (
        $scope.email.match(/[a-z]+[0-9]*@[a-z]+\.(com|in)/g) === null
      ) {
        $scope.emailErr = "Enter valid email";
        return false;
      } else {
        return true;
      }
    };

    $scope.validatePassword = function () {
      $scope.passwordErr = "";
      $scope.password = $scope.password.trim();
      if ($scope.password == "") {
        $scope.passwordErr = "Password can't be empty";
        return false;
      } else if ($scope.password.length < 8) {
        $scope.passwordErr = "Password length should be atleast 8";
        return false;
      } else if ($scope.password.match(/[a-z]+[0-9]+[*&#@$%!^]/g) === null) {
        $scope.passwordErr =
          "Password must contain number and special character";
        return false;
      }
      return true;
    };

    $scope.validateConfirmPassword = function () {
      $scope.confirmPasswordErr = "";
      $scope.confirmPassword = $scope.confirmPassword.trim();
      if ($scope.confirmPassword == "") {
        $scope.confirmPasswordErr = "Confirm password can't be empty";
        return false;
      } else if ($scope.confirmPassword != $scope.password) {
        $scope.confirmPasswordErr = "Password doesn't match";
        return false;
      } else {
        return true;
      }
    };

    $scope.register = function () {
      var validateName = $scope.validateName();
      var validateEmail = $scope.validateEmail();
      var validatePassword = $scope.validatePassword();
      var validateConfirmPassword = $scope.validateConfirmPassword();
      if (
        validateName &&
        validateEmail &&
        validatePassword &&
        validateConfirmPassword
      ) {
        $http({
          method: "POST",
          url: $rootScope.serverUrl + "/register",
          data: {
            email: $scope.email,
            password: $scope.password,
            name: $scope.name,
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
              swal.fire("Oops", "Registration Not Successful", "error");
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
