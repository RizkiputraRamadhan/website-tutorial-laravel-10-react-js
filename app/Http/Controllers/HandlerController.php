<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Playlist;
use App\Models\Tutorial;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HandlerController extends Controller
{
    public function Handler() {
        if (Auth::check()) {
            $userType = auth()->user()->typeuser;
            if ($userType == 1) {
                return redirect('/admin/dashboard')->with('message', 'Masuk Sebagai Admin!');
            } elseif ($userType == 2) {
                return redirect('/authors/dashboard')->with('message', 'Masuk Sebagai Author!');
            } else {
                return redirect('/user/dashboard')->with('message', 'Masuk Sebagai User!');
            }
        }
    }
    public function DemoTutorial($title_id) {
        $showTutor = Tutorial::where('title_id', $title_id)->first();
        $id_Playlist = $showTutor->playlist_id;
        $id_Author = $showTutor->author_id;
        $fkAuthor = Author::where('id', $id_Author)->first();
        $fkPlaylist = Playlist::where('id', $id_Playlist)->first();
        return inertia::render('demo/Tutorial', [
            'showTutor' => $showTutor,
            'fkPlaylist' => $fkPlaylist,
            'fkAuthor' => $fkAuthor
        ]);
    }
    
}
