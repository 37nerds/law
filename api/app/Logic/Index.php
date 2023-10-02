<?php

namespace App\Logic;

use App\DTO\PSSParams;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule as LaraRule;

class Index
{
    public static function isPaginatedRequest(Request $request) {
        $validated = $request->validate(["paginated" => ["nullable", "in:true,false"]]);
        return array_key_exists("paginated", $validated) && $validated["paginated"] === "true";
    }
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
        array   $allowedColumnsForSorting
    ): LengthAwarePaginator
    {
        $params = self::validateRequestQueryStringForPaginatedSearchAndSort(
            request: $request,
            allowedColumnsForSorting: $allowedColumnsForSorting
        );
        return self::executeQueryWithPaginatedSearchAndSort(
            query: $query,
            allowedColumnsForSearch: $allowedColumnsForSearch,
            params: $params
        );
    }

    private static function validateRequestQueryStringForPaginatedSearchAndSort(Request $request, array $allowedColumnsForSorting): PSSParams
    {
        $validated = $request->validate([
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1'],
            'sort_column' => ['nullable', 'string', LaraRule::in($allowedColumnsForSorting)],
            'sort_order' => ['nullable', 'string', 'in:asc,desc'],
            'search' => ['nullable', 'string'],
        ]);
        return new PSSParams(
            $validated['page'] ?? 1,
            $validated['per_page'] ?? 10,
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
                            $innerQuery->orWhere($column, 'ILIKE', "%$search%");
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
