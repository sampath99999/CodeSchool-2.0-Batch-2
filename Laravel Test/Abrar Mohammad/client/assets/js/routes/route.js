testApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("register", {
        url: "/register",
        templateUrl: '/templates/register.html',
        controller: "RegisterController"
    }).state("login", {
        url: "/login",
        templateUrl: '/templates/login.html',
        controller: "LoginController"
    }).state("home", {
        url: "/",
        templateUrl: '/templates/home.html',
        controller: "HomeController"
    }).state("admin", {
        url: "/admin",
        templateUrl: "/templates/adminHome.html",
        controller: "AdminController",
    }).state("tasks", {
        url: "/tasks",
        templateUrl: "/templates/tasks.html",
        controller: "HomeController",
    }).state("adminTasks", {
        url: "/adminTasks",
        templateUrl: "/templates/adminTasks.html",
        controller: "AdminController",
    })

    $urlRouterProvider.otherwise("/")
})