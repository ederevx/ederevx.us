<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => $this->faker->unique()->slug(),
            'title' => $this->faker->words(4, true),
            'content' => $this->faker->paragraphs(5, true),
        ];
    }

    /**
     * A published post
     *
     * @return static
     */
    public function published($at = null)
    {
        return $this->state([
            'published_at' => $at === null ? now() : $at,
        ]);
    }
}
