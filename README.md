# 37nerds low

ERP solution for Law Firm

## Developer Guideline

-   Instruction for running "api" project
    -   `$ cd api`
    -   `$ copy .env.example .env` configure database credential in .env file
    -   `$ composer install`
    -   `$ php artisan serve` the server will start on [`http://127.0.0.1:8000`](http://127.0.0.1:8000)
-   Instruction for running "web" project
    -   `$ cd web`
    -   `$ copy .env.example .env` configure .env file with appropriate values
    -   `$ pnpm install`
    -   `$ pnpm dev` the server will start on [`http://127.0.0.1:3000`](http://127.0.0.1:3000)
