<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Author;
use App\Models\Playlist;
use App\Models\Tutorial;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Application;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;

class InterfaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function Home()
    {
        $users = User::all()->count();
        $playRecoment = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(4)->get();
        $playNavbar = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        $rilisPlaylist = Playlist::where('status', 2)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        $tutorial = Tutorial::all()->count();
        return Inertia::render('Home', [
            'auth' => auth()->user(),
            'users' => $users,
            'playRecoment' => $playRecoment,
            'rilisPlaylist' => $rilisPlaylist,
            'playNavbar' => $playNavbar,
            'tutorial' => $tutorial,
        ]);
    }

    public function Playlist()
    {
        $users = User::all()->count();
        $playRecoment = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(4)->get();
        $playNavbar = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        $rilisPlaylist = Playlist::where('status', 2)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        $tutorial = Tutorial::all()->count();
        return Inertia::render('Playlist', [
            'auth' => auth()->user(),
            'users' => $users,
            'playRecoment' => $playRecoment,
            'rilisPlaylist' => $rilisPlaylist,
            'playNavbar' => $playNavbar,
            'tutorial' => $tutorial,
        ]);
    }

    public function DetailsPlaylist($id_playlist)
    {
        $Detailplaylist = Playlist::where('id_playlist',$id_playlist,)->withCount('tutorials')->first();
        $playNavbar = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        if(!$Detailplaylist) {
            return Inertia::render('errors/404', [
                'auth' => auth()->user(),
                'playNavbar' => $playNavbar,
                'error' => $id_playlist,
            ]);
        } elseif($Detailplaylist->status == 2) {
            return Inertia::render('errors/404', [
                'auth' => auth()->user(),
                'playNavbar' => $playNavbar,
                'error' => $id_playlist,
            ]);
        }
        $DetailTutorial = Tutorial::where('playlist_id', $Detailplaylist->id)->with('Author', 'Playlist')->orderBy('id', 'desc')->get();
        $rilisPlaylist = Playlist::where('status', 2)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        return Inertia::render('DetailsPlaylist', [
            'auth' => auth()->user(),
            'rilisPlaylist' => $rilisPlaylist,
            'playNavbar' => $playNavbar,
            'Detailplaylist' => $Detailplaylist,
            'DetailTutorial' => $DetailTutorial,
        ]);
    }

    public function DetailsAuthors($id_author)
    {
        $DetailAuthors = Author::where('id_author',$id_author,)->withCount('tutorials')->first();
        $playNavbar = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
        if(!$DetailAuthors) {
            return Inertia::render('errors/404', [
                'auth' => auth()->user(),
                'playNavbar' => $playNavbar,
                'error' => $id_author,
            ]);
        } elseif($DetailAuthors->status == 2) {
            return Inertia::render('errors/404', [
                'auth' => auth()->user(),
                'playNavbar' => $playNavbar,
                'error' => $id_author,
            ]);
        }
        $DetailTutorial = Tutorial::where('author_id', $DetailAuthors->id)->with('Playlist')->orderBy('id', 'desc')->get();
        return Inertia::render('DetailsAuthors', [
            'auth' => auth()->user(),
            'playNavbar' => $playNavbar,
            'DetailAuthors' => $DetailAuthors,
            'DetailTutorial' => $DetailTutorial,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
