<?php

$router->add('GET', '/', [HomeController::class, 'index']);
$router->add('GET', '/about', [HomeController::class, 'about']);
$router->add('GET', '/directory', [DirectoryController::class, 'index']);
$router->add('GET', '/verify', [CertificateController::class, 'index']);
$router->add('POST', '/verify', [CertificateController::class, 'submit']);
$router->add('GET', '/login', [PortalController::class, 'login']);
$router->add('GET', '/register', [PortalController::class, 'register']);
$router->add('GET', '/portal/dashboard', [PortalController::class, 'dashboard']);
