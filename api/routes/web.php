<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    ?>
    <h1>Running: <?= now() ?></h1>
    <?php
});
