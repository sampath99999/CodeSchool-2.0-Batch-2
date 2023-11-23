<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile_no' => $request->mobile_no,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::guard("api")->login($user);
        return response()->json(['status' => true, 'message' => "Registration Successful"]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $token = Auth::guard('api')->attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => false,
                'message' => "Email or Password is invalid",
            ], 401);
        }

        $user = Auth::guard('api')->user();
        $roleId = Auth::user()->role_id;
        return response()->json([
            'status' => true,
            'message' => "Login Successful..",
            'data' => $token,
            'roleId' => $roleId
        ], 200);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['status' => true, 'message' => "Logout Success"], 200);
    }

    public function loggedUser()
    {
        $user = Auth::user();
        return response()->json(['status' => true, 'user' => $user], 201);
    }

    public function getAllUsers()
    {
        $users = User::where('role_id', 2)->get();
        return response()->json(['status' => true, 'data' => $users]);
    }
}
