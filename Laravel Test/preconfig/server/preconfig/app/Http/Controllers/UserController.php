<?php

namespace App\Http\Controllers;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(UserRequest $request)
    {

        $user = new User();
        $user->full_name = $request->fullName;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->phone_number = $request->phoneNumber;
        $user->save();
        return response()->json(['status' => true, 'message' => 'Successfully Registered']);
    }


    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required|string',
        ];

        $this->validate($request, $rules);

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);

            return response()->json(['status' => true, 'message' => 'Login successful', 'data' => ['token' => $token]]);
        } else {
            return response()->json(['status' => false, 'message' => 'Invalid Credentials'], 401);
        }
    }

    public function logout()
    {
        Auth::logout();

        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['status' => true, 'message' => 'Logged Out successfully']);
    }
}
