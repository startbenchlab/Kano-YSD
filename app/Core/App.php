<?php

class App
{
    public static function boot(): void
    {
        $request = new Request();
        $router = new Router();

        require BASE_PATH . '/routes.php';

        $router->dispatch($request);
    }
}
