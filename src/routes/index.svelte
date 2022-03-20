<script lang="ts">
	import { pairs, hotKeyPressed, generatePairs } from '../store/teamStore.js';
	import MembersPanel from '@components/MembersPanel/MembersPanel.svelte';
	import PairCard from '@components/PairCard/PairCard.svelte';

	$: {
		if ($hotKeyPressed) generatePairs();
	}
</script>

<div class="px-5vw text-white flex">
	<MembersPanel on:click={generatePairs} />

	<div class="flex ml-10 max-w-screen-lg flex-wrap h-1">
		{#each $pairs as pair, i}
			<PairCard {pair} id={i} />
		{/each}
		<div />
	</div>
</div>
