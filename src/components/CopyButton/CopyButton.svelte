<script>
	import { faShareNodes, faCamera } from '@fortawesome/free-solid-svg-icons/index.es';
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { pairs } from '../../store/teamStore';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa/src/fa.svelte';
	import dataURItoBlob, { encodePairs } from '../../helpers/helpers';
	import domtoimage from 'dom-to-image';

	let shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
	let isCopySuccessful = false;
	let copyVerbiage = 'Share Link';
	async function handleShareClick(e) {
		copyVerbiage = 'Share Link';
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
	function handleScreenshot() {
		copyVerbiage = 'Screenshot';
		isCopySuccessful = true;
		setTimeout(() => (isCopySuccessful = false), 2000);
		const input = document.getElementById('capture');
		if (input) {
			domtoimage.toPng(input, { bgcolor: '#181823' }).then(function (dataUrl) {
				const blob = dataURItoBlob(dataUrl);
				navigator.clipboard.write([
					new ClipboardItem(
						Object.defineProperty({}, blob.type, {
							value: blob,
							enumerable: true
						})
					)
				]);
			});
		}
	}
</script>

<div class="flex items-center">
	{#if isCopySuccessful}
		<div transition:fade={{ duration: 300 }} class="p-2 bg-white shadow-md text-black rounded-sm">
			Copied {copyVerbiage}
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
			class="bg-teal-500  shadow-md my-2 px-4 rounded-lg"
		>
			<div class="flex text-white items-center">
				<span class="m-2">Share</span>
				<Fa icon={faShareNodes} />
			</div>
		</button>
	</CopyToClipboard>
	<button
		on:click={handleScreenshot}
		class="border-2 border-teal-500 active:bg-teal-500 active:transition-all p-3 ml-2 shadow-md my-2 px-4 rounded-lg"
	>
		<div class="flex text-white items-center">
			<Fa icon={faCamera} />
		</div>
	</button>
</div>
