<script>
	const DAY_PASSES = [
		{
			id: 'discovery',
			name: 'Discovery Pass',
			subtitle: 'Explore at your own pace.',
			adultPrice: 7.0,
			childPrice: 5.5,
			includedTrainRides: 0,
			features: [
				{ symbol: '✓', text: 'Access to all six parks' },
				{ symbol: '✓', text: 'All included activities' },
				{ symbol: '+', text: 'Premium activities sold separately' }
			]
		},
		{
			id: 'discovery-plus',
			name: 'Discovery Plus',
			subtitle: 'Add something special.',
			badge: 'Popular',
			adultPrice: 19.0,
			childPrice: 15.0,
			includedTrainRides: 3,
			features: [
				{ symbol: '✓', text: 'Access to all six parks' },
				{ symbol: '✓', text: 'All included activities' },
				{ symbol: '✓', text: '3 premium activities of your choice' },
				{ symbol: '✓', text: '3 Fairytale Train rides included' }
			]
		},
		{
			id: 'unlimited',
			name: 'Unlimited Pass',
			subtitle: 'Make the most of your day.',
			adultPrice: 29.0,
			childPrice: 22.0,
			includedTrainRides: 3,
			features: [
				{ symbol: '✓', text: 'Access to all six parks' },
				{ symbol: '✓', text: 'All included activities' },
				{ symbol: '✓', text: 'All eligible premium activities' },
				{ symbol: '✓', text: '3 Fairytale Train rides included' }
			]
		}
	];

	const ACCOMMODATION_OPTIONS = [
		{
			id: 'tent',
			name: 'Campsite',
			subtitle: 'Bring your own tent to the lakeside campsite.',
			image: 'campsite.jpg',
			imagePosition: 'center',
			pricePerNight: 13.0,
			includesParkEntry: false,
			includedTrainRides: 0,
			maxGuests: null,
			features: [
				{ symbol: '✓', text: 'Landscaped lakeside tent pitch' },
				{ symbol: '✓', text: 'Campfire, grill & picnic access' },
				{ symbol: '✓', text: 'Shared shower & WC facilities' },
				{ symbol: '+', text: 'Park admission added per guest' }
			]
		},
		{
			id: 'treehouse',
			name: 'Treehouses',
			subtitle: 'Heated pine-canopy cabin overlooking the lake.',
			image: '/treehouses.jpg',
			imagePosition: 'center 35%',
			badge: 'Popular',
			pricePerNight: 150.0,
			includesParkEntry: true,
			includedTrainRides: 3,
			maxGuests: 4,
			features: [
				{ symbol: '✓', text: 'Sleeps up to 4 • private bath & kitchen' },
				{ symbol: '✓', text: 'Tērvete park entry included for guests' },
				{ symbol: '✓', text: '3 premium activities of your choice' },
				{ symbol: '✓', text: '3 Fairytale Train rides included' },
				{ symbol: '✓', text: 'Private terrace grill & heating' }
			]
		},
		{
			id: 'underground',
			name: 'Underground Cabins',
			subtitle: 'Cozy fairytale earth cabin on a single level.',
			image: '/underground-cabins.jpg',
			imagePosition: 'center 55%',
			pricePerNight: 145.0,
			includesParkEntry: true,
			includedTrainRides: 3,
			maxGuests: 4,
			features: [
				{ symbol: '✓', text: 'Sleeps up to 4 • wheelchair accessible' },
				{ symbol: '✓', text: 'Tērvete park entry included for guests' },
				{ symbol: '✓', text: '3 premium activities of your choice' },
				{ symbol: '✓', text: '3 Fairytale Train rides included' },
				{ symbol: '✓', text: 'Private bath, kitchen & terrace grill' }
			]
		}
	];

	const EXTRA_SERVICES = [
		{
			id: 'train',
			title: 'Fairytale Train',
			description: 'Move easily between worlds.',
			priceLabel: '+€1.50/person per ride',
			price: 1.5,
			perGuest: true,
			includeUnderSix: true,
			includedInUnlimited: false,
			isCounter: true
		},
		{
			id: 'meals',
			title: 'Food & Meal Plans',
			description: 'Enjoy a meal during your adventure.',
			priceLabel: '+€12/guest',
			price: 12.0,
			perGuest: true,
			includedInUnlimited: false
		},
		{
			id: 'equipment',
			title: 'Equipment Rental',
			description: 'Find everything you need to explore.',
			priceLabel: '+€8/guest',
			price: 8.0,
			perGuest: true,
			includedInUnlimited: false
		},
		{
			id: 'picnic',
			title: 'Picnic & BBQ Areas',
			description: 'Enjoy your own space in nature.',
			priceLabel: '+€15 / reservation',
			price: 15.0,
			perGuest: false,
			includedInUnlimited: false
		},
		{
			id: 'parking',
			title: 'Parking',
			description: 'Plan your arrival.',
			priceLabel: '+€5 / vehicle',
			price: 5.0,
			perGuest: false,
			includedInUnlimited: true
		},
		{
			id: 'explorerKit',
			title: 'Explorer Kits',
			description: 'More ways to discover the park.',
			priceLabel: '+€6 / kit',
			price: 6.0,
			perGuest: false,
			includedInUnlimited: false
		}
	];

	let { isOpen, initialPackageId = 'day-activities', onClose } = $props();

	let packageType = $state(initialPackageId);
	let selectedPassId = $state('discovery-plus');
	let selectedPass = $derived(DAY_PASSES.find((p) => p.id === selectedPassId) ?? DAY_PASSES[0]);
	let selectedAccommodationId = $state('treehouse');
	let selectedAccommodation = $derived(
		ACCOMMODATION_OPTIONS.find((a) => a.id === selectedAccommodationId) ?? ACCOMMODATION_OPTIONS[1]
	);
	let selectedDate = $state(getTodayIsoDate());
	let checkInDate = $state(getTodayIsoDate());
	let checkOutDate = $state(addDaysIso(getTodayIsoDate(), 1));
	let adultsCount = $state(2);
	let kidsCount = $state(1);
	let underSixCount = $state(0);
	let extraTrainRides = $state(0);
	let selectedExtras = $state({
		meals: false,
		equipment: false,
		picnic: false,
		parking: false,
		explorerKit: false
	});

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

	$effect(() => {
		if (checkInDate && (!checkOutDate || checkOutDate <= checkInDate)) {
			checkOutDate = addDaysIso(checkInDate, 1);
		}
	});

	function getTodayIsoDate() {
		const today = new Date();
		return today.toISOString().split('T')[0];
	}

	function addDaysIso(isoDate, days) {
		const timestamp = Date.parse(`${isoDate}T00:00:00Z`) + days * 86400000;
		return new Date(timestamp).toISOString().split('T')[0];
	}

	let stayNights = $derived.by(() => {
		if (!checkInDate || !checkOutDate) return 1;
		const inMs = Date.parse(`${checkInDate}T00:00:00Z`);
		const outMs = Date.parse(`${checkOutDate}T00:00:00Z`);
		return Math.max(1, Math.round((outMs - inMs) / 86400000));
	});

	let totalGuests = $derived(adultsCount + kidsCount + underSixCount);
	let cabinMaxGuests = $derived(
		packageType === 'stay-and-play' ? (selectedAccommodation.maxGuests ?? null) : null
	);
	let isAtCabinCapacity = $derived(cabinMaxGuests !== null && totalGuests >= cabinMaxGuests);
	let includedTrainRides = $derived(
		packageType === 'day-activities'
			? (selectedPass.includedTrainRides ?? 0)
			: (selectedAccommodation.includedTrainRides ?? 0)
	);
	let totalTrainRides = $derived(includedTrainRides + extraTrainRides);

	$effect(() => {
		if (cabinMaxGuests !== null && adultsCount + kidsCount + underSixCount > cabinMaxGuests) {
			let excess = adultsCount + kidsCount + underSixCount - cabinMaxGuests;
			if (underSixCount > 0) {
				const cut = Math.min(underSixCount, excess);
				underSixCount -= cut;
				excess -= cut;
			}
			if (excess > 0 && kidsCount > 0) {
				const cut = Math.min(kidsCount, excess);
				kidsCount -= cut;
				excess -= cut;
			}
			if (excess > 0 && adultsCount > 1) {
				adultsCount = Math.max(1, adultsCount - excess);
			}
		}
	});

	function isExtraIncluded(extra) {
		return (
			packageType === 'day-activities' &&
			selectedPassId === 'unlimited' &&
			extra.includedInUnlimited
		);
	}

	// Dynamic calculation
	let totalPrice = $derived.by(() => {
		let total = 0;
		if (packageType === 'day-activities') {
			total += adultsCount * selectedPass.adultPrice;
			total += kidsCount * selectedPass.childPrice;
		} else {
			total += stayNights * selectedAccommodation.pricePerNight;
			if (!selectedAccommodation.includesParkEntry) {
				total += adultsCount * 7.0;
				total += kidsCount * 5.5;
			}
		}

		for (const extra of EXTRA_SERVICES) {
			if (isExtraIncluded(extra)) continue;
			const guestCount = extra.includeUnderSix
				? adultsCount + kidsCount + underSixCount
				: adultsCount + kidsCount;
			if (extra.isCounter) {
				if (extraTrainRides > 0) {
					total += extraTrainRides * (extra.perGuest ? guestCount * extra.price : extra.price);
				}
			} else if (selectedExtras[extra.id]) {
				total += extra.perGuest ? guestCount * extra.price : extra.price;
			}
		}

		return total.toFixed(2);
	});

	function handleConfirmBooking(e) {
		e.preventDefault();
		if (!guestName) {
			alert('Please enter your name to complete the reservation.');
			return;
		}
		isConfirmed = true;
	}

	function resetBooking() {
		isConfirmed = false;
		guestName = '';
		guestEmail = '';
		guestPhone = '';
		extraTrainRides = 0;
		selectedExtras = {
			meals: false,
			equipment: false,
			picnic: false,
			parking: false,
			explorerKit: false
		};
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
				<button type="button" class="btn-dialog-close" onclick={onClose} aria-label="Close booking">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
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
								<strong>General Park Admission</strong>
								<!--<span>Single-day access from €7</span>-->
							</div>
						</button>

						<button
							class="pkg-tab"
							class:active={packageType === 'stay-and-play'}
							onclick={() => (packageType = 'stay-and-play')}
						>
							<div class="tab-text">
								<strong>Park & Accommodation</strong>
								<!--<span>Glamping escape from €65</span>-->
							</div>
						</button>
					</div>

					<form onsubmit={handleConfirmBooking} class="booking-form">
						<!-- Choose Your Pass (General Park Admission) OR Choose Your Accommodation (Park & Accommodation) -->
						{#if packageType === 'day-activities'}
							<div class="form-section">
								<span class="section-label">1. Choose Your Pass</span>
								<div class="pass-grid" role="radiogroup" aria-label="Choose your day pass">
									{#each DAY_PASSES as pass (pass.id)}
										<button
											type="button"
											role="radio"
											aria-checked={selectedPassId === pass.id}
											class="pass-card"
											class:active={selectedPassId === pass.id}
											onclick={() => (selectedPassId = pass.id)}
										>
											<div class="pass-card-top">
												<div class="pass-name-row">
													<strong class="pass-name">{pass.name}</strong>
													{#if pass.badge}
														<span class="pass-badge">{pass.badge}</span>
													{/if}
												</div>
												<span class="pass-subtitle">{pass.subtitle}</span>
											</div>

											<ul class="pass-features">
												{#each pass.features as feature (feature.text)}
													<li class="pass-feature-item">
														<span
															class="pass-feature-symbol"
															class:is-plus={feature.symbol === '+'}
														>
															{feature.symbol}
														</span>
														<span>{feature.text}</span>
													</li>
												{/each}
											</ul>

											<span class="pass-select-btn">
												{selectedPassId === pass.id ? '✓ Selected' : 'Select pass'}
											</span>
										</button>
									{/each}
								</div>
							</div>
						{:else}
							<div class="form-section">
								<span class="section-label">1. Choose Your Accommodation</span>
								<div
									class="pass-grid"
									role="radiogroup"
									aria-label="Choose your accommodation option"
								>
									{#each ACCOMMODATION_OPTIONS as acc (acc.id)}
										<button
											type="button"
											role="radio"
											aria-checked={selectedAccommodationId === acc.id}
											class="pass-card acc-card"
											class:active={selectedAccommodationId === acc.id}
											onclick={() => (selectedAccommodationId = acc.id)}
										>
											<div class="acc-media">
												{#if acc.image}
													<img
														src={acc.image}
														alt={acc.name}
														class="acc-photo"
														style:object-position={acc.imagePosition}
														loading="lazy"
													/>
												{:else}
													<div class="acc-photo-placeholder" aria-hidden="true">
														<svg
															width="28"
															height="28"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="1.75"
															stroke-linecap="round"
															stroke-linejoin="round"
														>
															<path d="M3.5 21 12 4l8.5 17" />
															<path d="M2 21h20" />
															<path d="M12 13v8" />
															<path d="M9.5 21 12 15l2.5 6" />
														</svg>
														<span>Photo coming soon</span>
													</div>
												{/if}
											</div>

											<div class="acc-card-body">
												<div class="pass-card-top">
													<div class="pass-name-row">
														<strong class="pass-name">{acc.name}</strong>
														{#if acc.badge}
															<span class="pass-badge">{acc.badge}</span>
														{/if}
													</div>
													<span class="pass-subtitle">{acc.subtitle}</span>
													<div class="pass-price-line">
														<strong>€{acc.pricePerNight.toFixed(0)}</strong>
														<span>/ night</span>
													</div>
												</div>

												<ul class="pass-features">
													{#each acc.features as feature (feature.text)}
														<li class="pass-feature-item">
															<span
																class="pass-feature-symbol"
																class:is-plus={feature.symbol === '+'}
															>
																{feature.symbol}
															</span>
															<span>{feature.text}</span>
														</li>
													{/each}
												</ul>

												<span class="pass-select-btn">
													{selectedAccommodationId === acc.id ? '✓ Selected' : 'Select stay'}
												</span>
											</div>
										</button>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Date Picker / Stay Date Range -->
						<div class="form-section">
							{#if packageType === 'day-activities'}
								<label for="visit-date" class="section-label">2. Choose Date of Visit</label>
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
							{:else}
								<span class="section-label">2. Choose Stay Dates</span>
								<div class="date-range-wrap">
									<div class="date-field">
										<label for="check-in-date">Check-in</label>
										<input
											id="check-in-date"
											type="date"
											min={getTodayIsoDate()}
											bind:value={checkInDate}
											class="input-date"
										/>
									</div>
									<div class="date-field">
										<label for="check-out-date">Check-out</label>
										<input
											id="check-out-date"
											type="date"
											min={addDaysIso(checkInDate, 1)}
											bind:value={checkOutDate}
											class="input-date"
										/>
									</div>
									<span class="date-badge">
										✓ {stayNights}
										{stayNights === 1 ? 'night' : 'nights'}
									</span>
								</div>
							{/if}
						</div>

						<!-- Guests Counter -->
						<div class="form-section">
							<div class="section-header-row">
								<span class="section-label">3. Select Visitors</span>
								{#if cabinMaxGuests !== null}
									<span class="capacity-pill" class:at-limit={isAtCabinCapacity}>
										{totalGuests} / {cabinMaxGuests} guests
									</span>
								{/if}
							</div>
							<div class="counters-grid">
								<div class="counter-card">
									<div class="counter-label">
										<strong>Adults</strong>
										<span>
											{#if packageType === 'day-activities'}
												€{selectedPass.adultPrice.toFixed(2)} each
											{:else if selectedAccommodation.includesParkEntry}
												Park entry included
											{:else}
												€7.00 park entry each
											{/if}
										</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											disabled={adultsCount <= 1}
											onclick={() => adultsCount > 1 && adultsCount--}
										>
											−
										</button>
										<span class="counter-num">{adultsCount}</span>
										<button
											type="button"
											class="btn-counter"
											disabled={isAtCabinCapacity || adultsCount >= 10}
											onclick={() => !isAtCabinCapacity && adultsCount < 10 && adultsCount++}
										>
											+
										</button>
									</div>
								</div>

								<div class="counter-card">
									<div class="counter-label">
										<strong>Children (7–17 yrs) / Students</strong>
										<span>
											{#if packageType === 'day-activities'}
												€{selectedPass.childPrice.toFixed(2)} each
											{:else if selectedAccommodation.includesParkEntry}
												Park entry included
											{:else}
												€5.50 park entry each
											{/if}
										</span>
									</div>
									<div class="counter-ctrls">
										<button
											type="button"
											class="btn-counter"
											disabled={kidsCount <= 0}
											onclick={() => kidsCount > 0 && kidsCount--}
										>
											−
										</button>
										<span class="counter-num">{kidsCount}</span>
										<button
											type="button"
											class="btn-counter"
											disabled={isAtCabinCapacity || kidsCount >= 10}
											onclick={() => !isAtCabinCapacity && kidsCount < 10 && kidsCount++}
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
											disabled={underSixCount <= 0}
											onclick={() => underSixCount > 0 && underSixCount--}
										>
											−
										</button>
										<span class="counter-num">{underSixCount}</span>
										<button
											type="button"
											class="btn-counter"
											disabled={isAtCabinCapacity || underSixCount >= 10}
											onclick={() => !isAtCabinCapacity && underSixCount < 10 && underSixCount++}
										>
											+
										</button>
									</div>
								</div>
							</div>
							{#if cabinMaxGuests !== null}
								<p class="capacity-note">
									{selectedAccommodation.name} sleep up to {cabinMaxGuests} guests total (including children).
									For larger groups, please book an additional cabin separately.
								</p>
							{/if}
						</div>

						<!-- Extra Services: Make your day even better -->
						<div class="form-section">
							<span class="section-label">4. Make Your Day Even Better</span>
							<p class="section-subhead">
								Add a little comfort, convenience or adventure to your visit.
							</p>
							<div class="addons-grid">
								{#each EXTRA_SERVICES as extra (extra.id)}
									{@const included = isExtraIncluded(extra)}
									{#if extra.isCounter}
										<div
											class="addon-option addon-counter-option"
											class:selected={included || totalTrainRides > 0}
										>
											{#if included}
												<span class="addon-included-check" aria-hidden="true">✓</span>
												<div class="addon-desc">
													<div class="addon-title-row">
														<strong>{extra.title}</strong>
														<span class="addon-included-pill">Included in Unlimited</span>
													</div>
													<p class="addon-sub">{extra.description}</p>
												</div>
											{:else}
												<div class="addon-desc">
													<div class="addon-title-row">
														<strong>{extra.title}</strong>
														{#if includedTrainRides > 0}
															<span class="addon-included-pill">
																{includedTrainRides} included
															</span>
														{:else}
															<span class="addon-price">{extra.priceLabel}</span>
														{/if}
													</div>
													<p class="addon-sub">
														{extra.description}
														{#if includedTrainRides > 0}
															<span class="addon-extra-rate">
																• Extra rides {extra.priceLabel}
															</span>
														{/if}
													</p>
													<div class="addon-stepper-row">
														<span class="addon-stepper-label">
															{totalTrainRides === 1 ? '1 ride' : `${totalTrainRides} rides`}
															{#if includedTrainRides > 0 && extraTrainRides > 0}
																({extraTrainRides} extra)
															{/if}
														</span>
														<div class="addon-stepper">
															<button
																type="button"
																class="btn-addon-step"
																aria-label="Remove Fairytale Train ride"
																disabled={extraTrainRides <= 0}
																onclick={() => extraTrainRides > 0 && extraTrainRides--}
															>
																−
															</button>
															<span class="addon-step-num">{totalTrainRides}</span>
															<button
																type="button"
																class="btn-addon-step"
																aria-label="Add Fairytale Train ride"
																disabled={extraTrainRides >= 20}
																onclick={() => extraTrainRides < 20 && extraTrainRides++}
															>
																+
															</button>
														</div>
													</div>
												</div>
											{/if}
										</div>
									{:else}
										<label
											class="addon-option"
											class:selected={included || selectedExtras[extra.id]}
										>
											{#if included}
												<span class="addon-included-check" aria-hidden="true">✓</span>
											{:else}
												<input type="checkbox" bind:checked={selectedExtras[extra.id]} />
											{/if}
											<div class="addon-desc">
												<div class="addon-title-row">
													<strong>{extra.title}</strong>
													{#if included}
														<span class="addon-included-pill">Included in Unlimited</span>
													{:else}
														<span class="addon-price">{extra.priceLabel}</span>
													{/if}
												</div>
												<p class="addon-sub">{extra.description}</p>
											</div>
										</label>
									{/if}
								{/each}
							</div>
						</div>

						<!-- Contact Details -->
						<div class="form-section">
							<label class="section-label">5. Guest Information</label>
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
									<label for="guest-email">Email Address</label>
									<input
										id="guest-email"
										type="email"
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
						Thank you, <strong>{guestName}</strong>! Your booking confirmation and QR codes
						{#if guestEmail}
							have been prepared for <strong>{guestEmail}</strong>.
						{:else}
							are ready below.
						{/if}
					</p>

					<div class="conf-summary-card">
						<div class="summary-line">
							<span>Package:</span>
							<strong>
								{packageType === 'day-activities'
									? `General Park Admission — ${selectedPass.name}`
									: `Park & Accommodation — ${selectedAccommodation.name}`}
							</strong>
						</div>
						<div class="summary-line">
							<span>{packageType === 'day-activities' ? 'Date of Visit:' : 'Stay Dates:'}</span>
							<strong>
								{packageType === 'day-activities'
									? selectedDate
									: `${checkInDate} → ${checkOutDate} (${stayNights} ${stayNights === 1 ? 'night' : 'nights'})`}
							</strong>
						</div>
						<div class="summary-line">
							<span>Visitors:</span>
							<strong>{adultsCount} Adults, {kidsCount} Kids ({underSixCount} under 6)</strong>
						</div>
						{#if packageType === 'stay-and-play'}
							<div class="summary-line">
								<span>Accommodation:</span>
								<strong>
									{selectedAccommodation.name} (€{selectedAccommodation.pricePerNight}/night)
								</strong>
							</div>
						{/if}
						{#if totalTrainRides > 0}
							<div class="summary-line">
								<span>Fairytale Train:</span>
								<strong>
									{totalTrainRides}
									{totalTrainRides === 1 ? 'ride' : 'rides'}
									{#if includedTrainRides > 0}
										({includedTrainRides} included)
									{/if}
								</strong>
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
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		width: 100%;
		max-width: 820px;
		max-height: 92vh;
		overflow-y: auto;
		box-shadow: var(--block-shadow);
		display: flex;
		flex-direction: column;
	}

	.dialog-header {
		padding: 20px 24px;
		background: var(--bg-panel);
		border-bottom: var(--border-width) solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dialog-title {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-forest-dark);
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
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
		cursor: pointer;
		flex-shrink: 0;
		transition:
			background var(--transition-fast),
			color var(--transition-fast);
	}

	.btn-dialog-close:hover {
		background: rgba(0, 41, 27, 0.08);
		color: var(--color-forest-dark);
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
		background: var(--bg-panel-light);
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-md);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.pkg-tab:hover {
		background: var(--bg-panel);
		border-color: var(--border-color);
	}

	.pkg-tab.active {
		background: var(--bg-surface);
		border-color: var(--color-forest);
		box-shadow: var(--card-shadow);
	}

	.tab-text {
		display: flex;
		flex-direction: column;
	}

	.tab-text strong {
		font-size: 0.95rem;
		color: var(--color-forest-dark);
	}

	.tab-text span {
		font-size: 0.78rem;
		color: var(--text-secondary);
	}

	/* Choose Your Pass Grid */
	.pass-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	@media (max-width: 680px) {
		.pass-grid {
			grid-template-columns: 1fr;
		}
	}

	.pass-card {
		display: flex;
		flex-direction: column;
		text-align: left;
		padding: 16px 14px;
		background: var(--bg-panel-light);
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.pass-card:hover {
		background: var(--bg-surface);
		border-color: var(--color-forest);
		transform: translateY(-2px);
	}

	.pass-card.active {
		background: var(--bg-surface);
		border-color: var(--color-forest);
		box-shadow:
			0 0 0 1px var(--color-forest),
			var(--card-shadow);
	}

	.pass-card.acc-card {
		padding: 0;
		overflow: hidden;
	}

	.acc-media {
		width: 100%;
		height: 136px;
		overflow: hidden;
		background: var(--bg-panel);
		border-bottom: 1px solid var(--border-subtle);
		flex-shrink: 0;
	}

	.acc-photo {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.pass-card.acc-card:hover .acc-photo {
		transform: scale(1.04);
	}

	.acc-photo-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		background: linear-gradient(135deg, var(--bg-panel-light) 0%, #e4eee8 100%);
		color: var(--color-forest);
	}

	.acc-photo-placeholder svg {
		opacity: 0.7;
	}

	.acc-photo-placeholder span {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		opacity: 0.75;
	}

	.acc-card-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 14px;
	}

	.pass-card-top {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 12px;
	}

	.pass-name-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 6px;
	}

	.pass-name {
		font-size: 0.96rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		line-height: 1.25;
	}

	.pass-badge {
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 2px 7px;
		border-radius: var(--radius-pill);
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border: 1px solid var(--status-open-border);
		flex-shrink: 0;
	}

	.pass-subtitle {
		font-size: 0.78rem;
		color: var(--text-secondary);
		line-height: 1.35;
	}

	.pass-price-line {
		display: flex;
		align-items: baseline;
		gap: 4px;
		margin-top: 6px;
		padding-top: 8px;
		border-top: 1px solid var(--border-subtle);
	}

	.pass-price-line strong {
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--color-forest-dark);
	}

	.pass-price-line span {
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--text-tertiary);
	}

	.pass-features {
		list-style: none;
		padding: 0;
		margin: 0 0 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.pass-feature-item {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		font-size: 0.76rem;
		line-height: 1.35;
		color: var(--text-primary);
		font-weight: 500;
	}

	.pass-feature-symbol {
		font-weight: 800;
		color: var(--color-forest);
		flex-shrink: 0;
	}

	.pass-feature-symbol.is-plus {
		color: var(--text-tertiary);
	}

	.pass-select-btn {
		margin-top: auto;
		display: block;
		width: 100%;
		text-align: center;
		padding: 8px 12px;
		font-size: 0.8rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-surface);
		color: var(--color-forest-dark);
		transition: all var(--transition-fast);
	}

	.pass-card.active .pass-select-btn {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		border-color: var(--btn-primary-border);
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
		color: var(--color-forest-dark);
		margin-bottom: 10px;
	}

	.section-header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 10px;
	}

	.section-header-row .section-label {
		margin-bottom: 0;
	}

	.capacity-pill {
		font-size: 0.74rem;
		font-weight: 800;
		padding: 3px 10px;
		border-radius: var(--radius-pill);
		background: var(--bg-panel-light);
		color: var(--color-forest);
		border: 1px solid var(--border-color);
	}

	.capacity-pill.at-limit {
		background: #fffbeb;
		color: #b45309;
		border-color: #fde68a;
	}

	.capacity-note {
		font-size: 0.76rem;
		color: var(--text-tertiary);
		margin-top: 8px;
		line-height: 1.4;
	}

	.section-subhead {
		font-size: 0.82rem;
		color: var(--text-secondary);
		margin: -4px 0 12px;
	}

	.date-picker-wrap {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.date-range-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 12px;
	}

	.date-field {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.date-field label {
		font-size: 0.76rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.date-range-wrap .date-badge {
		margin-bottom: 8px;
	}

	.input-date {
		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;
		padding: 10px 16px;
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	.date-badge {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--color-forest);
		background: var(--bg-panel-light);
		padding: 4px 10px;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--border-subtle);
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
		background: var(--bg-panel-light);
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.counter-label {
		display: flex;
		flex-direction: column;
	}

	.counter-label strong {
		font-size: 0.95rem;
		color: var(--text-primary);
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
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: 50%;
		font-size: 1.1rem;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		box-shadow: var(--btn-shadow);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.btn-counter:hover:not(:disabled) {
		background: var(--bg-panel);
	}

	.btn-counter:disabled {
		opacity: 0.38;
		cursor: not-allowed;
		box-shadow: none;
	}

	.counter-num {
		font-size: 1.05rem;
		font-weight: 800;
		min-width: 24px;
		text-align: center;
		color: var(--text-primary);
	}

	.glamping-selector {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		background: var(--bg-panel-light);
		border: var(--border-width) solid var(--status-open-border);
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

	.addons-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	@media (max-width: 600px) {
		.addons-grid {
			grid-template-columns: 1fr;
		}
	}

	.addon-option {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 12px 14px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.addon-option:hover {
		border-color: var(--border-color);
		background: var(--bg-panel-light);
	}

	.addon-option.selected {
		border-color: var(--color-forest);
		background: var(--color-forest-light);
	}

	.addon-option input[type='checkbox'] {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		accent-color: var(--color-forest);
	}

	.addon-included-check {
		width: 18px;
		height: 18px;
		margin-top: 2px;
		border-radius: 4px;
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border: 1px solid var(--status-open-border);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 800;
		flex-shrink: 0;
	}

	.addon-desc {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 3px;
	}

	.addon-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		flex-wrap: wrap;
	}

	.addon-desc strong {
		font-size: 0.88rem;
		color: var(--text-primary);
	}

	.addon-price {
		font-size: 0.74rem;
		font-weight: 700;
		color: var(--color-forest);
	}

	.addon-included-pill {
		font-size: 0.68rem;
		font-weight: 800;
		padding: 2px 7px;
		border-radius: var(--radius-pill);
		background: var(--status-open-bg);
		color: var(--status-open-text);
		border: 1px solid var(--status-open-border);
	}

	.addon-sub {
		font-size: 0.76rem;
		color: var(--text-secondary);
		line-height: 1.35;
		margin: 0;
	}

	.addon-counter-option {
		cursor: default;
	}

	.addon-extra-rate {
		color: var(--color-forest);
		font-weight: 600;
	}

	.addon-stepper-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid var(--border-subtle);
	}

	.addon-stepper-label {
		font-size: 0.76rem;
		font-weight: 700;
		color: var(--color-forest-dark);
	}

	.addon-stepper {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.btn-addon-step {
		width: 28px;
		height: 28px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: 50%;
		font-size: 1rem;
		font-weight: 800;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		box-shadow: var(--btn-shadow);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.btn-addon-step:hover:not(:disabled) {
		background: var(--bg-panel);
	}

	.btn-addon-step:disabled {
		opacity: 0.38;
		cursor: not-allowed;
		box-shadow: none;
	}

	.addon-step-num {
		font-size: 0.92rem;
		font-weight: 800;
		min-width: 20px;
		text-align: center;
		color: var(--text-primary);
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
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	.dialog-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 18px;
		border-top: var(--border-width) solid var(--border-color);
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
		color: var(--color-forest-dark);
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
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		padding: 14px 28px;
		font-size: 1rem;
		font-weight: 800;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--btn-primary-border);
		box-shadow: var(--btn-shadow);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-checkout:hover {
		background: var(--btn-primary-hover);
		transform: translateY(-2px);
	}

	/* Confirmation View */
	.confirmation-view {
		padding: 36px 24px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.conf-badge-pill {
		display: inline-block;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--status-open-bg);
		color: var(--status-open-text);
		padding: 4px 14px;
		border-radius: var(--radius-pill);
		border: var(--border-width) solid var(--status-open-border);
		margin-bottom: 12px;
	}

	.conf-title {
		font-size: 1.8rem;
		font-weight: 800;
		color: var(--color-forest-dark);
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
		background: var(--bg-panel-light);
		border: var(--border-width) solid var(--border-color);
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
		color: var(--color-forest-dark);
	}

	.summary-line.total-highlight {
		border-top: 1px dashed var(--border-color);
		padding-top: 8px;
		margin-top: 4px;
		font-size: 1rem;
	}

	.summary-line.total-highlight strong {
		color: var(--color-forest);
		font-size: 1.2rem;
	}

	.conf-barcode-mock {
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
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
		color: var(--color-forest-dark);
	}

	.barcode-lines {
		font-family: monospace;
		font-size: 1.1rem;
		letter-spacing: 4px;
		color: var(--color-forest-dark);
	}

	.qr-sub {
		font-size: 0.72rem;
		color: var(--text-tertiary);
	}

	.btn-finish {
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		border: var(--border-width) solid var(--btn-primary-border);
		padding: 12px 28px;
		font-size: 0.95rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		box-shadow: var(--btn-shadow);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.btn-finish:hover {
		background: var(--btn-primary-hover);
	}
</style>
