<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    public function comments(){
        return $this->hasMany(Comment::class,'blog_id','id');
    }
    public function likes(){
        return $this->hasMany(Like::class,'blog_id','id');
    }
    public function author(){
        return $this->hasOne(User::class,'id','user_id');
    }
    
}
