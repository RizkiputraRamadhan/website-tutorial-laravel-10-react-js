<?php

namespace App\Models;

use App\Models\Tutorial;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function tutorials()
    {
        return $this->hasMany(Tutorial::class, 'author_id');
    }


    public function articleCount()
    {
        return $this->tutorial()->count();
    }
    public function UserId()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
