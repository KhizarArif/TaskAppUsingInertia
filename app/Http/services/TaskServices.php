<?php

namespace App\Http\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class TaskServices
{
    public function index()
    {

        $tasks = Task::all()->map(function ($task) {
            $task->starting_date = $task->starting_date
                ? Carbon::parse($task->starting_date)->format('F j, Y g:i A')
                : null;
            $task->ending_date = $task->ending_date
                ? Carbon::parse($task->ending_date)->format('F j, Y g:i A')
                : null;
            return $task;
        });
        // dd($tasks);
        return Inertia::render('Task/Index', [
            'taskList' => $tasks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Task/Create', [
            'task' => null,
        ]);
    }

    public function store($request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'assigned_to' => 'required',
            'status' => 'required|string|max:50',
            'starting_date' => 'required|date',
            'ending_date' => 'required|date|after_or_equal:starting_date',
        ]);
        if ($validation->fails()) {
            return Inertia::render('Task/Create', [
                'errors' => $validation->errors(),
            ])->toResponse(request())->setStatusCode(422);
        }
        // Create a new task
        $createTask = Task::create([
            'name' => $request->name,
            'assigned_to' => $request->assigned_to,
            'status' => $request->status,
            'starting_date' => $request->starting_date,
            'ending_date' => $request->ending_date,
        ]);

        return Inertia::render('Task/Index', [
            'taskList' => Task::orderBy('created_at', 'asc')->paginate(),
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
            'assigned_to' => $request->assigned_to,
            'status' => $request->status,
            'starting_date' => $request->starting_date,
            'ending_date' => $request->ending_date,

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
