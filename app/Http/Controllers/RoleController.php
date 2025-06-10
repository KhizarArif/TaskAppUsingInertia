<?php

namespace App\Http\Controllers;

// use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        // Logic to display roles
        $roles = Role::with('permissions:id,name')->get()->map(function ($role) {
            return [
                ...$role->only(['id', 'name', 'status']),
                'created_at' => $role->created_at->diffForHumans(),
                'updated_at' => $role->updated_at->diffForHumans(),
                'permissions' => $role->permissions->pluck('name', 'id')
            ];
        });
        // $roles = Role::all()->map(function ($role) {
        //     return [
        //         'id' => $role->id,
        //         'name' => $role->name,
        //         'status' => $role->status,
        //         'created_at' => $role->created_at->diffForHumans(),
        //         'updated_at' => $role->updated_at->diffForHumans(),
        //     ];
        // });

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        $permissions = Permission::all()->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'status' => $permission->status,
                'created_at' => $permission->created_at->diffForHumans(),
                'updated_at' => $permission->updated_at->diffForHumans(),
            ];
        });
        return Inertia::render('Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        // Logic to store a new role
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'required',
            'permissions' => 'required',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }

        if ($validate->passes()) {
            $role = Role::create([
                'name' => $request->name,
                'status' => $request->status,
            ]);
            $role->syncPermissions($request->permissions);
        }
        // dd("All are ok");
        // return redirect()->route('roles.index')->with('success', 'Role created successfully.');
        // return Inertia::location(route('roles.index'));
        return Inertia::render('Roles/Index', [
            'success' => 'Role created successfully.',
            'roles' => Role::with('permissions:id,name')->get()->map(function ($role) {
                return [
                    ...$role->only(['id', 'name', 'status']),
                    'created_at' => $role->created_at->diffForHumans(),
                    'updated_at' => $role->updated_at->diffForHumans(),
                    'permissions' => $role->permissions->pluck('name', 'id')
                ];
            }),
        ]);
        // return to_route('roles.index')->with([
        //     'success' => 'Role created successfully.',
        // ]);
    }



    public function show() {}

    public function edit() {}

    public function update() {}
    public function destroy() {}
}
