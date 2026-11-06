<?php $pageTitle = 'Organization Directory'; ?>
<section class="page-header">
    <div class="container">
        <p class="eyebrow">Organization directory</p>
        <h1>Approved organizations across Kano State</h1>
    </div>
</section>

<section class="content-section">
    <div class="container toolbar">
        <div class="filter-group">
            <label>
                <span>District</span>
                <select>
                    <option>All districts</option>
                    <?php foreach ($districts as $district): ?>
                        <option><?php echo htmlspecialchars($district); ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
        </div>
        <div class="filter-group">
            <label>
                <span>Category</span>
                <select>
                    <option>All categories</option>
                    <?php foreach ($categories as $category): ?>
                        <option><?php echo htmlspecialchars($category); ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
        </div>
    </div>

    <div class="container card-grid">
        <?php foreach ($organizations as $org): ?>
            <article class="directory-card">
                <div class="card-head">
                    <h3><?php echo htmlspecialchars($org['name']); ?></h3>
                    <span class="badge"><?php echo htmlspecialchars($org['status']); ?></span>
                </div>
                <p><?php echo htmlspecialchars($org['description']); ?></p>
                <ul>
                    <li><strong>Category:</strong> <?php echo htmlspecialchars($org['category']); ?></li>
                    <li><strong>District:</strong> <?php echo htmlspecialchars($org['district']); ?></li>
                    <li><strong>LGA:</strong> <?php echo htmlspecialchars($org['lga']); ?></li>
                    <li><strong>Ward:</strong> <?php echo htmlspecialchars($org['ward']); ?></li>
                </ul>
            </article>
        <?php endforeach; ?>
    </div>
</section>
