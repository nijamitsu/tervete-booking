<script>
	let { park, isOpen, onClose } = $props();
</script>

{#if isOpen && park}
	<div class="modal-backdrop" onclick={onClose} role="dialog" aria-modal="true">
		<div
			class="detail-dialog theme-{park.theme?.name || 'default'}"
			style="
				--modal-theme-color: {park.theme?.color || 'var(--color-forest)'};
				--modal-theme-hover: {park.theme?.colorHover || 'var(--color-forest-hover)'};
				--modal-theme-bg: {park.theme?.bgTint || 'var(--bg-panel)'};
				--modal-theme-border: {park.theme?.borderTint || 'var(--border-color)'};
				--modal-theme-shadow: {park.theme?.shadowTint || 'var(--btn-shadow)'};
			"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Dialog Header -->
			<div class="dialog-header">
				<div class="header-left">
					<div class="header-meta-row">
						<span class="modal-theme-pill">
							<span class="theme-dot" style="background: var(--modal-theme-color);"></span>
							<span>{park.theme?.name || 'Nature'} Theme</span>
						</span>
						<span class="zone-pill">{park.worldId} • {park.archetype}</span>
					</div>
					<h3 class="park-title">{park.name}</h3>
					<span class="original-title">{park.originalName}</span>
				</div>
				<button class="btn-close" onclick={onClose} aria-label="Close details">✕</button>
			</div>

			<!-- Dialog Body -->
			<div class="dialog-body">
				{#if park.image}
					<div class="dialog-photo-wrap">
						<img src={park.image} alt={park.name} class="dialog-photo" />
						<div class="photo-overlay-tag">
							<span>{park.tagline}</span>
						</div>
					</div>
				{/if}

				<!-- Theme Banner -->
				<div class="theme-summary-card">
					<span class="theme-card-eyebrow">Thematic Identity</span>
					<p class="theme-card-sentence">"{park.themeSentence}"</p>
					<span class="theme-card-audience">Target: {park.ageGroup}</span>
				</div>

				<!-- Experience Connector -->
				{#if park.connector}
					<div class="content-block connector-block">
						<div class="connector-header">
							<span class="connector-badge">Signature Experience</span>
							<h4 class="connector-title">{park.connector}</h4>
						</div>
						<p class="connector-desc">{park.connectorDescription}</p>
					</div>
				{/if}

				<!-- Included Activities -->
				<div class="content-block">
					<div class="section-badge-header">
						<span class="badge-pill included-pill">✓ Included Activities</span>
						<span class="badge-sub">Full access with general park admission</span>
					</div>
					<div class="activities-grid">
						{#each park.includedActivities as item (item)}
							<div class="activity-card included-card">
								<span class="check-icon">✓</span>
								<span class="card-item-text">{item}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Premium Activities -->
				<div class="content-block">
					<div class="section-badge-header">
						<span class="badge-pill premium-pill">★ Premium Activities & Experiences</span>
						<span class="badge-sub">Special workshops, equipment & guided tours</span>
					</div>
					<div class="activities-grid">
						{#each park.premiumActivities as item (item)}
							<div class="activity-card premium-card">
								<span class="star-icon">★</span>
								<span class="card-item-text">{item}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Wayfinding & Visual Identity -->
				{#if park.visualCues}
					<div class="content-block cues-block">
						<h4 class="block-title">Visual Cues & Wayfinding</h4>
						<p class="cues-text">{park.visualCues}</p>
					</div>
				{/if}

				<!-- Practical Information Notice -->
				<div class="park-nature-notice">
					<div class="notice-icon">🌲</div>
					<div class="notice-text">
						<strong>Open Nature Park Notice</strong>
						<p>
							Tērvete is a continuous 1,200-hectare nature reserve with no internal gates between
							parks. A single general park admission ticket grants you full walking access to all 6
							worlds. Premium workshops and equipment rentals can be arranged at the respective zone
							hubs.
						</p>
					</div>
				</div>
			</div>

			<!-- Dialog Footer -->
			<div class="dialog-footer">
				<button class="btn-close-modal" onclick={onClose}>Close Park Info</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(18, 24, 20, 0.72);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	.detail-dialog {
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 680px;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: var(--block-shadow);
		display: flex;
		flex-direction: column;
	}

	.dialog-header {
		padding: 20px 24px;
		background: var(--modal-theme-bg);
		border-bottom: var(--border-width) solid var(--modal-theme-border);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.header-meta-row {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
	}

	.modal-theme-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.74rem;
		font-weight: 800;
		text-transform: capitalize;
		color: var(--modal-theme-color);
		background: var(--bg-surface);
		border: 1px solid var(--modal-theme-border);
		padding: 2px 8px;
		border-radius: var(--radius-pill);
	}

	.zone-pill {
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.theme-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}

	.park-title {
		font-size: 1.55rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		line-height: 1.2;
	}

	.original-title {
		font-size: 0.85rem;
		font-style: italic;
		color: var(--text-secondary);
	}

	.btn-close {
		width: 32px;
		height: 32px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: 50%;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.btn-close:hover {
		background: #ffeded;
	}

	.dialog-body {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.dialog-photo-wrap {
		width: 100%;
		height: 220px;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: var(--border-width) solid var(--modal-theme-border);
		box-shadow: var(--card-shadow);
		position: relative;
	}

	.dialog-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.photo-overlay-tag {
		position: absolute;
		bottom: 12px;
		left: 12px;
		right: 12px;
		background: rgba(0, 41, 27, 0.82);
		backdrop-filter: blur(4px);
		color: #ffffff;
		padding: 6px 12px;
		border-radius: var(--radius-pill);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.theme-summary-card {
		padding: 16px 18px;
		background: var(--modal-theme-bg);
		border: 1px solid var(--modal-theme-border);
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.theme-card-eyebrow {
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--modal-theme-color);
	}

	.theme-card-sentence {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-forest-dark);
		line-height: 1.4;
	}

	.theme-card-audience {
		font-size: 0.78rem;
		color: var(--text-secondary);
		font-weight: 600;
	}

	.content-block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.connector-block {
		background: var(--bg-panel-light);
		padding: 14px 16px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.connector-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
	}

	.connector-badge {
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		background: var(--modal-theme-color);
		color: #ffffff;
		padding: 2px 7px;
		border-radius: var(--radius-pill);
	}

	.connector-title {
		font-size: 0.95rem;
		font-weight: 800;
		color: var(--color-forest-dark);
	}

	.connector-desc {
		font-size: 0.84rem;
		line-height: 1.45;
		color: var(--text-secondary);
	}

	.section-badge-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 6px;
	}

	.badge-pill {
		display: inline-block;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 3px 10px;
		border-radius: var(--radius-pill);
	}

	.included-pill {
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border: 1px solid var(--status-open-border);
	}

	.premium-pill {
		background: var(--modal-theme-bg);
		color: var(--modal-theme-color);
		border: 1px solid var(--modal-theme-border);
	}

	.badge-sub {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		font-weight: 600;
	}

	.activities-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	@media (max-width: 580px) {
		.activities-grid {
			grid-template-columns: 1fr;
		}
	}

	.activity-card {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.included-card {
		background: #f6faf7;
		border: 1px solid #dceede;
	}

	.premium-card {
		background: var(--modal-theme-bg);
		border: 1px solid var(--modal-theme-border);
	}

	.check-icon {
		color: var(--status-open-text);
		font-weight: 800;
		flex-shrink: 0;
	}

	.star-icon {
		color: var(--modal-theme-color);
		font-weight: 800;
		flex-shrink: 0;
	}

	.card-item-text {
		color: var(--text-primary);
		line-height: 1.35;
	}

	.cues-block {
		background: var(--bg-panel-light);
		padding: 12px 16px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-subtle);
	}

	.block-title {
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
		margin-bottom: 4px;
	}

	.cues-text {
		font-size: 0.82rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.park-nature-notice {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		background: #eef5f0;
		border: 1px solid #a8d5bc;
		border-radius: var(--radius-md);
		padding: 14px 16px;
	}

	.notice-icon {
		font-size: 1.4rem;
		line-height: 1;
	}

	.notice-text strong {
		display: block;
		font-size: 0.88rem;
		color: var(--color-forest-dark);
		margin-bottom: 2px;
	}

	.notice-text p {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin: 0;
	}

	.dialog-footer {
		padding: 16px 24px;
		border-top: var(--border-width) solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: var(--bg-canvas);
	}

	.btn-close-modal {
		padding: 10px 22px;
		font-size: 0.88rem;
		font-weight: 700;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-pill);
		background: var(--bg-surface);
		color: var(--text-primary);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.btn-close-modal:hover {
		background: var(--bg-panel-hover);
	}
</style>
