<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::POST('todo/get','TodoController@getData')->name('todo.getData');
Route::post('todo/store','TodoController@store')->name('todo.store');
Route::post('todo/update','TodoController@update')->name('todo.update');
Route::post('todo/edit','TodoController@edit')->name('todo.edit');
Route::post('todo/clear','TodoController@clear')->name('todo.clear');
