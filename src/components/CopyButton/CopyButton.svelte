<script>
	import { faShareNodes } from '@fortawesome/free-solid-svg-icons/index.es';
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { pairs } from '../../store/teamStore';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { encodePairs } from '../../helpers/helpers';

	let shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
	let isCopySuccessful = false;
	async function handleShareClick(e) {
		if ($pairs.filter((pair) => pair.members.length > 0).length > 0) {
			const encodedString = encodePairs($pairs);
			shareLink += encodedString;
		} else {
			shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
		}
	}

	function handleSuccessfullyCopied() {
		isCopySuccessful = true;
		setTimeout(() => (isCopySuccessful = false), 2000);
	}
</script>

<div class="flex items-center">
	{#if isCopySuccessful}
		<div transition:fade={{ duration: 300 }} class="p-2 bg-white shadow-md text-black rounded-sm">
			Copied Share Link
		</div>
		<div
			transition:fade={{ duration: 300 }}
			class="w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white mr-2"
		/>
	{/if}
	<CopyToClipboard text={shareLink} let:copy on:copy={handleSuccessfullyCopied}>
		<button
			on:click={async (e) => {
				await handleShareClick(e);
				copy(e);
				shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
			}}
			class="bg-indigo-900  shadow-md my-2 px-4 rounded-lg"
		>
			<div class="flex items-center">
				<span class="m-2">Share</span>
				<Fa icon={faShareNodes} />
			</div>
		</button>
	</CopyToClipboard>
</div>
