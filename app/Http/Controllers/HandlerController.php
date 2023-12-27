<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Author;
use App\Models\Playlist;
use App\Models\Tutorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

class HandlerController extends Controller
{
    public function login()
    {
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
        $playNavbar = Playlist::where('status', 1)
            ->withCount('tutorials')
            ->inRandomOrder()
            ->limit(8)
            ->get();
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'auth' => auth()->user(),
            'playNavbar' => $playNavbar,
        ]);
    }
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

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

        return back()
            ->withErrors([
                'email' => 'email atau password anda salah cek kembali.',
            ])
            ->onlyInput('email');
    }

    public function register()
    {
        $playNavbar = Playlist::where('status', 1)
            ->withCount('tutorials')
            ->inRandomOrder()
            ->limit(8)
            ->get();
        return Inertia::render('Auth/Register', [
            'auth' => auth()->user(),
            'playNavbar' => $playNavbar,
        ]);
    }

    public function AuthReg(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

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

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
    public function DemoTutorial($title_id)
    {
        $showTutor = Tutorial::where('title_id', $title_id)->first();
        $id_Playlist = $showTutor->playlist_id;
        $id_Author = $showTutor->author_id;
        $fkAuthor = Author::where('id', $id_Author)->first();
        $fkPlaylist = Playlist::where('id', $id_Playlist)->first();
        return inertia::render('demo/Tutorial', [
            'showTutor' => $showTutor,
            'fkPlaylist' => $fkPlaylist,
            'fkAuthor' => $fkAuthor,
        ]);
    }
}
