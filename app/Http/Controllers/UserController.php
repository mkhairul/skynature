<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\User;

class UserController extends Controller
{
    public $total_children = 0;
    
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = User::select('id', 'parent_id', 'ic_no', 'name', 'enabled', 'email')->get();
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
            $user->enabled = $request->input('enabled');
        }
        $user->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = User::where('email', $request->input('email'))->delete();
        return response()->json(['status' => 'ok']);
    }
    
    public function children(Request $request){
        $user_id = $request->input('id');
        $children = $this->retrieveChildren($user_id);
        return response()->json(['status' => 'ok', 'children' => $children, 'total_children' => $this->total_children]);
    }
    
    private function retrieveChildren($parent_id, $level = 1)
    {
        if($level == 8){ return []; }
        
        $users = [];
        
        $result = User::where('parent_id', $parent_id)->get();
        $this->total_children += count($result);
        foreach($result as $child)
        {
            $children = $this->retrieveChildren($child->id, $level + 1);
            $users[] = ['user' => $child, 'children' => $children];
        }
        
        return $users;
    }
}