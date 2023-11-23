testApp.controller("AdminController", function ($scope, $http, $state, $rootScope) {
    var token = localStorage.getItem('token')
    if (!token) {
        $state.go("login")
        return
    }

    $http({
        method: "GET",
        url: $rootScope.serverUrl + 'me'
    }).then(function (res) {
        if (res.data.user['role_id'] != 1) {
            Swal.fire({
                icon: 'warning',
                text: 'User is not Authorized'
            }).then(function () {
                $state.go('home')
            })
        }
    })


    $scope.task = ''
    $scope.description = ''
    $scope.employee = ''
    $scope.submissionDate = ''

    $scope.assignTask = function () {
        console.log($rootScope.userId)
        var date = new Date($scope.submissionDate);
        $scope.dateEl = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        $http({
            method: "POST",
            url: $rootScope.serverUrl + 'addTask',
            data: { task_name: $scope.task, task_changes: $scope.description, user_id: $scope.employee, task_submission_date: $scope.dateEl }
        }).then(function (response) {
            if (response.data.status) {
                Swal.fire({
                    icon: 'success',
                    text: `${response.data.message}`
                })
                $scope.task = ''
                $scope.description = ''
                $scope.employee = ''
                $scope.submissionDate = ''
            }
        }).catch(function (response) {
            Swal.fire({
                icon: 'warning',
                text: `${response.data[0].message}`
            })
        })
    }

    $scope.tasks = []
    $rootScope.showLoader = true
    $http({
        method: "GET",
        url: $rootScope.serverUrl + "getAllTasks"
    }).then(function (response) {
        console.log(response.data.data)
        if (response.data.status) {
            $scope.tasks = response.data.data
            $scope.totalAssignedTasks = response.data.data.length
        }
    }).catch(function (response) {
        console.log(response)
    }).finally(function () {
        $rootScope.showLoader = false
    })
})