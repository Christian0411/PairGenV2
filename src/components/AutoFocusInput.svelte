<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	const dispatch = createEventDispatcher();
	let ref;
	export let value;

	function init(el) {
		el.select();
		el.focus();
	}
</script>

<input {...$$restProps} bind:value on:blur on:keyup use:init />
