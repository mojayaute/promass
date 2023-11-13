<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;

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

Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('all_tasks');
    Route::post('/save', [BlogController::class, 'save'])->name('save_task');
    Route::get('/{id}', [BlogController::class, 'show'])->name('show');
});