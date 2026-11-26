<script>
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Tērvete Park of parks | Official Booking & Entertainment</title>
</svelte:head>

{@render children()}
