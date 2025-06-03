<?php

namespace App\Http\Controllers;

use App\Http\Services\TaskServices;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskService;
    public function __construct(TaskServices $taskService)
    {
        $this->taskService = $taskService;
    }
    public function index(){
        return $this->taskService->index();
    }
    public function create(){
        return $this->taskService->create();
    }
    public function store(Request $request){
        return $this->taskService->store($request);
    }
    public function show($id){
        return $this->taskService->show($id);
    }

    public function update(Request $request, $id){
        return $this->taskService->update($request, $id);
    }
    public function destroy($id){
        return $this->taskService->destroy($id);
    }
}
