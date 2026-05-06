<?php

use Illuminate\Support\Facades\Route;

$jsonData = file_get_contents(base_path('resources/js/data/navigation.json'));
$textData = json_decode($jsonData, true);

// Define routes for the website
foreach ($textData['navigation'] as $link) {
    // Resource routes must have a defined controller
    if (isset($link['resource']))
        Route::resource($link['href'], $link['resource']['controller'])
            // Optional parameters to customize the resource
            ->names($link['resource']['names'] ?? $link['name'])
            ->parameters($link['resource']['parameters'] ?? []);
    else
        Route::inertia($link['href'], $link['name'])->name($link['name']);

    // Route overrides
    if ($link['name'] === "blog")
        Route::get('/blog/{post:slug}', [$link['resource']['controller'], 'show'])->name('posts.show');
}