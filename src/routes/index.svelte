<script lang="ts">
	import { flip } from 'svelte/animate';
	import { getRandom } from '../helpers/helpers';
	import { members, pairs } from '../store/teamStore.js';
	import { dndzone } from 'svelte-dnd-action';

	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import MembersPanel from '@components/MembersPanel/MembersPanel.svelte';

	function handleDndConsider(e) {
		const pairIndex = e.target.id;
		$pairs[pairIndex] = e.detail.items;
		$pairs = $pairs;
	}
	function handleDndFinalize(e) {
		const pairIndex = e.target.id;
		$pairs[pairIndex] = e.detail.items;
		$pairs = $pairs.filter((pair) => pair.length != 0);
		$pairs = [...$pairs, []];
	}

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
			<div
				class="transition-translate ml-4 mb-10 bg-slate-600 w-60 shadow-sm rounded-lg self-start shadow-black p-2 flex flex-col gap-y-2"
			>
				<span>Pair {i}</span>
				<div
					id={`${i}`}
					use:dndzone={{
						items: pair,
						flipDurationMs: 100,
						centreDraggedOnCursor: true,
						dropTargetStyle: {},
						dragDisabled: pair.length === 0
					}}
					on:finalize={handleDndFinalize}
					on:consider={handleDndConsider}
					class="flex flex-col gap-y-2"
				>
					{#if pair.length === 0}
						<div
							class={`p-2 rounded-xl text-center shadow-sm border-2 border-gray-800 border-dotted bg-transparent `}
						>
							+
						</div>
					{:else}
						{#each pair as member (member.id)}
							<div animate:flip={{ duration: 100 }}>
								<MemberBadge {member} editable={false} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/each}
		<div />
	</div>
</div>
