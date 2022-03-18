<script>
	import { createEventDispatcher } from 'svelte';
	import Hoverable from './Hoverable.svelte';
	import { selectTextOnFocus } from '../helpers/inputDirectives.ts';
	import { faTrash, faPencil, faHand } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import AutoFocusInput from './AutoFocusInput.svelte';

	export let name;
	export let editable;
	export let id;

	const dispatch = createEventDispatcher();
	let editing = false && editable;
	function handleDelete(event) {
		dispatch('delete', {
			id
		});
	}
	function handleKeyUp(event) {
		if (event.keyCode === 13) {
			dispatchEditEvent();
		}
	}
	function dispatchEditEvent() {
		editing = false;
		if (name.trim() != '') {
			dispatch('edit', {
				name,
				id
			});
		}
	}
</script>

<Hoverable let:hovering={active}>
	<div class={`m-2 rounded-xl text-center shadow-sm shadow-black p-2 bg-teal-700 `}>
		{#if active && !editing && editable}
			<div class="grid grid-cols-3 p-2 h-6 content-center">
				<button on:click={() => (editing = true)} class="flex justify-center"
					><Fa icon={faPencil} /></button
				>
				<button class="flex justify-center border-l-2 border-r-2"><Fa icon={faHand} /></button>
				<button on:click={handleDelete} class="flex justify-center"><Fa icon={faTrash} /></button>
			</div>
		{:else if !editing}
			{name}
		{/if}
		{#if editing}
			<AutoFocusInput
				class="flex-1 bg-teal-700 outline-none text-center"
				bind:value={name}
				on:keyup={handleKeyUp}
				on:blur={dispatchEditEvent}
			/>
		{/if}
	</div>
</Hoverable>
