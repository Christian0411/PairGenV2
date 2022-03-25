<script>
	import { removeMember, updateMemberName } from '../../store/teamStore';
	import Hoverable from '@components/Hoverable/Hoverable.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faTrash, faPencil, faHand } from '@fortawesome/free-solid-svg-icons/index.es';
	import AutoFocusInput from '@components/AutoFocusInput/AutoFocusInput.svelte';

	export let editable;
	export let member;
	export let isEditing;

	let editedNameValue = '';
	let editing = false && editable;

	function handleDelete(event) {
		removeMember(member);
	}

	function handleKeyUp(event) {
		if (event.keyCode === 13) {
			dispatchEditEvent();
		}
	}
	function dispatchEditEvent() {
		editing = false;
		isEditing(editing);
		updateMemberName(member, editedNameValue || member.name);
	}
</script>

<Hoverable let:hovering={active}>
	<div class={`rounded-xl text-center shadow-sm shadow-black  bg-teal-700 `}>
		{#if active && !editing && editable}
			<div class="grid grid-flow-col content-center">
				<button
					class="h-10 flex col-span-1 justify-center items-center"
					on:click={() => {
						editing = true;
						isEditing(editing);
					}}><Fa icon={faPencil} /></button
				>
				<div class="flex col-span-2 justify-center items-center">
					{member.name}
				</div>
				<button class="flex col-span-1 justify-center items-center" on:click={handleDelete}
					><Fa icon={faTrash} /></button
				>
			</div>
		{:else if !editing}
			<div class="flex justify-center content-center items-center h-10">{member.name}</div>
		{/if}
		{#if editing}
			<AutoFocusInput
				class="bg-teal-700 outline-none text-center"
				bind:value={editedNameValue}
				on:keyup={handleKeyUp}
				on:blur={dispatchEditEvent}
			/>
		{/if}
	</div>
</Hoverable>
