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
        $result = User::select('id', 'parent_id', 'name', 'enabled', 'email')->get();
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
        if($request->input('parent'))
        {
            $user->parent_id = $request->input('parent')['id'];
        }
        $user->ic_no = $request->input('ic_no');
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
        if($request->input('name'))
        {
            $user->name = $request->input('name');
        }
        if($request->input('email'))
        {
            $user->email = $request->input('email');
        }
        if($request->input('password'))
        {
            $user->password = bcrypt($request->input('password'));
        }
        if($request->input('enabled'))
        {
            $user->email = $request->input('enabled');
        }
        $user->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = User::where('email', $request->input('email'))->delete();
        return response()->json(['status' => 'ok']);
    }
    
    public function children(Request $request){
    }
}