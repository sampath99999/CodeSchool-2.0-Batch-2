userApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state({
    name: "login",
    url: "/login",
    templateUrl: "./templates/login.html",
    controller: "LoginController",
  });
  $stateProvider.state({
    name: "register",
    url: "/register",
    templateUrl: "./templates/register.html",
    controller: "RegisterController",
  });
  $urlRouterProvider.otherwise("/login");
});
