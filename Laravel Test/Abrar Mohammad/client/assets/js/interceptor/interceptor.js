testApp.factory("AuthInterceptor", function ($q, $state, $location) {
    return {
        request: function (config) {
            var token = localStorage.getItem("token");
            if (token) {
                config.headers['Authorization'] = "Bearer " + token
            }
            return config;
        },
        response: function (response) {
            if (response.status == 401) {
                return response
            }
            return response;
        },

        responseError: function (rejection) {
            console.log(rejection)
            if (rejection.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: `${rejection.data['message']}`
                })
                localStorage.removeItem("token")
                $state.go("login")
                return rejection
            }
            return $q.reject(rejection);
        }

    }
})

