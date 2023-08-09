<?php

use App\Http\Controllers\Customers\ClientController;
use App\Http\Controllers\Customers\CompanyController;
use App\Http\Controllers\Customers\CustomerController;
use App\Http\Controllers\Customers\GroupOfCompanyController;
use App\Http\Controllers\Customers\UnitController;
use Illuminate\Support\Facades\Route;

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix("/v1")->group(function () {
    Route::get("/customers/pop-up-data", [CustomerController::class, "popUpData"]);

    Route::apiResource("/customers/group-of-companies", GroupOfCompanyController::class)
        ->only("store");
    Route::apiResource("/customers/companies", CompanyController::class)
        ->only("store");
    Route::apiResource("/customers/units", UnitController::class)
        ->only("store", "show", "update");
    Route::apiResource("/customers/clients", ClientController::class)
        ->only(["store", "index", "destroy", "show", "update"]);
});
