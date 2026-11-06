<?php

define('BASE_PATH', __DIR__);

$autoloadPaths = [
    BASE_PATH . '/app/Core',
    BASE_PATH . '/app/Controllers',
    BASE_PATH . '/app/Models',
    BASE_PATH . '/app/Services',
];

foreach ($autoloadPaths as $directory) {
    $files = scandir($directory);
    if ($files === false) {
        continue;
    }

    foreach ($files as $file) {
        if (str_ends_with($file, '.php')) {
            require_once $directory . '/' . $file;
        }
    }
}
