<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'content',
        'title',
    ];

    // Additional attributes needed by frontend
    protected $appends = [
        'excerpt', 
        'exists',
    ];

    public function topics()
    {
        return $this->belongsToMany(Topic::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
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

    /**
     * Expose the model's exists attribute.
     * 
     * @return boolean
     */
    public function getExistsAttribute()
    {
        return $this->exists;
    }

    /**
     * Set the slug automatically based on the title value.
     */
    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }
}
