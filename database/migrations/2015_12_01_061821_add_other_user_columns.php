<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOtherUserColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('type'); // company or individual
						$table->string('bank_name');
						$table->string('bank_acc');
						$table->string('bank_swift')->nullable();
						$table->longText('address');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
						$table->dropColumn(['type', 'bank_name', 'bank_acc', 'bank_swift', 'address'])
        });
    }
}
