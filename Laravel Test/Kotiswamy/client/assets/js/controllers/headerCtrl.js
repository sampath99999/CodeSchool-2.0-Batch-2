app.controller("HeaderCtrl", [
  "$scope",
  "$rootScope",
  "$http",
  "$state",
  function ($scope, $rootScope, $http, $state) {
    let token = localStorage.getItem("token");
    if (!token) {
      $state.go("login");
      return;
    }
    $rootScope.showLoader = true;
    $http
      .get($rootScope.serverUrl + "me")
      .then(
        function (response) {
          if (response.data.status) {
            $rootScope.user = response.data.user;
          } else {
            $rootScope.errorSwal(response.data.message);
          }
        },
        function (error) {
          $rootScope.warningSwal(error.data.message);
        }
      )
      .finally(function () {
        $rootScope.showLoader = false;
      });

    // BlogTitle
    $scope.title = null;
    $scope.tittleErrMsg = null;
    $scope.titleValidation = function () {
      if (!$scope.title) {
        $scope.tittleErrMsg = "Title is required";
      } else {
        $scope.tittleErrMsg = null;
      }
    };

    // BlogDescription
    $scope.description = null;
    $scope.descriptionErrMsg = null;
    $scope.descriptionValidation = function () {
      if ($scope.description.length < 10) {
        $scope.descriptionErrMsg = "Description field required 10 characters";
      } else {
        $scope.descriptionErrMsg = null;
      }
    };

    // chooseFile
    jQuery("#chooseFile").val(null);
    $scope.fileErrMsg = null;
    $scope.fileValidation = function () {
      if (!jQuery("#chooseFile").val()) {
        $scope.fileErrMsg = "Please choose a file";
      } else {
        $scope.fileErrMsg = null;
      }
    };

    // addBlogFun

    $scope.addBlogFun = function () {
      $scope.titleValidation();
      $scope.descriptionValidation();
      $scope.fileValidation();
      if (
        $scope.tittleErrMsg == null &&
        $scope.descriptionErrMsg == null &&
        $scope.fileErrMsg == null
      ) {
        $rootScope.showLoader = true;
        var formData = new FormData();
        formData.append("title", $scope.title);
        formData.append("description", $scope.description);
        formData.append("file", jQuery("#chooseFile")[0].files[0]);
        $http
          .post($rootScope.serverUrl + "insertBlog", formData, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined,
            },
          })
          .then(
            function (response) {
              if (response.data.status) {
                jQuery("#addBlogModelCloseId").click();
                $rootScope.successSwal(response.data.message);
              } else {
                $rootScope.errorSwal(response.data.message);
              }
            },
            function (error) {
              $rootScope.warningSwal(error.data.message);
            }
          )
          .finally(function () {
            $rootScope.showLoader = false;
          });
      }
    };

    $scope.logoutFun = function () {
      $http.post($rootScope.serverUrl + "logout").then(
        function (response) {
          if (response.data.status) {
            localStorage.removeItem("token");
            $state.go("login");
          } else {
            $rootScope.errorSwal(response.data.message);
          }
        },
        function (error) {
          $rootScope.warningSwal(error.data.message);
        }
      );
    };
  },
]);
