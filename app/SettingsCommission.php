<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SettingsCommission extends Model
{
    //
    protected $table = 'settings_commission';
	
		public function membership()
    {
        return $this->hasMany('App\Membership', 'id', 'membership_id');
    }
}
