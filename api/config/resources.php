<?php

return [
    [
        "api" => "api/v1/customers/clients",
        "web" => ["/_/customers"],
        "method" => "get",
        "label" => "View Clients",
        "group" => "customers",
        "dependencies" => []
    ],
    [
        "api" => "api/v1/customers/pop-up-data",
        "web" => ["/_/customers/setup"],
        "method" => "get",
        "label" => "View Pop-up Data",
        "group" => "customers",
        "dependencies" => []
    ],

    // users
    [
        "api" => "api/v1/rbac/users",
        "web" => ["/_/rbac/users"],
        "method" => "get",
        "label" => "Users",
        "group" => "users",
        "dependencies" => []
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => ["/_/rbac/users"],
        "method" => "post",
        "label" => "Users",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/roles",
                "method" => "get"
            ]
        ]
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => [],
        "method" => "patch",
        "label" => "Users",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/roles",
                "method" => "get"
            ],
            [
                "api" => "api/v1/rbac/users",
                "method" => "get"
            ]
        ]
    ],
    [
        "api" => "api/v1/rbac/users",
        "web" => [],
        "method" => "delete",
        "label" => "Users",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/users",
                "method" => "get"
            ]
        ]
    ],

    // roles
    [
        "api" => "api/v1/rbac/roles",
        "web" => ["/_/rbac/roles"],
        "method" => "get",
        "label" => "Roles",
        "group" => "users",
        "dependencies" => []
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => ["/_/rbac/roles"],
        "method" => "post",
        "label" => "Roles",
        "group" => "users",
        "dependencies" => []
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => [],
        "method" => "patch",
        "label" => "Roles",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/roles",
                "method" => "get"
            ]
        ]
    ],
    [
        "api" => "api/v1/rbac/roles",
        "web" => [],
        "method" => "delete",
        "label" => "Roles",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/roles",
                "method" => "get"
            ]
        ],
    ],

    // permissions
    [
        "api" => "api/v1/rbac/permissions",
        "web" => ["/_/rbac/permissions"],
        "method" => "post",
        "label" => "Permissions",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/permissions",
                "method" => "delete"
            ],
            [
                "api" => "api/v1/rbac/resources",
                "method" => "get"
            ]
        ]
    ],
    [
        "api" => "api/v1/rbac/permissions",
        "web" => ["/_/rbac/permissions"],
        "method" => "delete",
        "label" => "Permissions",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/permissions",
                "method" => "post"
            ],
            [
                "api" => "api/v1/rbac/resources",
                "method" => "get"
            ]
        ]
    ],

    // resources
    [
        "api" => "api/v1/rbac/resources",
        "web" => ["/_/rbac/resources"],
        "method" => "get",
        "label" => "Resources",
        "group" => "users",
        "dependencies" => [],
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => ["/_/rbac/resources"],
        "method" => "post",
        "label" => "Resources",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/resources",
                "method" => "get"
            ]
        ],
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "patch",
        "label" => "Resources",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/resources",
                "method" => "get"
            ]
        ],
    ],
    [
        "api" => "api/v1/rbac/resources",
        "web" => [],
        "method" => "delete",
        "label" => "Resources",
        "group" => "users",
        "dependencies" => [
            [
                "api" => "api/v1/rbac/resources",
                "method" => "get"
            ]
        ],
    ],
];
