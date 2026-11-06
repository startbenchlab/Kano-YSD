<?php

class DirectoryController extends Controller
{
    public function index(): string
    {
        $organizations = (new Organization())->publicDirectory();

        return $this->view('public/directory', [
            'organizations' => $organizations,
            'districts' => ['Kano Central', 'Kano North', 'Kano South'],
            'categories' => ['Community youth association', 'Sports club', 'Arts and culture', 'Entrepreneurship and business'],
        ]);
    }
}
