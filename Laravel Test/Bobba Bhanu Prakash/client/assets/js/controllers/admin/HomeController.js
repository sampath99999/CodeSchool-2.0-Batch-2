app.controller("AdminHomeController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    $scope.navItems = [
      { state: "adminHome", name: "Home" },
      { state: "leaveRequests", name: "Leave Requests" },
      { state: "employees", name: "Employees" },
    ];
  },
]);
