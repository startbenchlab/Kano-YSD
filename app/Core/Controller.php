<?php

class Controller
{
    protected function view(string $template, array $data = []): string
    {
        return View::render($template, $data);
    }

    protected function redirect(string $path): void
    {
        header('Location: ' . $path, true, 302);
        exit;
    }
}
