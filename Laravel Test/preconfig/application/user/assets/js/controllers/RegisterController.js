userApp.controller("RegisterController", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",

  function ($scope, $http, $state, $rootScope) {
    var userId = localStorage.getItem("token");
      if (userId) {
        location.href = "../../../../";
      }
    $scope.fullName = "";
    $scope.email = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    $scope.phoneNumber = "";
    $scope.fullNameErr = "";
    $scope.confirmPasswordErr = "";
    $scope.phoneNumberErr = "";
    $scope.emailErr = "";
    $scope.passwordErr = "";

    $scope.verifyFullName = function () {
      if ($scope.fullName) {
        $scope.fullName = $scope.fullName.replace(/[^a-zA-Z]/g, "");
      }
      if ($scope.fullName == "") {
        $scope.fullNameErr = "Please enter full name";
        return false;
      }
      $scope.fullNameErr = "";
      return true;
    };

    $scope.verifyEmail = function () {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test($scope.email)) {
        $scope.emailErr = "Please enter valid email";
        return false;
      }
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

    $scope.verifyConfirmPassword = function () {
      if ($scope.password != $scope.confirmPassword) {
        $scope.confirmPasswordErr =
          "Password and Confirm Password does not Match";
        return false;
      }
      $scope.confirmPasswordErr = "";
      return true;
    };

    $scope.verifyPhoneNumber = function () {
      if ($scope.phoneNumber == "") {
        $scope.phoneNumberErr = "Please enter phone number";
        return false;
      }

      $scope.phoneNumber = $scope.phoneNumber.replace(/\D/g, "");

      var phonePattern = /^[6-9]\d{9}$/;

      if (!phonePattern.test($scope.phoneNumber)) {
        $scope.phoneNumberErr = "Please enter a valid phone number";
        return false;
      }

      $scope.phoneNumberErr = "";
      return true;
    };

    $scope.register = function () {
      $scope.verifyFullName();
      $scope.verifyPhoneNumber();
      $scope.verifyEmail();
      $scope.verifyPassword();
      $scope.verifyConfirmPassword();
      if (
        $scope.verifyEmail() &&
        $scope.verifyPassword() &&
        $scope.verifyFullName() &&
        $scope.verifyPhoneNumber() &&
        $scope.verifyConfirmPassword()
      ) {
        $http
          .post($rootScope.serverUrl + "register", {
            email: $scope.email,
            password: $scope.password,
            fullName: $scope.fullName,
            phoneNumber: $scope.phoneNumber,
          })
          .then(function (response) {
            if (response.status) {
              Swal.fire("", response.data.message, "success").then(function () {
                $state.go("login");
              });
            }
          })
          .catch(function (error) {
            Swal.fire("", error.data.message, "error");
          });
      }
    };
  },
]);
