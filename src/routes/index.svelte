<script lang="ts">
	import { getRandom } from '../helpers/helpers';
	import { members, pairs } from '../store/teamStore.js';
	import * as uuidv4 from 'uuid';

	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import MembersPanel from '@components/MembersPanel/MembersPanel.svelte';

	let addUserValue = '';

	const addUser = (e) => {
		if (e.keyCode === 13 && addUserValue.trim() != '') {
			members.update((members) => [{ id: uuidv4.v4(), name: addUserValue }, ...members]);
			addUserValue = '';
		}
	};
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
		pairs.set(tempPairs);
	};
</script>

<div class="px-5vw text-white flex">
	<MembersPanel on:click={generatePairs} />

	<div class="flex ml-10 max-w-screen-lg flex-wrap h-1">
		{#each $pairs as pair, i}
			<div
				class="ml-4 mb-10 bg-slate-600 w-60 shadow-sm rounded-lg self-start shadow-black p-2 flex flex-col"
			>
				<span>Pair {i}</span>
				{#each pair as member}
					<MemberBadge {member} editable={false} />
				{/each}
			</div>
		{/each}
		<div />
	</div>
</div>
