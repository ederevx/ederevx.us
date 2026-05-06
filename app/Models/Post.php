<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    // Additional attributes needed by frontend
    protected $appends = ['excerpt'];

    public function topics()
    {
        return $this->belongsToMany(Topic::class);
    }

    /**
     * Show the first 150 characters of the content with an
     * ellipsis, if necessary.
     * 
     * @return string
     */
    public function getExcerptAttribute()
    {
        $excerpt = strip_tags($this->content);

        if (strlen($excerpt) > 150) {
            $excerpt = substr($excerpt, 0, 150).'...';
        }

        return $excerpt;
    }
}
