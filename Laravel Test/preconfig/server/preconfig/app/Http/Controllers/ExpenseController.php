<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\Expense;
use Illuminate\Http\Request;
use App\Models\ExpenseCategory;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function categories()
    {
        $categories = ExpenseCategory::all('id', 'expense_category');
        return response()->json(['status' => true, 'data' => $categories]);
    }


    public function addIncome(Request $request)
    {
        $rules = [
            'month' => 'required|string|max:255',
            'income' => 'required|integer'

        ];
        $request->validate($rules);

        $income = new Income();
        $check = $income->where('month', $request->month)->where('id', Auth::user()->id)->exists();
        if ($check) {
            return response()->json(['status' => false, 'message' => 'Income Already exists for this Month']);
        }
        $income->user_id = Auth::user()->id;
        $income->month = $request->month;
        $income->income = $request->income;
        $income->save();
        return response()->json(['status' => true, 'message' => "Updated Successfully"]);
    }
    public function addExpense(Request $request)
    {

        $rules = [
            'month' => 'required|string|max:255',
            'expenseFor' => 'required|string|max:255',
            'category' => 'required|integer',
            'expenseAmount' => 'required|integer'

        ];

        $request->validate($rules);

        $expense = new Expense();
        $expense->user_id = Auth::user()->id;
        $expense->month = $request->month;
        $expense->expense_id = $request->category;
        $expense->expense_for = $request->expenseFor;
        $expense->expense_amount = $request->expenseAmount;
        $expense->save();
        return response()->json(['status' => true, 'message' => 'Updated Successfully']);
    }

    public function incomeByMonth()
    {

        $income = new Income();
        $user_id = Auth::user()->id;
        $incomeByMonth = $income->where('user_id', $user_id)->get(['month', 'income']);
        return response()->json(['status' => true, 'data' => $incomeByMonth]);
    }



    public function getExpensesByMonth()
    {
        $expense = new Expense();
        $user_id = Auth::user()->id;
        $expenseForMonth = $expense->where('user_id', $user_id)->get(['month', 'expense_for', 'expense_amount']);
        return response()->json(['status' => true, 'data' => $expenseForMonth]);


    }

}
