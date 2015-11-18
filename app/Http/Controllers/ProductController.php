<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\Product;

class ProductController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = Product::get();
        return response()->json($result);
    }
    
    public function create(Request $request){
        $row = new Product;
        $row->name = $request->input('name');
        $row->price = $request->input('price');
        $row->enabled = 1;
        $row->save();
        return response()->json(['status' => 'ok', 'id' => $row->id]);
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