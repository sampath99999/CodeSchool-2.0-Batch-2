app.controller("HomeController", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",
  "$interval",

  function ($scope, $http, $state, $rootScope, $interval) {
    $scope.month = "";
    $scope.monthErr = "";
    $scope.expenseFor = "";
    $scope.expenseForErr = "";
    $scope.category = "";
    $scope.categoryErr = "";
    $scope.expenseAmount = "";
    $scope.expenseAmountErr = "";
    $scope.income = "";
    $scope.incomeErr = "";
    $scope.presentMonthIncome = 0;
    $scope.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    $scope.validateMonth = function () {
      if ($scope.month == "") {
        $scope.monthErr = "Please select month";
        return false;
      }
      $scope.monthErr = "";
      return true;
    };

    $scope.validateIncome = function () {
      if ($scope.income == "") {
        $scope.incomeErr = "Please enter income";
        return false;
      }

      if (angular.isString($scope.income)) {
        $scope.income = $scope.income.replace(/[^0-9]/g, "");
      }
      $scope.incomeErr = "";
      return true;
    };

    $scope.validateExpenseFor = function () {
      if ($scope.expenseFor == "") {
        $scope.expenseForErr = "Please enter the purpose";
        return false;
      }
      if ($scope.expenseFor) {
        $scope.expenseFor = $scope.expenseFor.replace(/[^a-zA-Z\s]/g, "");
        $scope.expenseForErr = "";
        return true;
      }
    };

    $scope.validateCategory = function () {
      if ($scope.category == "") {
        $scope.categoryErr = "Please select category";
        return false;
      }
      $scope.categoryErr = "";
      return true;
    };

    $scope.validateExpenseAmount = function () {
      if ($scope.expenseAmount == "") {
        $scope.expenseAmountErr = "Please enter amount";
        return false;
      }
      if (angular.isString($scope.expenseAmount)) {
        $scope.expenseAmount = $scope.expenseAmount.replace(/[^0-9]/g, "");
      }
      $scope.expenseAmountErr = "";
      return true;
    };

    $http.get($rootScope.serverUrl + "getUser").then(function (response) {
      $scope.userName = response.data.data;
    });

    $http.get($rootScope.serverUrl + "categories").then(function (response) {
      if (response.status) {
        $scope.categories = response.data.data;
      }
    });

    $scope.addIncome = function () {
      $scope.validateIncome();
      $scope.validateMonth();
      if ($scope.validateIncome() && $scope.validateMonth()) {
        $http
          .post($rootScope.serverUrl + "addIncome", {
            month: $scope.month,
            income: $scope.income,
          })
          .then(function (response) {
            if (response.data.status) {
              Swal.fire("", response.data.message, "success").then(function () {
                $scope.incomeByMonth.push({
                  month: $scope.month,
                  income: $scope.income,
                });
                $(".closeModal").click();
                $scope.displayPresentMonthIncome();
              });
            } else {
              Swal.fire("", response.data.message, "error");
            }
          })
          .catch(function (error) {
            Swal.fire("", error.message, "error");
          });
      }
    };

    $scope.addExpense = function () {
      $scope.validateMonth();
      $scope.validateExpenseFor();
      $scope.validateCategory();
      $scope.validateExpenseAmount();
      if (
        $scope.validateMonth() &&
        $scope.validateExpenseFor() &&
        $scope.validateCategory() &&
        $scope.validateExpenseAmount()
      ) {
        $http
          .post($rootScope.serverUrl + "addExpense", {
            month: $scope.month,
            expenseFor: $scope.expenseFor,
            category: $scope.category,
            expenseAmount: $scope.expenseAmount,
          })
          .then(function (response) {
            if (response.data.status) {
              Swal.fire("", response.data.message, "success").then(function () {
                $scope.expensesByMonth.push({
                  month: $scope.month,
                  expense_for: $scope.expenseFor,
                  expense_amount: parseInt($scope.expenseAmount),
                });

                $scope.calculateExpenses();

                // $scope.displayBar();
                // $scope.displayPie();
                $(".closeModal").click();
              });
            }
          });
      }
    };

    $http.get($rootScope.serverUrl + "incomeByMonth").then(function (response) {
      if (response.data.status) {
        $scope.incomeByMonth = response.data.data;
        $scope.displayBar = function () {
          var months = $scope.incomeByMonth.map((entry) => entry.month);
          var incomes = $scope.incomeByMonth.map((entry) => entry.income);
          $scope.incomeColors = months.map(getRandomColor);
          var ctx = document.getElementById("incomeChart").getContext("2d");

          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: months,
              datasets: [
                {
                  label: "Income By Month",
                  data: incomes,
                  backgroundColor: $scope.incomeColors,
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              elements: {
                bar: {
                  barPercentage: 0.8,
                },
              },
            },
          });
        };
        $scope.displayBar();
      }
      $scope.displayPresentMonthIncome = function () {
        var date = new Date();
        $scope.currMonth = $scope.months[date.getMonth()];
        $scope.presentMonthIncome = $scope.incomeByMonth.filter(function (
          month
        ) {
          return month.month == $scope.currMonth;
        });
      };
      $scope.displayPresentMonthIncome();
    });

    $http
      .get($rootScope.serverUrl + "getExpensesByMonth")

      .then(function (response) {
        if (response.status) {
          $scope.expensesByMonth = response.data.data;
          // console.log($scope.expensesByMonth);
        }
        $scope.calculateExpenses = function () {
          var dateExpense = new Date();
          $scope.expenseMonth = $scope.months[dateExpense.getMonth()];
          $scope.presentMonthExpenseArray = $scope.expensesByMonth.filter(
            function (month) {
              return month.month == $scope.expenseMonth;
            }
          );

          $scope.presentMonthExpense = $scope.presentMonthExpenseArray.reduce(
            function (acc, curr) {
              return acc + curr.expense_amount;
            },
            0
          );
        };
        $scope.calculateExpenses();

        //chart
        $scope.displayPie = function () {
          const expenses = $scope.presentMonthExpenseArray;
          const expenseCategories = {};
          expenses.forEach((expense) => {
            const key = expense.expense_for.toLowerCase();
            if (expenseCategories[key]) {
              expenseCategories[key] += expense.expense_amount;
            } else {
              expenseCategories[key] = expense.expense_amount;
            }
          });
          $scope.expenseColors = expenses.map(getRandomColor);

          const labels = Object.keys(expenseCategories);
          const data = Object.values(expenseCategories);
          const ctz = document.getElementById("expenseChart").getContext("2d");
          const expenseChart = new Chart(ctz, {
            type: "doughnut",
            data: {
              labels: labels,
              datasets: [
                {
                  data: data,
                  backgroundColor: $scope.expenseColors,
                },
              ],
            },
          });
        };
        $scope.displayPie();
      });

    $scope.closeModal = function () {
      $scope.month = "";
      $scope.monthErr = "";
      $scope.expenseFor = "";
      $scope.expenseForErr = "";
      $scope.category = "";
      $scope.categoryErr = "";
      $scope.expenseAmount = "";
      $scope.expenseAmountErr = "";
      $scope.income = "";
      $scope.incomeErr = "";
    };

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    $scope.currentTime = "";

    function updateClock() {
      var now = new Date();
      var hours = now.getHours().toString().padStart(2, "0");
      var minutes = now.getMinutes().toString().padStart(2, "0");
      var seconds = now.getSeconds().toString().padStart(2, "0");
      var date = now.getDate().toString().padStart(2, "0");
      var month = $scope.months[now.getMonth()];
      var year = now.getFullYear().toString().padStart(2, "0");
      $scope.today = date + " " + month + " " + year;
      $scope.currentTime = hours + ":" + minutes + ":" + seconds;
    }

    $interval(updateClock, 1000);

    updateClock();

    $scope.logout = function () {
      $http.get($rootScope.serverUrl + "logout").then(function (response) {
        if (response.data.status) {
          Swal.fire("", response.data.message, "success").then(function () {
            localStorage.removeItem("token");

            location.href = "../../user/";
          });
        }
      });
    };
  },
]);
