<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Podcast extends Model
{
    use HasFactory;



    protected $table = 'podcasts';
  
  
    protected $fillable = ['title', 'description', 'banner','category_id'];
  
    public function creators()
    {
        return $this->belongsToMany(User::class, 'creator_podcast');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}
