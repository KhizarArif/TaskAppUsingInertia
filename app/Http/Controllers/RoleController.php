<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        // Logic to display roles
        $roles = Role::all()->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'status' => $role->status,
                    'created_at' => $role->created_at->diffForHumans(),
                    'updated_at'=> $role->updated_at->diffForHumans(),
                ];
            }); 
        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        // Logic to store a new role
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'required',
        ]);

       if($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }

        if($validate->passes())
        {
            $role = new Role();
            $role->name = $request->roles;
            $role->status = $request->status;
            $role->save();
        }

        return redirect()->route('roles.index')->with('success', 'Role created successfully.');
    }
}
