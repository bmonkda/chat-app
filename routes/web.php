<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Models\Chat;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');


/* Route::get('chat/with/{user}', 'App\Http\Controllers\ChatController@chat_with'); */
Route::get('chat/with/{user}', [ChatController::class, 'chat_with'])->name('chat.with');

/* Route::get('chat', 'App\Http\Controllers\ChatController@show')->name('chat.show'); */
Route::get('chat/{chat}', [ChatController::class, 'show'])->name('chat.show');

/* Route::post('message/sent', '\App\Http\Controllers\MessageController@sent'); */
Route::post('message/sent', [MessageController::class, 'sent'])->name('message.sent');