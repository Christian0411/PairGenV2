<script>
  export let value;
  export let autofocus;

  function init(el) {
    if (autofocus) {
      el.select();
      el.focus();
    }
  }

  $: {
    value = value.replace(/[^a-zA-Z ]/g, "");
  }
</script>

<input {...$$restProps} use:init bind:value on:blur on:keyup maxlength="17" />
