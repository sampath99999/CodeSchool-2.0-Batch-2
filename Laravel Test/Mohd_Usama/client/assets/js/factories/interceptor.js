app.factory("AuthInterceptor", [
    "$q",
    "$window",
    "$rootScope",
    function ($q, $window, $rootScope) {
      return {
        request: function (config) {
          const token = $window.localStorage.getItem("token");
          if (token) {
            config.headers["Authorization"] = "Bearer " + token;
          }
          return config;
        },
        requestError: function (rejection) {
          return $q.reject(rejection);
        },

        response: function (response) {
          return response;
        },

        responseError: function (rejection) {
          return $q.reject(rejection);
        },
      };
    },
  ]);
