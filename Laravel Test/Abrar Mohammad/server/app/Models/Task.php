<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_name',
        'task_changes',
        'user_id',
        'task_submission_date'
    ];

    public function getTasksStatus(): HasOne
    {
        return $this->hasOne(UserTasks::class, 'task_id', 'id');
    }

    public function getUser(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
