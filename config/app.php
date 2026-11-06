<?php

return [
    'app_name' => 'Kano YSD Platform',
    'base_url' => getenv('APP_BASE_URL') ?: 'http://localhost:8000',
    'database' => [
        'driver' => getenv('DB_DRIVER') ?: 'sqlite',
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'port' => getenv('DB_PORT') ?: '3306',
        'database' => getenv('DB_NAME') ?: __DIR__ . '/../storage/app.sqlite',
        'username' => getenv('DB_USERNAME') ?: '',
        'password' => getenv('DB_PASSWORD') ?: '',
        'charset' => 'utf8mb4',
    ],
    'views_path' => __DIR__ . '/../views',
];
