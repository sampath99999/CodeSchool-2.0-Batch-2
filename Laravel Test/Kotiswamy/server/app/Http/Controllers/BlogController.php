<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function insertBlog(BlogRequest $request)
    {
        $blogInstance = new Blog();
        $blogInstance->title = $request->title;
        $blogInstance->description = $request->description;
        $blogInstance->user_id = Auth::user()->id;
        if ($request->hasFile("file")) {
            $file= $request->file("file");
            $fileName = time() . random_int(1, 99) . '.' . $file->extension();
            $file->move(public_path('uploads'), $fileName);
            $blogInstance->image_url = $fileName;
            $blogInstance->save();
            $blog=$blogInstance->toArray();
            $blog['isLiked'] = false;
            $blog['comments'] = [];
            $blog['likes_count'] = 0;
            $blog['comments_count'] = 0;
            $blog['author'] = Auth::user();
            return response()->json(['status'=>true,'message'=> 'Blog added','data'=> $blog]);
        }

    }

    public function getBlogs(){
        $blogList=Blog::with('comments','likes','author')->orderBy('blogs.created_at','desc')->get();
        foreach ($blogList as $blog){
            $blog['likes_count'] = $blog->likes->count();
            $blog['comments_count'] = $blog->comments->count();
            $blog['isLiked'] = false;
            foreach( $blog->likes as $like ){
                if($like->user_id == Auth::user()->id){
                    $blog['isLiked'] = true;
                }
            }
        }
        return response()->json(['status'=>true,'message'=> 'Success','data'=>$blogList]);
    }
}
