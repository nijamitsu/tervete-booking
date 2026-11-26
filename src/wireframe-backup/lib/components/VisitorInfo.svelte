<script>
	let activeFaq = $state(0);

	const FAQS = [
		{
			q: 'Do I need to book general park entry tickets in advance?',
			a: 'No, individual visitors and families can purchase entry tickets directly at the main entrance ticket booths upon arrival. However, pre-booking online guarantees instant gate access and is recommended for groups, school excursions, and lakeside glamping reservations.'
		},
		{
			q: 'Can I bring dogs or pets into the park?',
			a: 'Yes! Well-behaved dogs on leashes are warmly welcome in the main Tērvete Nature Park, Fairytale Forest, and around the reservoir. Pets are not permitted on the elevated nets in the Net Park or inside the Tropical Butterfly greenhouse.'
		},
		{
			q: 'Are the trails suitable for strollers and wheelchairs?',
			a: 'Absolutely. The core paths in the Fairytale Forest and Dwarfs’ Forest feature wide wooden boardwalks and packed gravel trails designed for easy stroller and wheelchair accessibility. The fairytale electric train also accommodates folded strollers.'
		},
		{
			q: 'What happens if it rains during our visit?',
			a: 'Tērvete is a dense pine forest that offers natural canopy cover. Additionally, there are numerous cozy wooden shelters, the indoor Tropical Butterfly House, covered cafes, and dwarf cottages where you can stay dry. Our ticket booking allows free date re-scheduling up to 24 hours prior.'
		},
		{
			q: 'How does the lakeside glamping check-in work?',
			a: 'LVM Glamping check-in begins at 15:00 at the Reservoir Recreation Centre. Each heated pod includes comfortable beds, electricity, lakeside patio furniture, and private barbecue facilities. Check-out is by 12:00.'
		}
	];

	function toggleFaq(index) {
		activeFaq = activeFaq === index ? -1 : index;
	}
</script>

<section id="info" class="visitor-section">
	<div class="visitor-container">
		<!-- Section Header -->
		<div class="visitor-header">
			<span class="sub-tag">Plan Your Visit</span>
			<h2 class="visitor-title">Practical Information & FAQ</h2>
			<p class="visitor-lead">
				Everything you need to know for a seamless day of discovery in Tērvete.
			</p>
		</div>

		<!-- Pricing & Schedule Grid -->
		<div id="pricing" class="info-cards-grid">
			<!-- Operating Hours Card -->
			<div class="info-card">
				<div class="card-icon-title">
					<h3>Seasonal Opening Hours</h3>
				</div>
				<ul class="hours-schedule">
					<li class="schedule-item">
						<span>Main Nature Park & Trails:</span>
						<strong>Daily 09:00 – 18:00</strong>
					</li>
					<li class="schedule-item">
						<span>Tērvete Net Park:</span>
						<strong>Daily 10:00 – 19:00</strong>
					</li>
					<li class="schedule-item">
						<span>Tropical Butterfly House:</span>
						<strong>Tue–Sun 10:00 – 17:00</strong>
					</li>
					<li class="schedule-item">
						<span>Fairytale Train:</span>
						<strong>Weekends & Holidays 10:00 – 17:30</strong>
					</li>
					<li class="schedule-item">
						<span>LVM Glamping:</span>
						<strong>24/7 (Check-in 15:00)</strong>
					</li>
				</ul>
				<div class="card-footer-tip">
					<span>Tip: Park grounds remain accessible until dusk for peaceful evening strolls.</span>
				</div>
			</div>

			<!-- Ticket Prices & Discounts Card -->
			<div class="info-card">
				<div class="card-icon-title">
					<h3>Admission & Special Rates</h3>
				</div>
				<div class="price-table">
					<div class="table-row">
						<span>Adult Entry</span>
						<strong>€7.00</strong>
					</div>
					<div class="table-row">
						<span>Students, Seniors & Disabled (Grp 3)</span>
						<strong>€5.50</strong>
					</div>
					<div class="table-row">
						<span>Children under 7 years</span>
						<strong class="green-text">FREE</strong>
					</div>
					<div class="table-row">
						<span>Family Ticket (3+ Goda ģimene card)</span>
						<strong>€20.00 / family</strong>
					</div>
					<div class="table-row">
						<span>Park Car Parking (all day)</span>
						<strong>€5.00</strong>
					</div>
					<div class="table-row">
						<span>Net Park 55-Min Jump Pass</span>
						<strong>€10.00</strong>
					</div>
				</div>
			</div>

			<!-- Location & How to Get Here -->
			<div class="info-card full-width">
				<div class="card-icon-title">
					<h3>Getting to Tērvete</h3>
				</div>
				<div class="directions-layout">
					<div class="directions-text">
						<p class="dir-summary">
							Located in southern Latvia's picturesque Zemgale region, just <strong>
								75 km from Riga
							</strong>
							(approx. 1 hour drive via A8/P95) and <strong>30 km from Jelgava</strong>.
						</p>
						<div class="transport-modes">
							<div class="mode-item">
								<strong>By Car:</strong>
								<span>
									Direct highway from Riga through Jelgava or Dobele. Ample paved parking at the
									main information centre.
								</span>
							</div>
							<div class="mode-item">
								<strong>By Bus:</strong>
								<span>
									Regular intercity buses depart from Riga International Coach Station and Jelgava
									to the "Tērvete" stop, right by the entrance.
								</span>
							</div>
							<div class="mode-item">
								<strong>By Bicycle:</strong>
								<span>
									Connected via regional cycling routes with bike racks and repair stands on-site.
								</span>
							</div>
						</div>
					</div>

					<div class="location-box">
						<div class="location-badge">GPS Coordinates</div>
						<div class="coords">56.4802° N, 23.3853° E</div>
						<div class="address-text">
							"Tērvetes sils", Tērvete parish,<br />
							Dobele municipality, LV-3730, Latvia
						</div>
						<a
							href="https://maps.google.com/?q=Tervete+Nature+Park+Latvia"
							target="_blank"
							rel="noopener noreferrer"
							class="btn-maps"
						>
							Open in Google Maps ↗
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Interactive FAQ Accordion -->
		<div class="faq-container">
			<h3 class="faq-section-title">Frequently Asked Questions</h3>
			<div class="accordion">
				{#each FAQS as faq, i (faq.q)}
					<div class="accordion-item" class:is-open={activeFaq === i}>
						<button
							class="accordion-btn"
							onclick={() => toggleFaq(i)}
							aria-expanded={activeFaq === i}
						>
							<span class="faq-q">{faq.q}</span>
							<span class="accordion-icon">{activeFaq === i ? '−' : '+'}</span>
						</button>
						{#if activeFaq === i}
							<div class="accordion-content">
								<p>{faq.a}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Page Footer -->
	<footer class="page-footer">
		<div class="footer-inner">
			<div class="footer-col brand-col">
				<div class="footer-logo">
					<strong>TĒRVETE PARKS</strong>
				</div>
				<p class="footer-about">
					Latvia's premier family nature and entertainment park, managed in harmony with Latvia's
					State Forests (LVM).
				</p>
				<span class="copyright">© 2026 LVM Dabas parks Tērvetē. All rights reserved.</span>
			</div>

			<div class="footer-col">
				<h4 class="col-title">Quick Links</h4>
				<ul class="col-links">
					<li><a href="#hero">Homepage</a></li>
					<li><a href="#parks">Explore 6 Parks</a></li>
					<li><a href="#getaways">Getaway Packages</a></li>
					<li><a href="#pricing">Tickets & Rates</a></li>
					<li><a href="#info">Directions & Parking</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4 class="col-title">Attractions</h4>
				<ul class="col-links">
					<li><a href="#parks">Fairytale Forest</a></li>
					<li><a href="#parks">Tērvete Net Park</a></li>
					<li><a href="#parks">Dwarfs' Town Čiekure</a></li>
					<li><a href="#parks">Tarzāns Obstacle Park</a></li>
					<li><a href="#parks">Lakeside Glamping</a></li>
				</ul>
			</div>

			<div class="footer-col contact-col">
				<h4 class="col-title">Contact & Help</h4>
				<p class="contact-line">Phone: +371 25757744 (Info)</p>
				<p class="contact-line">Email: tervete@mammadaba.lv</p>
				<p class="contact-line">Hours: Everyday 09:00 – 18:00</p>
				<div class="social-links">
					<span class="social-badge">Facebook</span>
					<span class="social-badge">Instagram</span>
					<span class="social-badge">Mammadaba</span>
				</div>
			</div>
		</div>
	</footer>
</section>

<style>
	.visitor-section {
		padding-top: 56px;
		background: #ffffff;
		border-top: 2px solid var(--border-bold);
	}

	.visitor-container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 24px 64px;
	}

	.visitor-header {
		text-align: center;
		margin-bottom: 48px;
	}

	.sub-tag {
		font-size: 0.82rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-forest);
		display: block;
		margin-bottom: 8px;
	}

	.visitor-title {
		font-size: clamp(2rem, 4vw, 2.8rem);
		font-weight: 800;
		color: var(--border-bold);
		letter-spacing: -0.02em;
		margin-bottom: 12px;
	}

	.visitor-lead {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 580px;
		margin: 0 auto;
	}

	.info-cards-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		margin-bottom: 56px;
	}

	@media (max-width: 768px) {
		.info-cards-grid {
			grid-template-columns: 1fr;
		}
	}

	.info-card {
		background: #f8faf8;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-lg);
		padding: 28px;
		box-shadow: 4px 4px 0 var(--border-bold);
		display: flex;
		flex-direction: column;
	}

	.info-card.full-width {
		grid-column: 1 / -1;
	}

	.card-icon-title {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}

	.info-icon {
		font-size: 1.6rem;
	}

	.card-icon-title h3 {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--border-bold);
	}

	.hours-schedule {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 18px;
		flex: 1;
	}

	.schedule-item {
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		border-bottom: 1px dashed #d5ded5;
		padding-bottom: 6px;
	}

	.schedule-item span {
		color: var(--text-secondary);
	}

	.schedule-item strong {
		color: var(--border-bold);
	}

	.card-footer-tip {
		font-size: 0.8rem;
		color: var(--color-forest);
		font-weight: 600;
		background: #eef5f0;
		padding: 8px 12px;
		border-radius: var(--radius-sm);
	}

	.price-table {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.table-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
		padding: 8px 10px;
		background: #ffffff;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
	}

	.green-text {
		color: var(--color-forest);
		font-weight: 800;
	}

	.directions-layout {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 28px;
		align-items: center;
	}

	@media (max-width: 820px) {
		.directions-layout {
			grid-template-columns: 1fr;
		}
	}

	.dir-summary {
		font-size: 0.98rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 16px;
	}

	.transport-modes {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.mode-item {
		font-size: 0.88rem;
		line-height: 1.45;
	}

	.mode-item strong {
		color: var(--border-bold);
	}

	.mode-item span {
		color: var(--text-secondary);
	}

	.location-box {
		background: #ffffff;
		border: 2px solid var(--border-bold);
		border-radius: var(--radius-md);
		padding: 20px;
		text-align: center;
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.location-badge {
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-tertiary);
		margin-bottom: 4px;
	}

	.coords {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--color-forest);
		margin-bottom: 8px;
		font-family: monospace;
	}

	.address-text {
		font-size: 0.84rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin-bottom: 14px;
	}

	.btn-maps {
		display: inline-block;
		background: var(--border-bold);
		color: #ffffff;
		padding: 8px 18px;
		font-size: 0.85rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		transition: background var(--transition-fast);
	}

	.btn-maps:hover {
		background: var(--color-forest);
	}

	/* FAQ Accordion */
	.faq-container {
		max-width: 820px;
		margin: 0 auto;
	}

	.faq-section-title {
		font-size: 1.6rem;
		font-weight: 800;
		color: var(--border-bold);
		text-align: center;
		margin-bottom: 24px;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.accordion-item {
		border: 1.5px solid var(--border-bold);
		border-radius: var(--radius-md);
		background: #ffffff;
		overflow: hidden;
		box-shadow: 2px 2px 0 var(--border-bold);
	}

	.accordion-btn {
		width: 100%;
		padding: 16px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: left;
		background: #ffffff;
		transition: background var(--transition-fast);
	}

	.accordion-btn:hover {
		background: #f4f6f4;
	}

	.faq-q {
		font-size: 0.98rem;
		font-weight: 700;
		color: var(--border-bold);
		padding-right: 14px;
	}

	.accordion-icon {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-forest);
	}

	.accordion-content {
		padding: 0 20px 18px;
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
		animation: open-faq 0.2s ease-out;
	}

	@keyframes open-faq {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Footer */
	.page-footer {
		background: #d8ded8;
		border-top: 2px solid var(--border-bold);
		padding: 56px 24px 40px;
		margin-top: 48px;
	}

	.footer-inner {
		max-width: 1100px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
		gap: 36px;
	}

	@media (max-width: 860px) {
		.footer-inner {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 520px) {
		.footer-inner {
			grid-template-columns: 1fr;
		}
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--border-bold);
		margin-bottom: 12px;
	}

	.logo-mark {
		font-size: 1.4rem;
	}

	.footer-about {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: 20px;
	}

	.copyright {
		font-size: 0.76rem;
		color: var(--text-tertiary);
		display: block;
	}

	.col-title {
		font-size: 0.92rem;
		font-weight: 800;
		color: var(--border-bold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 14px;
	}

	.col-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.col-links a {
		font-size: 0.88rem;
		color: var(--text-secondary);
		transition: color var(--transition-fast);
	}

	.col-links a:hover {
		color: var(--border-bold);
		text-decoration: underline;
	}

	.contact-line {
		font-size: 0.88rem;
		color: var(--text-secondary);
		margin-bottom: 8px;
	}

	.social-links {
		display: flex;
		gap: 6px;
		margin-top: 14px;
	}

	.social-badge {
		font-size: 0.72rem;
		font-weight: 700;
		background: #ffffff;
		border: 1px solid var(--border-bold);
		padding: 3px 8px;
		border-radius: var(--radius-sm);
		color: var(--border-bold);
	}
</style>
