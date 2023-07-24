<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function json($payload = [], $status = 200): JsonResponse
    {
        return new JsonResponse($payload, $status);
    }

    public function success($data, string $message = "", int $status = 200): JsonResponse
    {
        return $this->json(["message" => $message, "data" => $data], $status);
    }
}
