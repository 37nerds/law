<?php

use App\Http\Controllers\GroupOfCompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix("/v1")->group(function () {
    Route::get("/group-of-companies", [GroupOfCompanyController::class, "index"]);
    Route::get("/group-of-companies/{groupOfCompany}", [GroupOfCompanyController::class, "show"]);
    Route::post("/group-of-companies", [GroupOfCompanyController::class, "store"]);
    Route::patch("/group-of-companies/{groupOfCompany}", [GroupOfCompanyController::class, "update"]);
    Route::delete("/group-of-companies", [GroupOfCompanyController::class, "destroy"]);


});
