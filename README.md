# php_docker_env

PHP Development Environment with Docker

## Software needs (First install this softwares on your system)

-   `Docker` and `Docker compose`
-   `Composer`

## Commands (Run this command to manage the docker-compose.yml)

-   Up and running the containers
    ```sh
    composer run-script docker:up
    ```
-   Stopping the containers
    ```sh
    composer run-script docker:down
    ```
-   If any issue run this command
    ```sh
    sudo chmod 777 -R <the project name>
    ```

## Credentials Info

-   Server running in http://localhost:8000
-   Mariadb running in port 3306
    -   username: `root`
    -   password: `password`
-   phpMyAdmin running in http://localhost:8080
    -   username: `root`
    -   password: `password`
