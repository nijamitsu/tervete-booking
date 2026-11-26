<script>
	let { isOpen, onClose, onSelectPackage } = $props();

	let currentStep = $state(1);

	// User selections
	let visitorType = $state('');
	let duration = $state('');
	let interest = $state('');

	function restartQuiz() {
		currentStep = 1;
		visitorType = '';
		duration = '';
		interest = '';
	}

	function handleVisitorSelect(type) {
		visitorType = type;
		currentStep = 2;
	}

	function handleDurationSelect(time) {
		duration = time;
		currentStep = 3;
	}

	function handleInterestSelect(item) {
		interest = item;
		currentStep = 4; // Result step
	}

	// Dynamic recommendation computed from selections
	let recommendation = $derived.by(() => {
		const isOvernight = duration === 'overnight';
		const isHighEnergy = visitorType === 'teens' || interest === 'active';
		const isFamilyKids = visitorType === 'family-kids';

		if (isOvernight) {
			return {
				packageId: 'stay-and-play',
				packageName: 'Park Activities & Accommodation',
				headline: 'The Grand Tērvete Nature & Glamping Escape',
				badge: 'Best For Overnight Getaways',
				recommendedParks: [
					'Anna Brigadere Park',
					'The Living Forest',
					'The Dwarf Village',
					'The Lakeside Haven'
				],
				reason:
					'With an overnight stay, you can pace your visit across 2 unforgettable days: explore the magical enchanted trails, bounce in the living forest canopy, and enjoy a lakeside sunset barbecue by your glamping pod.',
				priceEstimate: 'From €65 / night + activities'
			};
		} else if (isHighEnergy) {
			return {
				packageId: 'day-activities',
				packageName: 'Only park Activities (Active Pass)',
				headline: 'Adrenaline & High-Flying Adventure Day',
				badge: 'Best For Active Explorers',
				recommendedParks: [
					'The Living Forest (4m Elevated Nets)',
					'Anna Brigadere Park Trails',
					'The Lakeside Haven Watersports'
				],
				reason:
					'Focus your day on high-energy tree-top fun at The Living Forest, power through the pine forest trails, and hit the water with SUP board rentals at the reservoir.',
				priceEstimate: 'Approx. €17 - €20 / person'
			};
		} else if (isFamilyKids) {
			return {
				packageId: 'day-activities',
				packageName: 'Only park Activities (Family Day Pass)',
				headline: 'Fairytale & Dwarf Village Family Expedition',
				badge: 'Family Favorite (Toddlers & Kids)',
				recommendedParks: [
					'The Dwarf Village',
					'Anna Brigadere Park & Sprite Trail',
					'The Enchanted Train Ride',
					'The Quiet Trail'
				],
				reason:
					'Little legs will love the miniature dwarf houses, climbing into wooden castles, riding the electric train, and seeing exotic butterflies along the quiet trail.',
				priceEstimate: '€20 Family Pass (Free under 7)'
			};
		} else {
			return {
				packageId: 'day-activities',
				packageName: 'Only park Activities (Classic Pass)',
				headline: 'Scenic Pine Forest & Cultural Heritage Walk',
				badge: 'Relaxed Day Out',
				recommendedParks: [
					'Anna Brigadere Park & Wooden Sculptures',
					'The Quiet Trail',
					'The Lakeside Haven Walk'
				],
				reason:
					'A serene, restorative day immersed in clean pine air, authentic folklore art, and relaxing lakeside views.',
				priceEstimate: 'From €7.00 / adult'
			};
		}
	});
</script>

{#if isOpen}
	<div class="modal-backdrop" onclick={onClose} role="dialog" aria-modal="true">
		<div class="modal-card" onclick={(e) => e.stopPropagation()}>
			<!-- Modal Header -->
			<div class="modal-header">
				<div class="header-tag">
					<span>Trip Matchmaker</span>
				</div>
				<button class="btn-close" onclick={onClose} aria-label="Close modal">✕</button>
			</div>

			<!-- Progress Indicators -->
			<div class="wizard-progress">
				<div class="step-dot" class:active={currentStep === 1} class:done={currentStep > 1}>1</div>
				<div class="step-line" class:done={currentStep > 1}></div>
				<div class="step-dot" class:active={currentStep === 2} class:done={currentStep > 2}>2</div>
				<div class="step-line" class:done={currentStep > 2}></div>
				<div class="step-dot" class:active={currentStep === 3} class:done={currentStep > 3}>3</div>
				<div class="step-line" class:done={currentStep > 3}></div>
				<div class="step-dot" class:active={currentStep === 4}>Result</div>
			</div>

			<!-- Modal Body -->
			<div class="modal-body">
				<!-- Step 1: Who are you visiting with? -->
				{#if currentStep === 1}
					<div class="quiz-step">
						<span class="step-question-number">Question 1 of 3</span>
						<h3 class="step-title">Who is coming along on your visit?</h3>
						<p class="step-desc">
							This helps us tailor physical difficulty and age-appropriate attractions.
						</p>

						<div class="options-grid">
							<button class="option-card" onclick={() => handleVisitorSelect('family-kids')}>
								<div class="option-info">
									<strong class="option-title">Family with Kids</strong>
									<span class="option-sub">Toddlers, preschoolers & elementary age</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleVisitorSelect('teens')}>
								<div class="option-info">
									<strong class="option-title">Teens & Friends</strong>
									<span class="option-sub">High adrenaline, climbing & competitive fun</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleVisitorSelect('couple')}>
								<div class="option-info">
									<strong class="option-title">Couples or Solo</strong>
									<span class="option-sub">Peaceful walks, nature photography & romance</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleVisitorSelect('multigen')}>
								<div class="option-info">
									<strong class="option-title">Multi-Generation / Group</strong>
									<span class="option-sub">Grandparents, mixed ages & school trips</span>
								</div>
							</button>
						</div>
					</div>

					<!-- Step 2: How much time? -->
				{:else if currentStep === 2}
					<div class="quiz-step">
						<span class="step-question-number">Question 2 of 3</span>
						<h3 class="step-title">How much time do you want to spend?</h3>
						<p class="step-desc">Tērvete is huge (1,200 ha), so pace matters!</p>

						<div class="options-grid">
							<button class="option-card" onclick={() => handleDurationSelect('half-day')}>
								<div class="option-info">
									<strong class="option-title">Half Day (2 - 4 hours)</strong>
									<span class="option-sub">Quick highlight tour of 1 or 2 key zones</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleDurationSelect('full-day')}>
								<div class="option-info">
									<strong class="option-title">Full Day (5 - 8 hours)</strong>
									<span class="option-sub">Full immersion: trails, picnic, activities & train</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleDurationSelect('overnight')}>
								<div class="option-info">
									<strong class="option-title">Overnight / Weekend</strong>
									<span class="option-sub">Stay in lakeside glamping with multi-day park pass</span>
								</div>
							</button>
						</div>

						<button class="btn-step-back" onclick={() => (currentStep = 1)}>← Back</button>
					</div>

					<!-- Step 3: What excites you most? -->
				{:else if currentStep === 3}
					<div class="quiz-step">
						<span class="step-question-number">Question 3 of 3</span>
						<h3 class="step-title">What is your dream park experience?</h3>
						<p class="step-desc">Pick the vibe that makes your eyes light up.</p>

						<div class="options-grid">
							<button class="option-card" onclick={() => handleInterestSelect('fairytale')}>
								<div class="option-info">
									<strong class="option-title">Fairytales & Dwarfs</strong>
									<span class="option-sub">
										Wooden sculptures, tiny villages & folklore stories
									</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleInterestSelect('active')}>
								<div class="option-info">
									<strong class="option-title">Active Bouncing & Climbing</strong>
									<span class="option-sub">4-meter elevated net labyrinths & rope tracks</span>
								</div>
							</button>

							<button class="option-card" onclick={() => handleInterestSelect('relax')}>
								<div class="option-info">
									<strong class="option-title">Lakeside Chill & Nature</strong>
									<span class="option-sub">Boating, fishing piers, pine aroma & fresh air</span>
								</div>
							</button>
						</div>

						<button class="btn-step-back" onclick={() => (currentStep = 2)}>← Back</button>
					</div>

					<!-- Result Screen -->
				{:else if currentStep === 4}
					<div class="quiz-result">
						<div class="result-badge-top">
							<span class="badge-tag">{recommendation.badge}</span>
						</div>

						<h3 class="result-headline">{recommendation.headline}</h3>
						<p class="result-reason">{recommendation.reason}</p>

						<div class="result-box">
							<div class="result-box-header">
								<span class="result-box-label">Recommended Package:</span>
								<strong class="result-package-name">{recommendation.packageName}</strong>
							</div>

							<div class="result-parks-list">
								<span class="parks-list-label">Must-visit parks for your group:</span>
								<div class="parks-tags">
									{#each recommendation.recommendedParks as park (park)}
										<span class="park-tag">✓ {park}</span>
									{/each}
								</div>
							</div>

							<div class="result-estimate">
								<span>Estimated Price:</span>
								<strong>{recommendation.priceEstimate}</strong>
							</div>
						</div>

						<div class="result-actions">
							<button
								class="btn-result-book"
								onclick={() => {
									onClose();
									onSelectPackage(recommendation.packageId);
								}}
							>
								Book Recommended Package
							</button>
							<button class="btn-result-restart" onclick={restartQuiz}> Retake Quiz ↺ </button>
						</div>
					</div>
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
		padding: 20px;
		animation: fade-in 0.2s ease-out;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-card {
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 640px;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: var(--block-shadow);
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		padding: 20px 24px;
		border-bottom: var(--border-width) solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--bg-panel);
	}

	.header-tag {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		text-transform: uppercase;
		letter-spacing: 0.05em;
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
		transition: background var(--transition-fast);
	}

	.btn-close:hover {
		background: #ffeded;
	}

	.wizard-progress {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 24px;
		background: var(--bg-panel-light);
		border-bottom: 1px solid var(--border-subtle);
		gap: 8px;
	}

	.step-dot {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.78rem;
		font-weight: 800;
		color: var(--text-tertiary);
	}

	.step-dot.active {
		background: var(--border-bold);
		color: #ffffff;
	}

	.step-dot.done {
		background: var(--color-forest);
		color: #ffffff;
		border-color: var(--color-forest);
	}

	.step-line {
		width: 30px;
		height: 2px;
		background: var(--border-subtle);
	}

	.step-line.done {
		background: var(--color-forest);
	}

	.modal-body {
		padding: 28px 24px;
	}

	.step-question-number {
		display: block;
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-forest);
		margin-bottom: 6px;
	}

	.step-title {
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--border-bold);
		line-height: 1.25;
		margin-bottom: 6px;
	}

	.step-desc {
		font-size: 0.88rem;
		color: var(--text-secondary);
		margin-bottom: 20px;
	}

	.options-grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 20px;
	}

	.option-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 14px 18px;
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-md);
		text-align: left;
		box-shadow: 2px 2px 0 var(--border-bold);
		transition: all var(--transition-fast);
	}

	.option-card:hover {
		background: #f1f6f2;
		transform: translate(-1px, -1px);
		box-shadow: 4px 4px 0 var(--border-bold);
	}

	.option-icon {
		font-size: 1.8rem;
		flex-shrink: 0;
	}

	.option-info {
		display: flex;
		flex-direction: column;
	}

	.option-title {
		font-size: 0.98rem;
		color: var(--border-bold);
	}

	.option-sub {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.btn-step-back {
		font-size: 0.84rem;
		font-weight: 700;
		color: var(--text-secondary);
		padding: 6px 12px;
		border-radius: var(--radius-sm);
	}

	.btn-step-back:hover {
		color: var(--border-bold);
		text-decoration: underline;
	}

	/* Result Screen */
	.quiz-result {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.result-badge-top {
		margin-bottom: -4px;
	}

	.badge-tag {
		font-size: 0.76rem;
		font-weight: 800;
		text-transform: uppercase;
		background: #eef5f0;
		color: var(--color-forest);
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		border: 1px solid var(--status-open-border);
	}

	.result-headline {
		font-size: 1.45rem;
		font-weight: 800;
		color: var(--border-bold);
		line-height: 1.25;
	}

	.result-reason {
		font-size: 0.92rem;
		color: var(--text-secondary);
		line-height: 1.55;
	}

	.result-box {
		background: #f4f7f4;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-md);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.result-box-header {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.result-box-label {
		font-size: 0.74rem;
		font-weight: 800;
		text-transform: uppercase;
		color: var(--text-tertiary);
	}

	.result-package-name {
		font-size: 1.15rem;
		color: var(--border-bold);
	}

	.result-parks-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.parks-list-label {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.parks-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.park-tag {
		font-size: 0.78rem;
		font-weight: 700;
		background: #ffffff;
		border: 1px solid var(--border-bold);
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		color: var(--border-bold);
	}

	.result-estimate {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 10px;
		border-top: 1px solid #dce2dc;
		font-size: 0.88rem;
	}

	.result-estimate strong {
		font-size: 1rem;
		color: var(--color-forest);
	}

	.result-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 8px;
	}

	.btn-result-book {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		border: var(--border-width) solid var(--btn-primary-border);
		border-radius: var(--radius-pill);
		padding: 14px 26px;
		font-size: 1rem;
		font-weight: 800;
		box-shadow: var(--btn-shadow);
		transition: all var(--transition-fast);
	}

	.btn-result-book:hover {
		background: var(--btn-primary-hover);
		transform: translateY(-2px);
	}

	.btn-result-restart {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--text-secondary);
		padding: 8px;
	}

	.btn-result-restart:hover {
		color: var(--border-bold);
		text-decoration: underline;
	}
</style>
