<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function login(Request $request)
    {
        $validator = $this->validate($request,[
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator) {
            $data = $validator->messages();
            return response()->json([
                'status' => false,
                'message' => 'Validation Failed',
                "data"=>$data],
            400);
        }
        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::guard('api')->user();
        return response()->json([
                'status' => true,
                'message'=>'Successfully Logged in',
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ],
                'data'=>['user'=>[
                    'username'=>$user->username,
                    'email'=>$user->email,
                ]]
            ]);

    }

    public function register(Request $request){

        $validator = $this->validate($request,[
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator) {
            $data = $validator->messages();
            return response()->json([
                'status ' => false,
                'message' => 'Validation Failed',
                "data"=>$data],
            400);
        }

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User created successfully',
            'data'=>[]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => true,
            'message' => 'Successfully logged out',
            'data'=>[]
        ]);
    }
    public function me()
    {
        $user = Auth::guard('api')->user();
        return response()->json([
            'status' => true,
            'message'=>'Verified',
            'data'=>['user'=>[
                'username'=>$user->username,
                'email'=>$user->email,
            ]]
        ]);

    }

    public function validate(Request $request, array $rules, array $messages = [], array $customAttributes = []) : object|bool
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            return $validator;
        }
        return false;
    }

}
