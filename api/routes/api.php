<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GroupOfCompanyController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;


Route::prefix("/v1")
    ->middleware(["auth:sanctum"])
    ->group(function () {

        Route::prefix("/auth")
            ->group(function () {

                Route::get('/rest-password/{token}', [AuthController::class, "resetPasswordRedirect"])
                    ->name('password.reset')
                    ->withoutMiddleware("auth:sanctum");

                Route::post("/register", [AuthController::class, "register"])
                    ->name("auth.register")
                    ->withoutMiddleware("auth:sanctum");

                Route::post("/upload-avatar", [AuthController::class, "uploadAvatar"])
                    ->name("auth.upload-profile-picture");

                Route::patch("/password", [AuthController::class, "updatePassword"])
                    ->name("auth.update-password");

                Route::get("/", [AuthController::class, "show"])
                    ->name("auth.show-logged-user");

                Route::patch("/", [AuthController::class, "update"])
                    ->name("auth.update-user");

            });

        Route::prefix("/customers")
            ->group(function () {

                Route::get("/pop-up-data", [CustomerController::class, "popUpData"])
                    ->name("customers.get-pop-up-data");

                Route::apiResource("/group-of-companies", GroupOfCompanyController::class)
                    ->only("store");

                Route::apiResource("/companies", CompanyController::class)
                    ->only("store");

                Route::apiResource("/units", UnitController::class)
                    ->only("store", "show", "update");

                Route::apiResource("/clients", ClientController::class)
                    ->only(["store", "index", "destroy", "show", "update"]);

            });

    });
