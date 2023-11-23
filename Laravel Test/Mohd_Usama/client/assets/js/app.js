const app = angular.module("gmail", ["ui.router"]);

app.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  },
]);

app.run([
  "$rootScope",
  function ($rootScope) {
    $rootScope.serverUrl = "http://127.0.0.1:8000/api/";
    $rootScope.loader = false;
    $rootScope.mail = {};
    $rootScope.mailUploadUrl = "http://127.0.0.1:8000/mail_uploads/";
  },

]);
