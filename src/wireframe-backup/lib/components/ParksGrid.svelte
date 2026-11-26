<script>
	import ParkCard from './ParkCard.svelte';

	let { parks, onSelectPark, onBookPark } = $props();

	let activeFilter = $state('all');

	let filteredParks = $derived(
		activeFilter === 'all'
			? parks
			: activeFilter === 'open'
				? parks.filter((p) => p.status === 'open')
				: parks.filter((p) => p.category === activeFilter)
	);
</script>

<section id="parks" class="explore-parks-section">
	<div class="explore-parks-container">
		<!-- Section Header inside the gray container, matching wireframe -->
		<div class="explore-header-box">
			<div class="title-with-annotation">
				<h2 class="explore-title">Explore the parks</h2>
			</div>

			<p class="explore-subhead">
				Tervete is spread across our majestic 1,200-hectare ancient pine park.
			</p>

			<!-- Filter tabs -->
			<div class="filter-bar">
				<button
					class="filter-tab"
					class:active={activeFilter === 'all'}
					onclick={() => (activeFilter = 'all')}
				>
					All 6 Parks
				</button>
				<button
					class="filter-tab"
					class:active={activeFilter === 'open'}
					onclick={() => (activeFilter = 'open')}
				>
					● Open Today (5)
				</button>
				<button
					class="filter-tab"
					class:active={activeFilter === 'nature'}
					onclick={() => (activeFilter = 'nature')}
				>
					Nature & Fairytales
				</button>
				<button
					class="filter-tab"
					class:active={activeFilter === 'active'}
					onclick={() => (activeFilter = 'active')}
				>
					Active & High Ropes
				</button>
				<button
					class="filter-tab"
					class:active={activeFilter === 'relaxation'}
					onclick={() => (activeFilter = 'relaxation')}
				>
					Lake & Glamping
				</button>
			</div>
		</div>

		<!-- 3x2 Grid matching wireframe -->
		<div class="parks-grid">
			{#each filteredParks as park (park.id)}
				<ParkCard {park} {onSelectPark} {onBookPark} />
			{/each}
		</div>

		<!-- Bottom summary bar -->
		<div class="parks-grid-footer">
			<div class="footer-note">
				<span class="note-bullet">Note</span>
				<span>
					Standard park admission includes access to Fairytale Forest, Dwarfs' Forest, and nature
					trails. Tarzāns, Net Park, and Butterfly House feature separate or add-on tickets.
				</span>
			</div>
			<div class="footer-stats">
				<span class="stat-pill"><strong>5 of 6</strong> Zones Open Today</span>
			</div>
		</div>
	</div>
</section>

<style>
	.explore-parks-section {
		padding: 32px 24px 64px;
		max-width: 1240px;
		margin: 0 auto;
	}

	/* Main gray container box directly matching the wireframe */
	.explore-parks-container {
		background: #d8ded8;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-lg);
		padding: 40px 32px;
		box-shadow: 6px 6px 0 var(--border-bold);
	}

	@media (max-width: 768px) {
		.explore-parks-container {
			padding: 24px 16px;
		}
	}

	.explore-header-box {
		text-align: center;
		margin-bottom: 32px;
	}

	.title-with-annotation {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-bottom: 8px;
	}

	.explore-title {
		font-size: clamp(2rem, 4vw, 2.8rem);
		font-weight: 800;
		color: var(--border-bold);
		letter-spacing: -0.02em;
	}

	.wireframe-hint-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--color-forest);
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.explore-subhead {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto 24px;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.filter-tab {
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		padding: 6px 16px;
		border-radius: var(--radius-pill);
		font-size: 0.84rem;
		font-weight: 700;
		color: var(--border-bold);
		transition: all var(--transition-fast);
	}

	.filter-tab:hover {
		background: #eff3ef;
		transform: translateY(-1px);
	}

	.filter-tab.active {
		background: var(--border-bold);
		color: #ffffff;
		box-shadow: 2px 2px 0 var(--color-forest);
	}

	/* 3 columns on desktop, 2 on tablet, 1 on mobile */
	.parks-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		margin-bottom: 32px;
	}

	@media (max-width: 960px) {
		.parks-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.parks-grid {
			grid-template-columns: 1fr;
		}
	}

	.parks-grid-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-md);
		padding: 14px 20px;
	}

	.footer-note {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.82rem;
		color: var(--text-secondary);
		flex: 1;
		min-width: 260px;
	}

	.stat-pill {
		font-size: 0.84rem;
		font-weight: 700;
		color: var(--color-forest);
		background: #eef5f0;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		border: 1px solid var(--status-open-border);
		white-space: nowrap;
	}
</style>
