<?php

namespace App\Http\Controllers\Admin;

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
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Application;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function Dashboard()
    {
        $users = User::all()->count();
        $authors = Author::all()->count();
        $playlist = Playlist::all()->count();
        $tutorial = Tutorial::all()->count();
        return Inertia::render('Admin/Dashboard', [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'users' => $users,
            'authors' => $authors,
            'playlist' => $playlist,
            'tutorial' => $tutorial,
        ]);
    }

    //users
    public function User()
    {
        $users = User::orderBy('id', 'desc')->get();
        $type1 = User::where('typeuser', 1)->count();
        $type2 = User::where('typeuser', 2)->count();
        $type3 = User::where('typeuser', 3)->count();
        return Inertia::render('Admin/User', [
            'users' => $users,
            'type1' => $type1,
            'type2' => $type2,
            'type3' => $type3,
        ]);
    }

    public function UsersEdit($id)
    {
        $usersEdit = User::find($id);
        $users = User::orderBy('id', 'desc')->get();
        $type1 = User::where('typeuser', 1)->count();
        $type2 = User::where('typeuser', 2)->count();
        $type3 = User::where('typeuser', 3)->count();
        return Inertia::render('Admin/EditUser', [
            'usersEdit' => $usersEdit,
            'users' => $users,
            'type1' => $type1,
            'type2' => $type2,
            'type3' => $type3,
        ]);
    }
    public function UsersUpdate(Request $request, $id)
    {
        $typeUser = $request->typeUser;
        if ($typeUser == 0) {
            return redirect()
                ->back()
                ->with('message', 'Peran belum dipilih.');
        }
        $email = $request->email;
        $existingPlaylist = User::where('email', $email)->first();
        if ($existingPlaylist && $existingPlaylist->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'Email sudah terdaftar dalam sistem.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
            'password' => ['nullable','min:8'],
            'typeUser' => 'required|in:1,2,3',
        ]);


        $users = User::findOrFail($id);

        if ($request->has('password')) {
            $users->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'typeuser' => $request->typeUser,
            ]);
        } else {
            $users->update([
                'name' => $request->name,
                'email' => $request->email,
                'typeuser' => $request->typeUser,
            ]);
        }

        return redirect('/admin/users')->with('message', 'users success diupdate !!');
    }
    public function UsersDelete($id)
    {
        $deleteUsers = User::findOrFail($id);
        $name = $deleteUsers->name;
        $deleteUsers->delete();

        return redirect()
            ->back()
            ->with('message', $name .' success dihapus !!');
    }

    //playlist
    public function Playlist()
    {
        $status1 = Playlist::where('status', 1)->get();
        $status2 = Playlist::where('status', 2)->get();
        $playlist = Playlist::withCount('tutorials')->get();
        return Inertia::render('Admin/Playlist', [
            'status1' => $status1,
            'status2' => $status2,
            'playlist' => $playlist,
        ]);
    }
    public function PlaylistStore(Request $request)
    {
        $name = $request->name;
        if (Playlist::where('name', $name)->exists()) {
            return redirect()
                ->back()
                ->with('message', 'Playlist sudah terdaftar dalam sistem.');
        }
        $status = $request->status;
        if ($status == 0) {
            return redirect()
                ->back()
                ->with('message', 'Status belum dipilih.');
        }
        $image = $request->image;
        if (!$image) {
            return redirect()
                ->back()
                ->with('message', 'Gambar gagal dimuat.');
        }
        $request->validate([
            'name' => 'required|max:255',
            'status' => 'required',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp',
        ]);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $Extension = $image->getClientOriginalExtension();
            $imageName = Str::random(10) . '_' . time() . '.' . $Extension;
            $image->move('storage', $imageName);
            $playlist = Playlist::create([
                'name' => $request->name,
                'id_playlist' => Str::slug($request->name),
                'image' => $imageName,
                'status' => $request->status,
            ]);
        }

        return redirect()
            ->back()
            ->with('message', 'playlist success diuplod !!');
    }
    public function PlaylistEdit($id)
    {
        $playlist = Playlist::withCount('tutorials')->get();
        $id_playlist = Playlist::find($id);
        return Inertia::render('Admin/EditPlaylist', [
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
            Storage::delete('public/'. $playlist->image);


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
        return redirect('/admin/playlist')->with('message', 'playlist success diupdate !!');
    }

    public function PlaylistDelete($id_playlist)
    {
        $PD = Playlist::findOrFail($id_playlist);
        $name = $PD->name;
        Storage::delete('public/'. $PD->image);
        $PD->delete();

        return redirect()
            ->back()
            ->with('message', $name. ' success dihapus !!');
    }

    //Authors

    public function Authors()
    {
        $authors = Author::with('UserId')->withCount('tutorials')->get();
        $status1 = Author::where('status', 1)->get();
        $status2 = Author::where('status', 2)->get();
        $users = User::orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Authors', [
            'authors' => $authors,
            'status1' => $status1,
            'status2' => $status2,
            'users' => $users,
        ]);
    }
    public function AuthorsDelete($id)
    {
        $AD = Author::findOrFail($id);
        $name = $AD->name;
        Storage::delete('public/'. $AD->profil);
        $AD->delete();

        return redirect()
            ->back()
            ->with('message', $name. ' success dihapus !!');
    }
    public function AuthorsEdit($id)
    {
        $user = User::all();
        $authors = Author::with('UserId')->withCount('tutorials')->get();
        $id_authors = Author::find($id);
        return Inertia::render('Admin/EditAuthors', [
            'id_authors' => $id_authors,
            'authors' => $authors,
            'users' => $user,

        ]);
    }

    public function AuthorsStore(Request $request)
    {
        $name = $request->name;
        if (Author::where('name', $name)->exists()) {
            return redirect()
                ->back()
                ->with('message', 'Author sudah terdaftar dalam sistem.');
        }

        $userid = $request->user_id;
        if (Author::where('user_id', $userid)->exists()) {
            return redirect()
                ->back()
                ->with('message', 'User ID sudah digunakan');
        }

        $profil = $request->profil;
        if (!$profil) {
            return redirect()
                ->back()
                ->with('message', 'Gambar gagal dimuat.');
        }

        $status = $request->status;
        if ($status == 0) {
            return redirect()
                ->back()
                ->with('message', 'Status belum dipilih.');
        }
        $request->validate([
            'name' => 'required',
            'status' => 'required',
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
                'status' => $request->status,
                'user_id' => $request->user_id,
                'wa' => $request->whatsapp,
                'ig' => $request->instagram,
                'github' => $request->github,
                'web' => $request->website,
                'linkedin' => $request->linkedin,
                'work_as' => $request->work_as,
            ]);
        }
        return redirect('/admin/authors')->with('message', 'authors success disimpan !!');
    }
    public function AuthorsUpdate(Request $request, $id)
    {
        $status = $request->status;
        if ($status == 0) {
            return redirect()
                ->back()
                ->with('message', 'Status belum dipilih.');
        }
        $name = $request->name;
        $existingAuthor = Author::where('name', $name)->first();
        if ($existingAuthor && $existingAuthor->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'Nama sudah terdaftar dalam sistem.');
        }

        $userid = $request->user_id;
        $existingAuthor = Author::where('user_id', $userid)->first();
        if ($existingAuthor && $existingAuthor->id != $id) {
            return redirect()
                ->back()
                ->with('message', 'User ID sudah digunakan.');
        }

        $request->validate([
            'name' => 'required',
            'status' => 'required',
            'user_id' => 'required',
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
            Storage::delete('public/'. $authors->profil);


            $authors->update([
                'name' => $request->name,
                'id_author' => Str::slug($request->name),
                'profil' => $profilName ?? $profilOld,
                'status' => $request->status,
                'user_id' => $request->user_id,
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
                'status' => $request->status,
                'user_id' => $request->user_id,
                'wa' => $request->whatsapp,
                'ig' => $request->instagram,
                'github' => $request->github,
                'web' => $request->website,
                'linkedin' => $request->linkedin,
                'work_as' => $request->work_as,
            ]);
        }
        return redirect('/admin/authors')->with('message', 'authors success diupdate !!');
    }

    //tutorials
    public function Tutorials()
    {
        $tutorials = Tutorial::with('Author', 'Playlist')->get();
        $status1 = Tutorial::where('draft', 1)->get();
        $status2 = Tutorial::where('draft', 2)->get();
        $playlists = Playlist::where('status', 1)->get();
        $authorID = Author::where('status', 1)->get();
        return Inertia::render('Admin/Tutorials', [
            'tutorials' => $tutorials,
            'status1' => $status1,
            'status2' => $status2,
            'playlists' => $playlists,
            'authorID' => $authorID,
        ]);
    }
    public function TutorialsDraft()
    {
        $tutorials = Tutorial::with('Author', 'Playlist')->get();
        $status1 = Tutorial::where('draft', 1)->get();
        $status2 = Tutorial::where('draft', 2)->get();
        $playlists = Playlist::where('status', 1)->get();
        $authorID = Author::where('status', 1)->get();
        return Inertia::render('Admin/TutorialsDraft', [
            'tutorials' => $tutorials,
            'status1' => $status1,
            'status2' => $status2,
            'playlists' => $playlists,
            'authorID' => $authorID,
        ]);
    }
    public function TutorDraft($id)
    {
        $TutorDraft = Tutorial::findOrFail($id);
        $TutorDraft->update([
            'draft' => 1,
        ]);
        $title = $TutorDraft->title;
        return redirect()
            ->back()
            ->with('message', $title. ' success dipublish !!');
    }
    public function TutorPublish($id)
    {
        $TutorPublish = Tutorial::findOrFail($id);
        $TutorPublish->update([
            'draft' => 2,
        ]);
        $title = $TutorPublish->title;
        return redirect()
            ->back()
            ->with('message', $title. ' success disimpan di Draft !!');
    }
    public function TutorialStore(Request $request)
    {
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
                ->with('message', 'Author belum dipilih.');
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
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp',
        ]);


        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $Extension = $image->getClientOriginalExtension();
            $imageName = Str::random(10) . '_' . time() . '.' . $Extension;
            $image->move('storage', $imageName);
            $tutorial = Tutorial::create([
                'title' => $request->title,
                'title_id' => Str::slug($request->title),
                'content' => $request->content,
                'image' => $imageName,
                'draft' => $request->draft,
                'author_id' => $request->author,
                'playlist_id' => $request->playlist,
            ]);
        }

        return redirect()
            ->back()
            ->with('message', 'Tutorial success diuplod !!');
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
        return Inertia::render('Admin/EditTutorials', [
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
                ->with('message', 'Author belum dipilih.');
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
            Storage::delete('public/'. $tutorial->image);


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
        return redirect('/admin/tutorials')->with('message', 'Tutorial success diupdate !!');
    }
    public function TutorDelete($id)
    {
        $TD = Tutorial::findOrFail($id);
        $title = $TD->title;
        Storage::delete('public/'. $TD->image);
        $TD->delete();

        return redirect()
            ->back()
            ->with('message', $title. ' success dihapus !!');
    }
}
