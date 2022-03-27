<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    pairs,
    hotKeyPressed,
    generatePairs,
    members,
  } from "../store/teamStore.js";
  import MembersPanel from "@components/MembersPanel/MembersPanel.svelte";
  import PairCard from "@components/PairCard/PairCard.svelte";
  import * as storage from "../storage/storage";

  $: {
    if ($hotKeyPressed) generatePairs();
  }
</script>

<div
  id="capture"
  class="flex flex-col items-center justify-center px-5vw text-white  md:flex-row md:items-start md:justify-start"
>
  <MembersPanel on:click={generatePairs} />

  <div class="ml-0 mt-4 flex flex-col flex-wrap md:ml-10 md:mt-0 md:flex-row ">
    {#each $pairs as pair, i (i)}
      <div in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
        <PairCard {pair} id={i} />
      </div>
    {/each}
    <div />
  </div>
</div>
