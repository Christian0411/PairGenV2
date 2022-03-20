<script lang="ts">
	import { getRandom } from '../helpers/helpers';
	import { members, pairs } from '../store/teamStore.js';
	import MembersPanel from '@components/MembersPanel/MembersPanel.svelte';
	import PairCard from '@components/PairCard/PairCard.svelte';

	const membersPerPair = 2;

	const generatePairs = () => {
		let temp = [...$members];
		let tempPairs = [];
		while (temp.length > 0) {
			let group = [];
			for (let i = 0; i < membersPerPair; i++) {
				if (temp.length === 0) {
					break;
				}
				const member = getRandom(temp);
				temp = temp.filter((item) => item.id !== member.id);
				group.push(member);
			}
			tempPairs = [...tempPairs, group];
		}
		pairs.set([...tempPairs, []]);
	};
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
