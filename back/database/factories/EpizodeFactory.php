<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Epizode;
use App\Models\Podcast;

class EpizodeFactory extends Factory
{
    protected $model = Epizode::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(2),
            'podcast_id' => Podcast::inRandomOrder()->first()->id ?? Podcast::factory()->create()->id,
            'date' => $this->faker->dateTime,
            'type' => $this->faker->randomElement(['video/mp4', 'audio/mpeg']),
            'file' => function (array $attributes) {
        $extension = $attributes['type'] === 'video/mp4' ? 'mp4' : 'mp3';
        return 'storage/app/' . $this->faker->word . '.' . $extension;
    },
        ];
    }
}
