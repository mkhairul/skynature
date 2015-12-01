<?php

use Illuminate\Database\Seeder;
use Kodeine\Acl\Models\Eloquent\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
				$this->command->info('Creating Roles');
        $roleAdmin = new Role();
				$roleAdmin->name = 'Administrator';
				$roleAdmin->slug = 'administrator';
				$roleAdmin->description = 'manage administration privileges';
				$roleAdmin->save();
    }
}
