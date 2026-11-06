<?php $pageTitle = 'Organization Registration'; ?>
<section class="content-section">
    <div class="container auth-box">
        <h1>Register organization</h1>
        <form class="form-card" method="post" action="/portal/dashboard">
            <label>
                <span>Organization name</span>
                <input type="text" name="organization_name" placeholder="Example Youth Association" required>
            </label>
            <label>
                <span>Contact email</span>
                <input type="email" name="email" placeholder="info@example.org" required>
            </label>
            <label>
                <span>Phone number</span>
                <input type="tel" name="phone" placeholder="0803 000 0000">
            </label>
            <button type="submit" class="btn btn-primary">Start registration</button>
        </form>
    </div>
</section>
