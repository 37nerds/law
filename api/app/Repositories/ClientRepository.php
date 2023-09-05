<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository
{
    public static function create(array $properties)
    {
        // TODO: Implement create() method.
    }

    public static function update(Client $client, array $properties): Client
    {
        $client->name = $properties["name"] ?? $client->name;

        $client->save();

        return $client;
    }

    public static function delete(string $id)
    {
        // TODO: Implement delete() method.
    }
}
