app.controller("HomeCtrl", [
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
      .get($rootScope.serverUrl + "getBlogs")
      .then(
        function (response) {
          if (response.data.status) {
            $rootScope.blogList = response.data.data;
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

    $scope.blogLikeFun = function (blogId, route) {
      $http.post($rootScope.serverUrl + route, { blog_id: blogId }).then(
        function (response) {
          if (response.data.status) {
            for (let each of $rootScope.blogList) {
              if (each.id == blogId) {
                each.isLiked = !each.isLiked;
                if (each.isLiked) {
                  each.likes_count += 1;
                  return;
                }
                each.likes_count -= 1;
              }
            }
          } else {
            $rootScope.errorSwal(response.data.message);
          }
        },
        function (error) {
          $rootScope.warningSwal(error.data.message);
        }
      );
    };
    $scope.isCommentSectionEmpty = true;

    $scope.commentFun = function (blogId) {
      $scope.isCommentSectionEmpty = true;
      $scope.blogId = blogId;
      $http
        .post($rootScope.serverUrl + "getComments/", { blog_id: blogId })
        .then(
          function (response) {
            if (response.data.status) {
              $scope.commentList = response.data.data;
              if ($scope.commentList.length > 0) {
                $scope.isCommentSectionEmpty = false;
              }
            } else {
              $rootScope.errorSwal(response.data.message);
            }
          },
          function (error) {
            $rootScope.warningSwal(error.data.message);
          }
        );
    };

    $scope.commentPostFun = function () {
      if ($scope.comment) {
        $http
          .post($rootScope.serverUrl + "insertComment", {
            blog_id: $scope.blogId,
            comment: $scope.comment,
          })
          .then(
            function (response) {
              if (response.data.status) {
                $scope.comment = null;
                $scope.commentList = [
                  response.data.data,
                  ...$scope.commentList,
                ];
                for (let each of $rootScope.blogList) {
                  if (each.id == $scope.blogId) {
                    each.comments_count += 1;
                  }
                }
              } else {
                $rootScope.errorSwal(response.data.message);
              }
            },
            function (error) {
              $rootScope.warningSwal(error.data.message);
            }
          );
      } else {
        $rootScope.errorSwal("Comment field is required");
      }
    };

    
  },
]);
