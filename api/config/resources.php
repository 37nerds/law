<?php

return [
    [
        "api" => "api/v1/customers/clients",
        "web" => "/_/customers",
        "method" => "get",
        "label" => "View Clients",
        "group" => "customers",
    ],
    [
        "api" => "api/v1/customers/pop-up-data",
        "web" => "",
        "method" => "get",
        "label" => "View Pop-up Data",
        "group" => "customers"
    ],
    [
        "api" => "",
        "web" => "/_/customers/setup",
        "method" => "get",
        "label" => "Setup Customers",
        "group" => "customers",
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => "/_/rbac/users",
        "method" => "get",
        "label" => "View Users",
        "group" => "users",
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => "/_/rbac/roles",
        "method" => "get",
        "label" => "View roles",
        "group" => "users",
    ],
    [
        "api" => "",
        "web" => "/_/rbac/permissions",
        "method" => "get",
        "label" => "Assign Permissions",
        "group" => "users",
    ]
];
