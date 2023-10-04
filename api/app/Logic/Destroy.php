<?php

namespace App\Logic;

use App\Helpers\ArrayH;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Destroy
{
    public static function destroyFromIdOrIds(Request $request, Builder $query): void
    {
        $id = static::isRequestHaveValidateId($request);
        if ($id) {
            static::destroyFromId($query, $id);
            return;
        }
        $ids = static::isRequestHaveValidateIds($request);
        if ($ids) {
            static::destroyFromIds($query, $ids);
        }
    }

    private static function isRequestHaveValidateId(Request $request): string|null
    {
        $validated = $request->validate([
            "id" => ["nullable", "string"],
        ]);
        if (!ArrayH::isIn($validated, "id")) {
            return null;
        }
        return $validated["id"];
    }

    /**
     * @return array<string>|null
     */
    private static function isRequestHaveValidateIds(Request $request): array|null
    {
        $validated = $request->validate([
            "ids" => ["nullable", "array"]
        ]);
        if (!ArrayH::isIn($validated, "ids")) {
            return null;
        }
        return $validated["ids"];
    }

    private static function destroyFromId(Builder $query, string $id): void
    {
        $query->findOrFail($id)->delete();
    }

    /**
     * @param array<string> $ids
     */
    private static function destroyFromIds(Builder $query, array $ids): void
    {
        $tableName = $query->from;
        DB::table($tableName)->whereIn('id', $ids)->delete();
    }
}
