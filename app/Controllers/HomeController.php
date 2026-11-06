<?php

class HomeController extends Controller
{
    public function index(Request $request): string
    {
        $organizationModel = new Organization();
        $contentModel = new ContentBlock();

        return $this->view('public/home', [
            'stats' => $organizationModel->stats(),
            'news' => $contentModel->latestNews(),
            'programmes' => $contentModel->programmes(),
        ]);
    }

    public function about(): string
    {
        return $this->view('public/about');
    }
}
