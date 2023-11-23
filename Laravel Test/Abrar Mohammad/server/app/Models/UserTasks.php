<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserTasks extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_id',
        'user_id',
        'task_status'
    ];
    public function getTaskStatus(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
