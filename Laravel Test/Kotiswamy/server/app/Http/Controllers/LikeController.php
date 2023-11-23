<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function insertLike(Request $request){
        $like = Like::create(['blog_id'=> $request->blog_id,'user_id'=>Auth::user()->id]);
        return response()->json(['status'=>true,'message'=> 'Liked added']);
    }
    public function deleteLike(Request $request){
        $like = Like::where(['blog_id'=>$request->blog_id,'user_id'=>Auth::user()->id])->delete();
        return response()->json(['status'=>true,'message'=> 'Like deleted']);
    }
}
