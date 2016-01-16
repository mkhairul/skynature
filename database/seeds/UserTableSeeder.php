<?php
use Illuminate\Database\Seeder;
use Jenssegers\Optimus\Optimus;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete the users
        DB::table('users')->delete();
        
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'enabled' => 1,
            'parent_id' => 0,
						'role_id' => 1,
						'membership_id' => 7
        ]);
    }
}