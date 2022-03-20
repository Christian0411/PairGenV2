<script>
	import { dndzone } from 'svelte-dnd-action';
	import { pairs, setPair } from '../../store/teamStore.js';
	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import { flip } from 'svelte/animate';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons/index.es';

	export let pair;
	export let id;

	function handleDndConsider(e) {
		const pairIndex = e.target.id;
		setPair(e.detail.items, pairIndex);
	}
	function handleDndFinalize(e) {
		const pairIndex = e.target.id;
		setPair(e.detail.items, pairIndex);
	}
	function handleLock(e) {
		console.log('Hello!');
		pair.locked = !pair.locked;
	}
</script>

<div
	class="transition-translate ml-4 mb-10 bg-slate-600 w-60 shadow-sm rounded-lg self-start shadow-black p-2 flex flex-col gap-y-2"
>
	<div class="flex justify-between">
		<span>Pair {id}</span>
		{#if pair.members.length > 0}
			<button class="text-gray-300" on:click={handleLock}>
				{#if pair.locked}
					<Fa class="mr-1 text-red-900" icon={faLock} />
				{:else}
					<Fa icon={faLockOpen} />
				{/if}
			</button>
		{/if}
	</div>
	<div
		id={`${id}`}
		use:dndzone={{
			items: pair.members,
			flipDurationMs: 100,
			centreDraggedOnCursor: true,
			dropTargetStyle: {},
			dragDisabled: pair.length === 0
		}}
		on:finalize={handleDndFinalize}
		on:consider={handleDndConsider}
		class="flex flex-col gap-y-2"
	>
		{#if pair.members?.length === 0}
			<div
				class={`p-2 rounded-xl text-center shadow-sm border-2 border-gray-800 border-dotted bg-transparent text-gray-800`}
			>
				+
			</div>
		{:else}
			{#each pair.members as member (member.id)}
				<div animate:flip={{ duration: 100 }}>
					<MemberBadge {member} editable={false} />
				</div>
			{/each}
		{/if}
	</div>
</div>
