<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customers\StoreCompanyRequest;
use App\Http\Requests\Customers\UpdateCompanyRequest;
use App\Http\Resources\Customers\CompanyResource;
use App\Logic\Response;
use App\Models\Customers\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 10);
        return Response::happy(200, CompanyResource::collection(Company::query()->paginate($perPage)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $item = Company::create($validated);
        return Response::happy(201, new CompanyResource($item));
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
