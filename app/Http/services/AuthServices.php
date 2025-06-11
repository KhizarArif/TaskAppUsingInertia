<?php

namespace App\Http\Services;

use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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


        if ($validator->fails()) {
            return Inertia::render('Login/Index', [
                'message' => 'User name or Password is Required',
                'errors' => $validator->errors(),
            ])->toResponse(request())->setStatusCode(422);
        }

        if ($validator->passes()) {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $request->session()->regenerate();
                return Inertia::location('/dashboard');
            } else {
                return Inertia::render('Login/Index', [
                    'message' => 'User name or Password is incorrect',
                ]);
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

        if ($validation->passes()) {
            $user = User::create(([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]));

            Auth::login($user);
            return Inertia::location('/dashbaord');
        }
    }

    public function logout($request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
 
        return response()->noContent();
    }

    public function forgetPasswordForm($request)
    {
        return Inertia::render('ForgetPassword/Index');
    }

    public function forgetPassword($request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validation->fails()) {
            return Inertia::render('ForgetPassword/Index', [
                'errors' => $validation->errors(),
            ])->toResponse(request())->setStatusCode(422);
        }

        return Inertia::render('ForgetPassword/ResetPassword', [
            'email' => $request->email,
        ]);
    }


    public function resetPassword($request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'No user found with this email.']);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Optionally: delete reset token
        PasswordResetToken::where('email', $request->email)->delete();

        return redirect()->route('auth.login')->with('message', 'Password reset successful. Please login.');
    }
}
