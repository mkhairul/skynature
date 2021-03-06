<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->command->info('Seeding User Table');
        $this->call(UserTableSeeder::class);
			
				$this->command->info('Seeding Role Table');
        $this->call(RoleTableSeeder::class);

        Model::reguard();
    }
}
