# 37nerds low

ERP solution for Law Firm

## Explanation of Folder Structure

-   `api`: This folder contains the main Laravel backend API responsible for communicating with the database.
-   `conf`: In this directory, you'll find all the configuration files related to Docker.
-   `doc`: This directory houses various types of notes and documentation pertaining to the project.
-   `web`: The primary frontend component that integrates with the Laravel API.
    -   `src`: Within this directory, you'll find all the source code written in React and TypeScript.
        -   `logic`: This folder stores code that is specific logic to certain parts of the application and not intended for reuse throughout the entire application.
        -   `helpers`: Here, you'll find code that is reusable across the entire application or even in other applications. In other words, the code in this folder can potentially be published as a separate package.

## Developer Guidelines

### Running Development Servers with Docker

To quickly set up development servers using Docker, follow these steps:

1. Navigate to the root directory of the project.
2. Run the following command:
    ```sh
    docker compose up
    ```
    This single command will start the Laravel API server at [`http://127.0.0.1:8000`](http://127.0.0.1:8000) and the frontend Vite development server at [`http://127.0.0.1:3000`](http://127.0.0.1:3000).

### Running Development Servers Manually

If you prefer to set up the development servers manually, follow these instructions:

-   Running the "api" Project
    1. Navigate to the "api" directory:
        ```sh
        $ cd api
        ```
    2. Copy the `.env.example` file and configure the database credentials in the `.env` file.
    3. Install Laravel dependencies:
        ```sh
        $ composer install
        ```
    4. Start the server:
        ```sh
        $ php artisan serve
        ```
        The server will be accessible at [`http://127.0.0.1:8000`](http://127.0.0.1:8000).
-   Running the "web" Project
    1. Navigate to the "web" directory:
        ```sh
        $ cd web
        ```
    2. Copy the `.env.example` file and configure the `.env` file with appropriate values.
    3. Install frontend dependencies:
        ```sh
        $ pnpm install
        ```
    4. Start the server:
        ```sh
        $ pnpm dev
        ```
        The server will be accessible at [`http://127.0.0.1:3000`](http://127.0.0.1:3000).

These guidelines provide both Docker-based and manual setup options for running the development servers, allowing you to choose the approach that best suits your needs.
