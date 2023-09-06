<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customers\StoreGroupOfCompanyRequest;
use App\Http\Requests\Customers\UpdateGroupOfCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\GroupOfCompanyResource;
use App\Logic\Response;
use App\Models\GroupOfCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupOfCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 10);
        return Response::happy(200, CompanyResource::collection(GroupOfCompany::query()->paginate($perPage)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupOfCompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = GroupOfCompany::create($validated);
        return Response::happy(201, new GroupOfCompanyResource($item));
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupOfCompany $groupOfCompany): JsonResponse
    {
        return Response::happy(200, ["data" => $groupOfCompany]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupOfCompanyRequest $request, GroupOfCompany $groupOfCompany): JsonResponse
    {
        $validated = $request->validated();

        $groupOfCompany->update($validated);
        return Response::happy(200, $groupOfCompany);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupOfCompany $groupOfCompany): JsonResponse
    {
        $groupOfCompany->delete();
        return Response::happy(204);
    }
}
