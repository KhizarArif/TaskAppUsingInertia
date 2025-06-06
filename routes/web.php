<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::get('login', 'login')->name('auth.login');
    Route::post('login', 'loginAuthenticate')->name('auth.loginAuthenticate');
    Route::get('register', 'register')->name('auth.register');
    Route::post('register', 'registerAuthenticate')->name('auth.registerAuthenticate');
    Route::post('logout', 'logout')->name('auth.logout');
    Route::get('forget-password', 'forgetPasswordForm')->name('auth.forgetPasswordForm');
    Route::post('forget-password', 'forgetPassword')->name('auth.forgetPassword');
    Route::post('verify-code', 'verifyCode')->name('auth.verifyCode');
    Route::post('reset-password', 'resetPassword')->name('auth.resetPassword');
});

Route::middleware('auth')->group(function () {
    Route::controller(TaskController::class)->prefix('tasks')
        ->group(function () {
            Route::get('/', 'index')->name('tasks.index');
            Route::get('/create', 'create')->name('tasks.create');
            Route::post('/', 'store')->name('tasks.store');
            Route::get('/{task}/edit', 'show')->name('tasks.show');
            Route::put('/{task}', 'update')->name('tasks.update');
            Route::delete('/{task}/delete', 'destroy')->name('tasks.destroy');
        });
    Route::get('dashboard', [HomeController::class, 'index'])->name('dashboard');
 
    Route::resource('roles', RoleController::class);
    Route::controller(UserController::class)->prefix('users')->group(function () {
        Route::get('/', 'index')->name('users.index');
        Route::post('/', 'store')->name('users.store');
        Route::get('/create', 'create')->name('users.create');
        Route::get('/{role}/edit', 'edit')->name('users.edit');
        Route::delete('/{role}/delete', 'destroy')->name('users.destroy');
    });
});
