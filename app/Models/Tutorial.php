<?php

namespace App\Models;

use App\Models\Playlist;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tutorial extends Model
{
    use HasFactory;

    protected $primary = 'title_id';
    protected $fillable = [
        'title_id',
        'title',
        'content',
        'image',
        'draft',
        'author_id',
        'playlist_id',
        'created_at',
        'update_at',
    ];
    public function Author()
    {
        return $this->belongsTo(Author::class, 'author_id', 'id');
    }
    public function Playlist()
    {
        return $this->belongsTo(Playlist::class, 'playlist_id', 'id');
    }

}
