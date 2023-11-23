<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function addEmployee(Request $request)
    {
        $request->validate(['name' => 'required|string', 'email' => "required|email|unique:employees", 'role' => 'required|string', 'salary' => 'required']);
        Employee::create(["name" => $request->name, "email" => $request->email, "salary" => $request->salary, "role" => $request->role]);
        return response()->json(['status' => true, "message" => "Employee added successfully"]);
    }

    public function getEmployeeList()
    {
        $employeeList = Employee::get();
        return response()->json(['status' => true, "message" => "Employees fetched successfully", "data" => $employeeList]);
    }
}
