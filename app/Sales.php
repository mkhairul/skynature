<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    //
    protected $table = 'sales';
    
    public function product()
    {
        return $this->hasMany('App\Product', 'id', 'product_id');
    }
    
    public function user()
    {
        return $this->hasMany('App\User', 'id', 'user_id');
    }
}
