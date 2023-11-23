var app = angular.module("app", ["ui.router"]);
app.run(function ($rootScope) {
  $rootScope.serverUrl = "http://127.0.0.1:8000/api/";
});
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("tokenInterceptor");
});
