<?php

namespace App\Http\Services;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthServices
{
   public function login()
   {
    return Inertia::render("Login/Index");
   }
   public function loginAuthenticate($request)
   {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if($validator->fails())
        {
            return Inertia::render('Login/Index', [
                'message' => 'User name or Password is Required',
                'errors' => $validator->errors(),
            ])->toResponse(request())->setStatusCode(422);
        }

        if($validator->passes()){
            if(Auth::attempt(['email' => $request->email, 'password' => $request->password]))
            {
                $request->session()->regenerate();
                return Inertia::location('/');
            }
            else
            {
                return Inertia::render('Login/Index', [
                    'message' => 'User name or Password is incorrect',
                ])->toResponse(request())->setStatusCode(422);
            }
        }
   }
   public function register()
   {
    return Inertia::render("Register/Index");
   }
    public function registerAuthenticate($request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required',
            // 'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validation->fails()) {
            return Inertia::render('Register/Index', [
                'errors' => $validation->errors(),
            ])->toResponse(request())->setStatusCode(422);
        }

        if($validation->passes())
        {
            $user = User::create(([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                ]));

            Auth::login($user);
            // You can also handle login after registration if needed
            // return Inertia::render('Dashboard', [
            //     'message' => 'Registration successful, please login.',
            // ]);
            return Inertia::location('/');
        }


    }
}
