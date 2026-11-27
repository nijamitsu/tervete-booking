<script>
	let { park, onSelectPark } = $props();

	// Hover state for interactive detail reveal
	let isHovered = $state(false);
	let isMobileExpanded = $state(false);

	function toggleMobileExpand() {
		isMobileExpanded = !isMobileExpanded;
	}
</script>

<div
	class="park-card theme-{park.theme?.name || 'default'}"
	class:is-expanded={isHovered || isMobileExpanded}
	style="
		--card-theme-color: {park.theme?.color || 'var(--color-forest)'};
		--card-theme-hover: {park.theme?.colorHover || 'var(--color-forest-hover)'};
		--card-theme-bg: {park.theme?.bgTint || 'var(--bg-panel-light)'};
		--card-theme-border: {park.theme?.borderTint || 'var(--border-subtle)'};
		--card-theme-shadow: {park.theme?.shadowTint || 'var(--card-shadow)'};
	"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="region"
	aria-label="{park.name} info card"
>
	<!-- Top accent strip in theme color -->
	<div class="card-accent-bar" aria-hidden="true"></div>

	<!-- Front / Standard View -->
	<div class="card-standard-view">
		<div class="card-badge-row">
			<!--<span class="zone-badge">
				{park.worldId || 'Open Zone'}
			</span>
			-->
		</div>

		<div class="card-image-wrapper">
			<img src={park.image} alt={park.name} class="park-thumb" loading="lazy" />
		</div>

		<h3 class="park-name">{park.name}</h3>

		<!-- One sentence info about the theme of the park -->
		<p class="park-theme-sentence">
			{park.themeSentence}
		</p>

		<!-- Bottom interactive hint -->
		<div class="card-hint-row">
			<!--<span class="hover-hint-pill">
				<span>View Activities</span>
				<span class="hint-arrow">→</span>
			</span>
			-->
		</div>

		<!-- Mobile expand toggle button -->
		<button
			class="mobile-expand-btn"
			onclick={toggleMobileExpand}
			aria-label="Toggle activities for {park.name}"
		>
			<span>{isMobileExpanded ? 'Hide Activities' : 'See Included & Premium Activities'}</span>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				{#if isMobileExpanded}
					<path d="m18 15-6-6-6 6" />
				{:else}
					<path d="m6 9 6 6 6-6" />
				{/if}
			</svg>
		</button>
	</div>

	<!-- Detail Overlay (Revealed on hover) -->
	<div class="card-detail-overlay">
		<div class="detail-header">
			<!--<div class="detail-top-meta">
				<span class="archetype-pill">{park.archetype || 'Themed Zone'}</span>
			</div>
			-->
			<!--<h4 class="detail-title">{park.name}</h4>-->
			<p class="detail-tagline">{park.tagline}</p>
		</div>

		<!-- Activities Grid: Included vs Premium -->
		<div class="activities-wrapper">
			<!-- Included Activities -->
			<div class="activity-group included-group">
				<div class="group-header">
					<span class="group-badge included-badge">✓ Included with Entry</span>
				</div>
				<ul class="activities-list">
					{#each park.includedActivities.slice(0, 4) as item (item)}
						<li class="activity-item">
							<span class="bullet-check">•</span>
							<span class="activity-text">{item}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Premium Activities -->
			<div class="activity-group premium-group">
				<div class="group-header">
					<span class="group-badge premium-badge">★ Premium Activities</span>
				</div>
				<ul class="activities-list">
					{#each park.premiumActivities.slice(0, 3) as item (item)}
						<li class="activity-item">
							<span class="bullet-star">•</span>
							<span class="activity-text">{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="detail-footer">
			<!--<span class="footer-note">Free roaming zone in Tērvete</span>-->
			<button
				class="btn-detail-guide"
				onclick={() => onSelectPark(park)}
				title="View full park guide and all activities"
			>
				<span>See more</span>
				<span class="btn-arrow">→</span>
			</button>
		</div>
	</div>
</div>

<style>
	.park-card {
		background: linear-gradient(180deg, var(--card-theme-bg) 0%, var(--bg-surface) 130px);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		position: relative;
		overflow: hidden;
		min-height: 450px;
		display: flex;
		flex-direction: column;
		box-shadow: var(--card-shadow);
		transition:
			transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.24s ease,
			border-color 0.24s ease;
	}

	.park-card:hover {
		transform: translateY(-4px);
		border-color: var(--card-theme-color);
		box-shadow:
			0 16px 32px var(--card-theme-shadow),
			0 0 0 1px var(--card-theme-border);
	}

	/* Top theme accent strip */
	.card-accent-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--card-theme-color);
		z-index: 20;
	}

	/* Card Standard View */
	.card-standard-view {
		padding: 22px 20px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 100%;
		flex: 1;
		transition: opacity 0.25s ease;
	}

	.card-badge-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	/* Theme Pill */
	.theme-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 9px;
		border-radius: var(--radius-pill);
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: capitalize;
		color: var(--card-theme-color);
		background: var(--card-theme-bg);
		border: 1px solid var(--card-theme-border);
	}

	.theme-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--card-theme-color);
	}

	.zone-badge {
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.card-image-wrapper {
		width: 100%;
		height: 180px;
		background: var(--bg-panel);
		border: 1.5px solid var(--card-theme-border);
		border-radius: var(--radius-sm);
		overflow: hidden;
		margin-bottom: 14px;
		transition: border-color var(--transition-fast);
	}

	.park-card:hover .card-image-wrapper {
		border-color: var(--card-theme-color);
	}

	.park-thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.35s ease;
	}

	.park-card:hover .park-thumb {
		transform: scale(1.05);
	}

	.park-name {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		line-height: 1.25;
		margin-bottom: 8px;
	}

	/* One sentence info about the theme of the park */
	.park-theme-sentence {
		font-size: 0.86rem;
		line-height: 1.45;
		color: var(--text-secondary);
		margin-bottom: 12px;
		text-align: center;
	}

	.card-hint-row {
		margin-top: auto;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.hover-hint-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--card-theme-color);
		background: var(--card-theme-bg);
		border: 1px solid var(--card-theme-border);
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		transition: all var(--transition-fast);
	}

	.hint-arrow {
		transition: transform var(--transition-fast);
	}

	.park-card:hover .hint-arrow {
		transform: translateX(2px);
	}

	.mobile-expand-btn {
		display: none;
		margin-top: 14px;
		align-items: center;
		gap: 6px;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--card-theme-color);
		background: var(--card-theme-bg);
		border: var(--border-width) solid var(--card-theme-border);
		padding: 6px 14px;
		border-radius: var(--radius-pill);
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.mobile-expand-btn {
			display: inline-flex;
		}
		.card-hint-row {
			display: none;
		}
	}

	/* Detail Overlay (Reveals on Hover) */
	.card-detail-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, var(--card-theme-bg) 0%, var(--bg-surface) 130px);
		padding: 20px 18px;
		display: flex;
		flex-direction: column;
		opacity: 0;
		pointer-events: none;
		transform: translateY(10px);
		transition:
			opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 10;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--card-theme-border) transparent;
	}

	.park-card:hover .card-detail-overlay,
	.park-card.is-expanded .card-detail-overlay {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	.detail-header {
		margin-bottom: 12px;
		flex-shrink: 0;
	}

	.detail-top-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.archetype-pill {
		font-size: 0.72rem;
		font-weight: 700;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.detail-title {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		line-height: 1.2;
		margin-bottom: 3px;
	}

	.detail-tagline {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--card-theme-color);
		line-height: 1.35;
	}

	/* Activities Structure */
	.activities-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 12px;
		flex: 1;
	}

	.activity-group {
		background: var(--bg-panel-light);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		padding: 8px 10px;
	}

	.group-header {
		margin-bottom: 6px;
	}

	.group-badge {
		display: inline-block;
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 2px 7px;
		border-radius: var(--radius-pill);
	}

	.included-badge {
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border: 1px solid var(--status-open-border);
	}

	.premium-badge {
		background: var(--card-theme-bg);
		color: var(--card-theme-color);
		border: 1px solid var(--card-theme-border);
	}

	.activities-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.activity-item {
		display: flex;
		align-items: baseline;
		gap: 6px;
		font-size: 0.74rem;
		line-height: 1.3;
		color: var(--text-primary);
	}

	.bullet-check {
		color: var(--status-open-text);
		font-weight: 800;
		font-size: 0.76rem;
		flex-shrink: 0;
	}

	.bullet-star {
		color: var(--card-theme-color);
		font-weight: 800;
		font-size: 0.72rem;
		flex-shrink: 0;
	}

	.activity-text {
		font-weight: 600;
	}

	.detail-footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding-top: 10px;
		border-top: 1px solid var(--border-subtle);
		flex-shrink: 0;
	}

	.footer-note {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--text-tertiary);
	}

	.btn-detail-guide {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 14px;
		font-size: 0.78rem;
		font-weight: 700;
		color: #ffffff;
		background: var(--card-theme-color);
		border: var(--border-width) solid var(--card-theme-color);
		border-radius: var(--radius-pill);
		box-shadow: 0 3px 10px var(--card-theme-shadow);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-detail-guide:hover {
		background: var(--card-theme-hover);
		border-color: var(--card-theme-hover);
		transform: translateY(-1px);
	}

	.btn-arrow {
		transition: transform var(--transition-fast);
	}

	.btn-detail-guide:hover .btn-arrow {
		transform: translateX(2px);
	}
</style>
