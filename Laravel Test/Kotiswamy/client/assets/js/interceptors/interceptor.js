app.factory("AppInterceptor", [
  "$rootScope",
  "$state",
  function ($rootScope, $state) {
    return {
      request: function (config) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      response: function (response) {
        return response;
      },
      responseError: function (error) {
        if (error.status == 401) {
          $rootScope.errorSwal(error.data["message"]);
          if (!(error.data.length > 0)) {
            localStorage.removeItem("token");
            $state.go("login");
          }
        }
        return error;
      },
    };
  },
]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("AppInterceptor");
});
