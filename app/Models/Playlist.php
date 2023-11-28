<?php

namespace App\Models;

use App\Models\Tutorial;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Playlist extends Model
{
    use HasFactory;
    protected $table = 'playlist';
    protected $guarded = [];
    public function tutorials()
    {
        return $this->hasMany(Tutorial::class, 'playlist_id');
    }

    public function articleCount()
    {
        return $this->tutorial()->count();
    }
}
