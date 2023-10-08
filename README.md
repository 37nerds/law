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

## Explanation of Folder Structure

-   `api`: This folder contains the main Laravel backend API responsible for communicating with the database.
-   `conf`: In this directory, you'll find all the configuration files related to Docker.
-   `doc`: This directory houses various types of notes and documentation pertaining to the project.
-   `web`: The primary frontend component that integrates with the Laravel API.
    -   `src`: Within this directory, you'll find all the source code written in React and TypeScript.
        -   `logic`: This folder stores code that is specific logic to certain parts of the application and not intended for reuse throughout the entire application.
        -   `helpers`: Here, you'll find code that is reusable across the entire application or even in other applications. In other words, the code in this folder can potentially be published as a separate package.
