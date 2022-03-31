<script>
  import {
    faShareNodes,
    faCamera,
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import CopyToClipboard from "svelte-copy-to-clipboard";
  import { pairs } from "../../store/teamStore";
  import { fade } from "svelte/transition";
  import Fa from "svelte-fa/src/fa.svelte";
  import dataURItoBlob, { encodePairs } from "../../helpers/helpers";
  import domtoimage from "dom-to-image";

  let shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
  let isCopySuccessful = false;
  let copyVerbiage = "Link to Clipboard";
  async function handleShareClick(e) {
    copyVerbiage = "Link to Clipboard";
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
    copyVerbiage = "Screenshot to Clipboard";
    isCopySuccessful = true;
    setTimeout(() => (isCopySuccessful = false), 2000);
    const input = document.getElementById("capture");
    if (input) {
      domtoimage
        .toPng(input, {
          bgcolor: "#181823",
          style: {
            display: "flex",
            padding: "0px",
            margin: "0px",
            "justify-content": "center",
            "align-items": "center",
          },
        })
        .then(function (dataUrl) {
          const blob = dataURItoBlob(dataUrl);
          navigator.clipboard.write([
            new ClipboardItem(
              Object.defineProperty({}, blob.type, {
                value: blob,
                enumerable: true,
              })
            ),
          ]);
        });
    }
  }
</script>

<div class="flex items-center">
  {#if isCopySuccessful}
    <div
      transition:fade={{ duration: 300 }}
      class="relative z-20 rounded-sm bg-white p-2 text-black shadow-md"
    >
      Copied {copyVerbiage}
    </div>
    <div
      transition:fade={{ duration: 300 }}
      class="mr-2 h-0 w-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"
    />
  {/if}
  <CopyToClipboard text={shareLink} let:copy on:copy={handleSuccessfullyCopied}>
    <button
      on:click={async (e) => {
        await handleShareClick(e);
        copy(e);
        shareLink = import.meta.env.VITE_SHARE_LINK_HOST;
      }}
      class="my-2  rounded-lg bg-teal-500 px-4 shadow-md"
    >
      <div class="flex items-center text-white">
        <span class="m-2">Share</span>
        <Fa icon={faShareNodes} />
      </div>
    </button>
  </CopyToClipboard>
  <button
    on:click={handleScreenshot}
    class="my-2 ml-2 rounded-lg border-2 border-teal-500 p-3 px-4 shadow-md active:bg-teal-500 active:transition-all"
  >
    <div class="flex items-center text-white">
      <Fa icon={faCamera} />
    </div>
  </button>
</div>
