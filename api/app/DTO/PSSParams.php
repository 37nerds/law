<?php

namespace App\DTO;

class PSSParams
{
    public function __construct(
        public int    $page = 1,
        public int    $perPage = 1,
        public string $sortColumn = "created_at",
        public string $sortOrder = "asc",
        public string $search = "",
    )
    {
    }
}
