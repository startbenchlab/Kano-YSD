<?php $pageTitle = 'Certificate Verification'; ?>
<section class="page-header">
    <div class="container">
        <p class="eyebrow">Certificate verification</p>
        <h1>Verify an organization certificate</h1>
    </div>
</section>

<section class="content-section">
    <div class="container verify-box">
        <form method="post" action="/verify" class="verify-form">
            <label for="code">Enter certificate code</label>
            <input id="code" name="code" type="text" value="<?php echo htmlspecialchars($submittedCode ?? ''); ?>" placeholder="KSMYSD-ORG-7F4K9Q2M" required>
            <button type="submit" class="btn btn-primary">Verify</button>
        </form>

        <?php if (isset($result)): ?>
            <div class="result <?php echo htmlspecialchars($result['status'] ?? 'invalid'); ?>">
                <h3><?php echo htmlspecialchars($result['message'] ?? 'Verification result'); ?></h3>

                <?php if (!empty($result['publicData'])): ?>
                    <ul>
                        <li><strong>Organization:</strong> <?php echo htmlspecialchars($result['publicData']['organization']); ?></li>
                        <li><strong>Code:</strong> <?php echo htmlspecialchars($result['publicData']['code']); ?></li>
                        <li><strong>Issue date:</strong> <?php echo htmlspecialchars($result['publicData']['issue_date']); ?></li>
                        <li><strong>Status:</strong> <?php echo htmlspecialchars($result['publicData']['certificate_status']); ?></li>
                    </ul>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
