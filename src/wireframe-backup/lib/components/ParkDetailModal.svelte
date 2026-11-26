<script>
	let { park, isOpen, onClose, onBookPark } = $props();
</script>

{#if isOpen && park}
	<div class="modal-backdrop" onclick={onClose} role="dialog" aria-modal="true">
		<div class="detail-dialog" onclick={(e) => e.stopPropagation()}>
			<!-- Dialog Header -->
			<div class="dialog-header">
				<div class="header-left">
					<span class="wireframe-tag">{park.wireframeName}</span>
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
					</div>
				{/if}

				<!-- Meta status banner -->
				<div
					class="status-banner"
					class:is-open={park.status === 'open'}
					class:is-closed={park.status === 'closed'}
				>
					<div class="status-badge">
						<span class="status-dot"></span>
						<strong>Currently {park.statusText}</strong>
					</div>
					<span class="hours-text">{park.hours}</span>
					<span class="audience-text">{park.ageGroup}</span>
				</div>

				{#if park.status === 'closed' && park.closureNotice}
					<div class="closure-alert">
						<span class="notice-badge">Notice</span>
						<div class="alert-content">
							<strong>Seasonal Maintenance Notice</strong>
							<p>{park.closureNotice}</p>
						</div>
					</div>
				{/if}

				<!-- Description -->
				<div class="content-block">
					<h4 class="block-title">About this Park</h4>
					<p class="lead-desc">{park.tagline}</p>
					<p class="full-desc">{park.fullDescription}</p>
				</div>

				<!-- Key Highlights -->
				<div class="content-block">
					<h4 class="block-title">Key Attractions & Highlights</h4>
					<div class="highlights-grid">
						{#each park.highlights as item (item)}
							<div class="highlight-card">
								<span class="check-icon">✓</span>
								<span>{item}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Practical details -->
				<div class="content-block">
					<h4 class="block-title">Visitor Information</h4>
					<div class="info-list">
						<div class="info-row">
							<span>Admission:</span>
							<strong>{park.price}</strong>
						</div>
						<div class="info-row">
							<span>Trail accessibility:</span>
							<strong>Wooden boardwalks suitable for strollers & wheelchairs</strong>
						</div>
						<div class="info-row">
							<span>Location:</span>
							<strong>LVM Nature Park Tērvete, Dobele County, Latvia</strong>
						</div>
					</div>
				</div>
			</div>

			<!-- Dialog Footer -->
			<div class="dialog-footer">
				<button class="btn-back" onclick={onClose}>Close Guide</button>
				{#if park.status === 'open'}
					<button
						class="btn-book"
						onclick={() => {
							onClose();
							onBookPark(park);
						}}
					>
						Book Tickets for this Park
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(18, 24, 20, 0.7);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	.detail-dialog {
		background: #ffffff;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 620px;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 10px 10px 0 var(--border-bold);
		display: flex;
		flex-direction: column;
	}

	.dialog-header {
		padding: 20px 24px;
		background: #d8ded8;
		border-bottom: 2px solid var(--border-bold);
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.wireframe-tag {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--text-tertiary);
		margin-bottom: 2px;
		display: block;
	}

	.park-title {
		font-size: 1.45rem;
		font-weight: 800;
		color: var(--border-bold);
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
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: 50%;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--border-bold);
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
		border: 2px solid var(--border-bold);
		box-shadow: 3px 3px 0 var(--border-bold);
		background: #edf1ed;
	}

	.dialog-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.status-banner {
		padding: 12px 16px;
		border-radius: var(--radius-md);
		border: 1.5px solid var(--border-bold);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		font-size: 0.82rem;
	}

	.status-banner.is-open {
		background: var(--status-open-bg);
		border-color: var(--status-open-border);
	}

	.status-banner.is-closed {
		background: var(--status-closed-bg);
		border-color: var(--status-closed-border);
	}

	.status-badge {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: currentColor;
	}

	.closure-alert {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		background: #fff5f3;
		border: 1.5px solid var(--status-closed-border);
		border-radius: var(--radius-md);
	}

	.notice-badge {
		font-size: 0.7rem;
		font-weight: 800;
		text-transform: uppercase;
		background: var(--status-closed-text);
		color: #ffffff;
		padding: 2px 6px;
		border-radius: 4px;
	}

	.alert-content strong {
		display: block;
		font-size: 0.88rem;
		color: var(--status-closed-text);
		margin-bottom: 2px;
	}

	.alert-content p {
		font-size: 0.82rem;
		color: var(--text-secondary);
	}

	.content-block {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.block-title {
		font-size: 0.85rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-tertiary);
	}

	.lead-desc {
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--color-forest);
		line-height: 1.4;
	}

	.full-desc {
		font-size: 0.92rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.highlights-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	@media (max-width: 560px) {
		.highlights-grid {
			grid-template-columns: 1fr;
		}
	}

	.highlight-card {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #f4f7f4;
		border: 1px solid var(--border-subtle);
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.check-icon {
		color: var(--color-forest);
		font-weight: 800;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: #f8faf8;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		padding: 12px 16px;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.84rem;
	}

	.info-row span {
		color: var(--text-secondary);
	}

	.info-row strong {
		color: var(--border-bold);
		text-align: right;
	}

	.dialog-footer {
		padding: 16px 24px;
		border-top: 2px solid var(--border-bold);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 12px;
		background: #fbfcfb;
	}

	.btn-back {
		padding: 10px 18px;
		font-size: 0.88rem;
		font-weight: 700;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-pill);
		background: #ffffff;
		color: var(--border-bold);
	}

	.btn-book {
		padding: 10px 22px;
		font-size: 0.88rem;
		font-weight: 800;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-pill);
		background: var(--border-bold);
		color: #ffffff;
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.btn-book:hover {
		background: var(--color-forest);
	}
</style>
