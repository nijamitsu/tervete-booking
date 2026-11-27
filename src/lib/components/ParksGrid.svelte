<script>
	import ParkCard from './ParkCard.svelte';

	let { parks, onSelectPark } = $props();
</script>

<section id="parks" class="explore-parks-section">
	<div class="explore-parks-container">
		<!-- Section Header inside container -->
		<div class="explore-header-box">
			<div class="title-with-annotation">
				<h2 class="explore-title">Explore our parks</h2>
			</div>

			<p class="explore-subhead">
				Tērvete dabas parks is a 1,200-hectare open nature reserve. Explore each park below to see
				its theme and activities.
			</p>
		</div>

		<!-- 3x2 Grid -->
		<div class="parks-grid">
			{#each parks as park (park.id)}
				<ParkCard {park} {onSelectPark} />
			{/each}
		</div>

		<!-- Bottom summary bar -->
		<!--
		<div class="parks-grid-footer">
			<div class="footer-note">
				<span class="note-bullet">Unenclosed Reserve:</span>
				<span>
					We do not sell separate tickets for individual parks. General park admission gives you
					full walking access to all 6 themed worlds and included activities. Premium workshops,
					high ropes, and boat rentals can be arranged on-site.
				</span>
			</div>
			<div class="footer-stats">
				<span class="stat-pill">6 Themed Worlds to Discover</span>
			</div>
		</div>
		-->
	</div>
</section>

<style>
	.explore-parks-section {
		padding: 32px 24px 64px;
		max-width: 1240px;
		margin: 0 auto;
	}

	.explore-parks-container {
		background: var(--bg-panel);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-xl);
		padding: 44px 36px;
		box-shadow: var(--block-shadow);
		transition: all var(--transition-smooth);
	}

	@media (max-width: 768px) {
		.explore-parks-container {
			padding: 24px 16px;
		}
	}

	.explore-header-box {
		text-align: center;
		margin-bottom: 36px;
	}

	.title-with-annotation {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
	}

	.explore-title {
		font-size: clamp(2rem, 4vw, 2.8rem);
		font-weight: 800;
		color: var(--color-forest-dark);
		letter-spacing: -0.02em;
	}

	.explore-subhead {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto;
	}

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
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		padding: 14px 22px;
		box-shadow: var(--card-shadow);
	}

	.footer-note {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.85rem;
		color: var(--text-secondary);
		flex: 1;
		min-width: 260px;
	}

	.note-bullet {
		font-weight: 700;
		color: var(--color-forest);
	}

	.stat-pill {
		font-size: 0.84rem;
		font-weight: 700;
		color: var(--status-open-text);
		background: var(--status-open-bg);
		padding: 5px 14px;
		border-radius: var(--radius-pill);
		border: 1px solid var(--status-open-border);
		white-space: nowrap;
	}
</style>
