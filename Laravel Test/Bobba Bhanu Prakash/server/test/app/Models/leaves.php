<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class leaves extends Model
{
    const status_request = 0;
    const status_approve = 1;
    const status_reject = 2;
    use HasFactory;
}
