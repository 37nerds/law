<?php

// we can specific a web page is permitted if at least main api route is permitted

return [
    [
        "api" => "api/v1/customers/clients",
        "web" => ["/_/customers"],
        "method" => "get",
        "label" => "View Clients",
        "group" => "customers",
    ],
    [
        "api" => "api/v1/customers/pop-up-data",
        "web" => ["/_/customers/setup"],
        "method" => "get",
        "label" => "View Pop-up Data",
        "group" => "customers"
    ],

    // users
    [
        "api" => "api/v1/rbac/users",
        "web" => ["/_/rbac/users"],
        "method" => "get",
        "label" => "Users",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => ["/_/rbac/users"],
        "method" => "post",
        "label" => "Users",
        "group" => "users",
        // "dependencies" => ["api/v1/rbac/roles"]
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => [],
        "method" => "patch",
        "label" => "Users",
        "group" => "users",
        // "dependencies" => ["api/v1/rbac/roles"]
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => [],
        "method" => "delete",
        "label" => "Users",
        "group" => "users",
    ],

    // roles
    [
        "api" => "api/v1/rbac/roles",
        "web" => ["/_/rbac/roles"],
        "method" => "get",
        "label" => "Roles",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => ["/_/rbac/roles"],
        "method" => "post",
        "label" => "Roles",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => [],
        "method" => "patch",
        "label" => "Roles",
        "group" => "users",
        // "dependencies" => ["api/v1/rbac/users"]
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => [],
        "method" => "delete",
        "label" => "Roles",
        "group" => "users",
        // "dependencies" => ["api/v1/rbac/users"]
    ],

    // resources
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "get",
        "label" => "Resources",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "post",
        "label" => "Resources",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "patch",
        "label" => "Resources",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "delete",
        "label" => "Resources",
        "group" => "users",
    ],
    
    // permissions
    [
        "api" => "api/v1/rbac/permissions",
        "web" => ["/_/rbac/permissions"],
        "method" => "post",
        "label" => "Permissions",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/permissions",
        "web" => ["/_/rbac/permissions"],
        "method" => "delete",
        "label" => "Permissions",
        "group" => "users",
    ],
];
