<script>
	import { dndzone } from 'svelte-dnd-action';
	import { pairs } from '../../store/teamStore.js';
	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import { flip } from 'svelte/animate';

	export let pair;
	export let id;

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
</script>

<div
	class="transition-translate ml-4 mb-10 bg-slate-600 w-60 shadow-sm rounded-lg self-start shadow-black p-2 flex flex-col gap-y-2"
>
	<span>Pair {id}</span>
	<div
		id={`${id}`}
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
				class={`p-2 rounded-xl text-center shadow-sm border-2 border-gray-800 border-dotted bg-transparent text-gray-800`}
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
