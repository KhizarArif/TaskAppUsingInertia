<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthServices;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authServices;

    public function __construct(AuthServices $authServices)
    {
        $this->authServices = $authServices;
    }

    public function login()
    {
        return $this->authServices->login();
    }
    public function loginAuthenticate(Request $request)
    {
        return $this->authServices->loginAuthenticate($request);
    }
    public function register()
    {
        return $this->authServices->register();
    }
    public function registerAuthenticate(Request $request)
    {
        return $this->authServices->registerAuthenticate($request);
    }
    public function logout(Request $request)
    {
        return $this->authServices->logout($request);
    }
    public function forgetPasswordForm(Request $request)
    {
        return $this->authServices->forgetPasswordForm($request);
    }
    public function forgetPassword(Request $request)
    {
        return $this->authServices->forgetPassword($request);
    }

   
    public function resetPassword(Request $request)
    {
        return $this->authServices->resetPassword($request);
    }

}
