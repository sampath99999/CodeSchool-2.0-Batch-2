app.controller('AppCtrl',[
  "$scope",
  "$rootScope",
  function ($scope, $rootScope) {

    $.noConflict()
    // swal functions
    $rootScope.successSwal = function (message,title = "success") {
      Swal.fire({
        icon: "success",
        title: title,
        text: message,
      });
    };
    $rootScope.errorSwal = function (message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    };

    $rootScope.warningSwal = function (message) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: message,
      });
    };

  },
]);
