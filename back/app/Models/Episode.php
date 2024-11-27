<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;


    protected $table = 'episodes';
    use HasFactory;

    protected $fillable = ['title', 'date','type','file', 'podcast_id'];

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }

  
    protected $casts = [
        'date' => 'datetime', 
    ];
}
