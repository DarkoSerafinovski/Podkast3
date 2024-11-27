<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Epizode;

class EpizodeSeeder extends Seeder
{
    public function run()
    {
        Epizode::factory()->count(45)->create();
    }
}
