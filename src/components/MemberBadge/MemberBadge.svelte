<script>
	import { removeMember, updateMemberName } from '../../store/teamStore';
	import Hoverable from '@components/Hoverable/Hoverable.svelte';
	import { faTrash, faPencil, faHand } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
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
	<div class={`p-2 rounded-xl text-center shadow-sm shadow-black  bg-teal-700 `}>
		{#if active && !editing && editable}
			<div class="flex justify-center content-center">
				<button
					class="mr-4"
					on:click={() => {
						editing = true;
						isEditing(editing);
					}}><Fa icon={faPencil} /></button
				>
				<div>{member.name}</div>
				<button class="ml-4" on:click={handleDelete}><Fa icon={faTrash} /></button>
			</div>
		{:else if !editing}
			{member.name}
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
