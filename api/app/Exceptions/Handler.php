<?php

namespace App\Exceptions;

use App\Helpers\CookieHelper;
use http\Env\Request;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;


class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function report(Throwable $e): void
    {
        if (!Auth::check()) {
            CookieHelper::removeAllCookieButNotCSRFAndSession();
        }

        parent::report($e);
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {


        $this->reportable(function (Throwable $e) {

        });
    }
}
