app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "LoginController",
      })
      .state("register", {
        url: "/register",
        templateUrl: "./templates/register.html",
        controller: "RegisterController",
      })
      .state("userHome", {
        url: "/user/home",
        templateUrl: "./templates/user/home.html",
        controller: "UserHomeController",
      })
      .state("adminHome", {
        url: "/admin/home",
        templateUrl: "./templates/admin/home.html",
        controller: "AdminHomeController",
      })
      .state("leaveRequests", {
        url: "/admin/leaveRequests",
        templateUrl: "./templates/admin/leaves.html",
        controller: "AdminHomeController",
      })
      .state("employees", {
        url: "/admin/employees",
        templateUrl: "./templates/admin/employees.html",
        controller: "EmployeeController",
      })
      .state("userLeaveRequests", {
        url: "/user/leaveRequests",
        templateUrl: "./templates/user/leaves.html",
        controller: "UserLeavesController",
      });
    $urlRouterProvider.otherwise("/login");
  },
]);
