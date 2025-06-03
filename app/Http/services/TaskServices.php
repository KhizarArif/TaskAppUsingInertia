<?php

namespace App\Http\Services;

use App\Models\Task;
use Inertia\Inertia;

class TaskServices
{
    public function index()
    {

        // dd('TaskServices index method called');
        $tasks = Task::orderBy('created_at', 'asc')->get();
        // dd($tasks);
        return Inertia::render('Task/Index', [
            'taskList' => $tasks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Task/Create',[
            'task' => null,
        ]);
    }

    public function store($request)
    {
        $createTask = Task::create([
            'name' => $request->name,
        ]);

        return Inertia::render('Task/Index', [
            'taskList' => Task::orderBy('created_at', 'asc')->get(),
            'message' => 'Task created successfully',
        ]);
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);
        return Inertia::render('Task/Create', [
            'task' => $task,
        ]);
    }

    public function update($request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update([
            'name' => $request->name,
        ]);

        return Inertia::render('Task/Index', [
            'taskList' => Task::orderBy('created_at', 'asc')->get(),
            'message' => 'Task updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail(($id));
        $task->delete();
        return Inertia::render('Task/Index', [
            'taskList' => Task::orderBy('created_at', 'asc')->get(),
            'message' => 'Task deleted successfully',
        ]);
    }

}
