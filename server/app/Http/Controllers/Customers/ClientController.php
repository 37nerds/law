<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 10);
        $paginates = collect(Client::with('unit.company.group_of_company')->paginate($perPage));
        $paginates["data"] = collect($paginates["data"])->map(fn($x) => [
            "id" => $x["id"],
            "name" => $x["name"],
            "unit_id" => $x["unit"]["id"],
            "unit_name" => $x["unit"]["name"],
            "company_id" => $x["unit"]["company"]["id"],
            "company_name" => $x["unit"]["company"]["name"],
            "group_of_company_id" => $x["unit"]["company"]["group_of_company"]["id"],
            "group_of_company_name" => $x["unit"]["company"]["group_of_company"]["name"],
        ]);
        return $this->json($paginates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = Client::create($validated);
        return $this->success(new ClientResource($item), "", 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return $this->success(new ClientResource($client));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->all());
        return $this->success(new ClientResource($client));
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return $this->json([], 204);
    }
}
