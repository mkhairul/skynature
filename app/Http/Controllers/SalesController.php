<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\Sales;
use App\BV;
use App\Product;

class SalesController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = Sales::with('product')->with('user')->get();
        return response()->json($result);
    }
    
    public function create(Request $request){
        $row = new Sales;
        $row->product_id = $request->input('product')['id'];
        $row->user_id = $request->input('user')['id'];
        $row->save();
        
        // Get the product details
        $product = Product::find($row->product_id);
        
        $bv = new BV;
        $bv->user_id = $row->user_id;
        $bv->sales_id = $row->id;
        $bv->value = $product->price;
        $bv->save();
        
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