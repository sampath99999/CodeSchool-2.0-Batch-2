<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserController;
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

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);

Route::group(['middleware'=> 'auth:api'], function () {
    Route::get('me',[UserController::class,'me']);
    Route::post('logout',[UserController::class,'logout']);
    Route::post('insertBlog',[BlogController::class,'insertBlog']);
    Route::get('getBlogs',[BlogController::class,'getBlogs']);
    Route::post('insertLike',[LikeController::class,'insertLike']);
    Route::post('deleteLike',[LikeController::class,'deleteLike']);
    Route::post('getComments',[CommentController::class,'getComments']);
    Route::post('insertComment',[CommentController::class,'insertComment']);
});


