<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\SettingsCommission;
use App\MembershipCommission;

class SettingsCommissionController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = SettingsCommission::with('membership')->get();
        return response()->json($result);
    }
	
		public function getMembershipCommission($membership){
        $result = SettingsCommission::with('membership')->where('membership_id', $membership)->get();
        return response()->json($result);
    }
    
    public function create(Request $request){
				$membership_id = $request->input('membership');
				if(!$membership_id){ 
					return response()->json(['message' => 'Select membership'], 500);
				}
			
        $comm = new SettingsCommission;
        $comm->level = $request->input('level');
        $comm->rate = $request->input('rate');
        $comm->enabled = ($request->input('enabled')) ? $request->input('enabled'):0;
				$comm->membership_id = $membership_id;
        $comm->save();
			
        return response()->json(['status' => 'ok', 'id' => $comm->id]);
    }
    
    public function update(Request $request){
        $id = $request->input('id');
        $comm = SettingsCommission::find($id);
        if(!$comm)
        {
            return response()->json(['message' => 'Commission does not exists'], 500);
        }
        if($request->input('rate'))
        {
            $comm->rate = $request->input('rate');
        }
        if($request->input('level'))
        {
            $comm->level = $request->input('level');
        }
        if($request->input('enabled'))
        {
            $comm->enabled = $request->input('enabled');
        }
        $comm->save();
        return response()->json(['status' => 'ok']);
    }
    
    public function remove(Request $request){
        $result = SettingsCommission::where('id', $request->input('id'))->delete();
        return response()->json(['status' => 'ok']);
    }
}