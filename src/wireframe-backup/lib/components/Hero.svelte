<script>
</script>

<section id="hero" class="hero-section">
	<div class="hero-inner">
		<!-- Wireframe Eyebrow -->
		<!--
		<div class="hero-eyebrow">
			<span class="eyebrow-line"></span>
			<span class="eyebrow-text">Discover</span>
			<span class="eyebrow-line"></span>
		</div>
		-->

		<!-- Wireframe Main Title -->
		<h1 class="hero-title">Tērvete <i>the Park of Parks</i></h1>

		<!-- Wireframe Subtitles -->
		<!-- <p class="hero-lead">Endless adventure, joy, and fun</p> -->
		<p class="hero-description">Six unique worlds to explore, all in one place.</p>

		<!-- Interactive CTAs -->
		<!--
		<div class="hero-actions">
			<a href="#parks" class="btn-primary" onclick={onExploreParks}>
				<span>Explore the Parks (6)</span>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 5v14" />
					<path d="m19 12-7 7-7-7" />
				</svg>
			</a>
			<button class="btn-secondary" onclick={onHelpMeDecide}>
				<span class="sparkle-icon">✨</span>
				<span>Help Me Decide</span>
			</button>
		</div>
		-->

		<!-- Quick highlights ticker -->
		<!--
		<div class="hero-badges">
			<div class="badge-item">
				<span class="badge-icon">🌲</span>
				<span>1,200+ Hectares of Pine Forest</span>
			</div>
			<div class="badge-item">
				<span class="badge-icon">🏰</span>
				<span>400+ Fairytale Wooden Sculptures</span>
			</div>
			<div class="badge-item">
				<span class="badge-icon">🧗</span>
				<span>Tree Nets & Ropes</span>
			</div>
			<div class="badge-item">
				<span class="badge-icon">🏕️</span>
				<span>Lakeside Glamping</span>
			</div>
		</div>
		-->
	</div>
</section>

<style>
	.hero-section {
		padding: 64px 24px 56px;
		text-align: center;
		background: radial-gradient(circle at 50% 20%, #f4f7f4 0%, var(--bg-canvas) 70%);
		position: relative;
	}

	.hero-inner {
		max-width: 820px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.eyebrow-line {
		width: 32px;
		height: 2px;
		background: var(--text-tertiary);
		border-radius: 2px;
	}

	.eyebrow-text {
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.hero-title {
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--border-bold);
		line-height: 1.1;
		margin-bottom: 16px;
	}

	.hero-lead {
		font-size: clamp(1.2rem, 2.8vw, 1.65rem);
		font-weight: 600;
		color: var(--color-forest);
		margin-bottom: 12px;
		letter-spacing: -0.01em;
	}

	.hero-description {
		font-size: clamp(1rem, 2vw, 1.22rem);
		color: var(--text-secondary);
		max-width: 620px;
		line-height: 1.6;
		margin-bottom: 36px;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-bottom: 44px;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		background: var(--border-bold);
		color: #ffffff;
		padding: 14px 28px;
		font-size: 1.05rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		border: 2px solid var(--border-bold);
		box-shadow: 3px 3px 0 var(--border-bold);
		transition: all var(--transition-fast);
	}

	.btn-primary:hover {
		background: var(--color-forest);
		transform: translate(-2px, -2px);
		box-shadow: 5px 5px 0 var(--border-bold);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: #ffffff;
		color: var(--border-bold);
		padding: 14px 28px;
		font-size: 1.05rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		border: 2px solid var(--border-bold);
		box-shadow: 3px 3px 0 var(--border-bold);
		transition: all var(--transition-fast);
	}

	.btn-secondary:hover {
		background: #f0f4ee;
		transform: translate(-2px, -2px);
		box-shadow: 5px 5px 0 var(--border-bold);
	}

	.sparkle-icon {
		font-size: 1.2rem;
	}

	.hero-badges {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}

	.badge-item {
		display: flex;
		align-items: center;
		gap: 8px;
		background: #ffffff;
		padding: 8px 16px;
		border-radius: var(--radius-pill);
		border: 1.5px solid var(--border-subtle);
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.badge-icon {
		font-size: 1rem;
	}
</style>
