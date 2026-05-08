<?php

use Illuminate\Support\Facades\Route;

// Routes not visible in the navbar
Route::resource('/admin/blog', App\Http\Controllers\PostController::class)
    ->names("posts")
    ->parameters(["blog" => "post"])
    ->except('index','show')
    ->middleware('auth');

// Routes visible in the navbar
$jsonData = file_get_contents(base_path('resources/js/data/navigation.json'));
$navData = json_decode($jsonData, true);
foreach ($navData['navigation'] as $link) {
    // Resource routes must have a defined controller
    if (isset($link['resource'])) {
        $resource = Route::resource($link['href'], $link['resource']['controller'])
            // Optional parameters to customize the resource
            ->names($link['resource']['names'] ?? $link['name'])
            ->parameters($link['resource']['parameters'] ?? []);

        // Route overrides
        if ($link['name'] === "blog") {
            Route::get('/blog/{post}-{slug}', [$link['resource']['controller'], 'show'])
                ->name('posts.show');
            $resource->only(['index']);
        }
    } else if (isset($link['get'])) {
        $get = Route::get($link['href'], $link['get']['controller']);

        // Route overrides
        if ($link['name'] === "admin") {
            $get->middleware('auth');
        }
    } else {
        Route::inertia($link['href'], $link['name'])->name($link['name']);
    }
}