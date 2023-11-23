<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Models\UserTasks;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function createTask(TaskRequest $request)
    {
        $addTask = Task::create(['task_name' => $request->task_name, 'task_changes' => $request->task_changes, 'user_id' => $request->user_id, 'task_submission_date' => $request->task_submission_date]);
        $taskId = $addTask->id;
        $taskStatus = UserTasks::create(['task_id' => $taskId, 'user_id' => $request->user_id]);
        return response()->json(['status' => true, 'message' => 'Task Assigned Successfully..']);
    }

    public function getAllTasks()
    {
        $allTasks = new Task();
        $data = $allTasks->with(['getTasksStatus', 'getUser'])->get();
        return response()->json(['status' => true, 'data' => $data]);
    }

    public function getTasksOfUser()
    {
        $user = Auth::user()->id;
        $tasks = Task::with(['getTasksStatus'])
            ->where('user_id', $user)
            ->get();
        return response()->json(['status' => true, 'data' => $tasks]);
    }


    public function updateTask(Request $request)
    {
        $user = Auth::user()->id;
        $updateStatus = UserTasks::where('task_id', $request->task_id)->update(['task_status' => $request->task_status]);
        return response()->json(['status' => true, 'message' => 'Status updated successfully..']);
    }
}
