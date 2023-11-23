<?php

namespace Database\Seeders;

use App\Models\Quarter;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuarterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quarter::create(['start_date' => Carbon::parse('2023-08-01'), 'end_date' => Carbon::parse('2023-12-31'), 'leaves_allowed' => 6, 'label' => 'Oct-Dec']);
    }
}
