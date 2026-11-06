<?php $pageTitle = 'Kano YSD | Public Ministry Home'; ?>
<section class="hero">
    <div class="container hero-grid">
        <div>
            <p class="eyebrow">Public information platform</p>
            <h1>Building brighter opportunities for youth and communities in Kano State.</h1>
            <p class="lead">Access official ministry updates, discover verified youth organizations, and verify certificates quickly and securely.</p>
            <div class="cta-row">
                <a class="btn btn-primary" href="/directory">Browse Directory</a>
                <a class="btn btn-secondary" href="/verify">Verify Certificate</a>
            </div>
        </div>
        <div class="hero-card">
            <h3>Quick access</h3>
            <ul>
                <li>Public programmes and opportunities</li>
                <li>Approved organization registry</li>
                <li>Certificate verification and QR check</li>
                <li>Ministry notices and updates</li>
            </ul>
        </div>
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
    <div class="container split-layout">
        <div>
            <p class="eyebrow">Latest news</p>
            <?php foreach ($news as $item): ?>
                <article class="news-item">
                    <span class="meta"><?php echo htmlspecialchars($item['date']); ?></span>
                    <h3><?php echo htmlspecialchars($item['title']); ?></h3>
                    <p><?php echo htmlspecialchars($item['summary']); ?></p>
                </article>
            <?php endforeach; ?>
        </div>

        <div>
            <p class="eyebrow">Featured programmes</p>
            <div class="list-box">
                <?php foreach ($programmes as $programme): ?>
                    <div class="list-row">
                        <strong><?php echo htmlspecialchars($programme['name']); ?></strong>
                        <span><?php echo htmlspecialchars($programme['type']); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
