<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customers\StoreUnitRequest;
use App\Http\Requests\Customers\UpdateUnitRequest;
use App\Http\Resources\Customers\UnitResource;
use App\Logic\Response;
use App\Models\Customers\Unit;
use App\Repositories\UnitRepository;
use Illuminate\Http\JsonResponse;

class UnitController extends Controller
{
    public function index()
    {
    }

    public function store(StoreUnitRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = Unit::create($validated);
        return Response::happy(201, new UnitResource($item));
    }

    public function show(Unit $unit): JsonResponse
    {
        return Response::happy(200, new UnitResource($unit));
    }

    public function update(UpdateUnitRequest $request, Unit $unit): JsonResponse
    {
        $unit = UnitRepository::update($unit, $request->all());
        return Response::happy(200, new UnitResource($unit));
    }

    public function destroy(Unit $unit)
    {

    }
}
