<?php

use Inertia\Inertia;
use App\Models\Playlist;
use App\Http\Middleware\roleAdmin;
use App\Http\Middleware\roleUsers;
use App\Http\Middleware\roleAuthors;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\profilAuthors;
use App\Http\Controllers\HandlerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InterfaceController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Users\UsersController;
use App\Http\Controllers\Authors\AuthorsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//auth
Route::get('login', [HandlerController::class, 'login'])->name('login');
Route::post('login', [HandlerController::class, 'authenticate']);
Route::get('register', [HandlerController::class, 'register'])->name('register');
Route::post('register', [HandlerController::class, 'AuthReg']);
Route::get('logout', [HandlerController::class, 'logout'])->name('logout');
//lading
Route::get('/', [InterfaceController::class, 'Home']);
Route::get('/playlist', [InterfaceController::class, 'Playlist']);
Route::get('/playlist/{id_playlist}', [InterfaceController::class, 'DetailsPlaylist']);
Route::get('/author/{id_author}', [InterfaceController::class, 'DetailsAuthors']);
Route::get('/{title_id}', [InterfaceController::class, 'ShowPost']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/handler', [HandlerController::class, 'Handler']);
    Route::get('/demo/tutorial/{title_id}', [HandlerController::class, 'DemoTutorial']);
    //admin
    Route::middleware(roleAdmin::class)->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'Dashboard']);
        //playlist
        Route::get('/admin/playlist', [AdminController::class, 'Playlist']);
        Route::post('/admin/playlistStore', [AdminController::class, 'PlaylistStore']);
        Route::get('/admin/playlistEdit/{id}/{id_playlist}', [AdminController::class, 'PlaylistEdit']);
        Route::post('/admin/playlistUpdate/{id}/{id_playlist}', [AdminController::class, 'PlaylistUpdate']);
        Route::get('/admin/playlistDelete/{id}/{id_playlist}', [AdminController::class, 'PlaylistDelete']);
        //authors
        Route::get('/admin/authors', [AdminController::class, 'Authors']);
        Route::post('/admin/authorsStore', [AdminController::class, 'AuthorsStore']);
        Route::get('/admin/authorsDelete/{id}/{id_authors}', [AdminController::class, 'AuthorsDelete']);
        Route::get('/admin/authorsEdit/{id}/{id_authors}', [AdminController::class, 'AuthorsEdit']);
        Route::post('/admin/authorsUpdate/{id}/{id_authors}', [AdminController::class, 'AuthorsUpdate']);
        //user account
        Route::get('/admin/users', [AdminController::class, 'User']);
        Route::get('/admin/usersEdit/{id}/{name}', [AdminController::class, 'UsersEdit']);
        Route::post('/admin/usersUpdate/{id}/{name}', [AdminController::class, 'UsersUpdate']);
        Route::get('/admin/usersDelete/{id}', [AdminController::class, 'UsersDelete']);
        //post
        Route::get('/admin/tutorials', [AdminController::class, 'Tutorials']);
        Route::get('/admin/tutorialsDraft', [AdminController::class, 'TutorialsDraft']);
        Route::post('/admin/tutorialStore', [AdminController::class, 'TutorialStore']);
        Route::get('/admin/tutorDelete/{id}/{title_id}', [AdminController::class, 'TutorDelete']);
        Route::get('/admin/tutorDraft/{id}', [AdminController::class, 'TutorDraft']);
        Route::get('/admin/tutorPublish/{id}', [AdminController::class, 'TutorPublish']);
        Route::get('/admin/tutorEdit/{id}/{title_id}', [AdminController::class, 'TutorEdit']);
        Route::post('/admin/tutorialUpdate/{id}', [AdminController::class, 'TutorUpdate']);
    });

    //authors
    Route::middleware(roleAuthors::class)->group(function () {
        Route::get('/authors/dashboard', [AuthorsController::class, 'Dashboard']);
        Route::post('/authors/authorsStore', [AuthorsController::class, 'AuthorsStore']);
        Route::post('/authors/authorsUpdate/{id}/{id_authors}', [AuthorsController::class, 'AuthorsUpdate']);

        Route::middleware(profilAuthors::class)->group(function () {
            //playlist
            Route::get('/authors/playlist', [AuthorsController::class, 'Playlist']);
            Route::post('/authors/playlistStore', [AdminController::class, 'PlaylistStore']);
            Route::get('/authors/playlistEdit/{id}/{id_playlist}', [AuthorsController::class, 'PlaylistEdit']);
            Route::post('/authors/playlistUpdate/{id}/{id_playlist}', [AuthorsController::class, 'PlaylistUpdate']);
            Route::get('/authors/playlistDelete/{id}/{id_playlist}', [AdminController::class, 'PlaylistDelete']);

            //post
            Route::get('/authors/tutorials', [AuthorsController::class, 'Tutorials']);
            Route::post('/authors/tutorialStore', [AdminController::class, 'TutorialStore']);
            Route::get('/authors/tutorDelete/{id}/{title_id}', [AdminController::class, 'TutorDelete']);
            Route::get('/authors/tutorEdit/{id}/{title_id}', [AuthorsController::class, 'TutorEdit']);
            Route::post('/authors/tutorialUpdate/{id}', [AuthorsController::class, 'TutorUpdate']);
       });
    });

    //user
    Route::middleware(roleUsers::class)->group(function () {
        Route::get('/user/dashboard', [UsersController::class, 'Dashboard']);
        Route::get('/user/playlist', [UsersController::class, 'Playlist']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::fallback(function () {
    $playNavbar = Playlist::where('status', 1)->withCount('tutorials')->inRandomOrder()->limit(8)->get();
    return Inertia::render('errors/404', [
        'auth' => auth()->user(),
        'playNavbar' => $playNavbar,
    ]);
});
require __DIR__ . '/auth.php';
