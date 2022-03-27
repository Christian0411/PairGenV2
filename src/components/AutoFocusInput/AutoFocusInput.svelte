<script lang="ts">
  import Input from "@components/Input/Input.svelte";

  export let value;

  function init(el) {
    el.select();
    el.focus();
  }
</script>

<Input {...$$restProps} action={init} bind:value on:blur on:keyup />
