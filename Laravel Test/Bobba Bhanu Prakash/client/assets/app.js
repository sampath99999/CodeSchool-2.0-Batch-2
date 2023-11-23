const app = angular.module("test", ["ui.router"]);
app.run([
  "$rootScope",
  function ($rootScope) {
    $rootScope.loader = false;
    $rootScope.serverUrl = "http://127.0.0.1:8000/api";
  },
]);
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("AuthenticateInterceptor");
});
