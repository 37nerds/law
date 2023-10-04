<?php

namespace App\Logic;

class Permission
{
    public static function find(string $roleId, string $resourceId): \App\Models\RBAC\Permission|null
    {
        return \App\Models\RBAC\Permission::query()
            ->where("role_id", "=", $roleId)
            ->where("resource_id", "=",$resourceId)
            ->first();
    }
}
