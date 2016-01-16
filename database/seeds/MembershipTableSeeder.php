<?php

use Illuminate\Database\Seeder;

class MembershipTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
				$this->command->info('Seeding Memberships');
				$membership = [
					[
						'name' => 'Sky Member',
						'direct_bonus' => '10%',
					],
					[
						'name' => 'Iron',
						'direct_bonus' => '12%',
					],
					[
						'name' => 'Steel',
						'direct_bonus' => '15%',
					],
					[
						'name' => 'Crystal',
						'direct_bonus' => '18%',
					],
					[
						'name' => 'Master',
						'direct_bonus' => '20%',
					],
					[
						'name' => 'Champion',
						'direct_bonus' => '25%',
					],
					[
						'name' => 'Titan',
						'direct_bonus' => '25%',
					],
				];
			
				foreach($membership as $member)
				{
					DB::table('membership')->insert([
							'name' => $member['name'],
							'direct_bonus' => $member['direct_bonus'],
					]);
				}
    }
}
