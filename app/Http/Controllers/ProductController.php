<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Validator;

use App\Product;
use App\ProductImage;

class ProductController extends Controller
{
    public function __construct()
    {
    }
    
    public function getAll(){
        $result = Product::with('images')->get();
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
	
		public function saveImages(Request $request){
			$product_id = $request->input('product_id');
			if(!$product_id){ 
				//return response()->json(['message' => 'Need product id', 'log' => print_r($request, true)], 500); 
			}
			if ($request->hasFile('file')) {
				//return response()->json(['message' => 'No file uploaded', 'log' => print_r($request, true)], 500);
			}
			
			$extension = $request->file('file')->getClientOriginalExtension(); // getting image extension
      $fileName = rand(11111,99999).'.'.$extension; // renameing image
			$mimetype = $request->file('file')->getMimeType();
			$filesize = $request->file('file')->getSize();
			$request->file('file')->move('uploads', $fileName);
			
			$row = new ProductImage;
			$row->product_id = $product_id;
			$row->name = $fileName;
			$row->type = $mimetype;
			$row->size = $filesize;
			$row->save();
			return response()->json(['status' => 'ok']);
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
        $result = Product::where('id', $request->input('id'))->delete();
        return response()->json(['status' => 'ok']);
    }
}