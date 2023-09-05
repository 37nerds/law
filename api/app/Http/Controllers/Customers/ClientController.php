<?php

namespace App\Http\Controllers\Customers;

use App\Base\Controller;
use App\Base\Response;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Repositories\ClientRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 10);
        $paginates = collect(
            Client::with('unit.company.group_of_company')
                ->where("status", "=", "active")
                ->paginate($perPage)
        );
        $paginates["data"] = collect($paginates["data"])->map(function ($x) {
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

    public function store(StoreClientRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $item = Client::create($validated);
        return Response::happy(201, new ClientResource($item));
    }

    public function show(Client $client): JsonResponse
    {
        return Response::happy(200, new ClientResource($client));
    }

    public function update(UpdateClientRequest $request, Client $client): JsonResponse
    {
        $client = ClientRepository::update($client, $request->all());
        return Response::happy(200, new ClientResource($client));
    }

    public function destroy(Client $client): JsonResponse
    {
        $client->delete();
        return Response::happy(204);
    }
}
