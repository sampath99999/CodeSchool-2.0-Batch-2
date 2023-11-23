<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;

class UserController extends Controller
{

    public function register(RegisterRequest $request)
    {
        $user = User::create(['name' => $request->name, 'phone' => $request->phone, 'email' => $request->email, 'password' => Hash::Make($request->password)]);
        return response()->json(['status' => true, 'message' => 'Registration successful'], 201);
    }
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        $token = auth()->attempt($credentials);
        if (!$token) {
            return response()->json(['status' => false, 'message' => 'Email or password is incorrect'], 401);
        }

        return response()->json(['status' => true, 'message' => 'Login successful', 'token' => $token], 200);
    }

    public function me()
    {
        $user = Auth::user();
        return response()->json(['status' => true, 'message' => 'Success', 'user' => $user], 200);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json(['status' => true, 'message' => 'Logout successful'], 201);
    }

    public function getUsers(){
        $users = User::all();
        return response()->json(['status'=> true,'users'=> $users],200);
    }
}
