<?php

class Router
{
    private array $routes = [];

    public function add(string $method, string $path, callable|array $handler): void
    {
        $this->routes[strtoupper($method)][] = [
            'path' => $path,
            'handler' => $handler,
        ];
    }

    public function dispatch(Request $request): void
    {
        $path = $this->normalizePath($request->path);
        $routes = $this->routes[$request->method] ?? [];

        foreach ($routes as $route) {
            $match = $this->matchRoute($route['path'], $path);
            if ($match === null) {
                continue;
            }

            $handler = $route['handler'];

            if (is_callable($handler)) {
                echo $handler($request, $match);
                return;
            }

            [$controllerName, $methodName] = $handler;
            $controller = new $controllerName();
            $output = $controller->$methodName($request, $match);
            echo $output;
            return;
        }

        http_response_code(404);
        echo View::render('errors/404');
    }

    private function normalizePath(string $path): string
    {
        $normalized = rtrim($path, '/');
        return $normalized === '' ? '/' : $normalized;
    }

    private function matchRoute(string $pattern, string $path): ?array
    {
        if ($pattern === $path) {
            return [];
        }

        $patternParts = explode('/', trim($pattern, '/'));
        $pathParts = explode('/', trim($path, '/'));

        if (count($patternParts) !== count($pathParts)) {
            return null;
        }

        $params = [];
        foreach ($patternParts as $index => $segment) {
            if (preg_match('/^\{([A-Za-z0-9_]+)\}$/', $segment, $matches)) {
                $params[$matches[1]] = $pathParts[$index] ?? null;
                continue;
            }

            if ($segment !== ($pathParts[$index] ?? null)) {
                return null;
            }
        }

        return $params;
    }
}
