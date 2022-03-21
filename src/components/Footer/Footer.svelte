<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getRandom } from '../../helpers/helpers';

	let visible = false;

	let tips = [
		{ content: 'Clicking the trash icon removes a member from the member list' },
		{ content: 'You can move a member to the pair section before rolling' },
		{ content: 'Clicking the pencil icon lets you edit a members name' },
		{ content: 'Pressing CMD/CTRL (Windows) + Enter will generate pairs' },
		{ content: 'Members can be dragged between pairs' },
		{ content: 'Members of locked pairs will not be moved after generation' },
		{ content: 'Dragging a member to the "+" card will create a new pair' }
	];
	let tip = getRandom(tips);
	onMount(async () => {
		setTimeout(() => (visible = true), 10000);
		setTimeout(() => (visible = false), 15000);
	});
</script>

{#if visible}
	<footer transition:fly={{ y: 200, duration: 500 }} class="fixed bottom-0 w-full ">
		<div class="flex justify-center text-slate-900">
			<div class="bg-white shadow-sm rounded-sm p-2 mb-5">
				<div class="flex items-center">
					<Fa class="text-purple-900 text-lg mr-2" icon={faInfoCircle} />
					<span class="mr-1">Tip:</span>
					<span>{tip.content}</span>
				</div>
			</div>
		</div>
	</footer>
{/if}
