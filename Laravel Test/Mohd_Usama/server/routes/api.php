<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MailController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::controller(UserController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::get('logout', 'logout');
    Route::post('user', 'me');
});


Route::group(['middleware' => ['auth:api'],'prefix'=>'mail'], function () {
    Route::controller(MailController::class)->group(function () {
        Route::post('post_mail','post_mail');
        Route::get('get_mails','get_all_user_mails');
        Route::get('get_mail/{id}','get_mail');
    });
});
