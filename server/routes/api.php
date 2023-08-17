<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GroupOfCompanyController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

//    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//        return $request->user();
//    });

Route::prefix("/v1")
//    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/customers/pop-up-data", [CustomerController::class, "popUpData"]);
        Route::apiResource("/customers/group-of-companies", GroupOfCompanyController::class)
            ->only("store");
        Route::apiResource("/customers/companies", CompanyController::class)
            ->only("store");
        Route::apiResource("/customers/units", UnitController::class)
            ->only("store", "show", "update");
        Route::apiResource("/customers/clients", ClientController::class)
            ->only(["store", "index", "destroy", "show", "update"]);

        Route::post("/auth/login", [AuthController::class, "login"]);

        Route::post("/auth/register", [AuthController::class, "register"]);

        Route::post("/auth/logout", [AuthController::class, "logout"]);
    });
