app.factory(
  "AuthenticateInterceptor",
  function ($window, $q, $rootScope, $state) {
    return {
      request: function (config) {
        $rootScope.loader = true;
        var token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },

      response: function (response) {
        $rootScope.loader = false;
        return response;
      },
      responseError: function (response) {
        $rootScope.loader = false;
        if (response.status === 401) {
          localStorage.removeItem("token");
          $state.go("login");
        } else if (response.status === 403) {
          $state.go("userHome");
        }
        return $q.reject(response);
      },
    };
  }
);
