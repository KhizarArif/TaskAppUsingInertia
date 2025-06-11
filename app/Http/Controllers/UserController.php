<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get(); 
        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create', [
            'user' => [
                'id' => null,
                'name' => '',
                'email' => '',
                'role' => [],
            ],
            'allRoles' => array_values(Role::pluck('name')->toArray()),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $isUpdate = $request->has('id') && $request->id !== null;
        // dd($request->all());
        $rules = [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                $isUpdate
                    ? ''
                    : 'unique:users,email'
            ],
            // 'role' => 'required',
            'password' => $isUpdate ? 'nullable|string|min:6' : 'required|string|min:6',
            'roles' => 'required|array',
        ];

        $validated = $request->validate($rules);

        if ($isUpdate) {
            $user = User::findOrFail($request->id);
            if (!empty($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            } else {
                unset($validated['password']);
            }

            $user->update($validated);
        } else {
            $validated['password'] = bcrypt($validated['password']);
            $validated['email_verified_at'] = now();
            $user = User::create($validated);
        }

        $user->syncRoles($request->roles);
        return Inertia::render('User/Index')->with('success', $isUpdate ? 'User updated successfully.' : 'User created successfully.');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::find($id);
        $roles = Role::all()->pluck('name');
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found.');
        }
        return Inertia::render('User/Create', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')
            ],
            'allRoles' => array_values($roles->toArray()),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
