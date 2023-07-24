<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\GroupOfCompany;
use App\Models\Unit;
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
}
