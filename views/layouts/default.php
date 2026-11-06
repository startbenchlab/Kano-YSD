<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle ?? 'Kano YSD Platform'); ?></title>
    <meta name="description" content="Kano State Ministry of Youth, Sports and Development public platform">
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
    <header class="topbar">
        <div class="container nav-wrap">
            <div class="brand">
                <a href="/">Kano YSD</a>
            </div>
            <nav class="main-nav" aria-label="Main navigation">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/directory">Directory</a>
                <a href="/verify">Verify</a>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
            </nav>
        </div>
    </header>

    <main class="page-shell">
        <?php echo $contentVar ?? $content ?? ''; ?>
    </main>

    <footer class="site-footer">
        <div class="container footer-wrap">
            <div>
                <h4>Kano State Ministry of Youth, Sports and Development</h4>
                <p>Transparent public information, youth development, and verified organization services.</p>
            </div>
            <div>
                <a href="/directory">Organization Directory</a>
                <a href="/verify">Certificate Verification</a>
                <a href="/portal/dashboard">Portal Dashboard</a>
            </div>
        </div>
    </footer>
    <script src="/assets/js/app.js"></script>
</body>
</html>
