<?php

namespace App\Http\Controllers;

use App\Models\leaves;
use App\Models\Quarter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class LeavesController extends Controller
{
    public function getAvailableLeaves()
    {
        $month = Carbon::now()->format('m');
        if ($month >= 1 && $month < 4) {
            $label = "Jan-Mar";
        } else if ($month >= 4 && $month < 7) {
            $label = "Apr-Jun";
        } else if ($month >= 7 && $month < 10) {
            $label = "Jul-Sep";
        } else {
            $label = "Oct-Dec";
        }

        $quarter = Quarter::where('label', $label)->first();
        $count = leaves::where('quarter_id', $quarter->id)::count();
        return response()->json(["status" => true, "data" => ["availableLeaves" => ($quarter->leaves_allowed - $count), "quarter_id" => $quarter->id]]);
    }
}
