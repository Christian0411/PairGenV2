<script>
  import { removeMember, updateMemberName } from "../../store/teamStore";
  import Hoverable from "@components/Hoverable/Hoverable.svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import {
    faTrash,
    faPencil,
  } from "@fortawesome/free-solid-svg-icons/index.es";
  import Input from "@components/Input/Input.svelte";

  export let editable;
  export let member;
  export let isEditing;

  let editedNameValue = "";
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
  <div
    class={`rounded-xl bg-teal-700 p-2 text-center shadow-sm  shadow-black `}
  >
    {#if active && !editing && editable}
      <div class="grid grid-flow-col content-center">
        <button
          class="col-span-1 flex items-center justify-center"
          on:click={() => {
            editing = true;
            isEditing(editing);
          }}><Fa icon={faPencil} /></button
        >
        <div class="col-span-2 flex items-center justify-center">
          {member.name}
        </div>
        <button
          class="col-span-1 flex items-center justify-center"
          on:click={handleDelete}><Fa icon={faTrash} /></button
        >
      </div>
    {:else if !editing}
      {member.name}
    {/if}
    {#if editing}
      <Input
        class="bg-teal-700 text-center outline-none"
        autofocus
        bind:value={editedNameValue}
        on:keyup={handleKeyUp}
        on:blur={dispatchEditEvent}
      />
    {/if}
  </div>
</Hoverable>
