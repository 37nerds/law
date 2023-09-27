<?php

namespace App\Exceptions;

use App\Helpers\Response;
use Exception;
use Illuminate\Http\JsonResponse;
use Throwable;

class JsonException extends Exception
{
    private array $errors;

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function __construct($code = 0, $message = '', $errors = [], Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->errors = $errors;
    }

    public function response(): JsonResponse
    {
        return Response::error(
            $this->getCode(),
            $this->getMessage(),
            $this->getErrors()
        );
    }
}
