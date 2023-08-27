<?php

namespace App\Exceptions;

use App\Helpers\CookieHelper;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Auth;
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

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        if (!Auth::check()) {
            CookieHelper::removeAllCookieButNotCSRFAndSession();
        }

        $this->reportable(function (Throwable $e) {

        });
    }
}
