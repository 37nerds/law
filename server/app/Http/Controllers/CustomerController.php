<?php

namespace App\Http\Controllers;

use App\Models\GroupOfCompany;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function popUpData(): JsonResponse
    {
        $gocList = GroupOfCompany::select('id', 'name', 'address')->get()->toArray();

        $companies = DB::table('companies')
            ->select(
                'companies.id as company_id',
                'companies.name as company_name',
                'companies.address as companies_address',
                'group_of_companies.name as group_of_company_name'
            )
            ->leftJoin('group_of_companies', 'companies.group_of_company_id', '=', 'group_of_companies.id')
            ->get();

        $companies = collect($companies)->map(fn($company) => [
            "id" => $company->company_id,
            "name" => [
                $company->company_name,
                $company->group_of_company_name,
            ],
            "address" => $company->companies_address
        ]);


        $unitsX = DB::table('units')
            ->select(
                'units.id as unit_id',
                'units.name as unit_name',
                'units.address as unit_address',
                'companies.name as company_name',
                'group_of_companies.name as group_of_company_name'
            )
            ->leftJoin('companies', 'units.company_id', '=', 'companies.id')
            ->leftJoin('group_of_companies', 'companies.group_of_company_id', '=', 'group_of_companies.id')
            ->get();

        $unitsX = collect($unitsX)->map(fn($unitX) => [
            "id" => $unitX->unit_id,
            "name" => [
                $unitX->unit_name,
                $unitX->company_name,
                $unitX->group_of_company_name,
            ],
            "address" => $unitX->unit_address
        ]);

        return $this->success([
            "group_of_companies" => $gocList,
            "companies" => $companies,
            "units" => $unitsX,
        ]);
    }
}
