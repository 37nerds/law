<?php

namespace App\Http\Controllers\Customers;

use App\Base\Controller;
use App\Base\Response;
use App\Enums\Status;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Repositories\ClientRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    private function paginate(int $page = 1, int $perPage = 10, string $status = Status::active): LengthAwarePaginator
    {
        return Client::with('unit.company.group_of_company')
            ->where("status", "=", $status)
            ->paginate(
                perPage: $perPage,
                page: $page
            );
    }

    public function index(Request $request): JsonResponse
    {
        $page = $request->query("page", 1);
        $perPage = $request->query("per_page", 10);
        $status = $request->query("status", Status::active);

        $paginates = collect($this->paginate($page, $perPage, $status));
        if ($paginates["last_page"] < $page) {
            $paginates = collect($this->paginate($paginates["last_page"], $perPage, $status));
        }

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
