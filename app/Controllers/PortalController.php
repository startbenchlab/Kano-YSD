<?php

class PortalController extends Controller
{
    public function login(): string
    {
        return $this->view('portal/login');
    }

    public function register(): string
    {
        return $this->view('portal/register');
    }

    public function dashboard(): string
    {
        $organizations = (new Organization())->publicDirectory();

        return $this->view('portal/dashboard', [
            'organizations' => $organizations,
            'stats' => [
                ['label' => 'Applications', 'value' => '198'],
                ['label' => 'Pending reviews', 'value' => '32'],
                ['label' => 'Approved this month', 'value' => '18'],
                ['label' => 'Certificates issued', 'value' => '47'],
            ],
        ]);
    }
}
