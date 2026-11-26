<script>
	import Navbar from '#lib/components/Navbar.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import ParksGrid from '#lib/components/ParksGrid.svelte';
	import GetawaySection from '#lib/components/GetawaySection.svelte';
	import VisitorInfo from '#lib/components/VisitorInfo.svelte';
	import DecisionWizard from '#lib/components/DecisionWizard.svelte';
	import BookingModal from '#lib/components/BookingModal.svelte';
	import ParkDetailModal from '#lib/components/ParkDetailModal.svelte';
	import { PARKS_DATA, GETAWAYS_DATA } from '#lib/data/parks.js';

	// Active Theme: 'lvm' (default, https://atputa.lvm.lv style) or 'wireframe' (original preserved style)
	let theme = $state('lvm');

	// Canvas frame view mode: 'full' (modern web) or 'framed' (wireframe artboard frame)
	let frameMode = $state('full');

	// Modals and interactive state
	let isDecisionWizardOpen = $state(false);
	let isBookingModalOpen = $state(false);
	let bookingInitialPackage = $state('day-activities');

	let selectedParkForDetail = $state(null);
	let isParkDetailModalOpen = $state(false);

	function openDecisionWizard() {
		isDecisionWizardOpen = true;
	}

	function closeDecisionWizard() {
		isDecisionWizardOpen = false;
	}

	function openBooking(packageId = 'day-activities') {
		bookingInitialPackage = packageId;
		isBookingModalOpen = true;
	}

	function closeBooking() {
		isBookingModalOpen = false;
	}

	function handleSelectPark(park) {
		selectedParkForDetail = park;
		isParkDetailModalOpen = true;
	}

	function closeParkDetail() {
		isParkDetailModalOpen = false;
		selectedParkForDetail = null;
	}

	function handleSelectGetaway(getaway) {
		bookingInitialPackage = getaway.id;
		isBookingModalOpen = true;
	}
</script>

<div class="landing-page-root" data-theme={theme} class:frame-layout={frameMode === 'framed'}>
	<!-- Style & Theme Switcher Bar (Preserves original wireframe style & toggles LVM style) -->
	<aside class="canvas-control-bar" aria-label="Style and layout switcher">
		<div class="canvas-meta">
			<div class="brand-tag-group">
				<span class="active-style-pill">
					{theme === 'lvm' ? '🌲 LVM Nature Style' : '📐 Wireframe Style'}
				</span>
				<span class="meta-desc">
					{theme === 'lvm'
						? 'Styled according to atputa.lvm.lv design system'
						: 'Original wireframe layout preserved'}
				</span>
			</div>
		</div>

		<div class="controls-group">
			<!-- Theme Switcher -->
			<div class="theme-switcher-pill" title="Toggle between LVM and Wireframe styles">
				<button
					class="btn-switch-theme"
					class:active={theme === 'lvm'}
					onclick={() => {
						theme = 'lvm';
						if (frameMode === 'framed') frameMode = 'full';
					}}
				>
					<span>🌲 LVM Official</span>
				</button>
				<button
					class="btn-switch-theme"
					class:active={theme === 'wireframe'}
					onclick={() => {
						theme = 'wireframe';
						frameMode = 'framed';
					}}
				>
					<span>📐 Wireframe</span>
				</button>
			</div>

			<!-- Frame Mode Switcher -->
			<div class="frame-switcher-pill" title="Toggle viewport frame">
				<button
					class="btn-toggle-frame"
					class:active={frameMode === 'full'}
					onclick={() => (frameMode = 'full')}
				>
					<span>Full</span>
				</button>
				<button
					class="btn-toggle-frame"
					class:active={frameMode === 'framed'}
					onclick={() => (frameMode = 'framed')}
				>
					<span>Frame</span>
				</button>
			</div>
		</div>
	</aside>

	<!-- Main Single Page Canvas -->
	<main class="page-canvas">
		<!-- 1. Top Navbar -->
		<Navbar onOpenBooking={() => openBooking('day-activities')} {theme} />

		<!-- 2. Hero Section -->
		<Hero />

		<!-- 3. Explore the Parks (6 parks grid) -->
		<ParksGrid parks={PARKS_DATA} onSelectPark={handleSelectPark} />

		<!-- 4. Find your perfect getaway (Day activities vs Accommodation + "help me decide") -->
		<GetawaySection
			getaways={GETAWAYS_DATA}
			onSelectGetaway={handleSelectGetaway}
			onHelpMeDecide={openDecisionWizard}
		/>

		<!-- 5. Practical Info, FAQ & Footer -->
		<VisitorInfo />
	</main>

	<!-- Interactive Modals -->
	<DecisionWizard
		isOpen={isDecisionWizardOpen}
		onClose={closeDecisionWizard}
		onSelectPackage={(pkgId) => openBooking(pkgId)}
	/>

	<BookingModal
		isOpen={isBookingModalOpen}
		initialPackageId={bookingInitialPackage}
		onClose={closeBooking}
	/>

	<ParkDetailModal
		park={selectedParkForDetail}
		isOpen={isParkDetailModalOpen}
		onClose={closeParkDetail}
	/>
</div>

<style>
	.landing-page-root {
		min-height: 100vh;
		background: var(--bg-canvas);
		transition:
			background var(--transition-smooth),
			padding var(--transition-smooth);
	}

	/* Control bar */
	.canvas-control-bar {
		max-width: 1240px;
		margin: 0 auto;
		padding: 10px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}

	.canvas-meta {
		display: flex;
		align-items: center;
	}

	.brand-tag-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.active-style-pill {
		font-size: 0.76rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--color-forest-light);
		color: var(--color-forest);
		border: 1px solid var(--border-color);
		padding: 3px 10px;
		border-radius: var(--radius-pill);
	}

	.meta-desc {
		font-size: 0.8rem;
		color: var(--text-tertiary);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.meta-desc {
			display: none;
		}
	}

	.controls-group {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.theme-switcher-pill,
	.frame-switcher-pill {
		display: flex;
		align-items: center;
		gap: 2px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-pill);
		padding: 3px;
		box-shadow: var(--card-shadow);
	}

	.btn-switch-theme,
	.btn-toggle-frame {
		font-size: 0.78rem;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.btn-switch-theme.active,
	.btn-toggle-frame.active {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		box-shadow: var(--btn-shadow);
	}

	.btn-switch-theme:hover:not(.active),
	.btn-toggle-frame:hover:not(.active) {
		color: var(--text-primary);
		background: var(--bg-panel-light);
	}

	/* Main Page Canvas */
	.page-canvas {
		background: var(--bg-canvas);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	/* When framed */
	.frame-layout {
		padding: 0 16px 36px;
	}

	.frame-layout .page-canvas {
		max-width: 1240px;
		margin: 0 auto;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		box-shadow: var(--block-shadow);
		overflow: hidden;
	}

	@media (max-width: 768px) {
		.frame-layout {
			padding: 0;
		}

		.frame-layout .page-canvas {
			border: none;
			border-radius: 0;
			box-shadow: none;
		}
	}
</style>
