<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Podcast;
use App\Models\User;

class PodcastSeeder extends Seeder
{
    public function run()
    {
        Podcast::factory()->count(20)->create();
        $users = User::all();
        $users->each(function ($user) {
            
            $podcasts = Podcast::inRandomOrder()->take(8)->pluck('id');
            $user->myFavoritePodcasts()->attach($podcasts);
            $podcasts = Podcast::inRandomOrder()->take(6)->pluck('id');
            $user->myPodcasts()->attach($podcasts);
        });
    }
}
