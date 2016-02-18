<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('login');
});

Route::get('/main', ['middleware' => 'auth', function () { return view('main'); }]);
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', function(){
    Auth::logout();
    return response()->json(['status' => 'ok']);
});
Route::get('auth/user', function(){
    return response()->json(Auth::user());
});
Route::get('users', 'UserController@getAll');
Route::post('user/create', 'UserController@create');
Route::post('user/update', 'UserController@update');
Route::post('user/remove', ['middleware' => 'auth', 'uses' => 'UserController@remove']);
Route::post('user/children', 'UserController@children');
Route::get('user/membership/{user_id}', 'UserController@getMembership');
Route::post('user/children/bv', 'UserController@childrenBV');
Route::get('user/graph', 'UserController@getGraph');

Route::post('settings/commission/create', 'SettingsCommissionController@create');
Route::post('settings/commission/update', 'SettingsCommissionController@update');
Route::post('settings/commission/delete', 'SettingsCommissionController@remove');
Route::get('settings/commission', 'SettingsCommissionController@getAll');
Route::get('settings/commission/{membership}', 'SettingsCommissionController@getMembershipCommission');
Route::get('settings/role', 'SettingsRoleController@getAll');
Route::post('settings/role/create', 'SettingsRoleController@create');
Route::post('settings/role/delete', 'SettingsRoleController@remove');
Route::get('settings/membership', 'SettingsMembershipController@getAll');
Route::get('settings/membership/{id}', 'SettingsMembershipController@getMembership');
Route::post('settings/membership/create', 'SettingsMembershipController@create');
Route::post('settings/membership/delete', 'SettingsMembershipController@remove');


Route::get('products', 'ProductController@getAll');
Route::post('product/create', 'ProductController@create');
Route::post('product/images', 'ProductController@saveImages');
Route::post('product/remove', 'ProductController@remove');

Route::get('sales', 'SalesController@getAll');
Route::get('sales/{user_id}', 'SalesController@getUser');
Route::get('sales/total/{user_id}', 'SalesController@getTotal');
Route::post('sales/create', 'SalesController@create');
Route::post('sales/remove', 'SalesController@remove');