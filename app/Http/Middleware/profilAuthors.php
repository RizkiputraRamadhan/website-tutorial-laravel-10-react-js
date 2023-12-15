<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Author;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class profilAuthors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->user()->typeuser == 2) {
            $author = Author::where('user_id', auth()->user()->id)->first();
            if (!$author) {
                return redirect('/profile')->with('message', 'Data anda belum lengkap !!. Silakan lengkapi informasi author Anda.');
            }
        }
        return $next($request);
    }
}
