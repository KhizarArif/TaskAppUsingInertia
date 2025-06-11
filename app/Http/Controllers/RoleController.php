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

    // public function store(Request $request)
    // {
    //     $validate = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'status' => 'required',
    //         'permissions' => 'required',
    //     ]);

    //     if ($validate->fails()) {
    //         return redirect()->back()->withErrors($validate)->withInput();
    //     }

    //     $data = $validate->validated();
    //     $role = Role::updateOrCreate(
    //         ['id' => $data['id'] ?? null], // Update if ID exists
    //         ['name' => $data['name'], 'status' => $data['status']]
    //     );
    //     $role->syncPermissions($request->permissions);

    //     return Inertia::render('Roles/Index', [
    //         'success' => 'Role created successfully.',
    //         'roles' => Role::with('permissions:id,name')->get()->map(function ($role) {
    //             return [
    //                 ...$role->only(['id', 'name', 'status']),
    //                 'created_at' => $role->created_at->diffForHumans(),
    //                 'updated_at' => $role->updated_at->diffForHumans(),
    //                 'permissions' => $role->permissions->pluck('name', 'id')
    //             ];
    //         }),
    //     ]);
    // }



    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'nullable|exists:roles,id',
            'name' => 'required|string|max:255',
            'status' => 'required',
            'permissions' => 'required|array',
        ]);

        if ($validate->fails()) {
            return redirect()->back()->withErrors($validate)->withInput();
        }

        $data = $validate->validated();

        if (isset($data['id'])) {
            // Update scenario
            $role = Role::findOrFail($data['id']);

            // Ensure you're not duplicating role name for another role
            if (Role::where('name', $data['name'])->where('id', '!=', $data['id'])->exists()) {
                return back()->withErrors(['name' => 'The role name has already been taken.'])->withInput();
            }

            $role->update([
                'name' => $data['name'],
                'status' => $data['status'],
            ]);
        } else {
            // Create scenario
            $role = Role::create([
                'name' => $data['name'],
                'status' => $data['status'],
                'guard_name' => 'web', // always include this explicitly
            ]);
        }

        $role->syncPermissions($data['permissions']);

        return Inertia::render('Roles/Index', [
            'success' => isset($data['id']) ? 'Role updated successfully.' : 'Role created successfully.',
            'roles' => Role::with('permissions:id,name')->get()->map(function ($role) {
                return [
                    ...$role->only(['id', 'name', 'status']),
                    'created_at' => $role->created_at->diffForHumans(),
                    'updated_at' => $role->updated_at->diffForHumans(),
                    'permissions' => $role->permissions->pluck('name', 'id'),
                ];
            }),
        ]);
    }


    public function show() {}

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        $permissions = Permission::all()->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->name,
                'status' => $permission->status,
                'created_at' => $permission->created_at->diffForHumans(),
                'updated_at' => $permission->updated_at->diffForHumans(),
            ];
        });
        $rolePermissions = $role->permissions->pluck('id', 'name')->toArray();
        return Inertia::render('Roles/Create', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
        ]);
    }

    public function update() {}
    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        // Prevent deleting protected roles
        if ($role->name === 'admin') {
            return back()->with('error', 'Cannot delete the admin role.');
        }

        try {
            // Detach permissions
            $role->permissions()->detach();

            // Detach users from the role (model_has_roles)
            $role->users()->detach(); // Optional: only if using relationship on Role model

            $role->delete();

            return Inertia::render('Roles/Index', [
                'success' => 'Role deleted successfully.',
                'roles' => Role::with('permissions:id,name')->get()->map(function ($role) {
                    return [
                        ...$role->only(['id', 'name', 'status']),
                        'created_at' => $role->created_at->diffForHumans(),
                        'updated_at' => $role->updated_at->diffForHumans(),
                        'permissions' => $role->permissions->pluck('name', 'id'),
                    ];
                }),
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete the role. ' . $e->getMessage());
        }
    }
}
