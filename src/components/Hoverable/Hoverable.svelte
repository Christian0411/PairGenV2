<script>
	let hovering;

	function enter() {
		console.log('enter');
		hovering = true;
	}

	function leave() {
		hovering = false;
	}
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot {hovering} />
</div>
