<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

// Public API routes
Route::apiResource('tasks', TaskController::class);
Route::patch('tasks/{task}/toggle', [TaskController::class, 'toggleComplete']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');