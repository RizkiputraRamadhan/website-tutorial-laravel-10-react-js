<?php

namespace App\Http\Controllers\Authors;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Author;
use App\Models\Playlist;
use App\Models\Tutorial;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Application;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;

class AuthorsController extends Controller
{
    public function Dashboard()
    {
        $playlist = Playlist::all()->count();
        $users = auth()->user()->id;
        $author = Author::where('user_id', $users)->first();

        if ($author) {
            $tutorials = Tutorial::where('author_id', $author->id)
                ->with('playlist', 'author')
                ->get();
            $drafts = $tutorials->where('draft', 2)->count();
            $publish = $tutorials->where('draft', 1)->count();
        } else {
            $drafts = 0;
            $publish = 0;
            return redirect('/profile')
                ->with('message', 'Lengkapi Dulu profil anda sebagai author.');
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $os = php_uname('s');

        $additionalInfo = [
            'IP' => $ip,
            'Operating System' => $os,
        ];

        Cache::put('device_info', $additionalInfo, 60);

        return Inertia::render('Authors/Dashboard', [
            'playlist' => $playlist,
            'tutorials' => $tutorials,
            'drafts' => $drafts,
            'publish' => $publish,
            'additionalInfo' => $additionalInfo,
        ]);
    }

    //playlist
    public function Playlist()
    {
        $status1 = Playlist::where('status', 1)->get();
        $status2 = Playlist::where('status', 2)->get();
        $playlist = Playlist::withCount('tutorials')->get();
        return Inertia::render('Authors/Playlist', [
            'status1' => $status1,
            'status2' => $status2,
            'playlist' => $playlist,
        ]);
    }

    public function PlaylistEdit($id)
    {
        $playlist = Playlist::withCount('tutorials')->get();
        $id_playlist = Playlist::find($id);
        return Inertia::render('Authors/EditPlaylist', [
            'id_playlist' => $id_playlist,
            'playlist' => $playlist,
        ]);
    }
    public function PlaylistUpdate(Request $request, $id)
    {
        $status = $request->status;
        if ($status == 0) {
            return redirect()
                ->back()
                ->with('message', 'Status belum dipilih.');
        }
        $name = $request->name;
        $existingPlaylist = Playlist::where('name', $name)->first();
        if ($existingPlaylist && $existingPlaylist->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'Playlist sudah terdaftar dalam sistem.');
        }

        $request->validate([
            'name' => 'required',
            'status' => 'required',
            'image' => 'required',
        ]);

        $imageOld = $request->image;
        $playlist = Playlist::findOrFail($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $Extension = $image->getClientOriginalExtension();
            $imageName = Str::random(10) . '_' . time() . '.' . $Extension;
            $image->move('storage', $imageName);
            Storage::delete('public/' . $playlist->image);

            $playlist->update([
                'name' => $request->name,
                'id_playlist' => Str::slug($request->name),
                'image' => $imageName ?? $imageOld,
                'status' => $request->status,
            ]);
        } else {
            $playlist->update([
                'name' => $request->name,
                'id_playlist' => Str::slug($request->name),
                'image' => $imageOld,
                'status' => $request->status,
            ]);
        }
        return redirect('/authors/playlist')->with('message', 'playlist success diupdate !!');
    }

    //authors
    public function AuthorsStore(Request $request)
    {
        $name = $request->name;
        if (Author::where('name', $name)->exists()) {
            return redirect()
                ->back()
                ->with('message', 'Author sudah terdaftar dalam sistem.');
        }

        $profil = $request->profil;
        if (!$profil) {
            return redirect()
                ->back()
                ->with('message', 'Gambar gagal dimuat.');
        }

        $request->validate([
            'name' => 'required',
            'approve' => 'required',
            'user_id' => 'required',
            'profil' => 'required',
            'whatsapp' => 'nullable',
            'instagram' => 'nullable',
            'github' => 'nullable',
            'website' => 'nullable',
            'linkedin' => 'nullable',
            'work_as' => 'nullable',
        ]);

        if ($request->hasFile('profil')) {
            $profil = $request->file('profil');
            $Extension = $profil->getClientOriginalExtension();
            $profilName = Str::random(10) . '_' . time() . '.' . $Extension;
            $profil->move('storage', $profilName);

            $authors = Author::create([
                'name' => $request->name,
                'id_author' => Str::slug($request->name),
                'profil' => $profilName,
                'status' => $request->approve,
                'user_id' => $request->user_id,
                'wa' => $request->whatsapp,
                'ig' => $request->instagram,
                'github' => $request->github,
                'web' => $request->website,
                'linkedin' => $request->linkedin,
                'work_as' => $request->work_as,
            ]);
        }
        return redirect()
            ->back()
            ->with('message', 'authors success disimpan !!');
    }

    public function AuthorsUpdate(Request $request, $id)
    {
        $name = $request->name;
        $existingAuthor = Author::where('name', $name)->first();
        if ($existingAuthor && $existingAuthor->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'Nama Author sudah terdaftar dalam sistem.');
        }

        $request->validate([
            'name' => 'required',
            'profil' => 'required',
            'whatsapp' => 'nullable',
            'instagram' => 'nullable',
            'github' => 'nullable',
            'website' => 'nullable',
            'linkedin' => 'nullable',
            'work_as' => 'nullable',
        ]);

        $profilOld = $request->profil;
        $authors = Author::findOrFail($id);
        if ($request->hasFile('profil')) {
            $profil = $request->file('profil');
            $Extension = $profil->getClientOriginalExtension();
            $profilName = Str::random(10) . '_' . time() . '.' . $Extension;
            $profil->move('storage', $profilName);
            Storage::delete('public/' . $authors->profil);

            $authors->update([
                'name' => $request->name,
                'id_author' => Str::slug($request->name),
                'profil' => $profilName ?? $profilOld,
                'wa' => $request->whatsapp,
                'ig' => $request->instagram,
                'github' => $request->github,
                'web' => $request->website,
                'linkedin' => $request->linkedin,
                'work_as' => $request->work_as,
            ]);
        } else {
            $authors->update([
                'name' => $request->name,
                'id_author' => Str::slug($request->name),
                'profil' => $profilOld,
                'wa' => $request->whatsapp,
                'ig' => $request->instagram,
                'github' => $request->github,
                'web' => $request->website,
                'linkedin' => $request->linkedin,
                'work_as' => $request->work_as,
            ]);
        }
        return redirect()
            ->back()
            ->with('message', 'authors success diupdate !!');
    }

    //tutorial
    public function Tutorials()
{
    $playlists = Playlist::where('status', 1)->get();
    $users = auth()->user()->id;

    $author = Author::where('user_id', $users)->first();

    if ($author) {
        $tutorials = Tutorial::where('author_id', $author->id)
            ->with('playlist', 'author')
            ->get();
    } else {
        $tutorials = collect();
    }

    return Inertia::render('Authors/Tutorials', [
        'tutorials' => $tutorials,
        'playlists' => $playlists,
        'authors' => $author,
    ]);
}


    public function TutorEdit($id)
    {
        $tutorials = Tutorial::with('Author', 'Playlist')->get();
        $status1 = Tutorial::where('draft', 1)->get();
        $status2 = Tutorial::where('draft', 2)->get();
        $playlists = Playlist::where('status', 1)->get();
        $authorID = Author::where('status', 1)->get();
        $Tutorial = Playlist::withCount('tutorials')->get();
        $id_tutorial = Tutorial::find($id);
        return Inertia::render('Authors/EditTutorials', [
            'id_tutorial' => $id_tutorial,
            'Tutorial' => $Tutorial,
            'tutorials' => $tutorials,
            'status1' => $status1,
            'status2' => $status2,
            'playlists' => $playlists,
            'authorID' => $authorID,
        ]);
    }

    public function TutorUpdate(Request $request, $id)
    {
        $title = $request->title;
        $existing = Tutorial::where('title', $title)->first();
        if ($existing && $existing->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'Judul sudah pernah dibuat.');
        }

        $Draft = $request->draft;
        if ($Draft == 0) {
            return redirect()
                ->back()
                ->with('message', 'Status belum dipilih.');
        }

        $Playlist = $request->playlist;
        if ($Playlist == 0) {
            return redirect()
                ->back()
                ->with('message', 'Playlist belum dipilih.');
        }

        $Author = $request->author;
        if ($Author == 0) {
            return redirect()
                ->back()
                ->with('message', 'Author Error.');
        }

        $Content = $request->content;
        if ($Content == null) {
            return redirect()
                ->back()
                ->with('message', 'konten kosong Mohon Diisi.');
        }

        $request->validate([
            'title' => 'required',
            'draft' => 'required',
            'playlist' => 'required',
            'author' => 'required',
            'content' => 'required',
            'image' => 'required',
        ]);

        $imageOld = $request->image;
        $tutorial = Tutorial::findOrFail($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $Extension = $image->getClientOriginalExtension();
            $imageName = Str::random(10) . '_' . time() . '.' . $Extension;
            $image->move('storage', $imageName);
            Storage::delete('public/' . $tutorial->image);

            $tutorial->update([
                'title' => $request->title,
                'title_id' => Str::slug($request->title),
                'content' => $request->content,
                'image' => $imageName ?? $imageOld,
                'draft' => $request->draft,
                'author_id' => $request->author,
                'playlist_id' => $request->playlist,
            ]);
        } else {
            $tutorial->update([
                'title' => $request->title,
                'title_id' => Str::slug($request->title),
                'content' => $request->content,
                'image' => $imageOld,
                'draft' => $request->draft,
                'author_id' => $request->author,
                'playlist_id' => $request->playlist,
            ]);
        }
        return redirect('/authors/tutorials')->with('message', 'Tutorial success diupdate !!');
    }
}
