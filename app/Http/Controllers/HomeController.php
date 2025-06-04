<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $totalPendingTasks = Task::where('status', 'pending')->count();
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        return Inertia::render('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'message' => 'Welcome to the Dashboard',
        ]);
    }
}
