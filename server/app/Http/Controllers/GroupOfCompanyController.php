<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGroupOfCompanyRequest;
use App\Http\Requests\UpdateGroupOfCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\GroupOfCompanyResource;
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
        return $this->json(CompanyResource::collection(GroupOfCompany::query()->paginate($perPage)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupOfCompanyRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = GroupOfCompany::create($validated);
        return $this->success(new GroupOfCompanyResource($item), "", 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupOfCompany $groupOfCompany): JsonResponse
    {
        return $this->json(["data" => $groupOfCompany]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupOfCompanyRequest $request, GroupOfCompany $groupOfCompany): JsonResponse
    {
        $validated = $request->validated();

        $groupOfCompany->update($validated);
        return $this->json($groupOfCompany);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupOfCompany $groupOfCompany): JsonResponse
    {
        $groupOfCompany->delete();
        return $this->json([], 204);
    }
}
