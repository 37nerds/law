<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GroupOfCompanyController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix("/v1")->group(function () {
    Route::get("/customers/pop-up-data", [CustomerController::class, "popUpData"]);
    Route::get("/customers/list", [CustomerController::class, "customersList"]);

    Route::apiResource("/customers/group-of-companies", GroupOfCompanyController::class);
    Route::apiResource("/customers/companies", CompanyController::class);
    Route::apiResource("/customers/units", UnitController::class);
    Route::apiResource("/customers/clients", ClientController::class);
});
