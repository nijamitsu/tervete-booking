<script>
	let { getaways, onSelectGetaway, onHelpMeDecide } = $props();
</script>

<section id="getaways" class="getaways-section">
	<div class="getaways-container">
		<!-- Section Title -->
		<div class="getaways-header">
			<h2 class="getaways-title">Find your perfect getaway</h2>
			<p class="getaways-subtitle">
				Choose whether you want an exhilarating single-day adventure or an immersive overnight
				escape surrounded by centuries-old pine trees.
			</p>
		</div>

		<!-- Two Comparison Cards side-by-side -->
		<div class="getaway-cards-grid">
			{#each getaways as getaway (getaway.id)}
				<div class="getaway-card" class:is-featured={getaway.id === 'stay-and-play'}>
					<div class="getaway-badge-row">
						<span class="getaway-type-badge">{getaway.badge}</span>
						<span class="getaway-best-for">{getaway.bestFor}</span>
					</div>

					<h3 class="getaway-title">{getaway.title}</h3>

					<!-- Brief description box -->
					<!--
					<div class="brief-box">
						<span class="brief-heading">Brief description of what this means:</span>
						<p class="brief-text">{getaway.summary}</p>
					</div>
					-->

					<!-- Included Features -->
					<div class="getaway-features">
						<h4 class="features-title">What's included:</h4>
						<ul class="features-list">
							{#each getaway.features as feature (feature)}
								<li class="feature-item">
									<div class="feature-check">
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</div>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Price Row -->
					<!--
					<div class="getaway-price-row">
						<div class="price-block">
							<span class="price-amount">{getaway.price}</span>
							<span class="price-unit">/{getaway.priceUnit}</span>
						</div>
					</div>
					-->

					<!-- Action Button -->
					<div class="getaway-action-row">
						<button
							class="btn-getaway-plus"
							onclick={() => onSelectGetaway(getaway)}
							aria-label="Select {getaway.title}"
						>
							<span class="plus-icon">See prices</span>
							<span class="plus-label">{getaway.buttonLabel}</span>
						</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- "help me decide" Button -->
		<!--
		<div class="help-me-decide-box">
			<button class="btn-help-me-decide" onclick={onHelpMeDecide}>
				<span class="help-text">help me decide</span>
			</button>
			<p class="help-hint">
				Not sure which option fits your group? Take our 1-minute personalized recommendation quiz!
			</p>
		</div>
		-->
	</div>
</section>

<style>
	.getaways-section {
		padding: 56px 24px 72px;
		max-width: 1100px;
		margin: 0 auto;
	}

	.getaways-header {
		text-align: center;
		margin-bottom: 48px;
	}

	.getaways-title {
		font-size: clamp(2rem, 4.5vw, 3rem);
		font-weight: 800;
		color: var(--color-forest-dark);
		letter-spacing: -0.02em;
		margin-bottom: 12px;
	}

	.getaways-subtitle {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 620px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.getaway-cards-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 32px;
		margin-bottom: 48px;
	}

	@media (max-width: 820px) {
		.getaway-cards-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}

	.getaway-card {
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: 34px 30px;
		display: flex;
		flex-direction: column;
		box-shadow: var(--card-shadow);
		position: relative;
		transition:
			transform var(--transition-fast),
			box-shadow var(--transition-fast),
			border-color var(--transition-fast);
	}

	.getaway-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--card-shadow-hover);
	}

	.getaway-card.is-featured {
		background: var(--bg-panel-light);
	}

	.getaway-badge-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.getaway-type-badge {
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-forest);
		background: var(--color-forest-light);
		padding: 4px 14px;
		border-radius: var(--radius-pill);
		border: 1px solid var(--status-open-border);
	}

	.getaway-best-for {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-forest);
	}

	.getaway-title {
		font-size: clamp(1.4rem, 2.2vw, 1.85rem);
		font-weight: 800;
		color: var(--color-forest-dark);
		line-height: 1.2;
		margin-bottom: 18px;
	}

	.brief-box {
		background: var(--bg-panel);
		border: 1.5px solid var(--border-color);
		border-radius: var(--radius-sm);
		padding: 14px 16px;
		margin-bottom: 22px;
	}

	.brief-heading {
		display: block;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-tertiary);
		margin-bottom: 4px;
	}

	.brief-text {
		font-size: 0.92rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.getaway-features {
		margin-bottom: 24px;
		flex: 1;
	}

	.features-title {
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 12px;
	}

	.features-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.feature-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 0.92rem;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.feature-check {
		width: 22px;
		height: 22px;
		background: var(--color-forest-light);
		color: var(--color-forest);
		border-radius: 50%;
		border: 1px solid var(--status-open-border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.getaway-price-row {
		display: flex;
		align-items: baseline;
		padding: 14px 0;
		border-top: 1px solid var(--border-subtle);
		margin-bottom: 16px;
	}

	.price-block {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.price-amount {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--color-forest-dark);
	}

	.price-unit {
		font-size: 0.84rem;
		font-weight: 600;
		color: var(--text-tertiary);
	}

	.getaway-action-row {
		display: flex;
		justify-content: center;
	}

	.btn-getaway-plus {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background: var(--btn-pill-bg);
		border: var(--border-width) solid var(--btn-pill-border);
		border-radius: var(--radius-pill);
		padding: 14px 22px;
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--btn-pill-text);
		box-shadow: var(--btn-shadow);
		transition: all var(--transition-fast);
	}

	.btn-getaway-plus:hover {
		background: var(--btn-pill-hover);
		transform: translateY(-2px);
	}

	.plus-icon {
		font-size: 1.35rem;
		font-weight: 900;
		line-height: 1;
	}

	.help-me-decide-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding-top: 12px;
	}

	.btn-help-me-decide {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		background: var(--btn-pill-bg);
		border: var(--border-width) solid var(--btn-pill-border);
		border-radius: var(--radius-pill);
		padding: 16px 44px;
		font-size: clamp(1.1rem, 2.4vw, 1.45rem);
		font-weight: 800;
		color: var(--btn-pill-text);
		box-shadow: var(--btn-shadow);
		transition: all var(--transition-fast);
		letter-spacing: -0.01em;
	}

	.btn-help-me-decide:hover {
		background: var(--btn-pill-hover);
		transform: translateY(-2px);
	}

	.help-hint {
		margin-top: 14px;
		font-size: 0.9rem;
		color: var(--text-tertiary);
		max-width: 480px;
	}
</style>
