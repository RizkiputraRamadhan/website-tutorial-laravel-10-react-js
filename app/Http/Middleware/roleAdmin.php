<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class roleAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->user()->typeuser != 1) {
            if(auth()->user()->typeuser == 3) {
                return redirect('/user/dashboard')->with('message', 'Errors!! Anda Mencoba Akses permission Admin.');
            } elseif(auth()->user()->typeuser == 2) {
                return redirect('/authors/dashboard')->with('message', 'Errors!! Anda Mencoba Akses permission Admin.');
            }
        }
        return $next($request);
    }
}
