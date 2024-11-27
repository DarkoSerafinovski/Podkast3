<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Podcast;
use App\Models\Category;
use App\Models\User;

class PodcastFactory extends Factory
{
    protected $model = Podcast::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'banner' => $this->faker->imageUrl(640, 480, 'podcast'),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory()->create()->id,
            
        ];
    }
}
