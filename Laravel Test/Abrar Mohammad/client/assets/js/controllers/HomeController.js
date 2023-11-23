testApp.controller("HomeController", function ($state, $rootScope, $scope, $http) {
    var token = localStorage.getItem('token')
    if (!token) {
        $state.go("login")
        return
    }

    $http({
        method: "GET",
        url: $rootScope.serverUrl + 'me'
    }).then(function (res) {
        if (res.data.user['role_id'] != 2) {
            Swal.fire({
                icon: 'warning',
                text: 'Admin is not Authorized'
            }).then(function () {
                $state.go('admin')
            })
        }
    })

    $scope.taskStatusCount = 0
    $scope.taskCompletedCount = 0
    $scope.taskStagingCount = 0
    $scope.taskPreCount = 0
    $scope.completed = 0
    $scope.Tasks = []
    $rootScope.showLoader = true
    $http({
        method: "GET",
        url: $rootScope.serverUrl + "getTasks"
    }).then(function (response) {
        $scope.taskStatusCount = 0
        for (let each of response.data.data) {
            if (each.get_tasks_status['task_status'] == 'backlog') {
                $scope.taskStatusCount += 1
            } else if (each.get_tasks_status['task_status'] == 'done') {
                $scope.taskCompletedCount += 1
            } else if (each.get_tasks_status['task_status'] == 'staging') {
                $scope.taskStagingCount += 1
            } else if (each.get_tasks_status['task_status'] == 'pre-prod') {
                $scope.taskPreCount += 1
            }
        }
        if (response.data.status) {
            $scope.Tasks = response.data.data
            $scope.totalTasks = response.data.data.length
        }
    }).catch(function (response) {
        console.log(response)
    }).finally(function () {
        $rootScope.showLoader = false
    })

    $scope.status = ''

    $scope.updateTask = function (data) {
        $scope.status = data.get_tasks_status['task_status']
    }


    $scope.statusChange = ''
    $scope.taskStatus = ''

    $scope.updateStatus = function (taskId, name) {
        $http({
            method: "POST",
            url: $rootScope.serverUrl + 'updateTask',
            data: { task_id: taskId, task_status: name }
        }).then(function (response) {
            if (response.data.status) {
                Swal.fire({
                    icon: 'success',
                    text: `${response.data.message}`
                })
                for (let each of $scope.Tasks) {
                    if (each.id == taskId) {
                        each.get_tasks_status['task_status'] = name
                    }
                }
                $scope.statusChange = ''
            }
        })
    }
})