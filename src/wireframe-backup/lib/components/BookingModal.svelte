<script>
	let { isOpen, initialPackageId = 'day-activities', onClose } = $props();

	let packageType = $state(initialPackageId);
	let selectedDate = $state(getTodayIsoDate());
	let adultsCount = $state(2);
	let kidsCount = $state(1);
	let underSixCount = $state(0);
	let addNetPark = $state(false);
	let addTrain = $state(false);
	let glampingNights = $state(1);

	// Checkout state
	let isConfirmed = $state(false);
	let guestName = $state('');
	let guestEmail = $state('');
	let guestPhone = $state('');

	$effect(() => {
		if (initialPackageId) {
			packageType = initialPackageId;
		}
	});

	function getTodayIsoDate() {
		const today = new Date();
		return today.toISOString().split('T')[0];
	}

	// Dynamic calculation
	let totalPrice = $derived.by(() => {
		let total = 0;
		if (packageType === 'day-activities') {
			// Adult €7, Kids €5.50, Under 6 Free
			total += adultsCount * 7.0;
			total += kidsCount * 5.5;
			if (addNetPark) {
				total += (adultsCount + kidsCount) * 10.0;
			}
			if (addTrain) {
				total += (adultsCount + kidsCount + underSixCount) * 1.5;
			}
		} else {
			// Stay & Play package: Glamping starts at €65/night + park entry included for up to 4
			total += glampingNights * 65.0;
			if (addNetPark) {
				total += (adultsCount + kidsCount) * 8.0; // discounted for overnight guests
			}
		}
		return total.toFixed(2);
	});

	function handleConfirmBooking(e) {
		e.preventDefault();
		if (!guestName || !guestEmail) {
			alert('Please enter your name and email to receive ticket vouchers.');
			return;
		}
		isConfirmed = true;
	}

	function resetBooking() {
		isConfirmed = false;
		guestName = '';
		guestEmail = '';
		guestPhone = '';
		onClose();
	}
</script>

{#if isOpen}
	<div class="modal-backdrop" onclick={onClose} role="dialog" aria-modal="true">
		<div class="booking-dialog" onclick={(e) => e.stopPropagation()}>
			<!-- Dialog Header -->
			<div class="dialog-header">
				<div class="dialog-title-group">
					<h3 class="dialog-title">Tērvete Ticket & Getaway Booking</h3>
					<span class="dialog-sub">Instant confirmation • Free cancellation up to 24h prior</span>
				</div>
				<button class="btn-dialog-close" onclick={onClose} aria-label="Close booking">✕</button>
			</div>

			{#if !isConfirmed}
				<div class="dialog-body">
					<!-- Package Switcher Tabs -->
					<div class="package-tabs">
						<button
							class="pkg-tab"
							class:active={packageType === 'day-activities'}
							onclick={() => (packageType = 'day-activities')}
						>
							<div class="tab-text">
								<strong>Only park Activities</strong>
								<span>Single-day access from €7</span>
							</div>
						</button>

						<button
							class="pkg-tab"
							class:active={packageType === 'stay-and-play'}
							onclick={() => (packageType = 'stay-and-play')}
						>
							<div class="tab-text">
								<strong>Activities & Accommodation</strong>
								<span>Glamping escape from €65</span>
							</div>
						</button>
					</div>

					<form onsubmit={handleConfirmBooking} class="booking-form">
						<!-- Date Picker -->
						<div class="form-section">
							<label for="visit-date" class="section-label">1. Choose Date of Visit</label>
							<div class="date-picker-wrap">
								<input
									id="visit-date"
									type="date"
									min={getTodayIsoDate()}
									bind:value={selectedDate}
									class="input-date"
								/>
								<span class="date-badge">✓ Valid all day</span>
							</div>
						</div>

						<!-- Guests Counter -->
						<div class="form-section">
							<label class="section-label">2. Select Visitors</label>
							<div class="counters-grid">
								<div class="counter-card">
									<div class="counter-label">
										<strong>Adults</strong>
										<span>{packageType === 'day-activities' ? '€7.00 each' : 'Included'}</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											onclick={() => adultsCount > 1 && adultsCount--}
										>
											−
										</button>
										<span class="counter-num">{adultsCount}</span>
										<button
											type="button"
											class="btn-counter"
											onclick={() => adultsCount < 10 && adultsCount++}
										>
											+
										</button>
									</div>
								</div>

								<div class="counter-card">
									<div class="counter-label">
										<strong>Children (7–17 yrs) / Students</strong>
										<span>{packageType === 'day-activities' ? '€5.50 each' : 'Included'}</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											onclick={() => kidsCount > 0 && kidsCount--}
										>
											−
										</button>
										<span class="counter-num">{kidsCount}</span>
										<button
											type="button"
											class="btn-counter"
											onclick={() => kidsCount < 10 && kidsCount++}
										>
											+
										</button>
									</div>
								</div>

								<div class="counter-card">
									<div class="counter-label">
										<strong>Kids under 7</strong>
										<span class="free-badge">FREE Entry</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											onclick={() => underSixCount > 0 && underSixCount--}
										>
											−
										</button>
										<span class="counter-num">{underSixCount}</span>
										<button
											type="button"
											class="btn-counter"
											onclick={() => underSixCount < 10 && underSixCount++}
										>
											+
										</button>
									</div>
								</div>
							</div>
						</div>

						<!-- Glamping specific: Nights count -->
						{#if packageType === 'stay-and-play'}
							<div class="form-section">
								<label class="section-label">3. Glamping Pod Duration</label>
								<div class="glamping-selector">
									<div class="glamping-info">
										<strong>Lakeside Eco-Pod (Sleeps 4)</strong>
										<span>Includes multi-day passes, boat rental & campfire wood</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											onclick={() => glampingNights > 1 && glampingNights--}
										>
											−
										</button>
										<span class="counter-num">
											{glampingNights}
											{glampingNights === 1 ? 'night' : 'nights'}
										</span>
										<button
											type="button"
											class="btn-counter"
											onclick={() => glampingNights < 14 && glampingNights++}
										>
											+
										</button>
									</div>
								</div>
							</div>
						{/if}

						<!-- Add-ons -->
						<div class="form-section">
							<label class="section-label">
								{packageType === 'stay-and-play' ? '4' : '3'}. Popular Add-ons
							</label>
							<div class="addons-list">
								<label class="addon-option">
									<input type="checkbox" bind:checked={addNetPark} />
									<div class="addon-desc">
										<strong>Tērvete Net Park (55-min jump session)</strong>
										<span>
											{packageType === 'stay-and-play'
												? '+€8/guest (lodging discount)'
												: '+€10/guest'}
										</span>
									</div>
								</label>

								<label class="addon-option">
									<input type="checkbox" bind:checked={addTrain} />
									<div class="addon-desc">
										<strong>Fairytale Electric Train Ride</strong>
										<span>+€1.50 per passenger one-way</span>
									</div>
								</label>
							</div>
						</div>

						<!-- Contact Details -->
						<div class="form-section">
							<label class="section-label">
								{packageType === 'stay-and-play' ? '5' : '4'}. Guest Information
							</label>
							<div class="inputs-grid">
								<div class="input-field">
									<label for="guest-name">Full Name *</label>
									<input
										id="guest-name"
										type="text"
										required
										placeholder="e.g. Roberts Kalniņš"
										bind:value={guestName}
									/>
								</div>
								<div class="input-field">
									<label for="guest-email">Email Address *</label>
									<input
										id="guest-email"
										type="email"
										required
										placeholder="tickets@example.com"
										bind:value={guestEmail}
									/>
								</div>
								<div class="input-field">
									<label for="guest-phone">Phone Number</label>
									<input
										id="guest-phone"
										type="tel"
										placeholder="+371 20000000"
										bind:value={guestPhone}
									/>
								</div>
							</div>
						</div>

						<!-- Bottom Summary & Checkout Button -->
						<div class="dialog-footer">
							<div class="total-block">
								<span class="total-label">Total to pay on arrival or online:</span>
								<div class="total-amount">
									<span class="currency">€</span>
									<span class="value">{totalPrice}</span>
								</div>
							</div>

							<button type="submit" class="btn-checkout">
								<span>Complete Reservation</span>
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
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</button>
						</div>
					</form>
				</div>
			{:else}
				<!-- Booking Confirmation Screen -->
				<div class="confirmation-view">
					<div class="conf-badge-pill">Reservation Confirmed</div>
					<h3 class="conf-title">Reservation Confirmed!</h3>
					<p class="conf-message">
						Thank you, <strong>{guestName}</strong>! Your booking confirmation and QR codes have
						been prepared for <strong>{guestEmail}</strong>.
					</p>

					<div class="conf-summary-card">
						<div class="summary-line">
							<span>Package:</span>
							<strong>
								{packageType === 'day-activities'
									? 'Only park Activities'
									: 'Park Activities & Accommodation'}
							</strong>
						</div>
						<div class="summary-line">
							<span>Date of Visit:</span>
							<strong>{selectedDate}</strong>
						</div>
						<div class="summary-line">
							<span>Visitors:</span>
							<strong>{adultsCount} Adults, {kidsCount} Kids ({underSixCount} under 6)</strong>
						</div>
						{#if packageType === 'stay-and-play'}
							<div class="summary-line">
								<span>Glamping Stay:</span>
								<strong>{glampingNights} Night(s) Lakeside Pod</strong>
							</div>
						{/if}
						<div class="summary-line total-highlight">
							<span>Total Price:</span>
							<strong>€{totalPrice}</strong>
						</div>
					</div>

					<div class="conf-barcode-mock">
						<span class="qr-label">
							Booking Reference: TRV-{Math.floor(100000 + Math.random() * 900000)}
						</span>
						<div class="barcode-lines">||||| | |||| || ||||| | ||| |||| ||||| ||| ||||</div>
						<span class="qr-sub">Show at main ticket booth or park gate for direct entry</span>
					</div>

					<button class="btn-finish" onclick={resetBooking}> Done & Return to Homepage </button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(18, 24, 20, 0.75);
		backdrop-filter: blur(4px);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
	}

	.booking-dialog {
		background: #ffffff;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 720px;
		max-height: 92vh;
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
		align-items: center;
		justify-content: space-between;
	}

	.dialog-title {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--border-bold);
		line-height: 1.2;
	}

	.dialog-sub {
		font-size: 0.78rem;
		color: var(--color-forest);
		font-weight: 600;
	}

	.btn-dialog-close {
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

	.btn-dialog-close:hover {
		background: #ffeded;
	}

	.dialog-body {
		padding: 24px;
	}

	.package-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: 24px;
	}

	@media (max-width: 580px) {
		.package-tabs {
			grid-template-columns: 1fr;
		}
	}

	.pkg-tab {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		background: #f6f8f6;
		border: 2px solid var(--border-subtle);
		border-radius: var(--radius-md);
		text-align: left;
		transition: all var(--transition-fast);
	}

	.pkg-tab:hover {
		background: #edf2ed;
		border-color: var(--border-bold);
	}

	.pkg-tab.active {
		background: #ffffff;
		border-color: var(--border-bold);
		box-shadow: 3px 3px 0 var(--border-bold);
	}

	.tab-icon {
		font-size: 1.6rem;
		flex-shrink: 0;
	}

	.tab-text {
		display: flex;
		flex-direction: column;
	}

	.tab-text strong {
		font-size: 0.95rem;
		color: var(--border-bold);
	}

	.tab-text span {
		font-size: 0.78rem;
		color: var(--text-secondary);
	}

	.form-section {
		margin-bottom: 22px;
	}

	.section-label {
		display: block;
		font-size: 0.88rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--border-bold);
		margin-bottom: 10px;
	}

	.date-picker-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.input-date {
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
		padding: 10px 16px;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-md);
		background: #ffffff;
	}

	.date-badge {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--color-forest);
		background: #eef5f0;
		padding: 4px 10px;
		border-radius: var(--radius-pill);
	}

	.counters-grid {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.counter-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		background: #fbfcfb;
		border: 1.5px solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.counter-label {
		display: flex;
		flex-direction: column;
	}

	.counter-label strong {
		font-size: 0.95rem;
		color: var(--border-bold);
	}

	.counter-label span {
		font-size: 0.78rem;
		color: var(--text-tertiary);
	}

	.free-badge {
		color: var(--color-forest) !important;
		font-weight: 800;
	}

	.counter-ctrls {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn-counter {
		width: 32px;
		height: 32px;
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: 50%;
		font-size: 1.1rem;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--border-bold);
		box-shadow: 1px 1px 0 var(--border-bold);
		transition: background var(--transition-fast);
	}

	.btn-counter:hover {
		background: #edf2ed;
	}

	.counter-num {
		font-size: 1.05rem;
		font-weight: 800;
		min-width: 24px;
		text-align: center;
	}

	.glamping-selector {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		background: #eef5f0;
		border: 1.5px solid var(--status-open-border);
		border-radius: var(--radius-md);
	}

	.glamping-info {
		display: flex;
		flex-direction: column;
	}

	.glamping-info strong {
		font-size: 0.95rem;
		color: var(--color-forest);
	}

	.glamping-info span {
		font-size: 0.78rem;
		color: var(--text-secondary);
	}

	.addons-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.addon-option {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 14px;
		background: #ffffff;
		border: 1.5px solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
	}

	.addon-option input[type='checkbox'] {
		width: 18px;
		height: 18px;
		accent-color: var(--border-bold);
	}

	.addon-desc {
		display: flex;
		flex-direction: column;
	}

	.addon-desc strong {
		font-size: 0.88rem;
		color: var(--border-bold);
	}

	.addon-desc span {
		font-size: 0.78rem;
		color: var(--color-forest);
		font-weight: 600;
	}

	.inputs-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	@media (max-width: 680px) {
		.inputs-grid {
			grid-template-columns: 1fr;
		}
	}

	.input-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.input-field label {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.input-field input {
		font-family: inherit;
		font-size: 0.9rem;
		padding: 10px 12px;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-sm);
	}

	.dialog-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 18px;
		border-top: 2px solid var(--border-bold);
		margin-top: 20px;
	}

	.total-block {
		display: flex;
		flex-direction: column;
	}

	.total-label {
		font-size: 0.76rem;
		font-weight: 700;
		color: var(--text-tertiary);
		text-transform: uppercase;
	}

	.total-amount {
		display: flex;
		align-items: baseline;
		gap: 2px;
		font-weight: 800;
		color: var(--border-bold);
	}

	.currency {
		font-size: 1.2rem;
	}

	.value {
		font-size: 1.85rem;
	}

	.btn-checkout {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--border-bold);
		color: #ffffff;
		padding: 14px 28px;
		font-size: 1rem;
		font-weight: 800;
		border-radius: var(--radius-pill);
		border: 2px solid var(--border-bold);
		box-shadow: 3px 3px 0 var(--border-bold);
		transition: all var(--transition-fast);
	}

	.btn-checkout:hover {
		background: var(--color-forest);
		transform: translateY(-2px);
		box-shadow: 5px 5px 0 var(--border-bold);
	}

	/* Confirmation View */
	.confirmation-view {
		padding: 36px 24px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.conf-icon {
		font-size: 3rem;
		margin-bottom: 12px;
	}

	.conf-title {
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--border-bold);
		margin-bottom: 10px;
	}

	.conf-message {
		font-size: 0.95rem;
		color: var(--text-secondary);
		max-width: 480px;
		margin-bottom: 24px;
		line-height: 1.5;
	}

	.conf-summary-card {
		background: #f6f8f6;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-md);
		padding: 20px 24px;
		width: 100%;
		max-width: 440px;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 20px;
	}

	.summary-line {
		display: flex;
		justify-content: space-between;
		font-size: 0.88rem;
		color: var(--text-secondary);
	}

	.summary-line strong {
		color: var(--border-bold);
	}

	.summary-line.total-highlight {
		border-top: 1px dashed var(--border-bold);
		padding-top: 8px;
		margin-top: 4px;
		font-size: 1rem;
	}

	.summary-line.total-highlight strong {
		color: var(--color-forest);
		font-size: 1.2rem;
	}

	.conf-barcode-mock {
		background: #ffffff;
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-sm);
		padding: 14px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		margin-bottom: 24px;
	}

	.qr-label {
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		color: var(--border-bold);
	}

	.barcode-lines {
		font-family: monospace;
		font-size: 1.1rem;
		letter-spacing: 4px;
		color: var(--border-bold);
	}

	.qr-sub {
		font-size: 0.72rem;
		color: var(--text-tertiary);
	}

	.btn-finish {
		background: var(--border-bold);
		color: #ffffff;
		border: 2px solid var(--border-bold);
		padding: 12px 28px;
		font-size: 0.95rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		box-shadow: 3px 3px 0 var(--border-bold);
	}

	.btn-finish:hover {
		background: var(--color-forest);
	}
</style>
