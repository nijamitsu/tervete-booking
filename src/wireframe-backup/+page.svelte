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

	// Modals and interactive state
	let isDecisionWizardOpen = $state(false);
	let isBookingModalOpen = $state(false);
	let bookingInitialPackage = $state('day-activities');

	let selectedParkForDetail = $state(null);
	let isParkDetailModalOpen = $state(false);

	// Wireframe canvas frame mode (can toggle framed wireframe layout vs full-bleed layout)
	let frameMode = $state('framed'); // 'framed' | 'full'

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

	function handleBookPark(park) {
		bookingInitialPackage = park.id === 6 ? 'stay-and-play' : 'day-activities';
		isBookingModalOpen = true;
	}

	function handleSelectGetaway(getaway) {
		bookingInitialPackage = getaway.id;
		isBookingModalOpen = true;
	}
</script>

<div class="landing-page-root" class:frame-layout={frameMode === 'framed'}>
	<!-- Top Bar Layout Switcher (Convenient for user testing) -->
	<aside class="canvas-control-bar" aria-label="Layout view switcher">
		<div class="canvas-meta">
			<span class="artboard-tag">main</span>
			<span class="meta-desc">Tērvete Entertainment Park • Single-Page Landing View</span>
		</div>
		<div class="canvas-toggles">
			<button
				class="btn-toggle-view"
				class:active={frameMode === 'framed'}
				onclick={() => (frameMode = 'framed')}
				title="View in wireframe artboard frame"
			>
				<span>📱 Wireframe Frame</span>
			</button>
			<button
				class="btn-toggle-view"
				class:active={frameMode === 'full'}
				onclick={() => (frameMode = 'full')}
				title="View in full responsive layout"
			>
				<span>🖥️ Full Bleed</span>
			</button>
		</div>
	</aside>

	<!-- Main Single Page Canvas -->
	<main class="page-canvas">
		<!-- 1. Top Navbar (wireframe top gray block) -->
		<Navbar onOpenBooking={() => openBooking('day-activities')} />

		<!-- 2. Hero Section -->
		<Hero />

		<!-- 3. Explore the Parks (wireframe gray container with 3x2 grid and hover interaction) -->
		<ParksGrid parks={PARKS_DATA} onSelectPark={handleSelectPark} onBookPark={handleBookPark} />

		<!-- 4. Find your perfect gettaway (wireframe two cards with "+" buttons and "help me decide") -->
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
		onBookPark={handleBookPark}
	/>
</div>

<style>
	.landing-page-root {
		min-height: 100vh;
		background: #eef1ee;
		transition: padding var(--transition-smooth);
	}

	/* Top Artboard Metadata Bar matching the wireframe's "main" tag */
	.canvas-control-bar {
		max-width: 1280px;
		margin: 0 auto;
		padding: 12px 24px 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.canvas-meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.artboard-tag {
		font-family: monospace;
		font-size: 0.78rem;
		font-weight: 800;
		color: #2b332d;
		background: #d4dad4;
		border: 1.5px solid var(--border-bold);
		padding: 2px 8px;
		border-radius: 4px;
		box-shadow: 1px 1px 0 var(--border-bold);
	}

	.meta-desc {
		font-size: 0.8rem;
		color: var(--text-secondary);
		font-weight: 600;
	}

	@media (max-width: 640px) {
		.meta-desc {
			display: none;
		}
	}

	.canvas-toggles {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-pill);
		padding: 3px;
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.btn-toggle-view {
		font-size: 0.78rem;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: var(--radius-pill);
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.btn-toggle-view.active {
		background: var(--border-bold);
		color: #ffffff;
	}

	/* Main Page Canvas */
	.page-canvas {
		background: var(--bg-canvas);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	/* When in framed mode on large screens, wraps into a rounded wireframe border */
	.frame-layout {
		padding: 0 16px 36px;
	}

	.frame-layout .page-canvas {
		max-width: 1280px;
		margin: 0 auto;
		border: 2px solid var(--border-bold);
		border-radius: 20px;
		box-shadow: 8px 8px 0 rgba(26, 30, 27, 0.85);
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
