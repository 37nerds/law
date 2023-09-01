<?php

namespace App\Http\Controllers;

use App\Base\Controller;
use App\Base\Response;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 10);
        $paginates = collect(Client::with('unit.company.group_of_company')->paginate($perPage));
        $paginates["data"] = collect($paginates["data"])->map(function ($x) {
            Log::info($x);

            return [
                "id" => $x["id"],
                "name" => $x["name"],
                "unit_id" => $x["unit"]["id"],
                "unit_name" => $x["unit"]["name"],
                "company_id" => $x["unit"]["company"]["id"],
                "company_name" => $x["unit"]["company"]["name"],
                "group_of_company_id" => $x["unit"]["company"]["group_of_company"]["id"],
                "group_of_company_name" => $x["unit"]["company"]["group_of_company"]["name"],
            ];
        });
        return Response::happy(200, $paginates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = Client::create($validated);
        return Response::happy(201, new ClientResource($item));
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client): JsonResponse
    {
        return Response::happy(200, new ClientResource($client));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client): JsonResponse
    {
        $client->update($request->all());
        return Response::happy(200, new ClientResource($client));
    }

    public function destroy(Client $client): JsonResponse
    {
        if (!Auth::user()->tokenCan("admin")) {
            abort(403, "Unauthorized");
        }

        $client->delete();
        return Response::happy(204);
    }
}
