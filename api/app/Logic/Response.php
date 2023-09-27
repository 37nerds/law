<?php

namespace App\Logic;

use Illuminate\Http\JsonResponse;

class Response
{
    public static function json($payload = [], $status = 200): JsonResponse
    {
        return new JsonResponse($payload, $status);
    }

    public static function happy(int $status, $data = []): JsonResponse
    {
        return static::json($data, $status);
    }

    public static function error(int $status, $message = "", $data = []): JsonResponse
    {
        $data["message"] = $data["message"] ?? $message;
        return static::json($data, $status);
    }
}
