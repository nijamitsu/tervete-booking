<script>
	let { park, onSelectPark, onBookPark } = $props();

	// Hover state for interactive detail reveal as requested in wireframe annotation
	let isHovered = $state(false);
	let isMobileExpanded = $state(false);

	function toggleMobileExpand() {
		isMobileExpanded = !isMobileExpanded;
	}
</script>

<!-- 
	Park Card matches the wireframe:
	- Shows "Park X" (or real name)
	- Shows "Open" or "Closed"
	- When hover, shows more detail of the park (arrow annotation from wireframe)
-->
<div
	class="park-card"
	class:is-open={park.status === 'open'}
	class:is-closed={park.status === 'closed'}
	class:is-expanded={isHovered || isMobileExpanded}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="region"
	aria-label="{park.name} card"
>
	<!-- Front / Standard Wireframe View -->
	<div class="card-standard-view">
		<div class="card-badge-row">
			<!--<span class="wireframe-label">{park.wireframeName}</span>-->
			<span class="status-pill status-{park.status}">
				<span class="status-dot"></span>
				{park.statusText}
			</span>
		</div>

		<div class="card-image-wrapper">
			<img src={park.image} alt={park.name} class="park-thumb" loading="lazy" />
		</div>

		<h3 class="park-name">{park.name}</h3>
		<!--<span class="park-original-name">({park.originalName})</span>-->

		<div class="card-standard-status">
			<!--<span class="status-indicator-text">{park.statusText}</span>-->
			{#if park.status === 'open'}
				<span class="hours-tag">{park.hours}</span>
			{:else}
				<span class="hours-tag closed-tag">Seasonal Pause</span>
			{/if}
		</div>

		<!-- Mobile expand toggle hint -->
		<button
			class="mobile-expand-btn"
			onclick={toggleMobileExpand}
			aria-label="Toggle details for {park.name}"
		>
			<span>{isMobileExpanded ? 'Hide Details' : 'View Details'}</span>
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

	<!-- Detail Overlay (Revealed on hover as annotated in wireframe: "when hover, you have more detail of the parks") -->
	<div class="card-detail-overlay">
		<div class="detail-header">
			<div class="detail-top-meta">
				<span class="wireframe-pill">{park.wireframeName}</span>
				<span class="status-pill status-{park.status}">
					<span class="status-dot"></span>
					{park.statusText}
				</span>
			</div>
			<h4 class="detail-title">{park.name}</h4>
			<span class="detail-audience">{park.ageGroup}</span>
		</div>

		<p class="detail-brief">{park.brief}</p>

		<div class="detail-highlights">
			{#each park.highlights.slice(0, 3) as highlight (highlight)}
				<div class="highlight-bullet">
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 6 9 17l-5-5" />
					</svg>
					<span>{highlight}</span>
				</div>
			{/each}
		</div>

		{#if park.status === 'closed' && park.closureNotice}
			<div class="closure-notice-box">
				<span class="notice-badge">Notice</span>
				<span>{park.closureNotice}</span>
			</div>
		{/if}

		<div class="detail-footer">
			<div class="price-chip">
				<span class="price-val">{park.price}</span>
			</div>

			<div class="detail-actions">
				<button
					class="btn-detail-more"
					onclick={() => onSelectPark(park)}
					title="Read full park guide"
				>
					Guide
				</button>
				{#if park.status === 'open'}
					<button
						class="btn-detail-book"
						onclick={() => onBookPark(park)}
						title="Book passes for {park.name}"
					>
						Book
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.park-card {
		background: #ffffff;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-md);
		position: relative;
		overflow: hidden;
		min-height: 260px;
		display: flex;
		flex-direction: column;
		box-shadow: 4px 4px 0 var(--border-bold);
		transition:
			transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.22s ease;
	}

	.park-card:hover {
		transform: translateY(-4px);
		box-shadow: 6px 6px 0 var(--border-bold);
	}

	/* Card Standard View */
	.card-standard-view {
		padding: 24px 20px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 100%;
		flex: 1;
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.card-badge-row {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.wireframe-label {
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--text-tertiary);
		background: #f1f4f1;
		padding: 3px 8px;
		border-radius: 4px;
		border: 1px solid var(--border-subtle);
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 10px;
		border-radius: var(--radius-pill);
		font-size: 0.78rem;
		font-weight: 700;
		border: 1.5px solid transparent;
	}

	.status-pill.status-open {
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border-color: var(--status-open-border);
	}

	.status-pill.status-closed {
		background: var(--status-closed-bg);
		color: var(--status-closed-text);
		border-color: var(--status-closed-border);
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
	}

	.card-image-wrapper {
		width: 100%;
		height: 136px;
		background: #f4f6f4;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-sm);
		overflow: hidden;
		margin-bottom: 14px;
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.park-thumb {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s ease;
	}

	.park-card:hover .park-thumb {
		transform: scale(1.04);
	}

	.park-name {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--border-bold);
		line-height: 1.2;
		margin-bottom: 4px;
	}

	.park-original-name {
		font-size: 0.8rem;
		color: var(--text-tertiary);
		font-style: italic;
		margin-bottom: 18px;
	}

	.card-standard-status {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.status-indicator-text {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--border-bold);
	}

	.hours-tag {
		font-size: 0.76rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.closed-tag {
		color: var(--status-closed-text);
	}

	.mobile-expand-btn {
		display: none;
		margin-top: 14px;
		align-items: center;
		gap: 6px;
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--color-forest);
		background: #eef5f0;
		border: 1px solid var(--border-bold);
		padding: 5px 12px;
		border-radius: var(--radius-pill);
	}

	@media (max-width: 768px) {
		.mobile-expand-btn {
			display: inline-flex;
		}
	}

	/* Detail Overlay (Reveals on Hover) */
	.card-detail-overlay {
		position: absolute;
		inset: 0;
		background: #ffffff;
		padding: 18px;
		display: flex;
		flex-direction: column;
		opacity: 0;
		pointer-events: none;
		transform: translateY(10px);
		transition:
			opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 10;
	}

	/* Active hover state */
	.park-card:hover .card-detail-overlay,
	.park-card.is-expanded .card-detail-overlay {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	.detail-header {
		margin-bottom: 10px;
	}

	.detail-top-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.wireframe-pill {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--text-tertiary);
	}

	.detail-title {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--border-bold);
		line-height: 1.2;
		margin-bottom: 4px;
	}

	.detail-audience {
		display: inline-block;
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--color-forest);
		background: #f0f7f2;
		padding: 2px 8px;
		border-radius: 4px;
	}

	.detail-brief {
		font-size: 0.82rem;
		line-height: 1.45;
		color: var(--text-secondary);
		margin-bottom: 12px;
	}

	.detail-highlights {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 12px;
	}

	.highlight-bullet {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.76rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.highlight-bullet svg {
		color: var(--color-forest);
		flex-shrink: 0;
	}

	.closure-notice-box {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--status-closed-text);
		background: #fff5f3;
		padding: 6px 8px;
		border-radius: 6px;
		border: 1px solid var(--status-closed-border);
		margin-bottom: 10px;
	}

	.notice-badge {
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		background: var(--status-closed-text);
		color: #ffffff;
		padding: 1px 5px;
		border-radius: 3px;
	}

	.detail-footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding-top: 10px;
		border-top: 1px solid #edf0ed;
	}

	.price-chip {
		display: flex;
		flex-direction: column;
	}

	.price-val {
		font-size: 0.8rem;
		font-weight: 800;
		color: var(--border-bold);
	}

	.detail-actions {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.btn-detail-more {
		padding: 6px 12px;
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--border-bold);
		background: #f1f4f1;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-pill);
		transition: background var(--transition-fast);
	}

	.btn-detail-more:hover {
		background: #e2e8e2;
	}

	.btn-detail-book {
		padding: 6px 14px;
		font-size: 0.78rem;
		font-weight: 700;
		color: #ffffff;
		background: var(--border-bold);
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-pill);
		transition: background var(--transition-fast);
	}

	.btn-detail-book:hover {
		background: var(--color-forest);
	}
</style>
