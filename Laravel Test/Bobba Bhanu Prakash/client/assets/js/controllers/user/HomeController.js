app.controller("UserHomeController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    $scope.navItems = [
      { state: "userHome", name: "Home" },
      { state: "userLeaveRequests", name: "Leave Requests" },
    ];
  },
]);
