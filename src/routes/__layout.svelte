<script>
	import '../app.css';
	import Header from '@components/Header/Header.svelte';
	import Footer from '@components/Footer/Footer.svelte';
	import { hotKeyPressed } from '../store/teamStore';
	let keys = [];

	function handleKeydown(e) {
		keys.push(e.key);
		if (keys.includes('Meta') && keys.includes('Enter') && keys.length == 2) {
			$hotKeyPressed = true;
		}
	}
	function handleKeyup(e) {
		keys = [];
		$hotKeyPressed = false;
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />

<Header />
<slot />
<Footer />
