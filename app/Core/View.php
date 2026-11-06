<?php

class View
{
    public static function render(string $template, array $data = [], string $layout = 'layouts/default'): string
    {
        $templatePath = BASE_PATH . '/views/' . $template . '.php';
        if (!file_exists($templatePath)) {
            throw new InvalidArgumentException('View not found: ' . $template);
        }

        extract($data);
        ob_start();
        require $templatePath;
        $content = ob_get_clean();

        if ($content === false) {
            return '';
        }

        $layoutPath = BASE_PATH . '/views/' . $layout . '.php';
        if (file_exists($layoutPath)) {
            $contentVar = $content;
            ob_start();
            require $layoutPath;
            return (string) ob_get_clean();
        }

        return $content;
    }
}
