<script>
	import { flip } from 'svelte/animate';
	import Dice from '@components/Dice/Dice.svelte';
	import MemberBadge from '@components/MemberBadge/MemberBadge.svelte';
	import {
		dndzone,
		TRIGGERS,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		DRAGGED_ELEMENT_ID
	} from 'svelte-dnd-action';

	import { members, addMember, removeMemberFromPair } from '../../store/teamStore.js';

	let addMemberValue = '';
	let isMemberBeingEdited = false;
	const handleMemberInputKeyUp = (e) => {
		if (e.keyCode === 13 && addMemberValue.trim() != '') {
			addMember(addMemberValue);
			addMemberValue = '';
		}
	};

	let shouldIgnoreDndEvents = false;
	function handleDndConsider(e) {
		const { trigger, id } = e.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			const idx = $members.findIndex((item) => item.id === id);
			removeMemberFromPair($members[idx]);
			const newId = `${id}_copy_${Math.round(Math.random() * 100000)}`;
			// the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above
			e.detail.items = e.detail.items.filter((item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
			const originalId = $members[idx].isCopy ? $members[idx].originalId : id;
			e.detail.items.splice(idx, 0, {
				...$members[idx],
				id: newId,
				originalId: originalId,
				isCopy: true
			});
			members.set(e.detail.items);
			shouldIgnoreDndEvents = true;
		} else if (!shouldIgnoreDndEvents) {
			members.set(e.detail.items);
		} else {
			members.set([...$members]);
		}
	}
	function handleDndFinalize(e) {
		if (!shouldIgnoreDndEvents) {
			members.set(e.detail.items);
		} else {
			$members = [...$members];
			shouldIgnoreDndEvents = false;
		}
	}
</script>

<div
	class="bg-slate-600 w-60 max-h-80vh overflow-auto  shadow-sm rounded-lg  shadow-black p-2 flex flex-col"
>
	<div class="flex flex-row place-content-between mb-3">
		<h1 class="text-2xl">Members</h1>
		<button on:click><Dice width="30px" height="30px" /></button>
	</div>

	<div class="flex my-2 rounded-xl text-center shadow-sm shadow-black p-2 bg-teal-700">
		<input
			class="flex-1 bg-teal-700 outline-none text-center"
			bind:value={addMemberValue}
			on:keyup={handleMemberInputKeyUp}
			placeholder="Enter name"
		/>
	</div>
	<section
		class="flex flex-col gap-y-2"
		use:dndzone={{
			items: $members,
			flipDurationMs: 100,
			centreDraggedOnCursor: true,
			dropTargetStyle: {},
			dragDisabled: isMemberBeingEdited,
			dropFromOthersDisabled: true
		}}
		on:finalize={handleDndFinalize}
		on:consider={handleDndConsider}
	>
		{#each $members as member (member.id)}
			<div animate:flip={{ duration: 100 }}>
				<MemberBadge
					editable={true}
					isEditing={(editing) => (isMemberBeingEdited = editing)}
					{member}
				/>
			</div>
		{/each}
	</section>
</div>
