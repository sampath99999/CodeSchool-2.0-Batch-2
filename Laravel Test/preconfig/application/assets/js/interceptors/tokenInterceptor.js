app.factory("tokenInterceptor", function ($q, $state) {
  return {
    request: function (config) {
      var token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    response: function (response) {
      return response;
    },

    responseError: function (rejection) {
      if (rejection.status === 401) {
        console.log("sdf");
        Swal.fire("", "Unauthorized User", "warning").then(function () {
          localStorage.removeItem("token");
          location.href = "../user/";
        });
        return rejection;
      }

      return $q.reject(rejection);
    },
  };
});
