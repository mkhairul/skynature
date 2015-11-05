<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\User;

class UserController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = User::select('name', 'email')->get();
        return response()->json($result);
    }
    
    public function create(Request $request){
        $user_exists = User::where('email', $request->input('email'))->first();
        if($user_exists)
        {
            return response()->json(['message' => 'Email already exists'], 500);
        }

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json(['status' => 'ok', 'id' => $user->id]);
    }
    
    public function update(Request $request){
        $id = $request->input('id');
        $user = User::find($id);
        if(!$user)
        {
            return response()->json(['message' => 'User does not exists'], 500);
        }
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = User::where('email', $request->input('email'))->delete();
        return response()->json(['status' => 'ok']);
    }
}