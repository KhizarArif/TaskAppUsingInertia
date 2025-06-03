<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('app');
});

Route::controller(TaskController::class)->prefix('tasks')
    ->group(function () {
        Route::get('/', 'index')->name('tasks.index');
        Route::get('/create', 'create')->name('tasks.create');
        Route::post('/', 'store')->name('tasks.store');
        Route::get('/{task}/edit', 'show')->name('tasks.show');
        Route::put('/{task}', 'update')->name('tasks.update');
        Route::delete('/{task}/delete', 'destroy')->name('tasks.destroy');
    });
