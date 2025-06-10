<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
        $roles = [
            'admin' => ['view users', 'create users', 'edit users', 'delete users', 'view roles', 'create roles', 'edit roles', 'delete roles', 'view permissions', 'create permissions', 'edit permissions', 'delete permissions'],
            'editor' => ['view users', 'edit users'],
            'viewer' => ['view users'],
        ];
        foreach ($roles as $roleName => $permissions) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            foreach ($permissions as $permission) {
                $role->givePermissionTo($permission);
            }
        }

    }
}
