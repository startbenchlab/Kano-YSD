<?php $pageTitle = 'Portal Login'; ?>
<section class="content-section">
    <div class="container auth-box">
        <h1>Organization portal login</h1>
        <form class="form-card" method="post" action="/portal/dashboard">
            <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="name@organization.gov.ng" required>
            </label>
            <label>
                <span>Password</span>
                <input type="password" name="password" placeholder="Enter your password" required>
            </label>
            <button type="submit" class="btn btn-primary">Sign in</button>
            <p class="muted"><a href="/register">Need an account? Register organization</a></p>
        </form>
    </div>
</section>
