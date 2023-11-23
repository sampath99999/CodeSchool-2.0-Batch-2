app.controller("navbarCtrl", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",
  function ($scope, $http, $state, $rootScope) {
    const token = localStorage.getItem("token");
    if (!token) {
      $state.go("login");
    }
    $scope.logout = function () {
      $http({
        method: "GET",
        url: $rootScope.serverUrl + "logout",
      })
        .then(function (response) {
          $rootScope.login = false;
          localStorage.removeItem("token");
          $state.go("login");
        })
        .catch(function (error) {
          $rootScope.login = false;
          localStorage.removeItem("token");
          $state.go("login");
        });
    };
  },
]);
