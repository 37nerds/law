<?php

namespace App\Logic;

use App\DTO\PSSParams;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Index
{
    public static function validatedAndFindWithID(Request $request, Builder $query): Model|null
    {
        $validated = $request->validate(["id" => ["nullable", "string"]]);
        if (array_key_exists("id", $validated)) {
            return $query->findOrFail($validated["id"]);
        } else {
            return null;
        }
    }

    public static function paginatedSearchAndSort(
        Request $request,
        Builder $query,
        array   $allowedColumnsForSearch,
    ): LengthAwarePaginator
    {
        $params = self::validateRequestQueryStringForPaginatedSearchAndSort(
            request: $request
        );
        return self::executeQueryWithPaginatedSearchAndSort(
            query: $query,
            allowedColumnsForSearch: $allowedColumnsForSearch,
            params: $params
        );
    }

    private static function validateRequestQueryStringForPaginatedSearchAndSort(Request $request): PSSParams
    {
        $validated = $request->validate([
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1'],
            'sort_column' => ['nullable', 'string', 'in:created_at,email,username,name,phone,active,address'],
            'sort_order' => ['nullable', 'string', 'in:asc,desc'],
            'search' => ['nullable', 'string'],
        ]);
        return new PSSParams(
            $validated['page'] ?? 1,
            $validated['per_page'] ?? 1,
            $validated['sort_column'] ?? 'created_at',
            $validated['sort_order'] ?? 'asc',
            $validated['search'] ?? ''
        );
    }

    /**
     * @param array<string> $allowedColumnsForSearch
     */
    private static function executeQueryWithPaginatedSearchAndSort(
        Builder   $query,
        array     $allowedColumnsForSearch,
        PSSParams $params,
    ): LengthAwarePaginator
    {
        $search = $params->search;
        if ($search !== "") {
            $query = $query
                ->when($search, function ($query) use ($search, $allowedColumnsForSearch) {
                    $query->where(function ($innerQuery) use ($search, $allowedColumnsForSearch) {
                        foreach ($allowedColumnsForSearch as $column) {
                            $innerQuery->orWhere($column, 'LIKE', "%$search%");
                        }
                    });
                });
        }

        $page = $params->page;
        $perPage = $params->perPage;

        $sortColumn = $params->sortColumn;
        $sortOrder = $params->sortOrder;

        return $query
            ->orderBy($sortColumn, $sortOrder)
            ->paginate($perPage, ['*'], 'page', $page);
    }
}
