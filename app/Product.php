<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'product';
	
		public function images()
    {
        return $this->hasMany('App\ProductImage', 'product_id', 'id');
    }
}
