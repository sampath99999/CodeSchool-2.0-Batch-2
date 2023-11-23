app.controller("NavbarController", [
  "$scope",
  "$http",
  "$state",
  "$timeout",
  function ($scope, $http, $state, $timeout) {
    $scope.currentDate = new Date();
    $scope.flag = "";
    $scope.logout = async function () {
      await $http({
        method: "GET",
        url: "/logout",
      }).then(
        function (response) {
          if (response.data.status == false) {
            Swal.fire("!Sorry", response.data.message, "error");
          } else {
            $scope.flag = true;
            localStorage.removeItem("token");
            $state.go("login");
          }
        },
        function (reject) {
          Swal.fire(reject.status, reject.statusText, "error");
        }
      );
    };
  },
]);
