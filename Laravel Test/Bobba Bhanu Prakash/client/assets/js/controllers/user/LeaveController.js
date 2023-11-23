app.controller("UserLeavesController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    $scope.startDate = "";
    $scope.endDate = "";
    $scope.reason = "";
    $scope.navItems = [
      { state: "userHome", name: "Home" },
      { state: "userLeaveRequests", name: "Leave Requests" },
    ];

    $scope.requestLeaves = function () {
      var currentDate = new Date();
      var month = currentDate.getMonth();
      $http({
        method: "GET",
        url: $rootScope.serverUrl + "/getAvailableLeaves",
      }).then(
        function (response) {
          console.log(response);
          if (response.data.status == true) {
            $scope.availableLeaves = response.data.data[0];
            $scope.label = response.data.data[1];
          }
        },
        function (reject) {
          console.log(reject);
        }
      );
    };
  },
]);
