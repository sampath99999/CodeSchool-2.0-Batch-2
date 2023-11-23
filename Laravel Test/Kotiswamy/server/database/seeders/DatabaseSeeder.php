<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       User::create(['name'=>'admin','email'=>'admin@gmail.com','phone'=>'1234567890','password'=> Hash::make('Aa1!Aa1!'),'role_id'=>1]);
    }
}
