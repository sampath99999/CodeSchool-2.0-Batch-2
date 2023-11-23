app.controller("mailCtrl", [
  "$scope",
  "$http",
  "$rootScope",
  "$state",
  "$stateParams",
  function ($scope, $http, $rootScope, $state, $stateParams) {

    $scope.compose = false;
    $http({
      method: "GET",
      url: $rootScope.serverUrl + "mail/get_mail/" + $stateParams.id,
    })
      .then(function (response) {
        data = response.data;
        if (data.status) {
          $scope.mail = data.data;
        } else {
          $state.go("login");
        }
      })
      .catch(function (error) {
        $state.go("login");
      });
  },
]);
