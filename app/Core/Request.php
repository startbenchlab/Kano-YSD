<?php

class Request
{
    public string $method;
    public string $path;
    public array $query = [];
    public array $body = [];

    public function __construct()
    {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
        $this->path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
        $this->query = $_GET;

        if (in_array($this->method, ['POST', 'PUT', 'PATCH'], true)) {
            $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
            if (stripos($contentType, 'application/json') !== false) {
                $raw = file_get_contents('php://input');
                $decoded = json_decode($raw, true);
                $this->body = is_array($decoded) ? $decoded : [];
            } else {
                $this->body = $_POST;
            }
        }
    }
}
