<?php

namespace App\Http\Controllers\Customers;

use App\Base\Controller;
use App\Base\Response;
use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Http\Resources\ClientResource;
use App\Http\Resources\UnitResource;
use App\Models\Unit;
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
        $unit->update($request->all());
        return Response::happy(200, new ClientResource($unit));
    }

    public function destroy(Unit $unit)
    {

    }
}
