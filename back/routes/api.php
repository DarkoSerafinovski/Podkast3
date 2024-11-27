<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

Route::get('/podcasts',[PodcastController::class,'index']);
Route::post('/podcasts',[PodcastController::class,'store']);
Route::put('/podcasts/{id}',[PodcastController::class,'update']);
Route::get('/podcasts/{id}',[PodcastController::class,'show']);
Route::delete('/podcasts/{id}',[PodcastController::class,'destroy']);


Route::get('/epizodes/file/{id}', [EpisodeController::class, 'getFile'])->name('epizode.file');


Route::get('/categories',[CategoryController::class,'index']);
Route::post('/categories',[CategoryController::class,'store']);
Route::delete('/categories/{id}',[CategoryController::class,'destroy']);


Route::get('/users',[UserController::class,'index']);
Route::delete('/users/{id}',[UserController::class,'destroy']);
Route::get('/users/favorites',[UserController::class,'myPodcasts']);
Route::put('/users/{id}',[UserController::class,'updateProfilePicture']);
Route::post('/users/favorites/{id}',[UserController::class,'addToFavorites']);
Route::delete('/users/favorites/{id}',[UserController::class,'removeFavorite']);


});