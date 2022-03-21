<script>
	import '../app.css';
	import Header from '@components/Header/Header.svelte';
	import Footer from '@components/Footer/Footer.svelte';
	import { hotKeyPressed, pairs, members } from '../store/teamStore';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import { decodePairs } from '../helpers/helpers';
	import Particles from '@components/Particles/Particles.svelte';

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

	$: {
		const code = $page.url.searchParams.get('code');
		if (code) {
			if (browser) goto(`/`);
			const { pairs: decodedPairs, members: decodedMembers } = decodePairs(code);
			if (decodedPairs && decodedMembers) {
				pairs.set([...decodedPairs, { locked: false, members: [] }]);
				members.set(decodedMembers);
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handleKeyup} />
<Header />
<slot />

<Footer />
<Particles />
