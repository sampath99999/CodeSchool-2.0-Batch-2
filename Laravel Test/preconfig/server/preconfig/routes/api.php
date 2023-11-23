<?php

use App\Http\Controllers\ExpenseController;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware(["auth"])->group(function () {
    Route::get('/categories', [ExpenseController::class, 'categories']);
    Route::post('/addExpense', [ExpenseController::class, 'addExpense']);
    Route::post('/addIncome', [ExpenseController::class, 'addIncome']);
    Route::get('/incomeByMonth', [ExpenseController::class, 'incomeByMonth']);
    Route::get('/getExpensesByMonth', [ExpenseController::class, 'getExpensesByMonth']);
    Route::get('/getUser', function () {
        return response()->json(['status' => true, 'data' => Auth::user()->full_name]);
    });
    Route::get('/logout', [UserController::class, 'logout']);


});
