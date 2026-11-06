<?php $pageTitle = 'Portal Dashboard'; ?>
<section class="page-header">
    <div class="container">
        <p class="eyebrow">Ministry administration</p>
        <h1>Operations dashboard</h1>
    </div>
</section>

<section class="stats">
    <div class="container stats-grid">
        <?php foreach ($stats as $stat): ?>
            <div class="stat-card">
                <strong><?php echo htmlspecialchars($stat['value']); ?></strong>
                <span><?php echo htmlspecialchars($stat['label']); ?></span>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section class="content-section">
    <div class="container dashboard-layout">
        <div>
            <h2>Recent applications</h2>
            <div class="list-box">
                <?php foreach ($organizations as $org): ?>
                    <div class="list-row">
                        <strong><?php echo htmlspecialchars($org['name']); ?></strong>
                        <span><?php echo htmlspecialchars($org['lga']); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div>
            <h2>Workflow actions</h2>
            <div class="list-box">
                <div class="list-row"><strong>Review submissions</strong><span>Pending</span></div>
                <div class="list-row"><strong>Approve certificates</strong><span>Ready</span></div>
                <div class="list-row"><strong>Publish notices</strong><span>Draft</span></div>
                <div class="list-row"><strong>Generate reports</strong><span>Available</span></div>
            </div>
        </div>
    </div>
</section>
