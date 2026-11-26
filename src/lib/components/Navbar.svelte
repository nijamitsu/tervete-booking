<script>
	let { onOpenBooking, theme = 'lvm' } = $props();

	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<header class="navbar-wrapper">
	<div class="navbar-container">
		<!-- Brand / Logo -->
		<a href="#hero" class="brand" onclick={closeMenu}>
			{#if theme === 'lvm'}
				<div class="lvm-brand-group">
					<img src="/lvm-logo.svg" alt="Latvijas valsts meži" class="lvm-logo-img" />
					<div class="lvm-divider"></div>
					<div class="brand-text">
						<span class="brand-title">TĒRVETE</span>
						<span class="brand-subtitle">DABAS PARKS</span>
					</div>
				</div>
			{:else}
				<div class="brand-icon">
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 2L4 9h3v5H4l8 8 8-8h-3V9h3l-8-7z" />
					</svg>
				</div>
				<div class="brand-text">
					<span class="brand-title">TĒRVETE</span>
					<span class="brand-subtitle">PARK OF PARKS</span>
				</div>
			{/if}
		</a>

		<!-- Live status pill -->
		<div class="park-status-indicator">
			<span class="status-dot pulse"></span>
			<span class="status-label">Today: <strong>Open 09:00 – 17:00</strong></span>
		</div>

		<!-- Desktop Navigation Links -->
		<nav class="nav-links">
			<a href="#parks" class="nav-link">destinations</a>
			<a href="#getaways" class="nav-link">getaways</a>
			<a href="#pricing" class="nav-link">tickets</a>
			<a href="#info" class="nav-link">visitor info</a>
		</nav>

		<!-- Right Action Buttons -->
		<div class="nav-actions">
			<button class="btn-book" onclick={() => onOpenBooking()}>
				<span>Book Tickets</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</button>

			<!-- Mobile menu toggle -->
			<button class="mobile-toggle" aria-label="Toggle navigation menu" onclick={toggleMenu}>
				{#if mobileMenuOpen}
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				{:else}
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile dropdown -->
	{#if mobileMenuOpen}
		<div class="mobile-menu">
			<a href="#parks" class="mobile-link" onclick={closeMenu}>Destinations</a>
			<a href="#getaways" class="mobile-link" onclick={closeMenu}>Getaways & Stays</a>
			<a href="#pricing" class="mobile-link" onclick={closeMenu}>Tickets & Pricing</a>
			<a href="#info" class="mobile-link" onclick={closeMenu}>Visitor Guidelines</a>
			<button
				class="btn-book-mobile"
				onclick={() => {
					closeMenu();
					onOpenBooking();
				}}
			>
				Book Tickets Now
			</button>
		</div>
	{/if}
</header>

<style>
	.navbar-wrapper {
		background: var(--navbar-bg);
		border-bottom: var(--navbar-border);
		backdrop-filter: blur(8px);
		position: sticky;
		top: 0;
		z-index: 100;
		transition: all var(--transition-smooth);
	}

	.navbar-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
	}

	.lvm-brand-group {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.lvm-logo-img {
		height: 38px;
		width: auto;
		display: block;
	}

	.lvm-divider {
		width: 1px;
		height: 30px;
		background: var(--border-color);
	}

	.brand-icon {
		width: 38px;
		height: 38px;
		background: var(--color-forest);
		color: #ffffff;
		border-radius: var(--radius-sm);
		border: var(--border-width) solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--btn-shadow);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
	}

	.brand-title {
		font-weight: 800;
		font-size: 1.22rem;
		letter-spacing: -0.02em;
		color: var(--color-forest-dark);
		line-height: 1.1;
	}

	.brand-subtitle {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--color-forest);
	}

	.park-status-indicator {
		display: none;
		align-items: center;
		gap: 8px;
		background: var(--bg-surface);
		padding: 6px 14px;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--border-color);
		font-size: 0.8rem;
		box-shadow: var(--card-shadow);
	}

	@media (min-width: 900px) {
		.park-status-indicator {
			display: flex;
		}
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
	}

	.status-dot.pulse {
		animation: pulse-ring 2s infinite;
	}

	@keyframes pulse-ring {
		0% {
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
		}
		70% {
			box-shadow: 0 0 0 7px rgba(16, 185, 129, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
		}
	}

	.nav-links {
		display: none;
		align-items: center;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.nav-links {
			display: flex;
		}
	}

	.nav-link {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		padding: 6px 10px;
		border-radius: var(--radius-sm);
		transition: color var(--transition-fast);
	}

	.nav-link:hover {
		color: var(--color-forest);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn-book {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		padding: 9px 20px;
		font-size: 0.9rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--btn-primary-border);
		box-shadow: var(--btn-shadow);
		transition: all var(--transition-fast);
	}

	.btn-book:hover {
		background: var(--btn-primary-hover);
		transform: translateY(-1px);
	}

	.mobile-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 6px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
	}

	@media (min-width: 768px) {
		.mobile-toggle {
			display: none;
		}
	}

	.mobile-menu {
		background: var(--bg-surface);
		border-bottom: var(--navbar-border);
		padding: 18px 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		animation: slide-down 0.2s ease-out;
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-link {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text-primary);
		padding: 8px 0;
		border-bottom: 1px solid var(--border-subtle);
	}

	.btn-book-mobile {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		padding: 12px 20px;
		font-size: 1rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		text-align: center;
		margin-top: 6px;
	}
</style>
