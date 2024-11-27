<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'username' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => Hash::make('password'), 
            'role' => $this->faker->randomElement(['admin', 'viewer', 'creator']),
            'profile_picture'=>$this->faker->imageUrl(640, 480, 'people', true)
        ];
    }
}
