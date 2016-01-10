<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\Membership;

class SettingsMembershipController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = Membership::get();
        return response()->json($result);
    }
	
		public function getMembership($id){
        $result = Membership::where('id', $id)->get();
        return response()->json($result);
    }
    
    public function create(Request $request){
				$id = $request->input('id');
			
				if($id){
					$row = Membership::where('id', $id)->first();
				}
				else{
					$row = new Membership;
				}
        $row->name = $request->input('name');
				$row->discount = $request->input('discount');
				$row->direct_bonus = $request->input('direct_bonus');
				$row->generation_bonus = $request->input('generation_bonus');
        $row->save();
        return response()->json(['status' => 'ok', 'id' => $row->id]);
    }
    
    public function update(Request $request){
        $id = $request->input('id');
        $row = Membership::find($id);
        if(!$row)
        {
            return response()->json(['message' => 'Membership does not exists'], 500);
        }
        if($request->input('name'))
        {
            $row->name = $request->input('rate');
        }
        
        $row->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = Membership::where('id', $request->input('id'))->delete();
        return response()->json(['status' => 'ok']);
    }
}