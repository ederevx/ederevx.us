<?php

use Illuminate\Support\Facades\Route;

$jsonData = file_get_contents(base_path('resources/js/data/navigation.json'));
$textData = json_decode($jsonData, true);

# Define routes for the website
foreach ($textData['navigation'] as $link) {
    Route::inertia($link['href'], $link['name'])->name($link['name']);
}