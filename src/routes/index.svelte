<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { pairs, hotKeyPressed, generatePairs, members } from '../store/teamStore.js';
	import MembersPanel from '@components/MembersPanel/MembersPanel.svelte';
	import PairCard from '@components/PairCard/PairCard.svelte';
	import * as storage from '../storage/storage';

	$: {
		if ($hotKeyPressed) generatePairs();
	}
</script>

<div id="capture" class="px-5vw text-white flex">
	<MembersPanel on:click={generatePairs} />

	<div class="flex ml-10 max-w-screen-lg flex-wrap h-1">
		{#each $pairs as pair, i (i)}
			<div in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
				<PairCard {pair} id={i} />
			</div>
		{/each}
		<div />
	</div>
</div>
