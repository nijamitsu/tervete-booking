<script>
</script>

<section id="hero" class="hero-section">
	<div class="hero-inner">
		<!-- Wireframe Eyebrow (kept commented as user preferred) -->
		<!--
		<div class="hero-eyebrow">
			<span class="eyebrow-line"></span>
			<span class="eyebrow-text">Discover</span>
			<span class="eyebrow-line"></span>
		</div>
		-->

		<!-- Main Title with editorial italic accent -->
		<h1 class="hero-title">Discover the Park of Parks</h1>

		<!-- Value Proposition -->
		<p class="hero-description">Six parks, each designed for a different kind of experience.</p>
	</div>
</section>

<style>
	.hero-section {
		padding: 72px 24px 60px;
		text-align: center;
		background: radial-gradient(ellipse at 50% 0%, var(--bg-panel) 0%, var(--bg-canvas) 75%);
		position: relative;
		transition: background var(--transition-smooth);
	}

	.hero-inner {
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-title {
		font-size: clamp(2.5rem, 6vw, 4.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-forest-dark);
		line-height: 1.12;
		margin-bottom: 16px;
	}

	.hero-title i {
		font-style: italic;
		font-weight: 400;
		color: var(--color-forest);
	}

	.hero-description {
		font-size: clamp(1.1rem, 2.2vw, 1.35rem);
		color: var(--text-secondary);
		max-width: 640px;
		line-height: 1.6;
		font-weight: 400;
	}
</style>
