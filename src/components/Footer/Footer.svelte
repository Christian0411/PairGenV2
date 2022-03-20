<script>
	import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getRandom } from '../../helpers/helpers';

	let visible = false;

	let tips = [
		{ content: 'Clicking the trash icon removes a member from the member list' },
		{ content: 'You can move a member to the pair section before rolling' },
		{ content: 'Clicking the pencil icon lets you edit a members name' },
		{ content: 'Pressing CMD/CTRL (Windows) + Enter will generate pairs' },
		{ content: 'Members can be dragged between pairs' }
	];
	let tip = getRandom(tips);
	onMount(async () => {
		visible = true;
		setTimeout(() => (visible = false), 5000);
	});
</script>

{#if visible}
	<footer transition:fly={{ y: 200, duration: 500 }} class="fixed bottom-0 w-full ">
		<div class="flex justify-center text-slate-900">
			<div class="bg-white shadow-sm rounded-sm p-2 mb-5">
				<div class="flex items-center">
					<Fa class="text-purple-900 text-lg mr-2" icon={faTriangleExclamation} />
					<span class="mr-1">Tip:</span>
					<span>{tip.content}</span>
				</div>
			</div>
		</div>
	</footer>
{/if}
