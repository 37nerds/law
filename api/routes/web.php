<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;


Route::get('/welcome/{id}', function (\Illuminate\Http\Request $request, $id) {
    Log::info($id);

    Log::info($request->getQueryString());
    Log::info($request->getPathInfo());
    Log::info($request->getBaseUrl());
    Log::info($request->url());
    Log::info($request->path());

    return "Hello World";
});
