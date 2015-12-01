<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\User;
use Auth;
use Jenssegers\Optimus\Optimus;

class UserController extends Controller
{
    public $total_children = 0;
		public $flat = [];
		public $bv = [];
		public $debug_log = [];
    
    public function __construct()
    {
			$this->optimus = new Optimus(1580030173, 59260789, 1163945558);
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
				$user->type = $request->input('type');
				$user->bank_name = $request->input('bank_name');
				$user->bank_acc = $request->input('bank_acc');
				$user->bank_swift = $request->input('bank_swift');
				$user->address = $request->input('address');
				$user->membership_id = $request->input('membership');
				$user->role_id = $request->input('role');
        $user->save();
				
				$user->sky_id = 'SKY' . $this->optimus->encode($user->id);
				$user->save();
				
			
        return response()->json(['status' => 'ok', 
																 'sky_id' => $user->sky_id,
																 'id' => $user->id]);
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
				if($request->input('ic_no'))
        {
            $user->enabled = $request->input('ic_no');
        }
				if($request->input('type'))
        {
            $user->enabled = $request->input('type');
        }
				if($request->input('bank_name'))
        {
            $user->enabled = $request->input('bank_name');
        }
				if($request->input('bank_acc'))
        {
            $user->enabled = $request->input('bank_acc');
        }
				if($request->input('bank_swift'))
        {
            $user->enabled = $request->input('bank_swift');
        }
				if($request->input('address'))
        {
            $user->enabled = $request->input('address');
        }
        $user->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = User::where('email', $request->input('email'))->delete();
        return response()->json(['status' => 'ok']);
    }
	
		public function getGraph(Request $request){
				$user_id = $request->input('id') ? $request->input('id'):Auth::user()->id;
				$result = User::find($user_id);
        $children = $this->retrieveChildren($user_id, 1);
        return response()->json(['name' => $result->name,
																 'children' => $children, 
																 'total_children' => $this->total_children]);
		}
	
		public function childrenBV(Request $request){
        $user_id = $request->input('id') ? $request->input('id'):Auth::user()->id;
        $children = $this->retrieveChildren($user_id, 1, true);
        return response()->json(['status' => 'ok', 
																 'bv' => $this->bv,
																 'children' => $children, 
																 'log' => $this->debug_log,
																 'total_children' => $this->total_children]);
    }
    
    public function children(Request $request){
        $user_id = $request->input('id');
        $children = $this->retrieveChildren($user_id);
        return response()->json(['status' => 'ok', 
																 'children' => $children, 
																 'total_children' => $this->total_children]);
    }
	
		private function log($str){
			$this->debug_log[] = $str;
		}
    
    private function retrieveChildren($parent_id, $level = 1, $bv = false)
    {
        if($level == 8){ return []; }
        
        $users = [];
        
				if($bv == true)
				{
        	$result = User::with('bv')->where('parent_id', $parent_id)->get();
				}
				else
				{
					$result = User::where('parent_id', $parent_id)->get();
				}
				
        $this->total_children += count($result);
			
        foreach($result as $child)
        {
        	$children = $this->retrieveChildren($child->id, $level + 1, $bv);
          $users[] = ['name' => $child->name, 'user' => $child, 'level' => $level, 'children' => $children];
					if($bv)
					{
						if(count($child->bv) > 0)
						{
							array_push($this->bv, [
								'data' => $child,
								'level' => $level
							]);
						}
					}
        }
        
        return $users;
    }
}