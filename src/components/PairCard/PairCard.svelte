<script>
  import { dndzone, TRIGGERS } from "svelte-dnd-action";
  import {
    emptyPair,
    pairs,
    setPair,
    togglePairLock,
  } from "../../store/teamStore.js";
  import MemberBadge from "@components/MemberBadge/MemberBadge.svelte";
  import { flip } from "svelte/animate";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faLock,
    faLockOpen,
  } from "@fortawesome/free-solid-svg-icons/index.es";

  export let pair;
  export let id;

  function handleDndConsider(e) {
    const pairIndex = e.target.id;
    setPair(e.detail.items, pairIndex);
  }
  function handleDndFinalize(e) {
    const pairIndex = e.target.id;
    setPair(e.detail.items, pairIndex);
  }
  function handleLock(e) {
    togglePairLock(pair);
  }
</script>

<div
  class="transition-translate m-0 mb-4 flex w-60 flex-col gap-y-2 self-start rounded-lg bg-slate-600 p-2 shadow-sm shadow-black md:mx-4"
>
  <div class="flex justify-between">
    <span>Pair {id}</span>
    {#if pair.members.length > 0}
      <button class="text-gray-300" on:click={handleLock}>
        {#if pair.locked}
          <Fa class="mr-1  text-red-900" icon={faLock} />
        {:else}
          <Fa icon={faLockOpen} />
        {/if}
      </button>
    {/if}
  </div>
  <div
    id={`${id}`}
    use:dndzone={{
      items: pair.members,
      flipDurationMs: 100,
      centreDraggedOnCursor: true,
      dropTargetStyle: {},
      dragDisabled: pair.members.length === 0,
    }}
    on:finalize={handleDndFinalize}
    on:consider={handleDndConsider}
    class="flex flex-col gap-y-2"
  >
    {#if pair.members?.length === 0}
      <div
        class={`rounded-xl border-2 border-dotted border-gray-800 bg-transparent p-2 text-center text-gray-800 shadow-sm`}
      >
        +
      </div>
    {:else}
      {#each pair.members as member (member.id)}
        <div animate:flip={{ duration: 100 }}>
          <MemberBadge {member} isEditing={() => {}} editable={false} />
        </div>
      {/each}
    {/if}
  </div>
</div>
