<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
public function getComments(Request $request){
     $comments =Comment::with('user')->where('blog_id',$request->blog_id)->orderBy('comments.created_at','desc')->get();
    return response()->json(['status'=>true,'message'=>'success','data'=>$comments]);
}
public function insertComment(Request $request){
    $comment = new Comment();
    $comment->user_id = Auth::user()->id;
    $comment->comment = $request->comment;
    $comment->blog_id= $request->blog_id;
    $comment->save();
    $comment['user']= Auth::user();
    return response()->json(['status'=>true,'message'=> 'success','data'=>$comment]);
}
}
