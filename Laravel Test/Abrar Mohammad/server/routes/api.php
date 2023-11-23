<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/register", [AuthController::class, 'register']);
Route::post("/login", [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::get("/me", [AuthController::class, 'loggedUser']);
    Route::get("/getTasks", [TaskController::class, 'getTasksOfUser']);
    Route::post("/logout", [AuthController::class, 'logout']);
    Route::get("/getAllTasks", [TaskController::class, 'getAllTasks']);
    Route::post("/updateTask", [TaskController::class, 'updateTask']);
});

Route::group(['middleware' => IsAdmin::class], function () {
    Route::get("/getAllUsers", [AuthController::class, 'getAllUsers']);
    Route::post("/addTask", [TaskController::class, 'createTask']);
});