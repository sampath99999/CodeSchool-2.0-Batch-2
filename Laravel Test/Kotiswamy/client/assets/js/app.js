const app = angular.module('testApp',["ui.router"]);

app.run(['$rootScope',function($rootScope){
  $rootScope.serverUrl='http://127.0.0.1:8000/api/'
  $rootScope.uploadsUrl='http://127.0.0.1:8000/uploads/'
  $rootScope.showLoader=false;
}])