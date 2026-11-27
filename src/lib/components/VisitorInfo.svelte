<script>
	let activeFaq = $state(0);

	const FAQS = [
		{
			q: 'Do I need to book general park entry tickets in advance?',
			a: 'No, individual visitors and families can purchase entry tickets directly at the main entrance ticket booths upon arrival. However, pre-booking online guarantees instant gate access and is recommended for groups, school excursions, and lakeside glamping reservations.'
		},
		{
			q: 'Can I bring dogs or pets into the park?',
			a: 'Yes! Well-behaved dogs on leashes are warmly welcome in the main Tērvete Nature Park, Anna Brigadere Park, and around the reservoir. Pets are not permitted on the elevated nets in The Living Forest or inside The Riverside Chill butterfly greenhouse.'
		},
		{
			q: 'Are the trails suitable for strollers and wheelchairs?',
			a: 'Absolutely. The core paths in Anna Brigadere Park and The Dwarf Village feature wide wooden boardwalks and packed gravel trails designed for easy stroller and wheelchair accessibility. The electric train also accommodates folded strollers.'
		},
		{
			q: 'What happens if it rains during our visit?',
			a: 'Tērvete is a dense pine forest that offers natural canopy cover. Additionally, there are numerous cozy wooden shelters, the indoor tropical greenhouse at The Riverside Chill, covered cafes, and dwarf cottages where you can stay dry. Our ticket booking allows free date re-scheduling up to 24 hours prior.'
		},
		{
			q: 'How does the lakeside glamping check-in work?',
			a: 'The Lakeside Haven glamping check-in begins at 15:00 at the Reservoir Recreation Centre. Each heated pod includes comfortable beds, electricity, lakeside patio furniture, and private barbecue facilities. Check-out is by 12:00.'
		}
	];

	function toggleFaq(index) {
		activeFaq = activeFaq === index ? -1 : index;
	}
</script>

<section id="contact" class="visitor-section">
	<div class="visitor-container">
		<!-- Section Header -->
		<div class="visitor-header">
			<h2 class="visitor-title">Contact</h2>
			<p class="visitor-lead">
				Everything you need to know for a seamless day of discovery in Tērvete.
			</p>
		</div>

		<!-- Pricing & Schedule Grid -->
		<div id="pricing" class="info-cards-grid">
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

					<div class="map-embed-wrap">
						<img
							src="/tervete-park-map-photo.png"
							alt="Map of Latvia's State Forests Nature Park in Tērvete showing all six parks"
							class="map-photo"
							loading="lazy"
						/>
					</div>
				</div>
				<!--
				<div class="location-box">
					<div class="location-meta">
						<div class="location-badge">GPS Coordinates</div>
						<div class="coords">56.4802° N, 23.3853° E</div>
						<div class="address-text">
							"Tērvetes sils", Tērvete parish, Dobele municipality, LV-3730, Latvia
						</div>
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
				-->
			</div>
		</div>

		<!-- Interactive FAQ Accordion -->
		<div id="faq" class="faq-container">
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
					<img src="/lvm-logo.svg" alt="LVM logo" class="footer-logo-img" />
					<div class="footer-brand-text">
						<strong>LATVIJAS VALSTS MEŽI</strong>
						<span>Dabas parks Tērvetē</span>
					</div>
				</div>
				<p class="footer-about">
					Managed in harmony with nature by JSC "Latvijas valsts meži". Discover protected nature
					trails, family recreation, and active forest adventures.
				</p>
				<span class="copyright">© 2026 JSC "Latvijas valsts meži". All rights reserved.</span>
			</div>

			<div class="footer-col">
				<h4 class="col-title">Quick Links</h4>
				<ul class="col-links">
					<li><a href="#hero">Homepage</a></li>
					<li><a href="#parks">Destinations (6 Parks)</a></li>
					<li><a href="#getaways">Tickets & Getaways</a></li>
					<li><a href="#contact">Contact & Directions</a></li>
					<li><a href="#faq">FAQ</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h4 class="col-title">The 6 Parks</h4>
				<ul class="col-links">
					<li><a href="#parks">The Dwarf Village</a></li>
					<li><a href="#parks">Anna Brigadere Park</a></li>
					<li><a href="#parks">The Adventure Heights</a></li>
					<li><a href="#parks">The Living Forest</a></li>
					<li><a href="#parks">The Riverside Chill</a></li>
					<li><a href="#parks">The Lakeside Haven</a></li>
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
					<span class="social-badge">atputa.lvm.lv</span>
				</div>
			</div>
		</div>
	</footer>
</section>

<style>
	.visitor-section {
		scroll-margin-top: 88px;
		padding-top: 56px;
		background: var(--bg-canvas);
		border-top: var(--border-width) solid var(--border-color);
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
		color: var(--color-forest-dark);
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
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-lg);
		padding: 30px;
		box-shadow: var(--card-shadow);
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

	.card-icon-title h3 {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-forest-dark);
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
		font-size: 0.92rem;
		border-bottom: 1px dashed var(--border-subtle);
		padding-bottom: 6px;
	}

	.schedule-item span {
		color: var(--text-secondary);
	}

	.schedule-item strong {
		color: var(--color-forest-dark);
	}

	.card-footer-tip {
		font-size: 0.82rem;
		color: var(--color-forest);
		font-weight: 600;
		background: var(--color-forest-light);
		padding: 9px 14px;
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
		font-size: 0.92rem;
		padding: 10px 14px;
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
	}

	.green-text {
		color: var(--color-forest);
		font-weight: 800;
	}

	.directions-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
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
		font-size: 0.9rem;
		line-height: 1.45;
	}

	.mode-item strong {
		color: var(--color-forest-dark);
	}

	.mode-item span {
		color: var(--text-secondary);
	}

	.location-box {
		margin-top: 24px;
		background: var(--bg-surface);
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		padding: 18px 22px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		text-align: left;
		box-shadow: var(--card-shadow);
	}

	.location-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.location-badge {
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-forest);
		margin-bottom: 4px;
	}

	.coords {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--color-forest);
		margin-bottom: 4px;
		font-family: monospace;
	}

	.address-text {
		font-size: 0.86rem;
		color: var(--text-secondary);
		line-height: 1.4;
		margin-bottom: 0;
	}

	.btn-maps {
		display: inline-block;
		flex-shrink: 0;
		background: var(--btn-primary-bg);
		color: var(--btn-primary-text);
		padding: 8px 20px;
		font-size: 0.86rem;
		font-weight: 700;
		border-radius: var(--radius-pill);
		box-shadow: var(--btn-shadow);
		transition: background var(--transition-fast);
	}

	.btn-maps:hover {
		background: var(--btn-primary-hover);
	}

	@media (max-width: 640px) {
		.location-box {
			flex-direction: column;
			text-align: center;
			justify-content: center;
		}
	}

	.map-embed-wrap {
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: var(--card-shadow);
		background: var(--bg-panel-light);
	}

	.map-photo {
		display: block;
		width: 100%;
		height: auto;
	}

	/* FAQ Accordion */
	.faq-container {
		scroll-margin-top: 88px;
		max-width: 820px;
		margin: 0 auto;
	}

	.faq-section-title {
		font-size: 1.65rem;
		font-weight: 800;
		color: var(--color-forest-dark);
		text-align: center;
		margin-bottom: 24px;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.accordion-item {
		border: var(--border-width) solid var(--border-color);
		border-radius: var(--radius-md);
		background: var(--bg-surface);
		overflow: hidden;
		box-shadow: var(--card-shadow);
	}

	.accordion-btn {
		width: 100%;
		padding: 18px 22px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: left;
		background: var(--bg-surface);
		transition: background var(--transition-fast);
	}

	.accordion-btn:hover {
		background: var(--bg-panel-light);
	}

	.faq-q {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-forest-dark);
		padding-right: 14px;
	}

	.accordion-icon {
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--color-forest);
	}

	.accordion-content {
		padding: 0 22px 20px;
		font-size: 0.92rem;
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
		background: var(--footer-bg);
		color: var(--footer-text);
		border-top: var(--border-width) solid var(--border-color);
		padding: 60px 24px 44px;
		margin-top: 48px;
		transition: background var(--transition-smooth);
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
		gap: 12px;
		margin-bottom: 14px;
	}

	.footer-logo-img {
		height: 38px;
		width: auto;
		filter: brightness(0) invert(1);
	}

	.footer-brand-text {
		display: flex;
		flex-direction: column;
	}

	.footer-brand-text strong {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		color: #ffffff;
	}

	.footer-brand-text span {
		font-size: 0.76rem;
		color: var(--footer-text-muted);
	}

	.footer-about {
		font-size: 0.88rem;
		color: var(--footer-text-muted);
		line-height: 1.55;
		margin-bottom: 20px;
	}

	.copyright {
		font-size: 0.78rem;
		color: var(--footer-text-muted);
		display: block;
		opacity: 0.8;
	}

	.col-title {
		font-size: 0.95rem;
		font-weight: 800;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 16px;
	}

	.col-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.col-links a {
		font-size: 0.9rem;
		color: var(--footer-text-muted);
		transition: color var(--transition-fast);
	}

	.col-links a:hover {
		color: #ffffff;
		text-decoration: underline;
	}

	.contact-line {
		font-size: 0.9rem;
		color: var(--footer-text-muted);
		margin-bottom: 8px;
	}

	.social-links {
		display: flex;
		gap: 8px;
		margin-top: 16px;
	}

	.social-badge {
		font-size: 0.74rem;
		font-weight: 700;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 4px 10px;
		border-radius: var(--radius-sm);
		color: #ffffff;
	}
</style>
