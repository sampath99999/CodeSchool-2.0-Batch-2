app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("root", {
        url: "/",
        templateUrl: "./templates/home.html",
        controller: "homeCtrl",
      })
      .state("register", {
        url: "/register",
        templateUrl: "./templates/register.html",
        controller: "registerCtrl",
      })
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "loginCtrl",
      })
      .state("mail", {
        url: "/mail/:id",
        templateUrl: "./templates/mail.html",
        controller: "mailCtrl",
      });

    $urlRouterProvider.otherwise("/");
  },
]);
