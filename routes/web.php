<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(TaskController::class)->middleware('auth.custom')->prefix('tasks')
    ->group(function () {
        Route::get('/', 'index')->name('tasks.index');
        Route::get('/create', 'create')->name('tasks.create');
        Route::post('/', 'store')->name('tasks.store');
        Route::get('/{task}/edit', 'show')->name('tasks.show');
        Route::put('/{task}', 'update')->name('tasks.update');
        Route::delete('/{task}/delete', 'destroy')->name('tasks.destroy');
    });

Route::controller(AuthController::class)->middleware('guest')->prefix('auth')->group(function () {
    Route::get('login', 'login')->name('auth.login');
    Route::post('login', 'loginAuthenticate')->name('auth.loginAuthenticate');
    Route::get('register', 'register')->name('auth.register');
    Route::post('register', 'registerAuthenticate')->name('auth.registerAuthenticate');
});
