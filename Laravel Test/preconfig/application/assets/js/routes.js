app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
      name: "home",
      url: "/",
      templateUrl: "./templates/home.html",
      controller: "HomeController",
    });
    // $stateProvider.state({
    //   name: "addExpense",
    //   url: "/employees",
    //   templateUrl: "./templates/employees.html",
    //   controller: "EmployeesController",
    // });
    // $stateProvider.state({
    //   name: "salaries",
    //   url: "/salaries",
    //   templateUrl: "./templates/salaries.html",
    //   controller: "SalariesController",
    // });
    // $stateProvider.state({
    //   name: "holidays",
    //   url: "/holidays",
    //   templateUrl: "./templates/holidays.html",
    //   controller: "HolidaysController",
    // });
  
    $urlRouterProvider.otherwise("/");
  });
  