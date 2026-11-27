export const PARKS_DATA = [
	{
		id: 1,
		name: 'The Dwarf Village',
		originalName: 'Rūķīšu mežs & Čiekure',
		wireframeName: 'Park 1',
		worldId: 'World 01',
		archetype: 'The Maker',
		theme: {
			name: 'purple',
			label: 'Dwarf Purple',
			color: '#7C3AED',
			colorHover: '#6D28D9',
			bgTint: '#F5F3FF',
			borderTint: '#DDD6FE',
			shadowTint: 'rgba(124, 58, 237, 0.16)'
		},
		image: '/dwarf-village.jpeg',
		themeSentence:
			'A miniature village hidden among the pines where each house has a purpose, a trade, and a story.',
		tagline: 'Live like a dwarf in a world of crafts, traditions, and miniature marvels.',
		connector: 'The Dwarf Passport & Giant’s View',
		connectorDescription:
			'A village keeper introduces inhabitants and their occupations. Collect stamps through small missions, crafts, and discoveries. The Giant’s View reframes the tower as a giant looking down upon the tiny village.',
		visualCues:
			'Miniature timber gates, terracotta and mustard tones, tiny doors and furniture, giant pine cones, lanterns, dwarf footprints.',
		ageGroup: 'All Ages • Creative Families & Kids',
		includedActivities: [
			'Explore Pinecone Town - Čiekure',
			'Dwarf Village & Cottages Walkthrough',
			'Giant’s View Observation Tower',
			'Annele’s Zoo (Themed Dwarfs’ Farm)',
			'Dwarf Gathering Place & Play Area',
			'Hide and Seek in Tiny Houses',
			'Self-guided Passport Challenges',
			'Morning March & Village Singalong'
		],
		premiumActivities: [
			'Become a Dwarf for a Day',
			'Carve a Wooden Toy Workshop',
			'Build Your Own Dwarf House',
			'Dwarf Blacksmith Workshop',
			'Make Your Own Dwarf Cap',
			'Dwarf Cooking & Pancake Workshop',
			'Build a Birdhouse Workshop'
		],
		addOns: 'Café, souvenirs, and take-home craft kits',
		category: 'family'
	},
	{
		id: 2,
		name: 'Anna Brigadere Park',
		originalName: 'Pasaku mežs',
		wireframeName: 'Park 2',
		worldId: 'World 02',
		archetype: 'The Storyteller',
		theme: {
			name: 'yellow',
			label: 'Enchanted Gold',
			color: '#D97706',
			colorHover: '#B45309',
			bgTint: '#FFFBEB',
			borderTint: '#FDE68A',
			shadowTint: 'rgba(217, 119, 6, 0.16)'
		},
		image: '/ab-park.jpg',
		themeSentence:
			'A living storybook inspired by Anna Brigadere’s literary world where visitors encounter folklore characters, magical places, and theatrical tales.',
		tagline: 'Step inside the story and live the legendary fairytales.',
		connector: 'The Living Storybook',
		connectorDescription:
			'An oversized open storybook introduces the realm. Physical chapter markers reveal short tales, rotating panels, and character dialogues that invite visitors to play a role.',
		visualCues:
			'Open storybook gates, plum and antique gold, literary wooden sculptures, magical doors, hidden clues, small theatrical stages.',
		ageGroup: 'All Ages • Story Lovers & Families',
		includedActivities: [
			'Forest Mother’s Kingdom Trail',
			'Forest King’s Realm & Witch’s Grove',
			'Sprīdītis’ Story Trail & Clues',
			'Miser’s Cottage & Annele’s Friends',
			'Bridge of the Landlady',
			'Fairytale Maze & Wooden Playground',
			'Sprīdītis Treasure Hunt',
			'Live Flute Performances (selected times)'
		],
		premiumActivities: [
			'Sprīdītis’ Interactive Adventure Quest',
			'Live Interactive Fairytale Theatre',
			'Maija & Paija’s Theatrical Quest',
			'Forest Mother’s Nature Workshop',
			'Create Your Own Fairytale Workshop',
			'Fairytale Costume Workshop',
			'Enchanted Forest Night Walk'
		],
		addOns: 'Café, picnic areas, and story souvenirs',
		category: 'nature'
	},
	{
		id: 3,
		name: 'The Adventure Heights',
		originalName: 'Tērvetes Tarzāns',
		wireframeName: 'Park 3',
		worldId: 'World 03',
		archetype: 'The Adventurer',
		theme: {
			name: 'red',
			label: 'Adventure Crimson',
			color: '#DC2626',
			colorHover: '#B91C1C',
			bgTint: '#FEF2F2',
			borderTint: '#FECACA',
			shadowTint: 'rgba(220, 38, 38, 0.16)'
		},
		image: '/Tarzans-Adventure-Park.jpg',
		themeSentence:
			'Experience the forest through movement, discovery, and physical challenges ranging from ground bike trails to treetop obstacle heights.',
		tagline: 'Discover what you are capable of in the canopy.',
		connector: 'The Adventure Basecamp',
		connectorDescription:
			'A central basecamp introduces activities graded by difficulty, height, and effort. Collect achievements across ground courses and high-wire canopy tracks.',
		visualCues:
			'Basecamp gate, ochre and orange, height markers, ropes and nets, topographic signs, achievement flags, difficulty symbols.',
		ageGroup: 'Ages 4+ • Thrill Seekers, Teens & Active Families',
		includedActivities: [
			'Skills Bike Park & Obstacle Loops',
			'Off-road Forest Cycling (own equipment)',
			'BMX & Bike Skills Challenges',
			'Adventure Ground Playground',
			'Outdoor Fitness & Strength Challenges',
			'Self-guided Team Challenge Circuits',
			'Adventure Achievement Trail'
		],
		premiumActivities: [
			'Tarzāns Treetop High-Rope Course',
			'Sky Bike Canopy High-Wire Ride',
			'Zip Line & Climbing Wall Challenges',
			'Tērvete Net Park Canopy Jump Session',
			'Tērvete Butterfly House Exploration',
			'Guided Mountain Bike Forest Adventure',
			'Facilitated Team-Building Quests'
		],
		addOns: 'Bike and helmet rental; food trucks and refreshments',
		category: 'active'
	},
	{
		id: 4,
		name: 'The Living Forest',
		originalName: 'Tērvetes Tīklu parks & Dabas mežs',
		wireframeName: 'Park 4',
		worldId: 'World 04',
		archetype: 'The Explorer',
		theme: {
			name: 'green',
			label: 'Living Emerald',
			color: '#15803D',
			colorHover: '#166534',
			bgTint: '#F0FDF4',
			borderTint: '#BBF7D0',
			shadowTint: 'rgba(21, 128, 61, 0.16)'
		},
		image: '/living-forest.jpeg',
		themeSentence:
			'An open-air museum of the living forest revealing the relationships between trees, plants, insects, wildlife, and people.',
		tagline: 'Discover the forest as a living, breathing ecosystem.',
		connector: 'Forest Discovery Stations',
		connectorDescription:
			'Outdoor stations invite visitors to investigate specimens, compare bark, identify animal tracks and forest sounds, and observe seasonal change with park rangers.',
		visualCues:
			'Deep green and timber, outdoor discovery stations, observation lenses, animal track replicas, botanical charts, tree cross-sections.',
		ageGroup: 'All Ages • Nature Lovers, Curious Minds & Students',
		includedActivities: [
			'Scenic Forest Hiking & Walking Trails',
			'Self-guided Nature Discovery Trail',
			'Educational Botanical & Forest Displays',
			'Animal Footprint Discovery Stations',
			'Plant & Ancient Tree Identification',
			'Wildlife Spotting & Bird Observation',
			'Pine Cone & Natural Material Collecting'
		],
		premiumActivities: [
			'Guided Forest Ranger Exploration',
			'Forest Survival Skills Workshop',
			'Nature Journaling & Natural Dye Craft',
			'Guided Wildlife & Birdwatching Tour',
			'Mushroom & Berry Foraging Tour',
			'Forest Photography Masterclass',
			'Junior Forest Ranger Experience'
		],
		addOns: 'Explorer kits and walking equipment rental',
		category: 'nature'
	},
	{
		id: 5,
		name: 'The Riverside Chill',
		originalName: 'Tērvetes Tauriņi & Miera taka',
		wireframeName: 'Park 5',
		worldId: 'World 05',
		archetype: 'The Wanderer',
		theme: {
			name: 'brown',
			label: 'Timber Brown',
			color: '#854D0E',
			colorHover: '#713F12',
			bgTint: '#FDF8F4',
			borderTint: '#FED7AA',
			shadowTint: 'rgba(133, 77, 14, 0.16)'
		},
		image: '/quiet-trail.jpg',
		themeSentence:
			'A calm riverside retreat of shaded paths, quiet decks, and sensory spots designed for slowing down, resting, and reconnecting with nature.',
		tagline: 'Slow down, listen, breathe, and reconnect.',
		connector: 'Moments of Pause',
		connectorDescription:
			'Follow the gentle pace of the river with simple invitations to pause, listen to the water and pines, relax in riverside hammocks, and linger at your own rhythm.',
		visualCues:
			'Warm timber and soft earth tones, riverside resting decks, hammocks, gentle river views, quiet seating, and natural shade.',
		ageGroup: 'All Ages • Solo Visitors, Couples & Wellbeing Seekers',
		includedActivities: [
			'Scenic Walking Trails & Wooden Boardwalks',
			'Forest Viewpoints & Landscape Framing Stations'
		],
		hideCardPremium: true,
		cardNote: {
			badge: 'Unstructured Space',
			text: 'Designed as an unstructured riverside area to simply unwind at your own pace, with no schedules or paid add-ons, just quiet river views and shaded paths to roam and chill freely.'
		},
		premiumActivities: [],
		addOns: 'Picnic baskets and reserved resting pavilions',
		category: 'nature'
	},
	{
		id: 6,
		name: 'The Lakeside Haven',
		originalName: 'Tērvetes Ūdenskrātuve & Glempings',
		wireframeName: 'Park 6',
		worldId: 'World 06',
		archetype: 'The Guest',
		theme: {
			name: 'blue',
			label: 'Lakeside Azure',
			color: '#2563EB',
			colorHover: '#1D4ED8',
			bgTint: '#EFF6FF',
			borderTint: '#BFDBFE',
			shadowTint: 'rgba(37, 99, 235, 0.16)'
		},
		image: '/glamping.jpeg',
		themeSentence:
			'A welcoming waterside retreat where forest meets lake, featuring comfortable stays and spaces for boating, laid-back recreation, shared meals, and evening campfires under the stars.',
		tagline: 'Share meaningful moments by the water from sunrise to campfire.',
		connector: 'From Water to Fire',
		connectorDescription:
			'Follow the natural rhythm of the day: morning shoreline exploration, afternoon paddle sports, sunset dinners, and communal fire circles under the night sky.',
		visualCues:
			'Lake blue and warm sand, wave-pattern gateways, wooden piers and floating docks, canoes, communal fire circles, long tables, lanterns, illuminated cabins.',
		ageGroup: 'All Ages • Families, Couples, Groups & Anglers',
		includedActivities: [
			'Lakeside Walking & Promenade Trail',
			'Birdwatching Observation Tower',
			'Public Picnic Areas & Scenic Shorelines',
			'Sandy Beach Swimming & Water Play',
			'Self-guided Shoreline Birdwatching',
			'Outdoor Social Games & Lawn Games',
			'Open Campfire & Sunset Gathering Areas'
		],
		premiumActivities: [
			'Boat Riding, Rowboats & Water Bicycles',
			'Stand-Up Paddleboarding (SUP) Rentals',
			'Licensed Lake Fishing & Angling Lessons',
			'Guided Sunset Boat Tour on the Lake',
			'Outdoor Campfire Cooking Workshop',
			'Lakeside Yoga & Wellness Sessions',
			'Outdoor Cinema Nights & Acoustic Concerts'
		],
		addOns: 'Camping pitches, glamping pods, reserved BBQ pits, equipment rental, dining packages',
		category: 'relaxation'
	}
];

export const GETAWAYS_DATA = [
	{
		id: 'day-activities',
		title: 'General Park Admission',
		badge: 'Nature Pass',
		subtitle: 'Full access to all 6 unenclosed park worlds',
		summary:
			'Explore all 6 themed worlds and dozens of included activities across Tērvete’s open nature reserve with your general admission ticket. Add-ons like boat rentals, treetop ropes, and workshops are available on-site.',
		price: 'From €7.00',
		priceUnit: 'per visitor (Free under 7)',
		features: [
			'Unlimited walking access to all 6 themed park worlds',
			'Full access to all included activities, discovery stations, and playgrounds',
			'Picnic sites, campfire areas, and boardwalk trails throughout the 1,200 ha forest',
			'Option to join premium ranger workshops, boat rentals & obstacle tracks on-site'
		],
		ctaText: 'Get Park Admission',
		ctaNote: 'Valid across all park zones'
	},
	{
		id: 'stay-and-play',
		title: 'Park & Accomodation',
		badge: 'Getaway Package',
		subtitle: 'Overnight glamping and extended exploration',
		summary:
			'The complete Tērvete experience. Sleep in heated eco-glamping pods at The Lakeside Haven with multi-day park passes, boat rentals, and private campfire facilities included.',
		price: 'From €65.00',
		priceUnit: 'per night (sleeps up to 4)',
		features: [
			'Overnight stay in a heated wooden eco-pod at The Lakeside Haven',
			'Multi-day unlimited access across all 6 park worlds',
			'Complimentary 1-hour rowboat or SUP board rental on the lake',
			'Private campfire pit with dry birch firewood',
			'Special priority access to seasonal workshops and evening events'
		],
		ctaText: 'Reserve Glamping Stay',
		ctaNote: 'Check-in 15:00 • Check-out 12:00'
	}
];
