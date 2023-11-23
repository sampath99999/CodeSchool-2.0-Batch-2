app.controller("EmployeeController", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  "$filter",
  function ($scope, $rootScope, $http, $state, $filter) {
    $scope.employeeList = [];
    $scope.salary = "";
    $scope.name = "";
    $scope.email = "";
    $scope.selectedRole = null;
    $scope.navItems = [
      { state: "adminHome", name: "Home" },
      { state: "leaveRequests", name: "Leave Requests" },
      { state: "employees", name: "Employees" },
    ];
    $scope.roles = ["SE", "ASE", "CEO", "CTO", "Tech Lead"];

    $scope.validateSalary = function () {
      $scope.salaryErr = "";
      $scope.salary = $scope.salary.replace(/[^0-9]/g, "");
      if ($scope.salary == "") {
        $scope.salaryErr = "Salary is required";
        return false;
      }
      return true;
    };

    $scope.validateEmail = function () {
      $scope.emailErr = "";
      $scope.email = $scope.email.trim();
      $scope.email = $filter("lowercase")($scope.email);
      if ($scope.email == "") {
        $scope.emailErr = "Email is required";
        return false;
      } else if (
        $scope.email.match(/[a-z]+[0-9]*@[a-z]+\.(com|in)/g) === null
      ) {
        $scope.emailErr = "Enter valid email";
        return false;
      } else {
        return true;
      }
    };

    $scope.validateName = function () {
      $scope.nameErr = "";
      $scope.name = $scope.name.trim();
      $scope.name = $scope.name.replace(/[^a-zA-Z]/g, "");
      if ($scope.name == "") {
        $scope.nameErr = "Name can't be empty";
        return false;
      } else {
        return true;
      }
    };

    $scope.validateRole = function () {
      $scope.roleErr = "";
      if ($scope.selectedRole == null) {
        $scope.roleErr = "Please select role";
        return false;
      }
      return true;
    };

    $http({
      method: "GET",
      url: $rootScope.serverUrl + "/getEmployeeList",
    }).then(
      function (response) {
        if (response.data.status == true) {
          $scope.employeeList = response.data.data;
        }
      },
      function (reject) {
        swal.fire(String(reject.status), reject.data.message, "warning");
      }
    );

    $scope.addEmployee = function () {
      var validateEmail = $scope.validateEmail();
      var validateName = $scope.validateName();
      var validateRole = $scope.validateRole();
      var validateSalary = $scope.validateSalary();
      if (validateEmail && validateName && validateRole && validateSalary) {
        var empObj = {
          name: $scope.name,
          email: $scope.email,
          role: $scope.selectedRole,
          salary: $scope.salary,
        };
        $http({
          method: "POST",
          data: empObj,
          url: $rootScope.serverUrl + "/addEmployee",
        }).then(
          function (response) {
            if (response.data.status == true) {
              document.getElementById("modalCloseBtn").click();
              $scope.employeeList.push(empObj);
              swal.fire("Done", response.data.message, "success");
            }
          },
          function (reject) {
            swal.fire(String(reject.status), reject.data.message, "warning");
          }
        );
      }
    };
  },
]);
