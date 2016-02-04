<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\Sales;
use App\BV;
use App\Product;
use App\Membership;
use App\User;
use App\SaleProducts;

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
				
				$user_id = $request->input('user')['id'];
			
				// Get the membership level of the user
				$user = User::find($user_id);
				if(!$user){ return response()->json(['message' => 'User does not exists'], 500); } 
			
				$membership = Membership::find($user->membership_id);
				if(!$membership){ return response()->json(['message' => 'Membership does not exists'], 500); } 
			
				//$products = $request->input('product')['id'];
				$products = $request->input('product');
			
        $sales = new Sales;
        $sales->product_id = (count($products) == 1) ? $products[0]['id']:0;
        $sales->user_id = $user_id;
				//$sales->quantity = $request->input('quantity');
				$sales->discount = $membership->discount;
				$sales->total_products = count($products);
        $sales->save();
			
				$total_quantity = 0;
				$subtotal = 0;
				foreach($products as $item){
					$product_detail = Product::find($item['id']);
					
					$product_sales = new SaleProducts;
					$product_sales->product_id = $item['id'];
					$product_sales->sales_id = $sales->id;
					$product_sales->save();
					$subtotal += $product_detail->price * $item['quantity'];
					$total_quantity += $item['quantity'];
				}
			
				$sales->subtotal = $subtotal;
				// Calculate after discount
				$sales->total = $subtotal - (((floatval($sales->discount)) / 100) * $subtotal);
				$sales->quantity = $total_quantity;
				$sales->save();
        
        // Get the product details
        $product = Product::find($sales->product_id);
        
        $bv = new BV;
        $bv->user_id = $user_id;
        $bv->sales_id = $sales->id;
        $bv->value = $sales->total;
        $bv->save();
        
        return response()->json(['status' => 'ok', 'id' => $sales->id]);
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
        $result = Sales::where('id', $request->input('id'))->delete();
        return response()->json(['status' => 'ok']);
    }
}