<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Company;
use App\Models\GroupOfCompany;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    public function popUpData(): JsonResponse
    {
        $gocList = GroupOfCompany::select('id', 'name', 'address')->get()->toArray();
        $companies = Company::select('id', 'name', 'address')->get()->toArray();
        $units = Unit::select("id", "name", "address")->get()->toArray();

        return $this->success([
            "group_of_companies" => $gocList,
            "companies" => $companies,
            "units" => $units,
        ]);
    }

    public function customersList(Request $request): JsonResponse
    {
        $perPage = $request->query("per_page", 1000);
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
}
