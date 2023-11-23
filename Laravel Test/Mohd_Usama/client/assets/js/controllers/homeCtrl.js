app.controller("homeCtrl", [
  "$scope",
  "$http",
  "$state",
  "$rootScope",
  "$timeout",
  function ($scope, $http, $state, $rootScope, $timeout) {
    $scope.mails = [];
    $scope.compose = false;
    $scope.body = "";
    $scope.subject = "";
    $scope.to = "";
    function get_mails() {
      $http({
        method: "GET",
        url: $rootScope.serverUrl + "mail/get_mails",
      })
        .then(function (response) {
          const data = response.data;
          if (data.status) {
            $scope.mails = data.data;
          } else {
            $state.go("login");
          }
        })
        .catch(function () {
          $state.go("login");
        });
    }
    function fetchMailsPeriodically() {
      get_mails();
      $timeout(fetchMailsPeriodically, 5000);
    }
    fetchMailsPeriodically();
    $scope.send_email = function () {
      if ($scope.to == "" || $scope.to.length < 3) {
        return;
      }
      if ($scope.subject == "" || $scope.to.length < 5) {
        return;
      }
      if ($scope.body == "" || $scope.to.length < 10) {
        return;
      }
      $rootScope.loader = true;
      const fd = new FormData();
      const fileList = $("#files")[0].files;
      fd.append("to", $scope.to);
      fd.append("subject", $scope.subject);
      fd.append("body", $scope.body);
      for (file of fileList) {
        fd.append("files[]", file);
      }
      if (fileList.length > 0) {
        $http({
          method: "POST",
          url: $rootScope.serverUrl + "mail/post_mail",
          data: fd,
          headers: { "Content-Type": undefined },
          transformRequest: angular.identity,
        })
          .then(function (response) {
            $rootScope.loader = false;

            $scope.body = "";
            $scope.subject = "";
            $scope.to = "";
            const data = response.data;
            if (data.status) {
              Swal.fire("Success", data.message, "success");
            } else {
              Swal.fire("Error", data.message, "error");
            }
          })
          .catch(function (error) {
            $rootScope.loader = false;

            $scope.body = "";
            $scope.subject = "";
            $scope.to = "";
            $state.go("login");
          });
      } else {
        $http({
          method: "POST",
          url: $rootScope.serverUrl + "mail/post_mail",
          data: {
            to: $scope.to,
            subject: $scope.subject,
            body: $scope.body,
          },
        })
          .then(function (response) {
            $rootScope.loader = false;

            $scope.body = "";
            $scope.subject = "";
            $scope.to = "";
            const data = response.data;
            console.log(data);
            if (data.status) {
              Swal.fire("Success", data.message, "success");
            } else {
              Swal.fire("Error", data.message, "error");
            }
          })
          .catch(function (error) {
            $rootScope.loader = false;
            $scope.body = "";
            $scope.subject = "";
            $scope.to = "";
            $state.go("login");
          });
      }
    };
  },
]);
