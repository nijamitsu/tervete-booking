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
		<p class="hero-description">Six parks, different experiences.</p>
	</div>
</section>

<style>
	.hero-section {
		min-height: clamp(340px, 46vh, 480px);
		padding: 96px 24px 88px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-image:
			linear-gradient(
				180deg,
				rgba(0, 41, 27, 0.54) 0%,
				rgba(0, 41, 27, 0.62) 60%,
				rgba(0, 41, 27, 0.72) 100%
			),
			url('/home-bg-image.jpg');
		background-size: cover;
		background-position: center 35%;
		background-repeat: no-repeat;
		position: relative;
		transition: background var(--transition-smooth);
	}

	.hero-inner {
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 1;
	}

	.hero-title {
		font-size: clamp(2.5rem, 6vw, 4.2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #ffffff;
		line-height: 1.12;
		margin-bottom: 16px;
		text-shadow: 0 2px 18px rgba(0, 20, 12, 0.5);
	}

	.hero-title i {
		font-style: italic;
		font-weight: 400;
		color: #d7f3e3;
	}

	.hero-description {
		font-size: clamp(1.1rem, 2.2vw, 1.35rem);
		color: rgba(255, 255, 255, 0.92);
		max-width: 640px;
		line-height: 1.6;
		font-weight: 400;
		text-shadow: 0 1px 12px rgba(0, 20, 12, 0.45);
	}
</style>
