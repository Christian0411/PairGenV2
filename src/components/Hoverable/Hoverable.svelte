<script>
	let hovering;

	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
		console.log('here');
	}
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot {hovering} />
</div>
