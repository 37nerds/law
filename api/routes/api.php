<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Customers\ClientController;
use App\Http\Controllers\Customers\CompanyController;
use App\Http\Controllers\Customers\CustomerController;
use App\Http\Controllers\Customers\GroupOfCompanyController;
use App\Http\Controllers\Customers\UnitController;
use App\Http\Controllers\RBAC\PermissionController;
use App\Http\Controllers\RBAC\ResourceController;
use App\Http\Controllers\RBAC\RoleController;
use App\Http\Controllers\RBAC\UserController;
use App\Http\Controllers\Settings\HostController;
use Illuminate\Support\Facades\Route;

Route::prefix("/v1")
    ->middleware(["auth:sanctum"])
    ->group(function () {

        Route::prefix("/auth")
            ->group(function () {

                Route::post("/register", [AuthController::class, "register"])
                    ->name("auth.register")
                    ->withoutMiddleware("auth:sanctum")
                    ->middleware("guest");

                Route::post("/logout", [AuthController::class, "logout"])
                    ->name("auth.logout");

                Route::get('/rest-password/{token}', [AuthController::class, "resetPasswordRedirect"])
                    ->name('password.reset')
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
            ->middleware("protect")
            ->group(function () {

                Route::get("/pop-up-data", [CustomerController::class, "popUpData"])
                    ->name("customers.get-pop-up-data");

                Route::apiResource("/group-of-companies", GroupOfCompanyController::class)
                    ->only("store");

                Route::apiResource("/companies", CompanyController::class)
                    ->only("store");

                Route::apiResource("/units", UnitController::class)
                    ->only("store", "show", "update");

                Route::prefix("/clients")->group(function () {
                    Route::post("/", [ClientController::class, "store"]);
                    Route::delete("/", [ClientController::class, "destroy"]);
                    Route::apiResource("/", ClientController::class)
                        ->only(["index", "show", "update"]);

                });

            });

        Route::prefix("/rbac")
            ->middleware("protect")
            ->group(function () {

                Route::prefix("/users")->group(function () {

                    Route::post("/", [UserController::class, "store"]);
                    Route::get("/", [UserController::class, "index"]);
                    Route::patch("/", [UserController::class, "update"]);
                    Route::delete("/", [UserController::class, "destroy"]);

                });

                Route::prefix("/roles")->group(function () {

                    Route::get("/", [RoleController::class, "index"]);
                    Route::post("/", [RoleController::class, "store"]);
                    Route::patch("/", [RoleController::class, "update"]);
                    Route::delete("/", [RoleController::class, "destroy"]);

                });

                Route::prefix("/resources")->group(function () {

                    Route::get("/", [ResourceController::class, "index"]);
                    Route::post("/", [ResourceController::class, "store"]);
                    Route::patch("/", [ResourceController::class, "update"]);
                    Route::delete("/", [ResourceController::class, "destroy"]);

                });

                Route::prefix("/permissions")->group(function () {

                    Route::post("/", [PermissionController::class, "store"]);
                    Route::post("/all", [PermissionController::class, "storeAll"]);
                    Route::delete("/", [PermissionController::class, "destroy"]);
                    Route::delete("/all", [PermissionController::class, "destroyAll"]);

                });

            });

        Route::prefix("/settings")
            ->middleware("protect")
            ->group(function () {
                Route::prefix("/hosts")->group(function () {

                    Route::get("/", [HostController::class, "index"]);
                    Route::patch("/", [HostController::class, "update"]);

                });
            });
    });
